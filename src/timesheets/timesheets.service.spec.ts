import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import {
  AssignmentStatus,
  Prisma,
  TimesheetAuditAction,
  TimesheetEntryStatus,
} from "@prisma/client";
import { UserRoles } from "../app-constants";
import { MemberService } from "../integrations/member.service";
import { TimesheetAccessService } from "./timesheet-access.service";
import { TimesheetAuditService } from "./timesheet-audit.service";
import { TimesheetEventsService } from "./timesheet-events.service";
import {
  TimesheetRollupStatus,
  TimesheetEventTopics,
} from "./timesheet-constants";
import { TimesheetViewerRole } from "./timesheet-roles";
import { TimesheetsService } from "./timesheets.service";

jest.mock("nanoid", () => ({ nanoid: () => "new-entry-id" }));

const decimal = (value: string | number) => new Prisma.Decimal(value);
const utcDate = (value: string) => new Date(`${value}T00:00:00.000Z`);

describe("TimesheetsService", () => {
  let service: TimesheetsService;
  let db: any;
  let audit: { record: jest.Mock };
  let events: { emit: jest.Mock };
  let memberService: { getMemberNamesByUserIds: jest.Mock };

  const member = { userId: "1001", handle: "johnsmith", roles: [] };
  const manager = { userId: "2002", handle: "maryj", roles: [] };
  const otherMember = { userId: "9009", handle: "someone", roles: [] };
  const admin = {
    userId: "3003",
    handle: "adminuser",
    roles: [UserRoles.Admin],
  };
  const projectManager = {
    userId: "4004",
    handle: "pmuser",
    roles: [UserRoles.ProjectManager],
  };

  const assignment = {
    id: "asg1",
    engagementId: "eng1",
    memberId: "1001",
    memberHandle: "johnsmith",
    status: AssignmentStatus.ASSIGNED,
    standardHoursPerDay: 8,
    startDate: utcDate("2026-09-01"),
    endDate: utcDate("2026-09-30"),
    engagement: { id: "eng1", title: "Senior Frontend Engineer" },
  };

  const entry = (overrides: Record<string, unknown> = {}) => ({
    id: "entry1",
    engagementAssignmentId: "asg1",
    workDate: utcDate("2026-09-07"),
    hoursWorked: decimal("8.50"),
    remarks: "Sprint planning",
    status: TimesheetEntryStatus.DRAFT,
    submittedAt: null,
    submittedBy: null,
    approvedAt: null,
    approvedBy: null,
    approvedByHandle: null,
    approvalComment: null,
    reopenedAt: null,
    paidPaymentReference: null,
    ...overrides,
  });

  /** Makes the caller an assigned manager of eng1. */
  const withManagerRow = () =>
    db.engagementManager.findFirst.mockResolvedValue({ id: "mgr-row" });

  beforeEach(() => {
    db = {
      engagementAssignment: {
        findUnique: jest.fn().mockResolvedValue(assignment),
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
      engagementManager: {
        findFirst: jest.fn().mockResolvedValue(null),
        findMany: jest.fn().mockResolvedValue([]),
      },
      engagementTimesheetEntry: {
        findMany: jest.fn().mockResolvedValue([]),
        create: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
        groupBy: jest.fn().mockResolvedValue([]),
      },
      $transaction: jest.fn((callback: (tx: unknown) => unknown) =>
        Promise.resolve(callback(db)),
      ),
    };
    audit = { record: jest.fn().mockResolvedValue(undefined) };
    events = { emit: jest.fn().mockResolvedValue(undefined) };
    memberService = {
      getMemberNamesByUserIds: jest
        .fn()
        .mockResolvedValue(new Map([["1001", "John Smith"]])),
    };

    service = new TimesheetsService(
      db,
      new TimesheetAccessService(db),
      audit as unknown as TimesheetAuditService,
      events as unknown as TimesheetEventsService,
      memberService as unknown as MemberService,
    );
  });

  describe("findTimesheet", () => {
    it("returns the header, managers, and viewerRole for the assignee", async () => {
      db.engagementManager.findMany.mockResolvedValue([
        {
          engagementId: "eng1",
          managerUserId: "2002",
          managerHandle: "maryj",
          managerName: "Mary Jones",
          createdAt: utcDate("2026-09-01"),
        },
      ]);
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({
          status: TimesheetEntryStatus.APPROVED,
          approvedByHandle: "maryj",
        }),
      ]);

      const result = await service.findTimesheet("eng1", "asg1", {}, member);

      expect(result.viewerRole).toBe(TimesheetViewerRole.Member);
      expect(result.engagementTitle).toBe("Senior Frontend Engineer");
      expect(result.assignment).toEqual(
        expect.objectContaining({
          memberHandle: "johnsmith",
          memberName: "John Smith",
          standardHoursPerDay: 8,
        }),
      );
      expect(result.managers).toEqual([
        { userId: "2002", handle: "maryj", name: "Mary Jones" },
      ]);
      expect(result.entries[0]).toEqual(
        expect.objectContaining({
          workDate: "2026-09-07",
          hoursWorked: "8.50",
          approvedByHandle: "maryj",
        }),
      );
    });

    it("shows a manager approval details recorded by a different manager", async () => {
      withManagerRow();
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({
          status: TimesheetEntryStatus.APPROVED,
          approvedByHandle: "robertl",
          approvalComment: "Approved for week 37",
        }),
      ]);

      const result = await service.findTimesheet("eng1", "asg1", {}, manager);

      expect(result.viewerRole).toBe(TimesheetViewerRole.Manager);
      expect(result.entries[0].approvedByHandle).toBe("robertl");
      expect(result.entries[0].approvalComment).toBe("Approved for week 37");
    });

    it("returns entry-level payment reconciliation fields", async () => {
      const paidAt = utcDate("2026-09-20");
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({
          paidAt,
          paidPaymentReference: "win-1",
          status: TimesheetEntryStatus.APPROVED,
        }),
      ]);

      const result = await service.findTimesheet("eng1", "asg1", {}, member);

      expect(result.entries[0].isPaid).toBe(true);
      expect(result.entries[0].paymentReference).toBe("win-1");
      expect(result.entries[0].paidAt).toEqual(paidAt);
    });

    it("404s when the assignment belongs to a different engagement", async () => {
      await expect(
        service.findTimesheet("other-eng", "asg1", {}, member),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("404s for an unrelated member without revealing the assignment exists", async () => {
      await expect(
        service.findTimesheet("eng1", "asg1", {}, otherMember),
      ).rejects.toThrow("Timesheet not found");
    });

    it("flags entries outside the assignment window", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({ id: "inside", workDate: utcDate("2026-09-07") }),
        entry({ id: "before", workDate: utcDate("2026-08-31") }),
        entry({ id: "after", workDate: utcDate("2026-10-01") }),
      ]);

      const result = await service.findTimesheet("eng1", "asg1", {}, member);

      expect(
        result.entries.map((row) => [row.id, row.outsideAssignmentWindow]),
      ).toEqual([
        ["inside", false],
        ["before", true],
        ["after", true],
      ]);
    });

    it("rejects an inverted date range", async () => {
      await expect(
        service.findTimesheet(
          "eng1",
          "asg1",
          { fromDate: "2026-09-11", toDate: "2026-09-07" },
          member,
        ),
      ).rejects.toThrow("cannot be earlier than the from date");
    });

    it("rejects a range longer than 31 days", async () => {
      await expect(
        service.findTimesheet(
          "eng1",
          "asg1",
          { fromDate: "2026-09-01", toDate: "2026-10-05" },
          member,
        ),
      ).rejects.toThrow("cannot span more than 31 days");
    });
  });

  describe("upsertEntries", () => {
    const payload = (
      entries: Array<Record<string, unknown>>,
      overrideReason?: string,
    ) => ({ entries, overrideReason }) as never;

    it("creates a missing day as a draft and audits it", async () => {
      db.engagementTimesheetEntry.create.mockResolvedValue(
        entry({ id: "created" }),
      );

      await service.upsertEntries(
        "eng1",
        "asg1",
        payload([
          {
            workDate: "2026-09-07",
            hoursWorked: "8.5",
            remarks: "Sprint planning",
          },
        ]),
        member,
      );

      expect(db.engagementTimesheetEntry.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          engagementAssignmentId: "asg1",
          status: TimesheetEntryStatus.DRAFT,
          createdBy: "1001",
        }),
      });
      expect(audit.record).toHaveBeenCalledWith(
        db,
        expect.objectContaining({ action: TimesheetAuditAction.CREATED }),
      );
    });

    it("ignores a status the client sends", async () => {
      db.engagementTimesheetEntry.create.mockResolvedValue(
        entry({ id: "created" }),
      );

      await service.upsertEntries(
        "eng1",
        "asg1",
        payload([
          {
            workDate: "2026-09-07",
            hoursWorked: "8",
            status: TimesheetEntryStatus.APPROVED,
          },
        ]),
        member,
      );

      const { data } = db.engagementTimesheetEntry.create.mock.calls[0][0];
      expect(data.status).toBe(TimesheetEntryStatus.DRAFT);
    });

    it("resets an edited submitted entry to draft and leaves its siblings alone", async () => {
      const submitted = entry({
        id: "edited",
        status: TimesheetEntryStatus.SUBMITTED,
        submittedAt: utcDate("2026-09-12"),
        submittedBy: "1001",
      });
      const untouched = entry({
        id: "untouched",
        workDate: utcDate("2026-09-08"),
        status: TimesheetEntryStatus.SUBMITTED,
      });
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        submitted,
        untouched,
      ]);
      db.engagementTimesheetEntry.update.mockResolvedValue(
        entry({ id: "edited", status: TimesheetEntryStatus.DRAFT }),
      );

      await service.upsertEntries(
        "eng1",
        "asg1",
        payload([
          {
            workDate: "2026-09-07",
            hoursWorked: "9.5",
            remarks: "Sprint planning",
          },
          {
            workDate: "2026-09-08",
            hoursWorked: "8.5",
            remarks: "Sprint planning",
          },
        ]),
        member,
      );

      expect(db.engagementTimesheetEntry.update).toHaveBeenCalledTimes(1);
      expect(db.engagementTimesheetEntry.update).toHaveBeenCalledWith({
        where: { id: "edited" },
        data: expect.objectContaining({
          status: TimesheetEntryStatus.DRAFT,
          submittedAt: null,
          submittedBy: null,
        }),
      });
      expect(audit.record).toHaveBeenCalledWith(
        db,
        expect.objectContaining({
          timesheetEntryId: "edited",
          action: TimesheetAuditAction.UNSUBMITTED,
        }),
      );
      expect(events.emit).toHaveBeenCalledWith(
        TimesheetEventTopics.Unsubmitted,
        expect.objectContaining({ entryIds: ["edited"] }),
      );
    });

    it("is a no-op when nothing material changed", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({ status: TimesheetEntryStatus.SUBMITTED }),
      ]);

      await service.upsertEntries(
        "eng1",
        "asg1",
        payload([
          {
            workDate: "2026-09-07",
            hoursWorked: "8.50",
            remarks: "Sprint planning",
          },
        ]),
        member,
      );

      expect(db.engagementTimesheetEntry.update).not.toHaveBeenCalled();
      expect(audit.record).not.toHaveBeenCalled();
    });

    it("audits a draft edit as UPDATED and keeps it a draft", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([entry()]);
      db.engagementTimesheetEntry.update.mockResolvedValue(
        entry({ hoursWorked: decimal("7") }),
      );

      await service.upsertEntries(
        "eng1",
        "asg1",
        payload([
          {
            workDate: "2026-09-07",
            hoursWorked: "7",
            remarks: "Sprint planning",
          },
        ]),
        member,
      );

      const { data } = db.engagementTimesheetEntry.update.mock.calls[0][0];
      expect(data.status).toBeUndefined();
      expect(audit.record).toHaveBeenCalledWith(
        db,
        expect.objectContaining({ action: TimesheetAuditAction.UPDATED }),
      );
    });

    it("409s when a member edits an approved entry", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({ status: TimesheetEntryStatus.APPROVED }),
      ]);

      await expect(
        service.upsertEntries(
          "eng1",
          "asg1",
          payload([{ workDate: "2026-09-07", hoursWorked: "9" }]),
          member,
        ),
      ).rejects.toBeInstanceOf(ConflictException);
      expect(db.engagementTimesheetEntry.update).not.toHaveBeenCalled();
    });

    it("400s when an administrator edits an approved entry with no reason", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({ status: TimesheetEntryStatus.APPROVED }),
      ]);

      await expect(
        service.upsertEntries(
          "eng1",
          "asg1",
          payload([{ workDate: "2026-09-07", hoursWorked: "9" }]),
          admin,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it("lets an administrator override an approved entry, preserving the previous values", async () => {
      const approved = entry({
        status: TimesheetEntryStatus.APPROVED,
        approvedByHandle: "maryj",
      });
      db.engagementTimesheetEntry.findMany.mockResolvedValue([approved]);
      db.engagementTimesheetEntry.update.mockResolvedValue(
        entry({
          status: TimesheetEntryStatus.APPROVED,
          hoursWorked: decimal("9"),
        }),
      );

      await service.upsertEntries(
        "eng1",
        "asg1",
        payload(
          [{ workDate: "2026-09-07", hoursWorked: "9" }],
          "Payroll correction",
        ),
        admin,
      );

      expect(audit.record).toHaveBeenCalledWith(
        db,
        expect.objectContaining({
          action: TimesheetAuditAction.ADMIN_OVERRIDE,
          actorRole: "ADMINISTRATOR",
          comment: "Payroll correction",
          previousValues: expect.objectContaining({
            status: TimesheetEntryStatus.APPROVED,
          }),
        }),
      );
      expect(events.emit).toHaveBeenCalledWith(
        TimesheetEventTopics.AdminOverride,
        expect.objectContaining({ comment: "Payroll correction" }),
      );
    });

    it("treats a platform manager role as an administrator needing a reason", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({ status: TimesheetEntryStatus.APPROVED }),
      ]);

      await expect(
        service.upsertEntries(
          "eng1",
          "asg1",
          payload([{ workDate: "2026-09-07", hoursWorked: "9" }]),
          projectManager,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it("refuses an assigned manager: approval is their power, editing is not", async () => {
      withManagerRow();

      await expect(
        service.upsertEntries(
          "eng1",
          "asg1",
          payload([{ workDate: "2026-09-07", hoursWorked: "8" }]),
          manager,
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it.each([
      ["negative hours", "-1", "cannot be negative"],
      ["non-numeric hours", "eight", "must be a number"],
      ["hours above 24", "24.01", "cannot exceed 24"],
    ])("rejects %s", async (_label, hoursWorked, expected) => {
      await expect(
        service.upsertEntries(
          "eng1",
          "asg1",
          payload([{ workDate: "2026-09-07", hoursWorked }]),
          member,
        ),
      ).rejects.toThrow(expected);
      expect(db.engagementTimesheetEntry.create).not.toHaveBeenCalled();
    });

    it("accepts decimal hours", async () => {
      db.engagementTimesheetEntry.create.mockResolvedValue(entry());

      await service.upsertEntries(
        "eng1",
        "asg1",
        payload([
          { workDate: "2026-09-07", hoursWorked: "8" },
          { workDate: "2026-09-08", hoursWorked: 8.5 },
          { workDate: "2026-09-09", hoursWorked: "9.5" },
        ]),
        member,
      );

      expect(db.engagementTimesheetEntry.create).toHaveBeenCalledTimes(3);
    });

    it("rejects the same work date twice in one payload", async () => {
      await expect(
        service.upsertEntries(
          "eng1",
          "asg1",
          payload([
            { workDate: "2026-09-07", hoursWorked: "8" },
            { workDate: "2026-09-07", hoursWorked: "4" },
          ]),
          member,
        ),
      ).rejects.toThrow("more than once");
    });

    it("rejects a payload spanning more than 31 days", async () => {
      await expect(
        service.upsertEntries(
          "eng1",
          "asg1",
          payload([
            { workDate: "2026-09-01", hoursWorked: "8" },
            { workDate: "2026-10-05", hoursWorked: "8" },
          ]),
          member,
        ),
      ).rejects.toThrow("cannot span more than 31 days");
    });
  });

  describe("submitEntries", () => {
    it("submits drafts, recording who and when, and emits the event", async () => {
      const draft = entry();
      db.engagementTimesheetEntry.findMany.mockResolvedValue([draft]);
      db.engagementTimesheetEntry.update.mockResolvedValue(
        entry({ status: TimesheetEntryStatus.SUBMITTED }),
      );

      await service.submitEntries(
        "eng1",
        "asg1",
        { entryIds: ["entry1"] },
        member,
      );

      expect(db.engagementTimesheetEntry.update).toHaveBeenCalledWith({
        where: { id: "entry1" },
        data: expect.objectContaining({
          status: TimesheetEntryStatus.SUBMITTED,
          submittedBy: "1001",
        }),
      });
      expect(audit.record).toHaveBeenCalledWith(
        db,
        expect.objectContaining({ action: TimesheetAuditAction.SUBMITTED }),
      );
      expect(events.emit).toHaveBeenCalledWith(
        TimesheetEventTopics.Submitted,
        expect.objectContaining({ entryIds: ["entry1"] }),
      );
    });

    it("submits nothing when one entry is not a draft", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({ id: "ok" }),
        entry({ id: "already", status: TimesheetEntryStatus.APPROVED }),
      ]);

      await expect(
        service.submitEntries(
          "eng1",
          "asg1",
          { entryIds: ["ok", "already"] },
          member,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(db.engagementTimesheetEntry.update).not.toHaveBeenCalled();
    });

    it("submits nothing when one entry has zero hours", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({ id: "ok" }),
        entry({ id: "empty", hoursWorked: decimal("0") }),
      ]);

      await expect(
        service.submitEntries(
          "eng1",
          "asg1",
          { entryIds: ["ok", "empty"] },
          member,
        ),
      ).rejects.toThrow(/nothing was submitted/);
      expect(db.engagementTimesheetEntry.update).not.toHaveBeenCalled();
    });

    it("404s when an entry id belongs to another assignment", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([]);

      await expect(
        service.submitEntries(
          "eng1",
          "asg1",
          { entryIds: ["someone-elses"] },
          member,
        ),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("requires an override reason when an administrator submits on a member's behalf", async () => {
      await expect(
        service.submitEntries("eng1", "asg1", { entryIds: ["entry1"] }, admin),
      ).rejects.toThrow("override reason is required");
    });

    it("refuses a manager", async () => {
      withManagerRow();

      await expect(
        service.submitEntries(
          "eng1",
          "asg1",
          { entryIds: ["entry1"] },
          manager,
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe("approveEntries", () => {
    const approvalPayload = {
      entryIds: ["entry1", "entry2"],
      approvalComment: "Approved for week 37",
    } as never;

    /**
     * Mirrors the conditional update: whatever is still SUBMITTED gets this call's approvedAt, and
     * anything another manager already took keeps theirs.
     */
    const stageApproval = (
      submittedIds: string[],
      takenByOther: Array<{ id: string; handle: string }> = [],
    ) => {
      withManagerRow();
      db.engagementTimesheetEntry.findMany.mockImplementation(
        ({ where }: any) => {
          const requested: string[] = where.id.in;
          if (where.engagementAssignmentId) {
            return Promise.resolve(
              requested.map((id) =>
                entry({ id, status: TimesheetEntryStatus.SUBMITTED }),
              ),
            );
          }

          // Post-update read inside the transaction.
          return Promise.resolve(
            requested.map((id) => {
              const taken = takenByOther.find((row) => row.id === id);
              if (taken) {
                return entry({
                  id,
                  status: TimesheetEntryStatus.APPROVED,
                  approvedByHandle: taken.handle,
                  approvedAt: utcDate("2026-09-12"),
                });
              }

              return submittedIds.includes(id)
                ? entry({
                    id,
                    status: TimesheetEntryStatus.APPROVED,
                    approvedByHandle: "maryj",
                    approvedAt: db.approvedAt,
                  })
                : entry({ id, status: TimesheetEntryStatus.DRAFT });
            }),
          );
        },
      );
      db.engagementTimesheetEntry.updateMany.mockImplementation(
        ({ data }: any) => {
          db.approvedAt = data.approvedAt;
          return Promise.resolve({ count: submittedIds.length });
        },
      );
    };

    it("approves submitted entries under a status guard and records the comment", async () => {
      stageApproval(["entry1", "entry2"]);

      const result = await service.approveEntries(
        "eng1",
        "asg1",
        approvalPayload,
        manager,
      );

      expect(db.engagementTimesheetEntry.updateMany).toHaveBeenCalledWith({
        where: {
          id: { in: ["entry1", "entry2"] },
          engagementAssignmentId: "asg1",
          status: TimesheetEntryStatus.SUBMITTED,
        },
        data: expect.objectContaining({
          status: TimesheetEntryStatus.APPROVED,
          approvedBy: "2002",
          approvedByHandle: "maryj",
          approvalComment: "Approved for week 37",
        }),
      });
      expect(result.approved).toEqual(["entry1", "entry2"]);
      expect(result.skipped).toEqual([]);
      expect(audit.record).toHaveBeenCalledWith(
        db,
        expect.objectContaining({
          action: TimesheetAuditAction.APPROVED,
          comment: "Approved for week 37",
        }),
      );
      expect(events.emit).toHaveBeenCalledWith(
        TimesheetEventTopics.Approved,
        expect.objectContaining({ entryIds: ["entry1", "entry2"] }),
      );
    });

    it("reports entries another manager already approved instead of failing the batch", async () => {
      stageApproval(["entry1"], [{ id: "entry2", handle: "robertl" }]);

      const result = await service.approveEntries(
        "eng1",
        "asg1",
        approvalPayload,
        manager,
      );

      expect(result.approved).toEqual(["entry1"]);
      expect(result.skipped).toEqual([
        {
          id: "entry2",
          currentStatus: TimesheetEntryStatus.APPROVED,
          approvedByHandle: "robertl",
        },
      ]);
      // Only the entries this call actually approved are audited.
      expect(audit.record).toHaveBeenCalledTimes(1);
    });

    it("refuses the assignee", async () => {
      await expect(
        service.approveEntries("eng1", "asg1", approvalPayload, member),
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(db.engagementTimesheetEntry.updateMany).not.toHaveBeenCalled();
    });

    it("404s for a manager of a different engagement", async () => {
      db.engagementManager.findFirst.mockResolvedValue(null);

      await expect(
        service.approveEntries("eng1", "asg1", approvalPayload, manager),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("requires an override reason when an administrator approves", async () => {
      await expect(
        service.approveEntries("eng1", "asg1", approvalPayload, admin),
      ).rejects.toThrow("override reason is required");
    });

    it("records both the comment and the override reason for an administrator", async () => {
      stageApproval(["entry1", "entry2"]);

      await service.approveEntries(
        "eng1",
        "asg1",
        { ...(approvalPayload as any), overrideReason: "Manager on leave" },
        admin,
      );

      expect(audit.record).toHaveBeenCalledWith(
        db,
        expect.objectContaining({
          comment: "Approved for week 37 (override: Manager on leave)",
          actorRole: "ADMINISTRATOR",
        }),
      );
    });
  });

  describe("reopenEntries", () => {
    const reopenPayload = {
      entryIds: ["entry1"],
      overrideReason: "Wrong hours reported",
    } as never;

    it("returns an approved entry to draft, sets reopenedAt, and clears the approval", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({
          status: TimesheetEntryStatus.APPROVED,
          approvedByHandle: "maryj",
          approvalComment: "Approved for week 37",
        }),
      ]);
      db.engagementTimesheetEntry.update.mockResolvedValue(
        entry({ status: TimesheetEntryStatus.DRAFT, reopenedAt: new Date() }),
      );

      await service.reopenEntries("eng1", "asg1", reopenPayload, admin);

      expect(db.engagementTimesheetEntry.update).toHaveBeenCalledWith({
        where: { id: "entry1" },
        data: expect.objectContaining({
          status: TimesheetEntryStatus.DRAFT,
          approvedAt: null,
          approvedBy: null,
          approvedByHandle: null,
          approvalComment: null,
        }),
      });
      expect(
        db.engagementTimesheetEntry.update.mock.calls[0][0].data.reopenedAt,
      ).toBeInstanceOf(Date);
      expect(audit.record).toHaveBeenCalledWith(
        db,
        expect.objectContaining({
          action: TimesheetAuditAction.REOPENED,
          comment: "Wrong hours reported",
          previousValues: expect.objectContaining({
            approvedByHandle: "maryj",
          }),
        }),
      );
      expect(events.emit).toHaveBeenCalledWith(
        TimesheetEventTopics.Reopened,
        expect.objectContaining({ entryIds: ["entry1"] }),
      );
    });

    it("refuses a manager", async () => {
      withManagerRow();

      await expect(
        service.reopenEntries("eng1", "asg1", reopenPayload, manager),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it("refuses the assignee", async () => {
      await expect(
        service.reopenEntries("eng1", "asg1", reopenPayload, member),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it("rejects an entry that was never approved", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([entry()]);

      await expect(
        service.reopenEntries("eng1", "asg1", reopenPayload, admin),
      ).rejects.toThrow("Only approved timesheet entries can be reopened");
      expect(db.engagementTimesheetEntry.update).not.toHaveBeenCalled();
    });
  });

  describe("findPaymentSummary", () => {
    const approved = (overrides: Record<string, unknown> = {}) =>
      entry({ status: TimesheetEntryStatus.APPROVED, ...overrides });

    beforeEach(() => {
      db.engagementAssignment.findUnique.mockResolvedValue({
        ...assignment,
        ratePerHour: "45.00",
      });
    });

    it("totals approved hours exactly and reports the rate", async () => {
      withManagerRow();
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        approved({ id: "e1", hoursWorked: decimal("8.50") }),
        approved({ id: "e2", hoursWorked: decimal("8.50") }),
        approved({ id: "e3", hoursWorked: decimal("8.50") }),
        approved({ id: "e4", hoursWorked: decimal("8.50") }),
        approved({ id: "e5", hoursWorked: decimal("8.50") }),
        approved({ id: "e6", hoursWorked: decimal("8.50") }),
      ]);

      const result = await service.findPaymentSummary(
        "eng1",
        "asg1",
        { fromDate: "2026-09-01", toDate: "2026-09-30" },
        manager,
      );

      // Six times 8.5 is exactly 51, not 50.999...
      expect(result.totalHours).toBe("51.00");
      expect(result.totalDays).toBe(6);
      expect(result.ratePerHour).toBe("45.00");
      expect(result.entryIds).toHaveLength(6);
      expect(result.alreadyPaidEntryIds).toEqual([]);
    });

    it("asks the database for approved entries only", async () => {
      withManagerRow();
      db.engagementTimesheetEntry.findMany.mockResolvedValue([]);

      await service.findPaymentSummary("eng1", "asg1", {}, manager);

      const { where } = db.engagementTimesheetEntry.findMany.mock.calls[0][0];
      expect(where.status).toBe(TimesheetEntryStatus.APPROVED);
    });

    it("excludes already-paid entries from the totals and reports them separately", async () => {
      withManagerRow();
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        approved({ id: "unpaid", hoursWorked: decimal("8.00") }),
        approved({
          id: "paid",
          hoursWorked: decimal("8.00"),
          paidPaymentReference: "win-1",
        }),
      ]);

      const result = await service.findPaymentSummary(
        "eng1",
        "asg1",
        {},
        manager,
      );

      expect(result.totalDays).toBe(1);
      expect(result.totalHours).toBe("8.00");
      expect(result.entryIds).toEqual(["unpaid"]);
      expect(result.alreadyPaidEntryIds).toEqual(["paid"]);
    });

    it("refuses the assignee", async () => {
      await expect(
        service.findPaymentSummary("eng1", "asg1", {}, member),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it("rejects an inverted range", async () => {
      withManagerRow();

      await expect(
        service.findPaymentSummary(
          "eng1",
          "asg1",
          { fromDate: "2026-09-30", toDate: "2026-09-01" },
          manager,
        ),
      ).rejects.toThrow("cannot be earlier than the from date");
    });
  });

  describe("linkPayment", () => {
    const linkDto = { entryIds: ["e1"], paymentReference: "win-1" } as never;

    beforeEach(() => {
      db.engagementTimesheetEntry.updateMany.mockResolvedValue({ count: 1 });
    });

    it("stamps the payment reference and audits it", async () => {
      withManagerRow();
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({ id: "e1", status: TimesheetEntryStatus.APPROVED }),
      ]);

      const result = await service.linkPayment(
        "eng1",
        "asg1",
        linkDto,
        manager,
      );

      expect(db.engagementTimesheetEntry.updateMany).toHaveBeenCalledWith({
        where: { id: "e1", paidPaymentReference: null },
        data: expect.objectContaining({ paidPaymentReference: "win-1" }),
      });
      expect(audit.record).toHaveBeenCalledWith(
        db,
        expect.objectContaining({
          action: TimesheetAuditAction.PAYMENT_LINKED,
          comment: "Payment win-1",
        }),
      );
      expect(result).toEqual([
        expect.objectContaining({
          id: "e1",
          hoursWorked: "8.50",
          paymentReference: "win-1",
        }),
      ]);
    });

    it("links nothing when one entry was already paid", async () => {
      withManagerRow();
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({ id: "e1", status: TimesheetEntryStatus.APPROVED }),
        entry({
          id: "e2",
          status: TimesheetEntryStatus.APPROVED,
          paidPaymentReference: "win-0",
        }),
      ]);

      await expect(
        service.linkPayment(
          "eng1",
          "asg1",
          { entryIds: ["e1", "e2"], paymentReference: "win-1" },
          manager,
        ),
      ).rejects.toBeInstanceOf(ConflictException);
      expect(db.engagementTimesheetEntry.updateMany).not.toHaveBeenCalled();
    });

    it("links nothing when one entry is not approved", async () => {
      withManagerRow();
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({ id: "e1", status: TimesheetEntryStatus.APPROVED }),
        entry({ id: "e2", status: TimesheetEntryStatus.SUBMITTED }),
      ]);

      await expect(
        service.linkPayment(
          "eng1",
          "asg1",
          { entryIds: ["e1", "e2"], paymentReference: "win-1" },
          manager,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(db.engagementTimesheetEntry.updateMany).not.toHaveBeenCalled();
    });

    it("refuses a payment that raced another for the same entry", async () => {
      withManagerRow();
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({ id: "e1", status: TimesheetEntryStatus.APPROVED }),
      ]);
      // The guarded update finds nothing: someone else claimed the entry in between.
      db.engagementTimesheetEntry.updateMany.mockResolvedValue({ count: 0 });

      await expect(
        service.linkPayment("eng1", "asg1", linkDto, manager),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it("refuses the assignee", async () => {
      await expect(
        service.linkPayment("eng1", "asg1", linkDto, member),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it("404s for an entry on another assignment", async () => {
      withManagerRow();
      db.engagementTimesheetEntry.findMany.mockResolvedValue([]);

      await expect(
        service.linkPayment("eng1", "asg1", linkDto, manager),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe("findEntriesByPaymentReference", () => {
    it("lists the entries a payment consumed", async () => {
      withManagerRow();
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({
          id: "e1",
          status: TimesheetEntryStatus.APPROVED,
          paidPaymentReference: "win-1",
          paidAt: utcDate("2026-09-20"),
        }),
      ]);

      const result = await service.findEntriesByPaymentReference(
        "eng1",
        "asg1",
        "win-1",
        manager,
      );

      expect(db.engagementTimesheetEntry.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            engagementAssignmentId: "asg1",
            paidPaymentReference: "win-1",
          },
        }),
      );
      expect(result).toEqual([
        expect.objectContaining({ id: "e1", paymentReference: "win-1" }),
      ]);
    });

    it("refuses the assignee", async () => {
      await expect(
        service.findEntriesByPaymentReference("eng1", "asg1", "win-1", member),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe("findEntryAudit", () => {
    const auditRow = {
      id: "audit-1",
      action: TimesheetAuditAction.ADMIN_OVERRIDE,
      previousValues: { hoursWorked: "8.00", status: "APPROVED" },
      updatedValues: { hoursWorked: "9.00", status: "APPROVED" },
      actorUserId: "3003",
      actorHandle: "adminuser",
      actorRole: "ADMINISTRATOR",
      comment: "Payroll correction",
      createdAt: utcDate("2026-09-14"),
    };

    beforeEach(() => {
      db.engagementTimesheetAudit = {
        findMany: jest.fn().mockResolvedValue([auditRow]),
      };
      db.engagementTimesheetEntry.findMany.mockResolvedValue([entry()]);
    });

    it("returns an entry's history newest first for an administrator", async () => {
      const result = await service.findEntryAudit(
        "eng1",
        "asg1",
        "entry1",
        admin,
      );

      expect(db.engagementTimesheetAudit.findMany).toHaveBeenCalledWith({
        where: { timesheetEntryId: "entry1" },
        orderBy: { createdAt: "desc" },
      });
      expect(result).toEqual([
        expect.objectContaining({
          action: TimesheetAuditAction.ADMIN_OVERRIDE,
          actorHandle: "adminuser",
          actorRole: "ADMINISTRATOR",
          comment: "Payroll correction",
          previousValues: { hoursWorked: "8.00", status: "APPROVED" },
        }),
      ]);
    });

    it("refuses an assigned manager", async () => {
      withManagerRow();

      await expect(
        service.findEntryAudit("eng1", "asg1", "entry1", manager),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it("refuses the assignee", async () => {
      await expect(
        service.findEntryAudit("eng1", "asg1", "entry1", member),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it("404s for an entry on another assignment", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([]);

      await expect(
        service.findEntryAudit("eng1", "asg1", "someone-elses", admin),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe("findEngagements", () => {
    const assignmentRow = (overrides: Record<string, unknown> = {}) => ({
      id: "asg1",
      engagementId: "eng1",
      memberId: "1001",
      memberHandle: "johnsmith",
      engagement: { id: "eng1", title: "Senior Frontend Engineer" },
      ...overrides,
    });

    it("restricts a manager to engagements where they hold live authority", async () => {
      db.engagementAssignment.count.mockResolvedValue(1);
      db.engagementAssignment.findMany.mockResolvedValue([assignmentRow()]);

      const result = await service.findEngagements(
        { page: 1, perPage: 20 },
        manager,
      );

      const { where } = db.engagementAssignment.findMany.mock.calls[0][0];
      expect(where.engagement.managers.some).toEqual({
        managerUserId: "2002",
        removedAt: null,
      });
      expect(result.data[0].viewerRole).toBe(TimesheetViewerRole.Manager);
      expect(result.meta).toEqual({
        page: 1,
        perPage: 20,
        totalCount: 1,
        totalPages: 1,
        // The caller's role rides along so a client never has to infer it.
        viewerRole: TimesheetViewerRole.Manager,
      });
    });

    it("does not restrict an administrator by manager authority", async () => {
      db.engagementAssignment.count.mockResolvedValue(1);
      db.engagementAssignment.findMany.mockResolvedValue([assignmentRow()]);

      const result = await service.findEngagements(
        { page: 1, perPage: 20 },
        admin,
      );

      const { where } = db.engagementAssignment.findMany.mock.calls[0][0];
      expect(where.engagement).toBeUndefined();
      expect(result.data[0].viewerRole).toBe(TimesheetViewerRole.Administrator);
    });

    it("returns one row per assignee with names resolved in one batch", async () => {
      db.engagementAssignment.count.mockResolvedValue(2);
      db.engagementAssignment.findMany.mockResolvedValue([
        assignmentRow(),
        assignmentRow({
          id: "asg2",
          memberId: "1002",
          memberHandle: "janedoe",
        }),
      ]);
      memberService.getMemberNamesByUserIds.mockResolvedValue(
        new Map([
          ["1001", "John Smith"],
          ["1002", "Jane Doe"],
        ]),
      );

      const result = await service.findEngagements(
        { page: 1, perPage: 20 },
        admin,
      );

      expect(result.data.map((row) => row.assigneeName)).toEqual([
        "John Smith",
        "Jane Doe",
      ]);
      expect(memberService.getMemberNamesByUserIds).toHaveBeenCalledTimes(1);
    });

    it("rolls up status from one grouped query rather than a query per assignee", async () => {
      db.engagementAssignment.count.mockResolvedValue(2);
      db.engagementAssignment.findMany.mockResolvedValue([
        assignmentRow(),
        assignmentRow({ id: "asg2", memberHandle: "janedoe" }),
      ]);
      db.engagementTimesheetEntry.groupBy.mockResolvedValue([
        { engagementAssignmentId: "asg1", _count: { _all: 3 } },
      ]);

      const result = await service.findEngagements(
        { page: 1, perPage: 20 },
        admin,
      );

      expect(db.engagementTimesheetEntry.groupBy).toHaveBeenCalledTimes(1);
      expect(result.data.map((row) => row.timesheetStatus)).toEqual([
        TimesheetRollupStatus.PendingApproval,
        TimesheetRollupStatus.Approved,
      ]);
    });

    it("applies every administrator filter", async () => {
      db.engagementAssignment.count.mockResolvedValue(0);

      await service.findEngagements(
        {
          page: 1,
          perPage: 20,
          title: "Frontend",
          assignee: "johnsmith",
          manager: "maryj",
          status: TimesheetRollupStatus.PendingApproval,
          fromDate: "2026-09-01",
          toDate: "2026-09-30",
        },
        admin,
      );

      const { where } = db.engagementAssignment.findMany.mock.calls[0][0];
      expect(where.engagement.title).toEqual({
        contains: "Frontend",
        mode: "insensitive",
      });
      expect(where.engagement.managers.some).toEqual(
        expect.objectContaining({
          managerHandle: { contains: "maryj", mode: "insensitive" },
          removedAt: null,
        }),
      );
      expect(where.memberHandle).toEqual({
        contains: "johnsmith",
        mode: "insensitive",
      });
      expect(where.timesheetEntries.some).toEqual(
        expect.objectContaining({ status: TimesheetEntryStatus.SUBMITTED }),
      );
      expect(where.timesheetEntries.some.workDate).toEqual({
        gte: utcDate("2026-09-01"),
        lte: utcDate("2026-09-30"),
      });
    });

    it("limits rows to assignments that are active or already have entries", async () => {
      db.engagementAssignment.count.mockResolvedValue(0);

      await service.findEngagements({ page: 1, perPage: 20 }, admin);

      const { where } = db.engagementAssignment.findMany.mock.calls[0][0];
      expect(where.OR).toEqual([
        {
          status: {
            in: [AssignmentStatus.SELECTED, AssignmentStatus.ASSIGNED],
          },
        },
        { timesheetEntries: { some: {} } },
      ]);
    });

    it("refuses a caller who is neither an administrator nor identifiable", async () => {
      await expect(
        service.findEngagements(
          { page: 1, perPage: 20 },
          {
            isMachine: true,
            scopes: ["read:timesheets"],
          },
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
});
