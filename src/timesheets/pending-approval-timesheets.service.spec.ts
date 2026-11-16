import {
  BadRequestException,
  ForbiddenException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { Prisma, TimesheetEntryStatus } from "@prisma/client";
import { Scopes, UserRoles } from "../app-constants";
import { PendingApprovalTimesheetsService } from "./pending-approval-timesheets.service";
import { TimesheetAccessService } from "./timesheet-access.service";

const decimal = (value: string | number) => new Prisma.Decimal(value);
const utcDate = (value: string) => new Date(`${value}T00:00:00.000Z`);

describe("PendingApprovalTimesheetsService", () => {
  let service: PendingApprovalTimesheetsService;
  let db: any;
  let access: TimesheetAccessService;
  let emailService: {
    isApprovalReminderConfigured: jest.Mock;
    sendApprovalReminderEmail: jest.Mock;
  };

  const admin = {
    userId: "3003",
    handle: "adminuser",
    roles: [UserRoles.Admin],
  };
  const talentManager = {
    userId: "4004",
    handle: "tmuser",
    roles: [UserRoles.TalentManager],
  };

  const firstSubmission = new Date("2026-10-10T09:00:00.000Z");
  const secondSubmission = new Date("2026-10-17T09:00:00.000Z");

  const assignment = (overrides: Record<string, unknown> = {}) => ({
    id: "asg1",
    engagementId: "eng1",
    memberId: "1001",
    memberHandle: "johnsmith",
    engagement: { title: "Senior Frontend Engineer", projectId: "100" },
    ...overrides,
  });

  const entry = (overrides: Record<string, unknown> = {}) => ({
    id: "entry1",
    workDate: utcDate("2026-10-05"),
    hoursWorked: decimal("8.00"),
    submittedAt: firstSubmission,
    submittedBy: "1001",
    assignment: assignment(),
    ...overrides,
  });

  const managers = new Map([
    [
      "eng1",
      [
        { userId: "2002", handle: "maryj", name: "Mary Jones" },
        { userId: "2003", handle: "petek", name: null },
      ],
    ],
    ["eng2", [{ userId: "2002", handle: "maryj", name: "Mary Jones" }]],
  ]);

  beforeEach(() => {
    db = {
      engagementTimesheetEntry: { findMany: jest.fn().mockResolvedValue([]) },
      engagementAssignment: { findMany: jest.fn().mockResolvedValue([]) },
      engagementManager: { findMany: jest.fn() },
    };
    access = new TimesheetAccessService(db);
    jest.spyOn(access, "findActiveManagers").mockResolvedValue(managers);
    emailService = {
      isApprovalReminderConfigured: jest.fn().mockReturnValue(true),
      sendApprovalReminderEmail: jest.fn().mockResolvedValue(true),
    };

    service = new PendingApprovalTimesheetsService(
      db,
      access,
      emailService as any,
    );
  });

  afterEach(() => {
    delete process.env.TEST_PROJECT_IDS;
  });

  describe("findPendingApprovals", () => {
    it("groups submitted entries into one row per submission with the engagement's managers", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({ id: "e1", workDate: utcDate("2026-10-05") }),
        entry({
          id: "e2",
          workDate: utcDate("2026-10-06"),
          hoursWorked: decimal("7.25"),
        }),
        entry({
          id: "e3",
          workDate: utcDate("2026-10-12"),
          submittedAt: secondSubmission,
        }),
      ]);

      const result = await service.findPendingApprovals(
        { page: 1, perPage: 20 },
        admin,
      );

      expect(result.meta).toEqual({
        page: 1,
        perPage: 20,
        totalCount: 2,
        totalPages: 1,
      });
      expect(result.data[0]).toEqual({
        id: `asg1:${firstSubmission.toISOString()}:1001`,
        engagementId: "eng1",
        engagementTitle: "Senior Frontend Engineer",
        projectId: "100",
        assignmentId: "asg1",
        assigneeId: "1001",
        assigneeHandle: "johnsmith",
        workPeriodStart: "2026-10-05",
        workPeriodEnd: "2026-10-06",
        submittedAt: firstSubmission,
        hours: 15.25,
        entryIds: ["e1", "e2"],
        approvers: managers.get("eng1"),
      });
      expect(result.data[1]).toMatchObject({
        workPeriodStart: "2026-10-12",
        workPeriodEnd: "2026-10-12",
        submittedAt: secondSubmission,
        entryIds: ["e3"],
      });
      expect(db.engagementTimesheetEntry.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: TimesheetEntryStatus.SUBMITTED },
        }),
      );
    });

    it("returns no approvers for an engagement without managers", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({ assignment: assignment({ engagementId: "eng9" }) }),
      ]);

      const result = await service.findPendingApprovals(
        { page: 1, perPage: 20 },
        admin,
      );

      expect(result.data[0].approvers).toEqual([]);
    });

    it("filters by engagement title and work period", async () => {
      await service.findPendingApprovals(
        {
          engagement: "Frontend",
          fromDate: "2026-10-01",
          toDate: "2026-10-31",
          page: 1,
          perPage: 20,
        },
        admin,
      );

      expect(db.engagementTimesheetEntry.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            status: TimesheetEntryStatus.SUBMITTED,
            workDate: {
              gte: utcDate("2026-10-01"),
              lte: utcDate("2026-10-31"),
            },
            assignment: {
              engagement: {
                title: { contains: "Frontend", mode: "insensitive" },
              },
            },
          },
        }),
      );
    });

    it("leaves out test projects when asked", async () => {
      process.env.TEST_PROJECT_IDS = "999";

      await service.findPendingApprovals(
        { excludeTestProjects: true, page: 1, perPage: 20 },
        admin,
      );

      expect(db.engagementTimesheetEntry.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            status: TimesheetEntryStatus.SUBMITTED,
            assignment: { engagement: { projectId: { notIn: ["999"] } } },
          },
        }),
      );
    });

    it("rejects an inverted work period", async () => {
      await expect(
        service.findPendingApprovals(
          {
            fromDate: "2026-10-31",
            toDate: "2026-10-01",
            page: 1,
            perPage: 20,
          } as any,
          admin,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it("paginates the grouped rows", async () => {
      db.engagementTimesheetEntry.findMany.mockResolvedValue([
        entry({ id: "e1" }),
        entry({
          id: "e2",
          workDate: utcDate("2026-10-12"),
          submittedAt: secondSubmission,
        }),
      ]);

      const result = await service.findPendingApprovals(
        { page: 2, perPage: 1 },
        admin,
      );

      expect(result.meta).toEqual({
        page: 2,
        perPage: 1,
        totalCount: 2,
        totalPages: 2,
      });
      expect(result.data.map((row) => row.entryIds)).toEqual([["e2"]]);
    });

    it("allows a machine token with the manage scope", async () => {
      await expect(
        service.findPendingApprovals({ page: 1, perPage: 20 } as any, {
          isMachine: true,
          scopes: [Scopes.ManageTimesheets],
        }),
      ).resolves.toBeDefined();
    });

    it("refuses anyone who is not an administrator", async () => {
      await expect(
        service.findPendingApprovals(
          { page: 1, perPage: 20 } as any,
          talentManager,
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(db.engagementTimesheetEntry.findMany).not.toHaveBeenCalled();
    });
  });

  describe("sendReminders", () => {
    beforeEach(() => {
      db.engagementAssignment.findMany.mockResolvedValue([
        {
          id: "asg1",
          engagementId: "eng1",
          engagement: { title: "Senior Frontend Engineer" },
        },
        {
          id: "asg2",
          engagementId: "eng2",
          engagement: { title: "Data Engineer" },
        },
        {
          id: "asg3",
          engagementId: "eng3",
          engagement: { title: "Designer" },
        },
      ]);
    });

    it("emails each manager of the selected engagements once", async () => {
      emailService.sendApprovalReminderEmail.mockImplementation(
        (manager: { userId: string }) =>
          Promise.resolve(manager.userId !== "2003"),
      );

      const result = await service.sendReminders(
        { assignmentIds: ["asg1", "asg2", "asg3", "asg1", "stale"] },
        admin,
      );

      expect(db.engagementAssignment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: { in: ["asg1", "asg2", "asg3", "stale"] },
            timesheetEntries: {
              some: { status: TimesheetEntryStatus.SUBMITTED },
            },
          },
        }),
      );
      expect(access.findActiveManagers).toHaveBeenCalledWith([
        "eng1",
        "eng2",
        "eng3",
      ]);
      expect(emailService.sendApprovalReminderEmail).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        sentCount: 1,
        recipients: [
          { userId: "2002", handle: "maryj", sent: true },
          { userId: "2003", handle: "petek", sent: false },
        ],
        engagementsWithoutManagers: [
          { engagementId: "eng3", engagementTitle: "Designer" },
        ],
        skippedAssignmentIds: ["stale"],
      });
    });

    it("fails clearly when the reminder template is not configured", async () => {
      emailService.isApprovalReminderConfigured.mockReturnValue(false);

      await expect(
        service.sendReminders({ assignmentIds: ["asg1"] }, admin),
      ).rejects.toBeInstanceOf(ServiceUnavailableException);
      expect(emailService.sendApprovalReminderEmail).not.toHaveBeenCalled();
    });

    it("refuses anyone who is not an administrator", async () => {
      await expect(
        service.sendReminders({ assignmentIds: ["asg1"] }, talentManager),
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(emailService.sendApprovalReminderEmail).not.toHaveBeenCalled();
    });
  });
});
