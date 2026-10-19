import { ForbiddenException } from "@nestjs/common";
import { Prisma, TimesheetEntryStatus } from "@prisma/client";
import { UserRoles } from "../app-constants";
import { FinanceService } from "../integrations/finance.service";
import { MemberService } from "../integrations/member.service";
import { ProjectService } from "../integrations/project.service";
import { ApprovedTimesheetsService } from "./approved-timesheets.service";
import { TimesheetAccessService } from "./timesheet-access.service";

const decimal = (value: string | number) => new Prisma.Decimal(value);
const utcDate = (value: string) => new Date(`${value}T00:00:00.000Z`);

describe("ApprovedTimesheetsService", () => {
  let service: ApprovedTimesheetsService;
  let db: any;
  let memberService: { getMemberNamesByUserIds: jest.Mock };
  let financeService: { getProcessedPaymentHours: jest.Mock };
  let projectService: {
    getMemberProjectIdsForUser: jest.Mock;
    getProjectNamesByIds: jest.Mock;
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
  const member = { userId: "1001", handle: "johnsmith", roles: [] };

  const firstApproval = utcDate("2026-10-10");
  const secondApproval = utcDate("2026-10-17");

  const assignment = (overrides: Record<string, unknown> = {}) => ({
    id: "asg1",
    engagementId: "eng1",
    memberId: "1001",
    memberHandle: "johnsmith",
    agreementRate: "50",
    ratePerHour: "50",
    paymentCycle: "WEEKLY",
    standardHoursPerDay: 8,
    standardHoursPerWeek: null,
    totalHours: 200,
    engagement: { title: "Senior Frontend Engineer", projectId: "100" },
    ...overrides,
  });

  const entry = (overrides: Record<string, unknown> = {}) => ({
    id: "entry1",
    workDate: utcDate("2026-10-05"),
    hoursWorked: decimal("8.00"),
    approvedAt: firstApproval,
    approvedBy: "2002",
    approvedByHandle: "maryj",
    approvalComment: "Looks good",
    assignment: assignment(),
    ...overrides,
  });

  beforeEach(() => {
    db = {
      engagementTimesheetEntry: { findMany: jest.fn().mockResolvedValue([]) },
      engagementManager: { findFirst: jest.fn().mockResolvedValue(null) },
    };
    memberService = {
      getMemberNamesByUserIds: jest
        .fn()
        .mockResolvedValue(new Map([["2002", "Mary Jones"]])),
    };
    financeService = {
      getProcessedPaymentHours: jest.fn().mockResolvedValue(40),
    };
    projectService = {
      getMemberProjectIdsForUser: jest.fn().mockResolvedValue(["100"]),
      getProjectNamesByIds: jest
        .fn()
        .mockResolvedValue(new Map([["100", "Acme Portal"]])),
    };

    service = new ApprovedTimesheetsService(
      db,
      new TimesheetAccessService(db),
      memberService as unknown as MemberService,
      financeService as unknown as FinanceService,
      projectService as unknown as ProjectService,
    );
  });

  it("refuses callers who are neither administrators nor TMs", async () => {
    await expect(
      service.findApprovedTimesheets({ page: 1, perPage: 20 }, member),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(db.engagementTimesheetEntry.findMany).not.toHaveBeenCalled();
  });

  it("lists only approved, unpaid entries and does not scope an administrator", async () => {
    await service.findApprovedTimesheets({ page: 1, perPage: 20 }, admin);

    const { where } = db.engagementTimesheetEntry.findMany.mock.calls[0][0];
    expect(where).toEqual({
      status: TimesheetEntryStatus.APPROVED,
      paidPaymentReference: null,
    });
    expect(projectService.getMemberProjectIdsForUser).not.toHaveBeenCalled();
  });

  it("scopes a TM to the projects they are a member of", async () => {
    await service.findApprovedTimesheets(
      { page: 1, perPage: 20, engagement: "Frontend", assignee: "john" },
      talentManager,
      "Bearer tm-token",
    );

    expect(projectService.getMemberProjectIdsForUser).toHaveBeenCalledWith(
      "Bearer tm-token",
    );
    const { where } = db.engagementTimesheetEntry.findMany.mock.calls[0][0];
    expect(where.assignment).toEqual({
      memberHandle: { contains: "john", mode: "insensitive" },
      engagement: {
        title: { contains: "Frontend", mode: "insensitive" },
        projectId: { in: ["100"] },
      },
    });
  });

  it("returns nothing for a TM whose projects cannot be resolved", async () => {
    projectService.getMemberProjectIdsForUser.mockResolvedValue([]);

    const result = await service.findApprovedTimesheets(
      { page: 1, perPage: 20 },
      talentManager,
      "Bearer tm-token",
    );

    expect(result.data).toEqual([]);
    expect(result.meta.totalCount).toBe(0);
    expect(db.engagementTimesheetEntry.findMany).not.toHaveBeenCalled();
  });

  it("groups entries into one row per approval with the period, hours, and approver", async () => {
    db.engagementTimesheetEntry.findMany.mockResolvedValue([
      entry(),
      entry({
        id: "entry2",
        workDate: utcDate("2026-10-09"),
        hoursWorked: decimal("7.25"),
      }),
      entry({
        id: "entry3",
        workDate: utcDate("2026-10-12"),
        approvedAt: secondApproval,
        approvalComment: "Second week",
      }),
    ]);

    const result = await service.findApprovedTimesheets(
      { page: 1, perPage: 20 },
      admin,
    );

    expect(result.meta).toEqual({
      page: 1,
      perPage: 20,
      totalCount: 2,
      totalPages: 1,
    });
    expect(result.data[0]).toEqual(
      expect.objectContaining({
        engagementTitle: "Senior Frontend Engineer",
        projectId: "100",
        projectName: "Acme Portal",
        assignmentId: "asg1",
        assigneeHandle: "johnsmith",
        hoursLeft: 160,
        workPeriodStart: "2026-10-05",
        workPeriodEnd: "2026-10-09",
        hours: 15.25,
        entryIds: ["entry1", "entry2"],
        approvedByHandle: "maryj",
        approvedByName: "Mary Jones",
        approvalComment: "Looks good",
      }),
    );
    expect(result.data[1]).toEqual(
      expect.objectContaining({
        workPeriodStart: "2026-10-12",
        workPeriodEnd: "2026-10-12",
        entryIds: ["entry3"],
        approvalComment: "Second week",
      }),
    );
    // Hours left is per assignment, so finance is asked once even with two rows.
    expect(financeService.getProcessedPaymentHours).toHaveBeenCalledTimes(1);
  });

  it("sorts by engagement and assignee and paginates the grouped rows", async () => {
    db.engagementTimesheetEntry.findMany.mockResolvedValue([
      entry({
        id: "z",
        assignment: assignment({
          id: "asg2",
          engagement: { title: "Zeta", projectId: "100" },
        }),
      }),
      entry({ id: "a" }),
    ]);

    const result = await service.findApprovedTimesheets(
      { page: 2, perPage: 1 },
      admin,
    );

    expect(result.meta.totalPages).toBe(2);
    expect(result.data.map((row) => row.engagementTitle)).toEqual(["Zeta"]);
  });

  it("leaves hours left empty without a total or when finance is unavailable", async () => {
    financeService.getProcessedPaymentHours.mockResolvedValue(null);
    db.engagementTimesheetEntry.findMany.mockResolvedValue([
      entry(),
      entry({
        id: "entry2",
        assignment: assignment({ id: "asg2", totalHours: null }),
      }),
    ]);

    const result = await service.findApprovedTimesheets(
      { page: 1, perPage: 20 },
      admin,
    );

    expect(result.data.map((row) => row.hoursLeft)).toEqual([null, null]);
    expect(financeService.getProcessedPaymentHours).toHaveBeenCalledTimes(1);
  });

  it("falls back to the handle when approver names cannot be read", async () => {
    memberService.getMemberNamesByUserIds.mockRejectedValue(new Error("down"));
    db.engagementTimesheetEntry.findMany.mockResolvedValue([entry()]);

    const result = await service.findApprovedTimesheets(
      { page: 1, perPage: 20 },
      admin,
    );

    expect(result.data[0].approvedByName).toBeNull();
    expect(result.data[0].approvedByHandle).toBe("maryj");
  });
});
