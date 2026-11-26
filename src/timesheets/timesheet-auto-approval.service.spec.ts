import {
  Prisma,
  TimesheetAuditAction,
  TimesheetEntryStatus,
} from "@prisma/client";
import { TimesheetAutoApprovalService } from "./timesheet-auto-approval.service";

import {
  TIMESHEET_AUTO_APPROVAL_COMMENT,
  TimesheetEventTopics,
} from "./timesheet-constants";

// The audit service pulls in nanoid, which ships as ESM only.
jest.mock("nanoid", () => ({ nanoid: () => "test-id" }));

const utcDate = (value: string) => new Date(`${value}T00:00:00.000Z`);
const decimal = (value: string) => new Prisma.Decimal(value);

// Wednesday 2026-09-16, 10:00 UTC. The submissions below were made 7+ days earlier.
const NOW = new Date("2026-09-16T10:00:00.000Z");
const SUBMITTED_AT = new Date("2026-09-08T18:00:00.000Z");

const assignment = {
  id: "asg1",
  engagementId: "eng1",
  memberId: "1001",
  memberHandle: "johns",
  standardHoursPerDay: 8,
  standardHoursPerWeek: null,
  startDate: utcDate("2026-09-01"),
  endDate: utcDate("2026-12-31"),
  engagement: { id: "eng1", title: "Senior Frontend Engineer" },
};

const entry = (overrides: Record<string, unknown> = {}) => ({
  id: "entry1",
  engagementAssignmentId: "asg1",
  workDate: utcDate("2026-09-07"),
  hoursWorked: decimal("8.00"),
  status: TimesheetEntryStatus.SUBMITTED,
  submittedAt: SUBMITTED_AT,
  assignment,
  ...overrides,
});

/** Monday to Friday of the week of 2026-09-07, 8 hours a day: exactly the expected 40 hours. */
const fullWeek = () =>
  ["07", "08", "09", "10", "11"].map((day, index) =>
    entry({ id: `entry${index + 1}`, workDate: utcDate(`2026-09-${day}`) }),
  );

