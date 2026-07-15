import { BadRequestException } from "@nestjs/common";
import { AssignmentStatus, EngagementStatus } from "@prisma/client";
import { ERROR_MESSAGES } from "../common/constants";
import {
  FlexiEngagementBucket,
  FlexiEngagementListQueryDto,
  FlexiEngagementSortBy,
  FlexiMemberBucket,
  FlexiMemberListQueryDto,
  FlexiMemberSortBy,
} from "./dto";
import { EngagementsService } from "./engagements.service";

jest.mock("nanoid", () => ({
  nanoid: () => "test-id",
}));

type CapturedSqlQuery = {
  sql?: string;
  text?: string;
  strings?: readonly string[];
  values?: unknown[];
};

/**
 * Normalizes Prisma SQL templates captured by database mocks.
 *
 * @param query Prisma SQL object passed to `$queryRaw`.
 * @returns Single-line SQL text suitable for stable assertions.
 */
const normalizeSql = (query: CapturedSqlQuery): string =>
  (query.sql ?? query.text ?? query.strings?.join("?") ?? "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Extracts bound values from Prisma SQL templates captured by database mocks.
 *
 * @param query Prisma SQL object passed to `$queryRaw`.
 * @returns Bound parameter values in execution order.
 */
const getSqlValues = (query: CapturedSqlQuery): unknown[] => [
  ...(query.values ?? []),
];
const FLEXI_TALENT_IGNORED_PROJECT_IDS_ENV = "FLEXI_TALENT_IGNORED_PROJECT_IDS";

describe("EngagementsService", () => {
  const originalFlexiTalentIgnoredProjectIds =
    process.env[FLEXI_TALENT_IGNORED_PROJECT_IDS_ENV];
  let service: EngagementsService;
  let db: {
    $queryRaw: jest.Mock;
    $transaction: jest.Mock;
    engagement: {
      create: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      findMany: jest.Mock;
      count: jest.Mock;
      delete: jest.Mock;
    };
    engagementAssignment: {
      count: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
    };
  };
  let projectService: {
    getMemberProjectIdsForUser: jest.Mock;
    getProjectBillingAccountId: jest.Mock;
    getProjectNamesByIds: jest.Mock;
    hasBillingAccountAssigned: jest.Mock;
    searchFlexiProjectIdsByName: jest.Mock;
    validateProjectExists: jest.Mock;
  };
  let skillsService: {
    getSkillNamesByIds: jest.Mock;
    validateSkillsExist: jest.Mock;
  };
  let memberService: {
    getMemberHandleByUserId: jest.Mock;
    getMemberUserIdByHandle: jest.Mock;
    getMemberEmailsByUserIds: jest.Mock;
  };
  let eventBusService: { postEvent: jest.Mock };
  let assignmentOfferEmailService: {
    sendAssignmentOfferEmails: jest.Mock;
  };
  let assignmentOfferResponseEmailService: {
    sendAssignmentOfferResponseEmails: jest.Mock;
  };

  /**
   * Creates the service with the current mocks and environment.
   *
   * Tests that change environment configuration call this after setting the env
   * value so the service constructor reads the intended Flexi ignore list.
   *
   * @returns Service instance under test.
   */
  const createService = (): EngagementsService =>
    new EngagementsService(
      db as any,
      projectService as any,
      skillsService as any,
      memberService as any,
      eventBusService as any,
      assignmentOfferEmailService as any,
      assignmentOfferResponseEmailService as any,
    );

  const createDto = {
    projectId: "project-1",
    title: "Test Engagement",
    description: "Test description",
    timeZones: ["UTC"],
    countries: ["US"],
    requiredSkills: ["skill-1"],
    anticipatedStart: "IMMEDIATE",
  };
  const buildFlexiEngagement = (overrides: Record<string, any> = {}) => ({
    id: "eng-1",
    projectId: "project-1",
    title: "Flexi Engagement",
    description: "Flexi description",
    durationStartDate: null,
    durationEndDate: null,
    durationWeeks: null,
    durationMonths: null,
    timeZones: ["UTC"],
    countries: ["US"],
    requiredSkills: [],
    anticipatedStart: "IMMEDIATE",
    status: EngagementStatus.ACTIVE,
    isPrivate: true,
    requiredMemberCount: 1,
    role: null,
    workload: null,
    compensationRange: null,
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    createdBy: "manager-1",
    updatedAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedBy: null,
    ...overrides,
  });
  const buildFlexiAssignment = (overrides: Record<string, any> = {}) => {
    const engagement = overrides.engagement ?? buildFlexiEngagement();

    return {
      id: "assignment-1",
      engagementId: engagement.id,
      memberId: "member-1",
      memberHandle: "member1",
      status: AssignmentStatus.ASSIGNED,
      agreementRate: null,
      ratePerHour: null,
      paymentCycle: "WEEKLY",
      standardHoursPerDay: null,
      standardHoursPerWeek: null,
      durationMonths: null,
      otherRemarks: null,
      terminationReason: null,
      startDate: null,
      endDate: null,
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
      updatedAt: new Date("2026-01-01T00:00:00.000Z"),
      engagement,
      ...overrides,
    };
  };
  /**
   * Builds a raw SQL row shaped for the Flexi member list mapper.
   *
   * @param overrides Field overrides for the list row.
   * @returns Raw member-list SQL row consumed by `getFlexiMemberList()`.
   */
  const buildFlexiMemberSqlRow = (overrides: Record<string, any> = {}) => ({
    assignmentId: "assignment-1",
    engagementId: "eng-1",
    memberId: "member-1",
    memberHandle: "member1",
    status: AssignmentStatus.ASSIGNED,
    engagementProjectId: "project-1",
    engagementTitle: "Flexi Engagement",
    isCurrentlyAssigned: true,
    daysRemaining: 10,
    latestCompletedAt: null,
    ...overrides,
  });

  beforeEach(() => {
    delete process.env[FLEXI_TALENT_IGNORED_PROJECT_IDS_ENV];
    db = {
      $queryRaw: jest.fn(),
      $transaction: jest.fn(),
      engagement: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        delete: jest.fn(),
      },
      engagementAssignment: {
        count: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
    };
    projectService = {
      getMemberProjectIdsForUser: jest.fn().mockResolvedValue([]),
      getProjectBillingAccountId: jest.fn().mockResolvedValue(null),
      getProjectNamesByIds: jest.fn().mockResolvedValue(new Map()),
      hasBillingAccountAssigned: jest.fn().mockResolvedValue(false),
      searchFlexiProjectIdsByName: jest.fn().mockResolvedValue([]),
      validateProjectExists: jest.fn().mockResolvedValue(true),
    };
    skillsService = {
      getSkillNamesByIds: jest.fn().mockResolvedValue(new Map()),
      validateSkillsExist: jest.fn().mockResolvedValue({ invalid: [] }),
    };
    memberService = {
      getMemberHandleByUserId: jest.fn(),
      getMemberUserIdByHandle: jest.fn(),
      getMemberEmailsByUserIds: jest.fn().mockResolvedValue(new Map()),
    };
    eventBusService = {
      postEvent: jest.fn().mockResolvedValue(undefined),
    };
    assignmentOfferEmailService = {
      sendAssignmentOfferEmails: jest.fn().mockResolvedValue(undefined),
    };
    assignmentOfferResponseEmailService = {
      sendAssignmentOfferResponseEmails: jest.fn().mockResolvedValue(undefined),
    };
    service = createService();
  });

  afterEach(() => {
    if (originalFlexiTalentIgnoredProjectIds === undefined) {
      delete process.env[FLEXI_TALENT_IGNORED_PROJECT_IDS_ENV];
    } else {
      process.env[FLEXI_TALENT_IGNORED_PROJECT_IDS_ENV] =
        originalFlexiTalentIgnoredProjectIds;
    }
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it("sets createdBy to system for M2M tokens", async () => {
    const engagement = { id: "eng-1" };
    const engagementWithAssignments = {
      ...engagement,
      assignments: [],
    };
    const tx = {
      engagement: {
        create: jest.fn().mockResolvedValue(engagement),
        findUnique: jest.fn().mockResolvedValue(engagementWithAssignments),
      },
    };

    db.$transaction.mockImplementation((callback: any) => callback(tx));

    await service.create(createDto as any, { isMachine: true });

    expect(tx.engagement.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ createdBy: "system" }),
      }),
    );
  });

  it("creates private engagements without an assigned member", async () => {
    const engagement = {
      id: "eng-1",
      isPrivate: true,
      requiredMemberCount: 1,
    };
    const engagementWithAssignments = {
      ...engagement,
      assignments: [],
    };
    const tx = {
      engagement: {
        create: jest.fn().mockResolvedValue(engagement),
        findUnique: jest.fn().mockResolvedValue(engagementWithAssignments),
      },
    };

    db.$transaction.mockImplementation((callback: any) => callback(tx));

    await service.create(
      {
        ...createDto,
        isPrivate: true,
        requiredMemberCount: 1,
      } as any,
      { sub: "manager-1" },
    );

    expect(tx.engagement.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          isPrivate: true,
          requiredMemberCount: 1,
        }),
      }),
    );
  });

  it("sets updatedBy to system for M2M tokens", async () => {
    const existingEngagement = {
      id: "eng-1",
      isPrivate: false,
      requiredMemberCount: undefined,
      assignments: [],
    };
    jest.spyOn(service, "findOne").mockResolvedValue(existingEngagement as any);

    const tx = {
      engagement: {
        update: jest.fn().mockResolvedValue(existingEngagement),
      },
    };

    db.$transaction.mockImplementation((callback: any) => callback(tx));

    await service.update("eng-1", { title: "Updated" } as any, {
      isMachine: true,
    });

    expect(tx.engagement.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ updatedBy: "system" }),
      }),
    );
  });

  it("emits a skills event when an update adds the first assignment", async () => {
    const existingEngagement = {
      id: "eng-1",
      isPrivate: true,
      requiredMemberCount: 1,
      requiredSkills: ["skill-1", "skill-2"],
      assignments: [],
    };
    const newAssignment = {
      id: "assignment-1",
      engagementId: "eng-1",
      memberId: "100000218",
      memberHandle: "testmfa1",
      status: AssignmentStatus.SELECTED,
      createdAt: new Date("2026-07-14T05:17:36.826Z"),
      updatedAt: new Date("2026-07-14T05:17:36.826Z"),
    };
    jest.spyOn(service, "findOne").mockResolvedValue(existingEngagement as any);
    memberService.getMemberUserIdByHandle.mockResolvedValue("100000218");

    const tx = {
      engagementAssignment: {
        create: jest.fn().mockResolvedValue(newAssignment),
        update: jest.fn(),
        updateMany: jest.fn(),
      },
      engagement: {
        update: jest.fn().mockResolvedValue({
          ...existingEngagement,
          assignments: [newAssignment],
        }),
      },
    };
    db.$transaction.mockImplementation((callback: any) => callback(tx));

    await service.update(
      "eng-1",
      {
        assignmentDetails: [{ memberHandle: "testmfa1" }],
      } as any,
      { sub: "manager-1" },
    );

    expect(eventBusService.postEvent).toHaveBeenCalledWith(
      "engagement.member.assigned",
      {
        engagementId: "eng-1",
        assignmentId: "assignment-1",
        memberId: 100000218,
        memberHandle: "testmfa1",
        skills: [{ id: "skill-1" }, { id: "skill-2" }],
      },
    );
  });

  it("marks a private engagement completed after all assignments are completed", async () => {
    const completedAssignment = {
      id: "assign-1",
      engagementId: "eng-1",
      memberId: "member-1",
      memberHandle: "handle1",
      status: AssignmentStatus.COMPLETED,
      createdAt: new Date("2026-02-11T10:00:00.000Z"),
      updatedAt: new Date("2026-02-11T10:00:00.000Z"),
      endDate: new Date("2026-02-12T10:00:00.000Z"),
    };
    const existingEngagement = {
      id: "eng-1",
      isPrivate: true,
      requiredMemberCount: 1,
      status: EngagementStatus.ACTIVE,
      assignments: [completedAssignment],
    };
    jest.spyOn(service, "findOne").mockResolvedValue(existingEngagement as any);

    const tx = {
      engagement: {
        update: jest.fn().mockResolvedValue({
          ...existingEngagement,
          status: EngagementStatus.CLOSED,
        }),
      },
    };

    db.$transaction.mockImplementation((callback: any) => callback(tx));

    await service.update("eng-1", { status: EngagementStatus.CLOSED } as any, {
      sub: "manager-1",
    });

    expect(tx.engagement.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: EngagementStatus.CLOSED,
        }),
      }),
    );
  });

  it("terminates omitted active assignments when updating assignment details", async () => {
    const now = new Date("2026-02-12T09:00:00.000Z");
    jest.useFakeTimers().setSystemTime(now);

    const existingAssignment = {
      id: "assign-1",
      engagementId: "eng-1",
      memberId: "member-1",
      memberHandle: "handle1",
      status: AssignmentStatus.SELECTED,
      createdAt: new Date("2026-02-11T10:00:00.000Z"),
      updatedAt: new Date("2026-02-11T10:00:00.000Z"),
    };
    const omittedAssignment = {
      id: "assign-2",
      engagementId: "eng-1",
      memberId: "member-2",
      memberHandle: "handle2",
      status: AssignmentStatus.ASSIGNED,
      createdAt: new Date("2026-02-11T11:00:00.000Z"),
      updatedAt: new Date("2026-02-11T11:00:00.000Z"),
    };
    const existingEngagement = {
      id: "eng-1",
      projectId: "project-1",
      isPrivate: true,
      requiredMemberCount: 2,
      assignments: [existingAssignment, omittedAssignment],
    };
    jest.spyOn(service, "findOne").mockResolvedValue(existingEngagement as any);
    memberService.getMemberHandleByUserId.mockResolvedValue("handle1");

    const tx = {
      engagement: {
        update: jest.fn().mockResolvedValue({
          ...existingEngagement,
          assignments: [
            existingAssignment,
            {
              ...omittedAssignment,
              status: AssignmentStatus.TERMINATED,
              endDate: now,
            },
          ],
        }),
      },
      engagementAssignment: {
        findFirst: jest.fn().mockResolvedValue(existingAssignment),
        update: jest.fn().mockResolvedValue(existingAssignment),
        create: jest.fn(),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
    };

    db.$transaction.mockImplementation((callback: any) => callback(tx));

    await service.update(
      "eng-1",
      {
        assignmentDetails: [
          {
            memberId: "member-1",
            memberHandle: "handle1",
          },
        ],
      } as any,
      { sub: "manager-1" },
    );

    expect(tx.engagementAssignment.updateMany).toHaveBeenCalledWith({
      where: {
        id: {
          in: ["assign-2"],
        },
      },
      data: {
        status: AssignmentStatus.TERMINATED,
        endDate: now,
      },
    });
  });

  it("allows duplicate assignment rows when the previous assignment is completed", async () => {
    const existingEngagement = {
      id: "eng-1",
      title: "Original engagement",
      isPrivate: true,
      requiredMemberCount: 1,
      requiredSkills: ["skill-1", "skill-2"],
      assignments: [
        {
          id: "assignment-completed",
          engagementId: "eng-1",
          memberId: "123456",
          memberHandle: "testaws1",
          status: AssignmentStatus.COMPLETED,
          createdAt: new Date("2026-04-17T00:00:00.000Z"),
          updatedAt: new Date("2026-04-17T00:00:00.000Z"),
          agreementRate: "1200",
          otherRemarks: null,
          startDate: new Date("2026-04-17T00:00:00.000Z"),
          endDate: new Date("2026-10-17T00:00:00.000Z"),
          terminationReason: null,
        },
      ],
    };
    const newAssignment = {
      id: "assignment-selected",
      engagementId: "eng-1",
      memberId: "123456",
      memberHandle: "testaws1",
      status: AssignmentStatus.SELECTED,
      createdAt: new Date("2026-04-23T00:00:00.000Z"),
      updatedAt: new Date("2026-04-23T00:00:00.000Z"),
      agreementRate: "1600",
      otherRemarks: null,
      startDate: new Date("2026-04-23T00:00:00.000Z"),
      endDate: null,
      terminationReason: null,
    };
    jest.spyOn(service, "findOne").mockResolvedValue(existingEngagement as any);
    memberService.getMemberUserIdByHandle.mockResolvedValue("123456");

    const tx = {
      engagementAssignment: {
        create: jest.fn().mockResolvedValue(newAssignment),
        update: jest.fn().mockResolvedValue(existingEngagement.assignments[0]),
        updateMany: jest.fn(),
      },
      engagement: {
        update: jest.fn().mockResolvedValue({
          ...existingEngagement,
          assignments: [...existingEngagement.assignments, newAssignment],
          title: "Updated engagement",
        }),
      },
    };
    db.$transaction.mockImplementation((callback: any) => callback(tx));

    await service.update(
      "eng-1",
      {
        assignedMemberHandles: ["testaws1", "testaws1"],
        title: "Updated engagement",
      } as any,
      {
        sub: "999999",
      },
    );

    expect(tx.engagementAssignment.update).toHaveBeenCalledWith({
      where: {
        id: "assignment-completed",
      },
      data: expect.objectContaining({
        memberHandle: "testaws1",
      }),
    });
    expect(tx.engagementAssignment.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        engagementId: "eng-1",
        memberHandle: "testaws1",
        memberId: "123456",
      }),
    });
    expect(tx.engagementAssignment.updateMany).not.toHaveBeenCalled();
    expect(eventBusService.postEvent).toHaveBeenCalledWith(
      "engagement.member.assigned",
      {
        engagementId: "eng-1",
        assignmentId: "assignment-selected",
        memberId: 123456,
        memberHandle: "testaws1",
        skills: [{ id: "skill-1" }, { id: "skill-2" }],
      },
    );
    expect(
      assignmentOfferEmailService.sendAssignmentOfferEmails,
    ).toHaveBeenCalledWith([
      expect.objectContaining({
        assignmentId: "assignment-selected",
        memberId: "123456",
      }),
    ]);
  });

  it.each([AssignmentStatus.COMPLETED, AssignmentStatus.TERMINATED])(
    "creates a new assignment when the previous assignment is %s and only the new row is submitted",
    async (previousStatus) => {
      const existingAssignment = {
        id: "assignment-previous",
        engagementId: "eng-1",
        memberId: "123456",
        memberHandle: "testaws1",
        status: previousStatus,
        createdAt: new Date("2026-04-17T00:00:00.000Z"),
        updatedAt: new Date("2026-04-17T00:00:00.000Z"),
        agreementRate: "1200",
        otherRemarks: null,
        startDate: new Date("2026-04-17T00:00:00.000Z"),
        endDate: new Date("2026-04-22T00:00:00.000Z"),
        terminationReason:
          previousStatus === AssignmentStatus.TERMINATED
            ? "Client request"
            : null,
      };
      const existingEngagement = {
        id: "eng-1",
        title: "Original engagement",
        isPrivate: true,
        requiredMemberCount: 1,
        requiredSkills: ["skill-1"],
        assignments: [existingAssignment],
      };
      const newAssignment = {
        id: "assignment-selected",
        engagementId: "eng-1",
        memberId: "123456",
        memberHandle: "testaws1",
        status: AssignmentStatus.SELECTED,
        createdAt: new Date("2026-04-23T00:00:00.000Z"),
        updatedAt: new Date("2026-04-23T00:00:00.000Z"),
        agreementRate: "1600.00",
        otherRemarks: null,
        startDate: new Date("2026-04-23T00:00:00.000Z"),
        endDate: null,
        terminationReason: null,
      };
      jest
        .spyOn(service, "findOne")
        .mockResolvedValue(existingEngagement as any);
      memberService.getMemberUserIdByHandle.mockResolvedValue("123456");

      const tx = {
        engagementAssignment: {
          create: jest.fn().mockResolvedValue(newAssignment),
          update: jest.fn(),
          updateMany: jest.fn(),
        },
        engagement: {
          update: jest.fn().mockResolvedValue({
            ...existingEngagement,
            assignments: [existingAssignment, newAssignment],
            title: "Updated engagement",
          }),
        },
      };
      db.$transaction.mockImplementation((callback: any) => callback(tx));

      await service.update(
        "eng-1",
        {
          assignmentDetails: [
            {
              durationMonths: 3,
              memberHandle: "testaws1",
              ratePerHour: "40",
              standardHoursPerDay: 8,
              startDate: "2026-04-23T00:00:00.000Z",
            },
          ],
          title: "Updated engagement",
        } as any,
        {
          sub: "999999",
        },
      );

      expect(tx.engagementAssignment.update).not.toHaveBeenCalled();
      expect(tx.engagementAssignment.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          agreementRate: "1600.00",
          durationMonths: 3,
          engagementId: "eng-1",
          memberHandle: "testaws1",
          memberId: "123456",
          ratePerHour: "40",
          standardHoursPerDay: 8,
          startDate: new Date("2026-04-23T00:00:00.000Z"),
        }),
      });
      expect(tx.engagementAssignment.updateMany).not.toHaveBeenCalled();
      expect(
        assignmentOfferEmailService.sendAssignmentOfferEmails,
      ).toHaveBeenCalledWith([
        expect.objectContaining({
          assignmentId: "assignment-selected",
          memberId: "123456",
        }),
      ]);
    },
  );

  it("blocks changing project when current project has a billing account", async () => {
    const existingEngagement = {
      id: "eng-1",
      projectId: "project-1",
      isPrivate: false,
      requiredMemberCount: undefined,
      assignments: [],
    };
    jest.spyOn(service, "findOne").mockResolvedValue(existingEngagement as any);
    projectService.hasBillingAccountAssigned.mockResolvedValue(true);

    await expect(
      service.update("eng-1", { projectId: "project-2" } as any, {
        sub: "123456",
      }),
    ).rejects.toThrow(ERROR_MESSAGES.ProjectChangeBlockedByBillingAccount);

    expect(projectService.hasBillingAccountAssigned).toHaveBeenCalledWith(
      "project-1",
    );
    expect(projectService.validateProjectExists).not.toHaveBeenCalled();
    expect(db.$transaction).not.toHaveBeenCalled();
  });

  it("allows project updates when the current project has no billing account", async () => {
    const existingEngagement = {
      id: "eng-1",
      projectId: "project-1",
      isPrivate: false,
      requiredMemberCount: undefined,
      assignments: [],
    };
    jest.spyOn(service, "findOne").mockResolvedValue(existingEngagement as any);
    projectService.hasBillingAccountAssigned.mockResolvedValue(false);

    const tx = {
      engagement: {
        update: jest.fn().mockResolvedValue({
          ...existingEngagement,
          projectId: "project-2",
        }),
      },
    };
    db.$transaction.mockImplementation((callback: any) => callback(tx));

    await service.update("eng-1", { projectId: "project-2" } as any, {
      sub: "123456",
    });

    expect(projectService.hasBillingAccountAssigned).toHaveBeenCalledWith(
      "project-1",
    );
    expect(projectService.validateProjectExists).toHaveBeenCalledWith(
      "project-2",
    );
    expect(tx.engagement.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          projectId: "project-2",
        }),
      }),
    );
  });

  it("does not run billing-account guard when projectId is unchanged", async () => {
    const existingEngagement = {
      id: "eng-1",
      projectId: "project-1",
      isPrivate: false,
      requiredMemberCount: undefined,
      assignments: [],
    };
    jest.spyOn(service, "findOne").mockResolvedValue(existingEngagement as any);
    projectService.hasBillingAccountAssigned.mockResolvedValue(true);

    const tx = {
      engagement: {
        update: jest.fn().mockResolvedValue(existingEngagement),
      },
    };
    db.$transaction.mockImplementation((callback: any) => callback(tx));

    await service.update("eng-1", { projectId: "project-1" } as any, {
      sub: "123456",
    });

    expect(projectService.hasBillingAccountAssigned).not.toHaveBeenCalled();
    expect(projectService.validateProjectExists).toHaveBeenCalledWith(
      "project-1",
    );
    expect(tx.engagement.update).toHaveBeenCalled();
  });

  it("does not include assignment details for public engagement listings", async () => {
    db.engagement.findMany.mockResolvedValue([
      {
        id: "eng-1",
        projectId: "project-1",
        title: "Public engagement",
        description: "Public description",
        timeZones: ["UTC"],
        countries: ["US"],
        requiredSkills: ["skill-1"],
        anticipatedStart: "IMMEDIATE",
        status: "OPEN",
        createdAt: new Date("2026-02-11T10:00:00.000Z"),
        updatedAt: new Date("2026-02-11T10:00:00.000Z"),
        createdBy: "123456",
        isPrivate: false,
        requiredMemberCount: 2,
        _count: {
          applications: 3,
        },
      },
    ]);
    db.engagement.count.mockResolvedValue(1);

    const result = await service.findAll({
      page: 1,
      perPage: 20,
      sortBy: "createdAt",
      sortOrder: "desc",
    } as any);

    expect(db.engagement.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        include: {
          _count: {
            select: {
              applications: true,
            },
          },
        },
      }),
    );

    expect(result.data[0]).not.toHaveProperty("assignments");
    expect(result.data[0]).not.toHaveProperty("assignedMemberId");
    expect(result.data[0]).not.toHaveProperty("assignedMemberHandle");
    expect(result.data[0]).not.toHaveProperty("assignedMembers");
    expect(result.data[0]).not.toHaveProperty("assignedMemberHandles");
  });

  it("filters assignments when loading an engagement for an assigned member", async () => {
    db.engagement.findUnique.mockResolvedValue({
      id: "eng-1",
      projectId: "project-1",
      title: "Private engagement",
      description: "Private description",
      timeZones: ["UTC"],
      countries: ["US"],
      requiredSkills: ["skill-1"],
      anticipatedStart: "IMMEDIATE",
      status: EngagementStatus.OPEN,
      createdAt: new Date("2026-02-11T10:00:00.000Z"),
      updatedAt: new Date("2026-02-11T10:00:00.000Z"),
      createdBy: "123456",
      isPrivate: true,
      assignments: [
        {
          id: "assignment-1",
          engagementId: "eng-1",
          memberId: "123456",
          memberHandle: "testaws1",
          status: AssignmentStatus.SELECTED,
          createdAt: new Date("2026-02-11T11:00:00.000Z"),
          updatedAt: new Date("2026-02-11T11:00:00.000Z"),
          agreementRate: "80",
          otherRemarks: "Confidential terms",
          startDate: new Date("2026-02-12T00:00:00.000Z"),
          endDate: new Date("2026-03-12T00:00:00.000Z"),
          terminationReason: null,
        },
      ],
    });

    const result = await service.findOne("eng-1", {
      includeAssignments: true,
      assignmentMemberId: "123456",
    });

    expect(db.engagement.findUnique).toHaveBeenCalledWith({
      where: { id: "eng-1" },
      include: {
        assignments: {
          where: {
            memberId: "123456",
            status: {
              in: [AssignmentStatus.SELECTED, AssignmentStatus.ASSIGNED],
            },
          },
        },
      },
    });
    expect(result.assignments).toHaveLength(1);
    expect(result.assignments?.[0].memberId).toBe("123456");
  });

  it("includes active and past assignment details in my assignments", async () => {
    const selectedAssignment = {
      id: "assignment-selected",
      engagementId: "eng-1",
      memberId: "123456",
      memberHandle: "testaws1",
      status: AssignmentStatus.SELECTED,
      createdAt: new Date("2026-02-11T11:00:00.000Z"),
      updatedAt: new Date("2026-02-11T11:00:00.000Z"),
    };
    const completedAssignment = {
      id: "assignment-completed",
      engagementId: "eng-1",
      memberId: "123456",
      memberHandle: "testaws1",
      status: AssignmentStatus.COMPLETED,
      createdAt: new Date("2026-02-10T11:00:00.000Z"),
      updatedAt: new Date("2026-02-12T11:00:00.000Z"),
    };
    const terminatedAssignment = {
      id: "assignment-terminated",
      engagementId: "eng-1",
      memberId: "123456",
      memberHandle: "testaws1",
      status: AssignmentStatus.TERMINATED,
      createdAt: new Date("2026-02-09T11:00:00.000Z"),
      updatedAt: new Date("2026-02-13T11:00:00.000Z"),
    };
    const expectedStatuses = [
      AssignmentStatus.SELECTED,
      AssignmentStatus.ASSIGNED,
      AssignmentStatus.COMPLETED,
      AssignmentStatus.TERMINATED,
    ];

    db.engagement.findMany.mockResolvedValue([
      {
        id: "eng-1",
        projectId: "project-1",
        title: "Private engagement",
        description: "Private description",
        timeZones: ["UTC"],
        countries: ["US"],
        requiredSkills: ["skill-1"],
        anticipatedStart: "IMMEDIATE",
        status: EngagementStatus.OPEN,
        createdAt: new Date("2026-02-11T10:00:00.000Z"),
        updatedAt: new Date("2026-02-11T10:00:00.000Z"),
        createdBy: "talent-manager",
        isPrivate: true,
        assignments: [
          selectedAssignment,
          completedAssignment,
          terminatedAssignment,
        ],
        _count: {
          applications: 1,
        },
      },
    ]);
    db.engagement.count.mockResolvedValue(1);

    const result = await service.findMyAssignments({ userId: "123456" }, {
      page: 1,
      perPage: 20,
      sortBy: "createdAt",
      sortOrder: "desc",
    } as any);

    expect(db.engagement.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        include: expect.objectContaining({
          assignments: {
            where: {
              memberId: "123456",
              status: { in: expectedStatuses },
            },
          },
        }),
        where: {
          assignments: {
            some: {
              memberId: "123456",
              status: { in: expectedStatuses },
            },
          },
        },
      }),
    );
    expect(db.engagement.count).toHaveBeenCalledWith({
      where: {
        assignments: {
          some: {
            memberId: "123456",
            status: { in: expectedStatuses },
          },
        },
      },
    });
    expect((result.data[0] as any).assignments).toEqual([
      selectedAssignment,
      completedAssignment,
      terminatedAssignment,
    ]);
  });

  it("returns assignment context with project details", async () => {
    db.engagementAssignment.findUnique.mockResolvedValue({
      id: "assignment-1",
      engagementId: "eng-1",
      memberId: "123456",
      memberHandle: "testaws1",
      status: AssignmentStatus.ASSIGNED,
      agreementRate: "3020",
      ratePerHour: "75.50",
      standardHoursPerDay: 8,
      durationMonths: 3,
      otherRemarks: "Complete onboarding within the first week.",
      startDate: new Date("2026-02-12T00:00:00.000Z"),
      endDate: new Date("2026-05-12T00:00:00.000Z"),
      engagement: {
        id: "eng-1",
        projectId: "project-1",
        title: "Senior Frontend Engineer",
      },
    });
    projectService.getProjectNamesByIds.mockResolvedValue(
      new Map([["project-1", "Platform Modernization"]]),
    );
    projectService.getProjectBillingAccountId.mockResolvedValue(80001063);

    const result = await service.findAssignmentContext("assignment-1");

    expect(db.engagementAssignment.findUnique).toHaveBeenCalledWith({
      where: { id: "assignment-1" },
      include: {
        engagement: true,
      },
    });
    expect(result).toEqual({
      assignmentId: "assignment-1",
      engagementId: "eng-1",
      projectId: "project-1",
      billingAccountId: 80001063,
      projectName: "Platform Modernization",
      engagementTitle: "Senior Frontend Engineer",
      memberId: "123456",
      memberHandle: "testaws1",
      status: AssignmentStatus.ASSIGNED,
      agreementRate: "3020",
      ratePerHour: "75.50",
      standardHoursPerDay: 8,
      durationMonths: 3,
      otherRemarks: "Complete onboarding within the first week.",
      startDate: new Date("2026-02-12T00:00:00.000Z"),
      endDate: new Date("2026-05-12T00:00:00.000Z"),
    });
  });

  it("keeps assignment context available when only project-name hydration fails", async () => {
    db.engagementAssignment.findUnique.mockResolvedValue({
      id: "assignment-1",
      engagementId: "eng-1",
      memberId: "123456",
      memberHandle: "testaws1",
      status: AssignmentStatus.ASSIGNED,
      agreementRate: "3020",
      ratePerHour: "75.50",
      standardHoursPerDay: 8,
      durationMonths: 3,
      otherRemarks: "Complete onboarding within the first week.",
      startDate: new Date("2026-02-12T00:00:00.000Z"),
      endDate: new Date("2026-05-12T00:00:00.000Z"),
      engagement: {
        id: "eng-1",
        projectId: "project-1",
        title: "Senior Frontend Engineer",
      },
    });
    projectService.getProjectNamesByIds.mockRejectedValue(
      new Error("projects name lookup failed"),
    );
    projectService.getProjectBillingAccountId.mockResolvedValue(null);

    const result = await service.findAssignmentContext("assignment-1");

    expect(result).toMatchObject({
      assignmentId: "assignment-1",
      billingAccountId: null,
      projectId: "project-1",
    });
    expect(result.projectName).toBeUndefined();
  });

  it("propagates assignment billing-account lookup failures", async () => {
    const lookupError = new Error("projects billing lookup failed");
    db.engagementAssignment.findUnique.mockResolvedValue({
      id: "assignment-1",
      engagementId: "eng-1",
      memberId: "123456",
      memberHandle: "testaws1",
      status: AssignmentStatus.ASSIGNED,
      engagement: {
        id: "eng-1",
        projectId: "project-1",
        title: "Senior Frontend Engineer",
      },
    });
    projectService.getProjectNamesByIds.mockResolvedValue(new Map());
    projectService.getProjectBillingAccountId.mockRejectedValue(lookupError);

    await expect(service.findAssignmentContext("assignment-1")).rejects.toThrow(
      lookupError,
    );
  });

  it("includes assignment details for privileged engagement listings", async () => {
    db.engagement.findMany.mockResolvedValue([
      {
        id: "eng-1",
        projectId: "project-1",
        title: "Private engagement",
        description: "Private description",
        timeZones: ["UTC"],
        countries: ["US"],
        requiredSkills: ["skill-1"],
        anticipatedStart: "IMMEDIATE",
        status: "OPEN",
        createdAt: new Date("2026-02-11T10:00:00.000Z"),
        updatedAt: new Date("2026-02-11T10:00:00.000Z"),
        createdBy: "123456",
        isPrivate: true,
        assignments: [
          {
            id: "assignment-1",
            engagementId: "eng-1",
            memberId: "100000",
            memberHandle: "member1",
            status: AssignmentStatus.SELECTED,
            createdAt: new Date("2026-02-11T11:00:00.000Z"),
            updatedAt: new Date("2026-02-11T11:00:00.000Z"),
            agreementRate: "80",
            otherRemarks: "Confidential terms",
            startDate: new Date("2026-02-12T00:00:00.000Z"),
            endDate: new Date("2026-03-12T00:00:00.000Z"),
            terminationReason: null,
          },
        ],
        _count: {
          applications: 1,
        },
      },
    ]);
    db.engagement.count.mockResolvedValue(1);

    const result = await service.findAll({
      includePrivate: true,
      page: 1,
      perPage: 20,
      sortBy: "createdAt",
      sortOrder: "desc",
    } as any);

    expect(db.engagement.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        include: {
          _count: {
            select: {
              applications: true,
            },
          },
          assignments: true,
        },
      }),
    );

    expect(result.data[0]).toHaveProperty("assignments");
    expect(result.data[0]).toHaveProperty("assignedMemberId", "100000");
    expect(result.data[0]).toHaveProperty("assignedMemberHandle", "member1");
    expect(result.data[0]).toHaveProperty("assignedMembers", ["100000"]);
    expect(result.data[0]).toHaveProperty("assignedMemberHandles", ["member1"]);
  });

  it("does not scope Talent Manager listings to member projects", async () => {
    db.engagement.findMany.mockResolvedValue([]);
    db.engagement.count.mockResolvedValue(0);

    await service.findAll({
      includePrivate: true,
      page: 1,
      perPage: 20,
      sortBy: "createdAt",
      sortOrder: "desc",
    } as any);

    expect(projectService.getMemberProjectIdsForUser).not.toHaveBeenCalled();
    expect(db.engagement.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {},
      }),
    );
  });

  it("applies requested projectIds for Talent Manager listings without member intersection", async () => {
    db.engagement.findMany.mockResolvedValue([]);
    db.engagement.count.mockResolvedValue(0);

    await service.findAll({
      includePrivate: true,
      projectIds: ["project-1", "project-2", "project-3"],
      page: 1,
      perPage: 20,
      sortBy: "createdAt",
      sortOrder: "desc",
    } as any);

    expect(projectService.getMemberProjectIdsForUser).not.toHaveBeenCalled();
    expect(db.engagement.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          projectId: { in: ["project-1", "project-2", "project-3"] },
        }),
      }),
    );
  });

  it("hydrates project details in engagement listings", async () => {
    db.engagement.findMany.mockResolvedValue([
      {
        id: "eng-1",
        projectId: "project-1",
        title: "Public engagement",
        description: "Public description",
        timeZones: ["UTC"],
        countries: ["US"],
        requiredSkills: ["skill-1"],
        anticipatedStart: "IMMEDIATE",
        status: "OPEN",
        createdAt: new Date("2026-02-11T10:00:00.000Z"),
        updatedAt: new Date("2026-02-11T10:00:00.000Z"),
        createdBy: "123456",
        isPrivate: false,
        requiredMemberCount: 2,
        _count: {
          applications: 3,
        },
      },
    ]);
    db.engagement.count.mockResolvedValue(1);
    projectService.getProjectNamesByIds.mockResolvedValue(
      new Map([["project-1", "Platform UI Refresh"]]),
    );

    const result = await service.findAll({
      page: 1,
      perPage: 20,
      sortBy: "createdAt",
      sortOrder: "desc",
    } as any);

    expect(projectService.getProjectNamesByIds).toHaveBeenCalledWith([
      "project-1",
    ]);
    expect(result.data[0]).toMatchObject({
      project: {
        id: "project-1",
        name: "Platform UI Refresh",
      },
      projectName: "Platform UI Refresh",
    });
  });

  it("excludes ON_HOLD from default public engagement listings", async () => {
    db.engagement.findMany.mockResolvedValue([]);
    db.engagement.count.mockResolvedValue(0);

    await service.findAll({
      page: 1,
      perPage: 20,
      sortBy: "createdAt",
      sortOrder: "desc",
    } as any);

    expect(db.engagement.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          isPrivate: false,
          AND: expect.arrayContaining([
            { status: { notIn: [EngagementStatus.ON_HOLD] } },
          ]),
        }),
      }),
    );
  });

  it("does not allow public status=ON_HOLD listings to return ON_HOLD engagements", async () => {
    db.engagement.findMany.mockResolvedValue([]);
    db.engagement.count.mockResolvedValue(0);

    const result = await service.findAll({
      status: EngagementStatus.ON_HOLD,
      page: 1,
      perPage: 20,
      sortBy: "createdAt",
      sortOrder: "desc",
    } as any);

    const findManyArg = db.engagement.findMany.mock.calls[0][0];
    expect(findManyArg.where).toMatchObject({
      isPrivate: false,
    });
    expect(findManyArg.where.AND).toEqual(
      expect.arrayContaining([
        { status: EngagementStatus.ON_HOLD },
        { status: { notIn: [EngagementStatus.ON_HOLD] } },
      ]),
    );
    expect(result.data).toEqual([]);
  });

  it("allows includePrivate status=ON_HOLD listings for privileged queries", async () => {
    db.engagement.findMany.mockResolvedValue([]);
    db.engagement.count.mockResolvedValue(0);

    await service.findAll({
      includePrivate: true,
      status: EngagementStatus.ON_HOLD,
      page: 1,
      perPage: 20,
      sortBy: "createdAt",
      sortOrder: "desc",
    } as any);

    const findManyArg = db.engagement.findMany.mock.calls[0][0];
    expect(findManyArg.where).not.toHaveProperty("isPrivate");
    expect(findManyArg.where.AND).toEqual(
      expect.arrayContaining([{ status: EngagementStatus.ON_HOLD }]),
    );
    expect(findManyArg.where.AND).not.toEqual(
      expect.arrayContaining([
        { status: { notIn: [EngagementStatus.ON_HOLD] } },
      ]),
    );
  });

  it("findAllActive always uses public OPEN-only filtering", async () => {
    db.engagement.findMany.mockResolvedValue([]);

    await service.findAllActive();

    expect(db.engagement.findMany).toHaveBeenCalledWith({
      where: {
        isPrivate: false,
        status: EngagementStatus.OPEN,
      },
      orderBy: { createdAt: "desc" },
    });
  });

  it("sets assignment endDate to now when status is terminated", async () => {
    const now = new Date("2026-02-11T12:00:00.000Z");
    jest.useFakeTimers().setSystemTime(now);

    const tx = {
      engagement: {
        findUnique: jest.fn().mockResolvedValue({
          id: "eng-1",
          isPrivate: false,
          assignments: [],
        }),
      },
      engagementAssignment: {
        findUnique: jest.fn().mockResolvedValue({
          id: "assign-1",
          engagementId: "eng-1",
          status: AssignmentStatus.ASSIGNED,
        }),
        update: jest.fn().mockResolvedValue({
          id: "assign-1",
          engagementId: "eng-1",
          status: AssignmentStatus.TERMINATED,
          endDate: now,
          terminationReason: "Client request",
        }),
      },
    };

    db.$transaction.mockImplementation((callback: any) => callback(tx));

    await service.updateAssignmentStatus(
      "eng-1",
      "assign-1",
      AssignmentStatus.TERMINATED,
      "  Client request  ",
    );

    const updateArgs = tx.engagementAssignment.update.mock.calls[0][0];
    expect(updateArgs).toMatchObject({
      where: { id: "assign-1" },
      data: {
        status: AssignmentStatus.TERMINATED,
        terminationReason: "Client request",
      },
    });
    expect(updateArgs.data.endDate).toBeInstanceOf(Date);
    expect(updateArgs.data.endDate.toISOString()).toBe(now.toISOString());
  });

  it("sets assignment endDate to now when status is completed", async () => {
    const now = new Date("2026-02-11T13:00:00.000Z");
    jest.useFakeTimers().setSystemTime(now);

    const tx = {
      engagement: {
        findUnique: jest.fn().mockResolvedValue({
          id: "eng-1",
          isPrivate: false,
          assignments: [],
        }),
      },
      engagementAssignment: {
        findUnique: jest.fn().mockResolvedValue({
          id: "assign-1",
          engagementId: "eng-1",
          status: AssignmentStatus.ASSIGNED,
        }),
        update: jest.fn().mockResolvedValue({
          id: "assign-1",
          engagementId: "eng-1",
          status: AssignmentStatus.COMPLETED,
          endDate: now,
        }),
      },
    };

    db.$transaction.mockImplementation((callback: any) => callback(tx));

    await service.updateAssignmentStatus(
      "eng-1",
      "assign-1",
      AssignmentStatus.COMPLETED,
    );

    const updateArgs = tx.engagementAssignment.update.mock.calls[0][0];
    expect(updateArgs).toMatchObject({
      where: { id: "assign-1" },
      data: {
        status: AssignmentStatus.COMPLETED,
      },
    });
    expect(updateArgs.data.endDate).toBeInstanceOf(Date);
    expect(updateArgs.data.endDate.toISOString()).toBe(now.toISOString());
  });

  it("does not set assignment endDate when status is neither completed nor terminated", async () => {
    const tx = {
      engagement: {
        findUnique: jest.fn().mockResolvedValue({
          id: "eng-1",
          isPrivate: false,
          assignments: [],
        }),
      },
      engagementAssignment: {
        findUnique: jest.fn().mockResolvedValue({
          id: "assign-1",
          engagementId: "eng-1",
          status: AssignmentStatus.ASSIGNED,
        }),
        update: jest.fn().mockResolvedValue({
          id: "assign-1",
          engagementId: "eng-1",
          status: AssignmentStatus.OFFER_REJECTED,
        }),
      },
    };

    db.$transaction.mockImplementation((callback: any) => callback(tx));

    await service.updateAssignmentStatus(
      "eng-1",
      "assign-1",
      AssignmentStatus.OFFER_REJECTED,
    );

    const updateArgs = tx.engagementAssignment.update.mock.calls[0][0];
    expect(updateArgs).toMatchObject({
      where: { id: "assign-1" },
      data: {
        status: AssignmentStatus.OFFER_REJECTED,
      },
    });
    expect(updateArgs.data).not.toHaveProperty("endDate");
  });

  it("calculates assignment agreement rates with fractional standard hours", () => {
    expect((service as any).calculateAssignmentAgreementRate("10.5", 7.5)).toBe(
      "393.75",
    );
  });

  it("calculates assignment agreement rate for high precision standard hours", () => {
    expect(
      (service as any).calculateAssignmentAgreementRate("10.5", 7.555),
    ).toBe("396.59");
  });

  it("throws BadRequestException when removing an engagement with assignment history", async () => {
    jest.spyOn(service, "findOne").mockResolvedValue({ id: "eng-1" } as any);
    db.engagementAssignment.count.mockResolvedValue(1);

    await expect(service.remove("eng-1")).rejects.toBeInstanceOf(
      BadRequestException,
    );

    expect(db.engagement.delete).not.toHaveBeenCalled();
  });

  it("deletes an engagement when there is no assignment history", async () => {
    jest.spyOn(service, "findOne").mockResolvedValue({ id: "eng-1" } as any);
    db.engagementAssignment.count.mockResolvedValue(0);

    await service.remove("eng-1");

    expect(db.engagement.delete).toHaveBeenCalledWith({
      where: { id: "eng-1" },
    });
  });

  it("terminates an active assignment instead of deleting it", async () => {
    const now = new Date("2026-02-12T10:00:00.000Z");
    jest.useFakeTimers().setSystemTime(now);

    const tx = {
      engagement: {
        findUnique: jest.fn().mockResolvedValue({
          id: "eng-1",
          isPrivate: false,
          assignments: [
            {
              id: "assign-1",
              status: AssignmentStatus.ASSIGNED,
            },
          ],
        }),
      },
      engagementAssignment: {
        findUnique: jest.fn().mockResolvedValue({
          id: "assign-1",
          engagementId: "eng-1",
          status: AssignmentStatus.ASSIGNED,
        }),
        update: jest.fn().mockResolvedValue({
          id: "assign-1",
          engagementId: "eng-1",
          status: AssignmentStatus.TERMINATED,
          endDate: now,
        }),
      },
    };

    db.$transaction.mockImplementation((callback: any) => callback(tx));

    await service.removeAssignment("eng-1", "assign-1");

    expect(tx.engagementAssignment.update).toHaveBeenCalledWith({
      where: { id: "assign-1" },
      data: {
        status: AssignmentStatus.TERMINATED,
        endDate: now,
      },
    });
  });

  it("terminates the final active assignment on private engagements", async () => {
    const now = new Date("2026-02-12T10:00:00.000Z");
    jest.useFakeTimers().setSystemTime(now);

    const tx = {
      engagement: {
        findUnique: jest.fn().mockResolvedValue({
          id: "eng-1",
          isPrivate: true,
          assignments: [
            {
              id: "assign-1",
              status: AssignmentStatus.ASSIGNED,
            },
          ],
        }),
      },
      engagementAssignment: {
        findUnique: jest.fn().mockResolvedValue({
          id: "assign-1",
          engagementId: "eng-1",
          status: AssignmentStatus.ASSIGNED,
        }),
        update: jest.fn().mockResolvedValue({
          id: "assign-1",
          engagementId: "eng-1",
          status: AssignmentStatus.TERMINATED,
          endDate: now,
        }),
      },
    };

    db.$transaction.mockImplementation((callback: any) => callback(tx));

    await service.removeAssignment("eng-1", "assign-1");

    expect(tx.engagementAssignment.update).toHaveBeenCalledWith({
      where: { id: "assign-1" },
      data: {
        status: AssignmentStatus.TERMINATED,
        endDate: now,
      },
    });
  });

  it("excludes configured ignored projects from Flexi engagement summaries", async () => {
    process.env[FLEXI_TALENT_IGNORED_PROJECT_IDS_ENV] =
      "38965, 1001006, 38965, ";
    service = createService();
    db.engagement.count
      .mockResolvedValueOnce(12)
      .mockResolvedValueOnce(7)
      .mockResolvedValueOnce(5);

    const result = await service.getFlexiEngagementSummary();

    expect(db.engagement.count).toHaveBeenNthCalledWith(1, {
      where: {
        projectId: { notIn: ["38965", "1001006"] },
        AND: [
          {
            status: {
              in: [EngagementStatus.ACTIVE, EngagementStatus.CLOSED],
            },
          },
        ],
      },
    });
    expect(db.engagement.count).toHaveBeenNthCalledWith(2, {
      where: {
        projectId: { notIn: ["38965", "1001006"] },
        AND: [{ status: { in: [EngagementStatus.ACTIVE] } }],
      },
    });
    expect(db.engagement.count).toHaveBeenNthCalledWith(3, {
      where: {
        projectId: { notIn: ["38965", "1001006"] },
        AND: [{ status: { in: [EngagementStatus.CLOSED] } }],
      },
    });
    expect(result).toEqual({ total: 12, active: 7, closed: 5 });
  });

  it("filters ignored projects from Flexi engagement name lists and project search matches", async () => {
    process.env[FLEXI_TALENT_IGNORED_PROJECT_IDS_ENV] = "38965,1001006";
    service = createService();
    projectService.searchFlexiProjectIdsByName.mockResolvedValue([
      "38965",
      "project-platform",
      "1001006",
    ]);
    db.engagement.findMany.mockResolvedValue([]);
    db.engagement.count.mockResolvedValue(0);

    await service.getFlexiEngagementList({
      bucket: FlexiEngagementBucket.Total,
      searchText: "platform",
      sortBy: FlexiEngagementSortBy.Name,
      sortOrder: "asc",
      page: 1,
      perPage: 20,
    } as FlexiEngagementListQueryDto);

    expect(db.engagement.findMany.mock.calls[0][0].where).toEqual({
      projectId: { notIn: ["38965", "1001006"] },
      AND: [
        {
          status: {
            in: [EngagementStatus.ACTIVE, EngagementStatus.CLOSED],
          },
        },
        {
          OR: [
            {
              title: {
                contains: "platform",
                mode: "insensitive",
              },
            },
            { projectId: { in: ["project-platform"] } },
          ],
        },
      ],
    });
  });

  it("uses shared count filters and ignored-project SQL for Flexi engagement member-count lists", async () => {
    process.env[FLEXI_TALENT_IGNORED_PROJECT_IDS_ENV] = "38965,1001006";
    service = createService();
    db.engagement.count.mockResolvedValue(0);
    db.$queryRaw.mockResolvedValueOnce([]);

    await service.getFlexiEngagementList({
      bucket: FlexiEngagementBucket.Total,
      sortBy: FlexiEngagementSortBy.MemberCount,
      sortOrder: "desc",
      page: 1,
      perPage: 20,
    } as FlexiEngagementListQueryDto);

    const pageQuery = db.$queryRaw.mock.calls[0][0];

    expect(db.engagement.count).toHaveBeenCalledWith({
      where: {
        projectId: { notIn: ["38965", "1001006"] },
        AND: [
          {
            status: {
              in: [EngagementStatus.ACTIVE, EngagementStatus.CLOSED],
            },
          },
        ],
      },
    });
    expect(db.$queryRaw).toHaveBeenCalledTimes(1);
    expect(normalizeSql(pageQuery)).toContain('e."projectId" NOT IN');
    expect(normalizeSql(pageQuery)).toContain('e."status" IN');
    expect(getSqlValues(pageQuery)).toEqual(
      expect.arrayContaining([
        EngagementStatus.ACTIVE,
        EngagementStatus.CLOSED,
        "38965",
        "1001006",
      ]),
    );
  });

  it("returns not found for ignored Flexi engagement details", async () => {
    process.env[FLEXI_TALENT_IGNORED_PROJECT_IDS_ENV] = "38965,1001006";
    service = createService();
    db.engagement.findUnique.mockResolvedValue({
      ...buildFlexiEngagement({ projectId: "38965" }),
      assignments: [],
    });

    await expect(
      service.getFlexiEngagementDetail("eng-ignored"),
    ).rejects.toThrow("Engagement not found.");
    expect(projectService.getProjectNamesByIds).not.toHaveBeenCalled();
    expect(skillsService.getSkillNamesByIds).not.toHaveBeenCalled();
  });

  it("returns not found for non-active and non-closed Flexi engagement details", async () => {
    db.engagement.findUnique.mockResolvedValue({
      ...buildFlexiEngagement({ status: EngagementStatus.ON_HOLD }),
      assignments: [],
    });

    await expect(
      service.getFlexiEngagementDetail("eng-on-hold"),
    ).rejects.toThrow("Engagement not found.");
    expect(projectService.getProjectNamesByIds).not.toHaveBeenCalled();
    expect(skillsService.getSkillNamesByIds).not.toHaveBeenCalled();
  });

  it("lists Flexi engagements by name with bucket, project search, and top-level pagination", async () => {
    const query = {
      bucket: FlexiEngagementBucket.Active,
      searchText: "  platform  ",
      sortBy: FlexiEngagementSortBy.Name,
      sortOrder: "desc",
      page: 2,
      perPage: 2,
    } as FlexiEngagementListQueryDto;
    const expectedWhere = {
      AND: [
        { status: { in: [EngagementStatus.ACTIVE] } },
        {
          OR: [
            {
              title: {
                contains: "platform",
                mode: "insensitive",
              },
            },
            { projectId: { in: ["project-platform"] } },
          ],
        },
      ],
    };

    projectService.searchFlexiProjectIdsByName.mockResolvedValue([
      "project-platform",
    ]);
    projectService.getProjectNamesByIds.mockResolvedValue(
      new Map([
        ["project-platform", "Platform Modernization"],
        ["project-title", "Platform API"],
      ]),
    );
    db.engagement.findMany.mockResolvedValue([
      {
        id: "eng-zeta",
        projectId: "project-platform",
        title: "Zeta Engagement",
        status: EngagementStatus.ACTIVE,
        requiredMemberCount: 3,
        _count: { assignments: 2 },
      },
      {
        id: "eng-active",
        projectId: "project-title",
        title: "Platform API",
        status: EngagementStatus.ACTIVE,
        requiredMemberCount: 1,
        _count: { assignments: 1 },
      },
    ]);
    db.engagement.count.mockResolvedValue(5);

    const result = await service.getFlexiEngagementList(query);

    expect(projectService.searchFlexiProjectIdsByName).toHaveBeenCalledWith(
      "platform",
    );
    expect(db.engagement.findMany).toHaveBeenCalledWith({
      where: expectedWhere,
      select: {
        id: true,
        projectId: true,
        title: true,
        status: true,
        requiredMemberCount: true,
        _count: {
          select: {
            assignments: {
              where: {
                status: {
                  in: [AssignmentStatus.SELECTED, AssignmentStatus.ASSIGNED],
                },
              },
            },
          },
        },
      },
      orderBy: [{ title: "desc" }, { id: "asc" }],
      skip: 2,
      take: 2,
    });
    expect(db.engagement.count).toHaveBeenCalledWith({
      where: expectedWhere,
    });
    expect(result).toEqual({
      data: [
        {
          engagementId: "eng-zeta",
          projectId: "project-platform",
          projectName: "Platform Modernization",
          engagementTitle: "Zeta Engagement",
          status: EngagementStatus.ACTIVE,
          assignedMemberCount: 2,
          requiredMemberCount: 3,
        },
        {
          engagementId: "eng-active",
          projectId: "project-title",
          projectName: "Platform API",
          engagementTitle: "Platform API",
          status: EngagementStatus.ACTIVE,
          assignedMemberCount: 1,
          requiredMemberCount: 1,
        },
      ],
      page: 2,
      perPage: 2,
      total: 5,
      totalPages: 3,
    });
  });

  it("omits the Flexi engagement project-name search clause when no project IDs match", async () => {
    const query = {
      bucket: FlexiEngagementBucket.Total,
      searchText: "ui",
      sortBy: FlexiEngagementSortBy.Name,
      sortOrder: "asc",
      page: 1,
      perPage: 20,
    } as FlexiEngagementListQueryDto;

    projectService.searchFlexiProjectIdsByName.mockResolvedValue([]);
    db.engagement.findMany.mockResolvedValue([]);
    db.engagement.count.mockResolvedValue(0);

    await service.getFlexiEngagementList(query);

    expect(projectService.searchFlexiProjectIdsByName).toHaveBeenCalledWith(
      "ui",
    );
    expect(db.engagement.findMany.mock.calls[0][0].where).toEqual({
      AND: [
        {
          status: {
            in: [EngagementStatus.ACTIVE, EngagementStatus.CLOSED],
          },
        },
        {
          OR: [
            {
              title: {
                contains: "ui",
                mode: "insensitive",
              },
            },
          ],
        },
      ],
    });
  });

  it("lists Flexi engagements by member count through raw paging", async () => {
    const query = {
      bucket: FlexiEngagementBucket.Closed,
      searchText: "Cloud",
      sortBy: FlexiEngagementSortBy.MemberCount,
      sortOrder: "desc",
      page: 2,
      perPage: 1,
    } as FlexiEngagementListQueryDto;

    projectService.searchFlexiProjectIdsByName.mockResolvedValue([
      "project-cloud",
    ]);
    projectService.getProjectNamesByIds.mockResolvedValue(
      new Map([["project-cloud", "Cloud Operations"]]),
    );
    db.engagement.count.mockResolvedValue(3);
    db.$queryRaw.mockResolvedValueOnce([
      {
        id: "eng-cloud",
        projectId: "project-cloud",
        title: "Cloud Migration",
        status: EngagementStatus.CLOSED,
        requiredMemberCount: 4,
        assignedMemberCount: "7",
      },
    ]);

    const result = await service.getFlexiEngagementList(query);

    expect(db.engagement.findMany).not.toHaveBeenCalled();
    expect(db.engagement.count).toHaveBeenCalledWith({
      where: {
        AND: [
          {
            status: {
              in: [EngagementStatus.CLOSED],
            },
          },
          {
            OR: [
              {
                title: {
                  contains: "Cloud",
                  mode: "insensitive",
                },
              },
              { projectId: { in: ["project-cloud"] } },
            ],
          },
        ],
      },
    });
    expect(db.$queryRaw).toHaveBeenCalledTimes(1);
    expect(projectService.searchFlexiProjectIdsByName).toHaveBeenCalledWith(
      "Cloud",
    );

    const pageQuery = db.$queryRaw.mock.calls[0][0];
    const pageSql = normalizeSql(pageQuery);

    expect(pageSql).toContain('COUNT(a."id")::int AS "assignedMemberCount"');
    expect(pageSql).toContain('e."status" IN');
    expect(pageSql).toContain('e."title" ILIKE');
    expect(pageSql).toContain('e."projectId" IN');
    expect(pageSql).toContain(
      'ORDER BY "assignedMemberCount" DESC, e."title" ASC, e."id" ASC',
    );
    expect(getSqlValues(pageQuery)).toEqual(
      expect.arrayContaining([
        AssignmentStatus.SELECTED,
        AssignmentStatus.ASSIGNED,
        EngagementStatus.CLOSED,
        "%Cloud%",
        "project-cloud",
        1,
        1,
      ]),
    );
    expect(result).toEqual({
      data: [
        {
          engagementId: "eng-cloud",
          projectId: "project-cloud",
          projectName: "Cloud Operations",
          engagementTitle: "Cloud Migration",
          status: EngagementStatus.CLOSED,
          assignedMemberCount: 7,
          requiredMemberCount: 4,
        },
      ],
      page: 2,
      perPage: 1,
      total: 3,
      totalPages: 3,
    });
  });

  it("excludes ignored project assignments from Flexi member summaries", async () => {
    process.env[FLEXI_TALENT_IGNORED_PROJECT_IDS_ENV] = "38965,1001006";
    service = createService();
    db.engagementAssignment.findMany.mockResolvedValue([]);

    const result = await service.getFlexiMemberSummary();

    expect(db.engagementAssignment.findMany).toHaveBeenCalledWith({
      where: {
        status: {
          in: [AssignmentStatus.ASSIGNED, AssignmentStatus.COMPLETED],
        },
        engagement: {
          status: {
            in: [EngagementStatus.ACTIVE, EngagementStatus.CLOSED],
          },
          projectId: {
            notIn: ["38965", "1001006"],
          },
        },
      },
      select: {
        memberId: true,
        status: true,
      },
    });
    expect(result).toEqual({
      totalUniqueMembers: 0,
      assignedMembers: 0,
      completedMembers: 0,
    });
  });

  it("counts only assigned and completed Flexi members", async () => {
    db.engagementAssignment.findMany.mockResolvedValue([
      { memberId: "member-assigned", status: AssignmentStatus.ASSIGNED },
      { memberId: "member-completed", status: AssignmentStatus.COMPLETED },
      { memberId: "member-both", status: AssignmentStatus.ASSIGNED },
      { memberId: "member-both", status: AssignmentStatus.COMPLETED },
    ]);

    const result = await service.getFlexiMemberSummary();

    expect(db.engagementAssignment.findMany).toHaveBeenCalledWith({
      where: {
        status: {
          in: [AssignmentStatus.ASSIGNED, AssignmentStatus.COMPLETED],
        },
        engagement: {
          status: {
            in: [EngagementStatus.ACTIVE, EngagementStatus.CLOSED],
          },
        },
      },
      select: {
        memberId: true,
        status: true,
      },
    });
    expect(result).toEqual({
      totalUniqueMembers: 3,
      assignedMembers: 2,
      completedMembers: 1,
    });
  });

  it("excludes ignored project assignments from Flexi member list SQL", async () => {
    process.env[FLEXI_TALENT_IGNORED_PROJECT_IDS_ENV] = "38965,1001006";
    service = createService();
    db.$queryRaw
      .mockResolvedValueOnce([{ total: 0n }])
      .mockResolvedValueOnce([]);

    await service.getFlexiMemberList(new FlexiMemberListQueryDto());

    const countQuery = db.$queryRaw.mock.calls[0][0];
    const pageQuery = db.$queryRaw.mock.calls[1][0];

    expect(normalizeSql(countQuery)).toContain('e."projectId" NOT IN');
    expect(normalizeSql(pageQuery)).toContain('e."projectId" NOT IN');
    expect(normalizeSql(countQuery)).toContain('e."status" IN');
    expect(normalizeSql(pageQuery)).toContain('e."status" IN');
    expect(getSqlValues(countQuery)).toEqual(
      expect.arrayContaining([
        EngagementStatus.ACTIVE,
        EngagementStatus.CLOSED,
        "38965",
        "1001006",
      ]),
    );
    expect(getSqlValues(pageQuery)).toEqual(
      expect.arrayContaining([
        EngagementStatus.ACTIVE,
        EngagementStatus.CLOSED,
        "38965",
        "1001006",
      ]),
    );
    expect(getSqlValues(countQuery)).toEqual(
      expect.arrayContaining([
        AssignmentStatus.ASSIGNED,
        AssignmentStatus.COMPLETED,
      ]),
    );
    expect(getSqlValues(pageQuery)).toEqual(
      expect.arrayContaining([
        AssignmentStatus.ASSIGNED,
        AssignmentStatus.COMPLETED,
      ]),
    );
    [
      AssignmentStatus.SELECTED,
      AssignmentStatus.OFFER_REJECTED,
      AssignmentStatus.TERMINATED,
    ].forEach((status) => {
      expect(getSqlValues(countQuery)).not.toContain(status);
      expect(getSqlValues(pageQuery)).not.toContain(status);
    });
  });

  it("excludes ignored project assignments from Flexi member detail lookups", async () => {
    process.env[FLEXI_TALENT_IGNORED_PROJECT_IDS_ENV] = "38965,1001006";
    service = createService();
    db.engagementAssignment.findMany.mockResolvedValue([]);

    await expect(
      service.getFlexiMemberDetail("member-ignored"),
    ).rejects.toThrow("Member assignment history not found.");
    expect(db.engagementAssignment.findMany).toHaveBeenCalledWith({
      where: {
        status: {
          in: [AssignmentStatus.ASSIGNED, AssignmentStatus.COMPLETED],
        },
        engagement: {
          status: {
            in: [EngagementStatus.ACTIVE, EngagementStatus.CLOSED],
          },
          projectId: {
            notIn: ["38965", "1001006"],
          },
        },
        memberId: "member-ignored",
      },
      include: {
        engagement: true,
      },
    });
  });

  it("defaults Flexi member list requests to handle ascending", async () => {
    const query = new FlexiMemberListQueryDto();

    expect(query).toMatchObject({
      bucket: FlexiMemberBucket.Total,
      sortBy: FlexiMemberSortBy.Handle,
      sortOrder: "asc",
      page: 1,
      perPage: 20,
    });

    jest.useFakeTimers().setSystemTime(new Date("2026-07-08T00:00:00.000Z"));
    projectService.getProjectNamesByIds.mockResolvedValue(
      new Map([
        ["project-alpha", "Alpha Project"],
        ["project-beta", "Beta Project"],
      ]),
    );
    db.$queryRaw.mockResolvedValueOnce([{ total: 2n }]).mockResolvedValueOnce([
      buildFlexiMemberSqlRow({
        assignmentId: "assignment-alpha",
        engagementId: "eng-alpha",
        memberId: "member-alpha",
        memberHandle: "alpha",
        engagementProjectId: "project-alpha",
        engagementTitle: "Alpha Engagement",
        daysRemaining: "84",
      }),
      buildFlexiMemberSqlRow({
        assignmentId: "assignment-beta",
        engagementId: "eng-beta",
        memberId: "member-beta",
        memberHandle: "beta",
        engagementProjectId: "project-beta",
        engagementTitle: "Beta Engagement",
        daysRemaining: 24n,
      }),
    ]);

    const result = await service.getFlexiMemberList(query);

    const pageQuery = db.$queryRaw.mock.calls[1][0];
    const pageSql = normalizeSql(pageQuery);

    expect(db.engagementAssignment.findMany).not.toHaveBeenCalled();
    expect(db.$queryRaw).toHaveBeenCalledTimes(2);
    expect(pageSql).toContain(
      'HAVING BOOL_OR("isCurrent") OR BOOL_OR("isCompletion")',
    );
    expect(pageSql).toContain(
      'ORDER BY "memberHandle" ASC, "engagementTitle" ASC, "memberHandle" ASC',
    );
    expect(getSqlValues(pageQuery)).toEqual(expect.arrayContaining([0, 20]));
    expect(projectService.getProjectNamesByIds).toHaveBeenCalledWith([
      "project-alpha",
      "project-beta",
    ]);
    expect(result).toMatchObject({
      page: 1,
      perPage: 20,
      total: 2,
      totalPages: 1,
    });
    expect(result.data.map((row) => row.handle)).toEqual(["alpha", "beta"]);
    expect(result.data.map((row) => row.primaryProjectName)).toEqual([
      "Alpha Project",
      "Beta Project",
    ]);
    expect(result.data.map((row) => row.daysRemaining)).toEqual([84, 24]);
  });

  it("keeps current Flexi members first when total time sorting descends", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-07-08T00:00:00.000Z"));
    db.$queryRaw.mockResolvedValueOnce([{ total: 4n }]).mockResolvedValueOnce([
      buildFlexiMemberSqlRow({
        assignmentId: "assignment-active-long",
        engagementId: "eng-active-long",
        memberId: "member-active-long",
        memberHandle: "active-long",
        engagementTitle: "Active Long",
        daysRemaining: 84,
      }),
      buildFlexiMemberSqlRow({
        assignmentId: "assignment-active-short",
        engagementId: "eng-active-short",
        memberId: "member-active-short",
        memberHandle: "active-short",
        engagementTitle: "Active Short",
        daysRemaining: 24,
      }),
      buildFlexiMemberSqlRow({
        assignmentId: "assignment-completed-old",
        engagementId: "eng-completed-old",
        memberId: "member-completed-old",
        memberHandle: "completed-old",
        status: AssignmentStatus.COMPLETED,
        engagementTitle: "Completed Old",
        isCurrentlyAssigned: false,
        daysRemaining: null,
        latestCompletedAt: new Date("2026-01-01T00:00:00.000Z"),
      }),
      buildFlexiMemberSqlRow({
        assignmentId: "assignment-completed-recent",
        engagementId: "eng-completed-recent",
        memberId: "member-completed-recent",
        memberHandle: "completed-recent",
        status: AssignmentStatus.COMPLETED,
        engagementTitle: "Completed Recent",
        isCurrentlyAssigned: false,
        daysRemaining: null,
        latestCompletedAt: new Date("2026-06-01T00:00:00.000Z"),
      }),
    ]);

    const result = await service.getFlexiMemberList({
      bucket: FlexiMemberBucket.Total,
      sortBy: FlexiMemberSortBy.Time,
      sortOrder: "desc",
      page: 1,
      perPage: 20,
    });

    const pageSql = normalizeSql(db.$queryRaw.mock.calls[1][0]);

    expect(pageSql).toContain('CASE WHEN "hasCurrent" THEN 0 ELSE 1 END ASC');
    expect(pageSql).toContain(
      'CASE WHEN "hasCurrent" THEN "daysRemaining" ELSE NULL END DESC',
    );
    expect(pageSql).toContain(
      'CASE WHEN NOT "hasCurrent" THEN "latestCompletedAt" ELSE NULL END ASC',
    );
    expect(result.data.map((row) => row.handle)).toEqual([
      "active-long",
      "active-short",
      "completed-old",
      "completed-recent",
    ]);
    expect(result).toMatchObject({
      page: 1,
      perPage: 20,
      total: 4,
      totalPages: 1,
    });
  });

  it("applies Flexi member completed bucket, handle search, and raw page bounds", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-07-08T00:00:00.000Z"));
    db.$queryRaw.mockResolvedValueOnce([{ total: 5n }]).mockResolvedValueOnce([
      buildFlexiMemberSqlRow({
        assignmentId: "assignment-match",
        engagementId: "eng-match",
        memberId: "member-match",
        memberHandle: "zeta-match",
        status: AssignmentStatus.COMPLETED,
        engagementProjectId: "project-match",
        engagementTitle: "Matched Engagement",
        isCurrentlyAssigned: false,
        daysRemaining: null,
        latestCompletedAt: new Date("2026-05-01T00:00:00.000Z"),
      }),
    ]);

    const result = await service.getFlexiMemberList({
      bucket: FlexiMemberBucket.Completed,
      searchText: " match ",
      sortBy: FlexiMemberSortBy.Handle,
      sortOrder: "desc",
      page: 2,
      perPage: 2,
    });

    const countQuery = db.$queryRaw.mock.calls[0][0];
    const pageQuery = db.$queryRaw.mock.calls[1][0];
    const countSql = normalizeSql(countQuery);
    const pageSql = normalizeSql(pageQuery);

    expect(countSql).toContain('a."memberHandle" ILIKE');
    expect(pageSql).toContain(
      'HAVING BOOL_OR("isCompletion") AND NOT BOOL_OR("isCurrent")',
    );
    expect(pageSql).toContain(
      'ORDER BY "memberHandle" DESC, "engagementTitle" ASC',
    );
    expect(getSqlValues(countQuery)).toEqual(
      expect.arrayContaining(["%match%"]),
    );
    expect(getSqlValues(pageQuery)).toEqual(
      expect.arrayContaining(["%match%", 2, 2]),
    );
    expect(result).toMatchObject({
      page: 2,
      perPage: 2,
      total: 5,
      totalPages: 3,
    });
    expect(result.data.map((row) => row.handle)).toEqual(["zeta-match"]);
  });

  it("uses assigned and completed assignments for Flexi member detail and history", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-07-08T00:00:00.000Z"));

    const completedAssignment = buildFlexiAssignment({
      id: "assignment-completed",
      memberId: "member-priority",
      memberHandle: "priorityMember",
      status: AssignmentStatus.COMPLETED,
      startDate: new Date("2026-01-01T00:00:00.000Z"),
      endDate: new Date("2026-04-01T00:00:00.000Z"),
      durationMonths: 3,
      engagement: buildFlexiEngagement({
        id: "eng-completed",
        projectId: "project-completed",
        title: "Completed Engagement",
      }),
    });
    const assignedAssignment = buildFlexiAssignment({
      id: "assignment-assigned",
      memberId: "member-priority",
      memberHandle: "priorityMember",
      status: AssignmentStatus.ASSIGNED,
      startDate: new Date("2026-06-07T00:00:00.000Z"),
      durationMonths: 12,
      engagement: buildFlexiEngagement({
        id: "eng-assigned",
        projectId: "project-assigned",
        title: "Assigned Engagement",
      }),
    });
    db.engagementAssignment.findMany.mockResolvedValue([
      completedAssignment,
      assignedAssignment,
    ]);

    const detail = await service.getFlexiMemberDetail("member-priority");
    const history = await service.getFlexiMemberHistory("member-priority");

    expect(detail).toMatchObject({
      assignmentId: "assignment-assigned",
      status: AssignmentStatus.ASSIGNED,
      displayStatusLabel: "Assigned",
      engagementTitle: "Assigned Engagement",
    });
    expect(history.data.map((row) => row.assignmentId)).toEqual([
      "assignment-assigned",
      "assignment-completed",
    ]);
    expect(history.data.map((row) => row.displayStatusLabel)).toEqual([
      "Assigned",
      "Completed",
    ]);
    expect(db.engagementAssignment.findMany).toHaveBeenLastCalledWith({
      where: {
        status: {
          in: [AssignmentStatus.ASSIGNED, AssignmentStatus.COMPLETED],
        },
        engagement: {
          status: {
            in: [EngagementStatus.ACTIVE, EngagementStatus.CLOSED],
          },
        },
        memberId: "member-priority",
      },
      include: {
        engagement: true,
      },
    });
  });

  it("restricts Flexi member list SQL to assigned and completed statuses", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-07-08T00:00:00.000Z"));
    db.$queryRaw.mockResolvedValueOnce([{ total: 1n }]).mockResolvedValueOnce([
      buildFlexiMemberSqlRow({
        assignmentId: "assignment-assigned",
        status: AssignmentStatus.ASSIGNED,
      }),
    ]);

    await service.getFlexiMemberList({
      bucket: FlexiMemberBucket.Total,
      sortBy: FlexiMemberSortBy.Handle,
      sortOrder: "asc",
      page: 1,
      perPage: 20,
    });

    const pageQuery = db.$queryRaw.mock.calls[1][0];
    const values = getSqlValues(pageQuery);

    expect(values).toEqual(
      expect.arrayContaining([
        AssignmentStatus.ASSIGNED,
        AssignmentStatus.COMPLETED,
      ]),
    );
    [
      AssignmentStatus.SELECTED,
      AssignmentStatus.OFFER_REJECTED,
      AssignmentStatus.TERMINATED,
    ].forEach((status) => {
      expect(values).not.toContain(status);
    });
  });

  it("does not derive Flexi timing from engagement duration fallback", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-07-08T00:00:00.000Z"));

    const assignment = buildFlexiAssignment({
      id: "assignment-missing-duration",
      memberId: "member-missing-duration",
      memberHandle: "missingDuration",
      startDate: new Date("2026-01-01T00:00:00.000Z"),
      durationMonths: null,
      engagement: buildFlexiEngagement({
        id: "eng-missing-duration",
        projectId: "project-missing-duration",
        title: "Missing Assignment Duration",
        durationMonths: 1,
        requiredSkills: ["skill-1"],
      }),
    });
    db.engagementAssignment.findMany.mockResolvedValue([assignment]);
    skillsService.getSkillNamesByIds.mockResolvedValue(
      new Map([["skill-1", "Skill One"]]),
    );

    const detail = await service.getFlexiMemberDetail(
      "member-missing-duration",
    );
    const history = await service.getFlexiMemberHistory(
      "member-missing-duration",
    );

    expect(detail).toMatchObject({
      resolvedEndDate: null,
      timeLeftDays: null,
      isOverdue: false,
      durationMonths: 1,
      durationLabel: "1 month",
    });
    expect(history.data[0]).toMatchObject({
      resolvedEndDate: null,
      timeLeftDays: null,
      isOverdue: false,
      completedAt: null,
      durationMonths: 1,
      durationLabel: "1 month",
    });
  });

  it("selects the latest completed Flexi assignment", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-07-08T00:00:00.000Z"));

    const olderCompletedAt = new Date("2026-04-21T12:00:00.000Z");
    const completedAt = new Date("2026-06-01T00:00:00.000Z");
    const olderCompletedAssignment = buildFlexiAssignment({
      id: "assignment-completed-older",
      memberId: "member-terminal",
      memberHandle: "terminalMember",
      status: AssignmentStatus.COMPLETED,
      startDate: new Date("2026-04-21T00:00:00.000Z"),
      endDate: olderCompletedAt,
      durationMonths: 12,
      updatedAt: olderCompletedAt,
      engagement: buildFlexiEngagement({
        id: "eng-completed-older",
        title: "Older Completed Engagement",
      }),
    });
    const completedAssignment = buildFlexiAssignment({
      id: "assignment-completed",
      memberId: "member-terminal",
      memberHandle: "terminalMember",
      status: AssignmentStatus.COMPLETED,
      endDate: completedAt,
      updatedAt: completedAt,
      engagement: buildFlexiEngagement({
        id: "eng-completed",
        title: "Completed Engagement",
      }),
    });
    db.engagementAssignment.findMany.mockResolvedValue([
      olderCompletedAssignment,
      completedAssignment,
    ]);

    const detail = await service.getFlexiMemberDetail("member-terminal");
    const history = await service.getFlexiMemberHistory("member-terminal");

    expect(detail.assignmentId).toBe("assignment-completed");
    expect(history.data.map((row) => row.assignmentId)).toEqual([
      "assignment-completed",
      "assignment-completed-older",
    ]);
    expect(history.data[1].completedAt?.toISOString()).toBe(
      olderCompletedAt.toISOString(),
    );
    expect(history.data[1].resolvedEndDate?.toISOString()).toBe(
      olderCompletedAt.toISOString(),
    );
  });

  it("keeps member time sorting stable when assignment duration is missing", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-07-08T00:00:00.000Z"));
    db.$queryRaw.mockResolvedValueOnce([{ total: 2n }]).mockResolvedValueOnce([
      buildFlexiMemberSqlRow({
        assignmentId: "assignment-alpha",
        engagementId: "eng-alpha",
        memberId: "member-alpha",
        memberHandle: "alpha",
        engagementTitle: "A Engagement",
        daysRemaining: null,
      }),
      buildFlexiMemberSqlRow({
        assignmentId: "assignment-beta",
        engagementId: "eng-beta",
        memberId: "member-beta",
        memberHandle: "beta",
        engagementTitle: "B Engagement",
        daysRemaining: null,
      }),
    ]);

    const result = await service.getFlexiMemberList({
      bucket: FlexiMemberBucket.Assigned,
      sortBy: FlexiMemberSortBy.Time,
      sortOrder: "asc",
      page: 1,
      perPage: 20,
    });
    const pageSql = normalizeSql(db.$queryRaw.mock.calls[1][0]);

    expect(db.engagementAssignment.findMany).not.toHaveBeenCalled();
    expect(pageSql).toContain('HAVING BOOL_OR("isCurrent")');
    expect(pageSql).toContain(
      'CASE WHEN "hasCurrent" THEN "daysRemaining" ELSE NULL END ASC',
    );
    expect(result.data.map((row) => row.handle)).toEqual(["alpha", "beta"]);
    expect(result.data.map((row) => row.daysRemaining)).toEqual([null, null]);
  });
});
