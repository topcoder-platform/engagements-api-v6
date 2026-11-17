import {
  BadRequestException,
  ForbiddenException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { AssignmentStatus, TimesheetEntryStatus } from "@prisma/client";
import { UserRoles } from "../app-constants";
import { PendingSubmissionTimesheetsService } from "./pending-submission-timesheets.service";
import { TimesheetAccessService } from "./timesheet-access.service";

const utcDate = (value: string) => new Date(`${value}T00:00:00.000Z`);

describe("PendingSubmissionTimesheetsService", () => {
  let service: PendingSubmissionTimesheetsService;
  let db: any;
  let access: TimesheetAccessService;
  let emailService: {
    isSubmissionReminderConfigured: jest.Mock;
    sendSubmissionReminderEmail: jest.Mock;
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
  const period = { fromDate: "2026-11-09", toDate: "2026-11-13" };

  const assignment = (overrides: Record<string, unknown> = {}) => ({
    id: "asg1",
    engagementId: "eng1",
    memberId: "1001",
    memberHandle: "johnsmith",
    candidateWiproId: "john.smith@wipro.com",
    startDate: new Date("2026-09-01T10:00:00.000Z"),
    endDate: null,
    engagement: { title: "Senior Frontend Engineer", projectId: "100" },
    ...overrides,
  });

  const managers = new Map([
    ["eng1", [{ userId: "2002", handle: "maryj", name: "Mary Jones" }]],
  ]);

  const expectedPendingWhere = {
    status: AssignmentStatus.ASSIGNED,
    AND: [
      {
        OR: [{ startDate: null }, { startDate: { lt: utcDate("2026-11-14") } }],
      },
      { OR: [{ endDate: null }, { endDate: { gte: utcDate("2026-11-09") } }] },
    ],
    timesheetEntries: {
      none: {
        status: {
          in: [TimesheetEntryStatus.SUBMITTED, TimesheetEntryStatus.APPROVED],
        },
        workDate: { gte: utcDate("2026-11-09"), lte: utcDate("2026-11-13") },
      },
    },
  };

  beforeEach(() => {
    db = {
      engagementAssignment: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
      engagementManager: { findMany: jest.fn() },
    };
    access = new TimesheetAccessService(db);
    jest.spyOn(access, "findActiveManagers").mockResolvedValue(managers);
    emailService = {
      isSubmissionReminderConfigured: jest.fn().mockReturnValue(true),
      sendSubmissionReminderEmail: jest.fn().mockResolvedValue(true),
    };

    service = new PendingSubmissionTimesheetsService(
      db,
      access,
      emailService as any,
    );
  });

  afterEach(() => {
    delete process.env.TEST_PROJECT_IDS;
  });

  describe("findPendingSubmissions", () => {
    it("lists active assignments with nothing submitted in the period", async () => {
      db.engagementAssignment.findMany.mockResolvedValue([assignment()]);
      db.engagementAssignment.count.mockResolvedValue(1);

      const result = await service.findPendingSubmissions(
        { ...period, page: 1, perPage: 20 },
        admin,
      );

      expect(db.engagementAssignment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expectedPendingWhere,
          skip: 0,
          take: 20,
        }),
      );
      expect(db.engagementAssignment.count).toHaveBeenCalledWith({
        where: expectedPendingWhere,
      });
      expect(result).toEqual({
        data: [
          {
            id: "asg1",
            engagementId: "eng1",
            engagementTitle: "Senior Frontend Engineer",
            projectId: "100",
            assignmentId: "asg1",
            assigneeId: "1001",
            assigneeHandle: "johnsmith",
            workPeriodStart: "2026-11-09",
            workPeriodEnd: "2026-11-13",
            approvers: managers.get("eng1"),
          },
        ],
        meta: { page: 1, perPage: 20, totalCount: 1, totalPages: 1 },
      });
    });

    it("clips the work period to an assignment that starts or ends inside it", async () => {
      db.engagementAssignment.findMany.mockResolvedValue([
        assignment({
          startDate: new Date("2026-11-11T15:00:00.000Z"),
          endDate: new Date("2026-11-12T09:00:00.000Z"),
          engagementId: "eng9",
        }),
      ]);
      db.engagementAssignment.count.mockResolvedValue(1);

      const result = await service.findPendingSubmissions(
        { ...period, page: 1, perPage: 20 },
        admin,
      );

      expect(result.data[0]).toMatchObject({
        workPeriodStart: "2026-11-11",
        workPeriodEnd: "2026-11-12",
        approvers: [],
      });
    });

    it("filters by engagement title, hides test projects, and paginates", async () => {
      process.env.TEST_PROJECT_IDS = "999";

      await service.findPendingSubmissions(
        {
          ...period,
          engagement: "Frontend",
          excludeTestProjects: true,
          page: 3,
          perPage: 10,
        },
        admin,
      );

      expect(db.engagementAssignment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            ...expectedPendingWhere,
            engagement: {
              title: { contains: "Frontend", mode: "insensitive" },
              projectId: { notIn: ["999"] },
            },
          },
          skip: 20,
          take: 10,
        }),
      );
    });

    it.each([
      [{ fromDate: "2026-11-13", toDate: "2026-11-09" }],
      [{ fromDate: "2026-10-01", toDate: "2026-11-01" }],
      [{ fromDate: "not-a-date", toDate: "2026-11-01" }],
    ])("rejects the work period %p", async (range) => {
      await expect(
        service.findPendingSubmissions(
          { ...range, page: 1, perPage: 20 },
          admin,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(db.engagementAssignment.findMany).not.toHaveBeenCalled();
    });

    it("accepts a 31-day work period", async () => {
      await expect(
        service.findPendingSubmissions(
          {
            fromDate: "2026-10-01",
            toDate: "2026-10-31",
            page: 1,
            perPage: 20,
          },
          admin,
        ),
      ).resolves.toBeDefined();
    });

    it("refuses anyone who is not an administrator", async () => {
      await expect(
        service.findPendingSubmissions(
          { ...period, page: 1, perPage: 20 },
          talentManager,
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(db.engagementAssignment.findMany).not.toHaveBeenCalled();
    });
  });

  describe("sendReminders", () => {
    it("reminds each still-pending member for the part of the period they cover", async () => {
      db.engagementAssignment.findMany.mockResolvedValue([
        assignment(),
        assignment({
          id: "asg2",
          memberId: "1002",
          memberHandle: "janedoe",
          candidateWiproId: null,
          startDate: new Date("2026-11-11T00:00:00.000Z"),
        }),
      ]);
      emailService.sendSubmissionReminderEmail.mockImplementation(
        (params: { assignmentId: string }) =>
          Promise.resolve(params.assignmentId === "asg1"),
      );

      const result = await service.sendReminders(
        { ...period, assignmentIds: ["asg1", "asg2", "asg1", "stale"] },
        admin,
      );

      expect(db.engagementAssignment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: { in: ["asg1", "asg2", "stale"] },
            ...expectedPendingWhere,
          },
        }),
      );
      expect(emailService.sendSubmissionReminderEmail).toHaveBeenCalledWith({
        engagementId: "eng1",
        engagementTitle: "Senior Frontend Engineer",
        assignmentId: "asg1",
        memberUserId: "1001",
        memberHandle: "johnsmith",
        candidateWiproId: "john.smith@wipro.com",
        fromDate: "2026-11-09",
        toDate: "2026-11-13",
      });
      expect(emailService.sendSubmissionReminderEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          assignmentId: "asg2",
          fromDate: "2026-11-11",
          toDate: "2026-11-13",
        }),
      );
      expect(result).toEqual({
        sentCount: 1,
        recipients: [
          {
            assignmentId: "asg1",
            userId: "1001",
            handle: "johnsmith",
            sent: true,
          },
          {
            assignmentId: "asg2",
            userId: "1002",
            handle: "janedoe",
            sent: false,
          },
        ],
        skippedAssignmentIds: ["stale"],
      });
    });

    it("fails clearly when the reminder template is not configured", async () => {
      emailService.isSubmissionReminderConfigured.mockReturnValue(false);

      await expect(
        service.sendReminders({ ...period, assignmentIds: ["asg1"] }, admin),
      ).rejects.toBeInstanceOf(ServiceUnavailableException);
      expect(emailService.sendSubmissionReminderEmail).not.toHaveBeenCalled();
    });

    it("refuses anyone who is not an administrator", async () => {
      await expect(
        service.sendReminders(
          { ...period, assignmentIds: ["asg1"] },
          talentManager,
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(emailService.sendSubmissionReminderEmail).not.toHaveBeenCalled();
    });
  });
});