describe("TimesheetAutoApprovalService", () => {
  let db: any;
  let access: any;
  let audit: any;
  let events: any;
  let config: Record<string, string | undefined>;
  let schedulerRegistry: any;
  let service: TimesheetAutoApprovalService;

  beforeEach(() => {
    db = {
      engagementTimesheetEntry: {
        findMany: jest.fn().mockResolvedValue(fullWeek()),
        updateMany: jest.fn().mockResolvedValue({ count: 5 }),
      },
      $transaction: jest.fn((callback: (tx: unknown) => unknown) =>
        Promise.resolve(callback(db)),
      ),
    };
    access = {
      findActiveManagers: jest
        .fn()
        .mockResolvedValue(
          new Map([
            ["eng1", [{ userId: "2002", handle: "maryj", name: null }]],
          ]),
        ),
    };
    audit = { record: jest.fn().mockResolvedValue(undefined) };
    events = { emit: jest.fn().mockResolvedValue(undefined) };
    config = {};
    schedulerRegistry = { addCronJob: jest.fn() };

    service = new TimesheetAutoApprovalService(
      db,
      access,
      audit,
      events,
      { get: jest.fn((key: string) => config[key]) } as any,
      schedulerRegistry,
    );
  });

  it("only looks at entries submitted at least 7 days ago, since 24 November 2026", async () => {
    await service.run(NOW);

    expect(db.engagementTimesheetEntry.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          status: TimesheetEntryStatus.SUBMITTED,
          submittedAt: {
            gte: new Date("2026-11-24T00:00:00.000Z"),
            lte: new Date("2026-09-09T10:00:00.000Z"),
          },
        },
      }),
    );
  });

  it("honours a configured start date", async () => {
    config.TIMESHEET_AUTO_APPROVAL_START_DATE = " 2026-09-01 ";

    await service.run(NOW);

    expect(
      db.engagementTimesheetEntry.findMany.mock.calls[0][0].where.submittedAt
        .gte,
    ).toEqual(new Date("2026-09-01T00:00:00.000Z"));
  });

  it.each(["24/11/2026", "2026-02-30", "soon"])(
    "falls back to 24 November 2026 for the unreadable start date %p",
    async (startDate) => {
      config.TIMESHEET_AUTO_APPROVAL_START_DATE = startDate;

      await service.run(NOW);

      expect(
        db.engagementTimesheetEntry.findMany.mock.calls[0][0].where.submittedAt
          .gte,
      ).toEqual(new Date("2026-11-24T00:00:00.000Z"));
    },
  );

  it("honours a configured pending period", async () => {
    config.TIMESHEET_AUTO_APPROVAL_PENDING_DAYS = "1";

    await service.run(NOW);

    expect(
      db.engagementTimesheetEntry.findMany.mock.calls[0][0].where.submittedAt,
    ).toEqual({
      gte: new Date("2026-11-24T00:00:00.000Z"),
      lte: new Date("2026-09-15T10:00:00.000Z"),
    });
  });

  it("approves a submission within its expected hours as the system, audits it and emails", async () => {
    const result = await service.run(NOW);

    expect(result).toEqual(
      expect.objectContaining({
        considered: 1,
        approvedSubmissions: 1,
        approvedEntries: 5,
      }),
    );
    expect(db.engagementTimesheetEntry.updateMany).toHaveBeenCalledWith({
      where: {
        id: { in: ["entry1", "entry2", "entry3", "entry4", "entry5"] },
        status: TimesheetEntryStatus.SUBMITTED,
        submittedAt: SUBMITTED_AT,
      },
      data: expect.objectContaining({
        status: TimesheetEntryStatus.APPROVED,
        approvedBy: "system",
        approvedByHandle: "System",
        approvalComment: TIMESHEET_AUTO_APPROVAL_COMMENT,
      }),
    });
    expect(audit.record).toHaveBeenCalledTimes(5);
    expect(audit.record).toHaveBeenCalledWith(
      db,
      expect.objectContaining({
        timesheetEntryId: "entry1",
        action: TimesheetAuditAction.APPROVED,
        actorUserId: "system",
        actorHandle: "System",
        actorRole: "SYSTEM",
        comment: TIMESHEET_AUTO_APPROVAL_COMMENT,
      }),
    );
    expect(events.emit).toHaveBeenCalledWith(
      TimesheetEventTopics.AutoApproved,
      {
        engagementId: "eng1",
        engagementTitle: "Senior Frontend Engineer",
        assignmentId: "asg1",
        memberId: "1001",
        memberHandle: "johns",
        actorUserId: "system",
        actorHandle: "System",
        actorRole: "SYSTEM",
        entryIds: ["entry1", "entry2", "entry3", "entry4", "entry5"],
        workDates: [
          "2026-09-07",
          "2026-09-08",
          "2026-09-09",
          "2026-09-10",
          "2026-09-11",
        ],
        totalHours: "40.00",
        comment: TIMESHEET_AUTO_APPROVAL_COMMENT,
      },
    );
  });

  it("approves a submission under its expected hours", async () => {
    db.engagementTimesheetEntry.findMany.mockResolvedValue([
      entry({ hoursWorked: decimal("6.00") }),
    ]);
    db.engagementTimesheetEntry.updateMany.mockResolvedValue({ count: 1 });

    const result = await service.run(NOW);

    expect(result.approvedSubmissions).toBe(1);
  });

  it("leaves a submission over its expected hours for a manager", async () => {
    const week = fullWeek();
    week[4] = entry({
      id: "entry5",
      workDate: utcDate("2026-09-11"),
      hoursWorked: decimal("8.25"),
    });
    db.engagementTimesheetEntry.findMany.mockResolvedValue(week);

    const result = await service.run(NOW);

    expect(result.approvedSubmissions).toBe(0);
    expect(result.skipped["over-expected-hours"]).toBe(1);
    expect(db.engagementTimesheetEntry.updateMany).not.toHaveBeenCalled();
    expect(events.emit).not.toHaveBeenCalled();
  });

  it("expects no hours on a weekend, so weekend-only work is left for a manager", async () => {
    db.engagementTimesheetEntry.findMany.mockResolvedValue([
      entry({ workDate: utcDate("2026-09-12"), hoursWorked: decimal("4.00") }),
    ]);

    const result = await service.run(NOW);

    expect(result.skipped["over-expected-hours"]).toBe(1);
  });

  it("leaves a submission for an engagement with no manager", async () => {
    access.findActiveManagers.mockResolvedValue(new Map());

    const result = await service.run(NOW);

    expect(result.skipped["no-manager"]).toBe(1);
    expect(db.engagementTimesheetEntry.updateMany).not.toHaveBeenCalled();
  });

  it("leaves a submission that includes a future work date", async () => {
    db.engagementTimesheetEntry.findMany.mockResolvedValue([
      entry({ id: "entry1", workDate: utcDate("2026-09-16") }),
      entry({ id: "entry2", workDate: utcDate("2026-09-17") }),
    ]);

    const result = await service.run(NOW);

    expect(result.skipped["future-dates"]).toBe(1);
    expect(db.engagementTimesheetEntry.updateMany).not.toHaveBeenCalled();
  });

  it("approves a submission whose last day is today", async () => {
    db.engagementTimesheetEntry.findMany.mockResolvedValue([
      entry({ workDate: utcDate("2026-09-16") }),
    ]);
    db.engagementTimesheetEntry.updateMany.mockResolvedValue({ count: 1 });

    const result = await service.run(NOW);

    expect(result.approvedSubmissions).toBe(1);
  });

  it("leaves a submission when the assignment has no standard hours", async () => {
    const noStandard = {
      ...assignment,
      standardHoursPerDay: null,
      standardHoursPerWeek: null,
    };
    db.engagementTimesheetEntry.findMany.mockResolvedValue([
      entry({ assignment: noStandard }),
    ]);

    const result = await service.run(NOW);

    expect(result.skipped["no-expected-hours"]).toBe(1);
  });

  it("judges each submission on its own", async () => {
    const laterSubmission = new Date("2026-09-09T08:00:00.000Z");
    db.engagementTimesheetEntry.findMany.mockResolvedValue([
      entry({ id: "a1", workDate: utcDate("2026-09-07") }),
      entry({
        id: "b1",
        workDate: utcDate("2026-09-08"),
        hoursWorked: decimal("12.00"),
        submittedAt: laterSubmission,
      }),
    ]);
    db.engagementTimesheetEntry.updateMany.mockResolvedValue({ count: 1 });

    const result = await service.run(NOW);

    expect(result).toEqual(
      expect.objectContaining({
        considered: 2,
        approvedSubmissions: 1,
        approvedEntries: 1,
      }),
    );
    expect(result.skipped["over-expected-hours"]).toBe(1);
    expect(db.engagementTimesheetEntry.updateMany).toHaveBeenCalledTimes(1);
    expect(
      db.engagementTimesheetEntry.updateMany.mock.calls[0][0].where.id,
    ).toEqual({ in: ["a1"] });
  });

  it("skips without auditing or emailing when a manager acted on the submission meanwhile", async () => {
    db.engagementTimesheetEntry.updateMany.mockResolvedValue({ count: 3 });

    const result = await service.run(NOW);

    expect(result.skipped["changed-meanwhile"]).toBe(1);
    expect(audit.record).not.toHaveBeenCalled();
    expect(events.emit).not.toHaveBeenCalled();
  });

  it("keeps going after one submission fails", async () => {
    db.engagementTimesheetEntry.findMany.mockResolvedValue([
      entry({ id: "a1" }),
      entry({
        id: "b1",
        workDate: utcDate("2026-09-08"),
        submittedAt: new Date("2026-09-09T08:00:00.000Z"),
      }),
    ]);
    db.engagementTimesheetEntry.updateMany
      .mockRejectedValueOnce(new Error("connection reset"))
      .mockResolvedValueOnce({ count: 1 });

    const result = await service.run(NOW);

    expect(result.skipped.failed).toBe(1);
    expect(result.approvedSubmissions).toBe(1);
  });

  it("does nothing when nothing has waited long enough", async () => {
    db.engagementTimesheetEntry.findMany.mockResolvedValue([]);

    const result = await service.run(NOW);

    expect(result.considered).toBe(0);
    expect(access.findActiveManagers).not.toHaveBeenCalled();
  });

  describe("scheduling", () => {
    it("is not scheduled unless enabled", () => {
      service.onModuleInit();

      expect(schedulerRegistry.addCronJob).not.toHaveBeenCalled();
    });

    it("schedules the daily run when enabled", () => {
      config.TIMESHEET_AUTO_APPROVAL_ENABLED = "true";

      service.onModuleInit();

      expect(schedulerRegistry.addCronJob).toHaveBeenCalledWith(
        "timesheet-auto-approval",
        expect.anything(),
      );
      const job = schedulerRegistry.addCronJob.mock.calls[0][1];
      job.stop();
    });
  });
});
