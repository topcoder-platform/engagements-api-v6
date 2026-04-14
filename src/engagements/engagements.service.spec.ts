import { BadRequestException } from "@nestjs/common";
import { AssignmentStatus, EngagementStatus } from "@prisma/client";
import { ERROR_MESSAGES } from "../common/constants";
import { EngagementsService } from "./engagements.service";

jest.mock("nanoid", () => ({
  nanoid: () => "test-id",
}));

describe("EngagementsService", () => {
  let service: EngagementsService;
  let db: {
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
      findUnique: jest.Mock;
    };
  };
  let projectService: {
    getMemberProjectIdsForUser: jest.Mock;
    getProjectNamesByIds: jest.Mock;
    hasBillingAccountAssigned: jest.Mock;
    validateProjectExists: jest.Mock;
  };
  let skillsService: { validateSkillsExist: jest.Mock };
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

  const createDto = {
    projectId: "project-1",
    title: "Test Engagement",
    description: "Test description",
    timeZones: ["UTC"],
    countries: ["US"],
    requiredSkills: ["skill-1"],
    anticipatedStart: "IMMEDIATE",
  };

  beforeEach(() => {
    db = {
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
        findUnique: jest.fn(),
      },
    };
    projectService = {
      getMemberProjectIdsForUser: jest.fn().mockResolvedValue([]),
      getProjectNamesByIds: jest.fn().mockResolvedValue(new Map()),
      hasBillingAccountAssigned: jest.fn().mockResolvedValue(false),
      validateProjectExists: jest.fn().mockResolvedValue(true),
    };
    skillsService = {
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
    service = new EngagementsService(
      db as any,
      projectService as any,
      skillsService as any,
      memberService as any,
      eventBusService as any,
      assignmentOfferEmailService as any,
      assignmentOfferResponseEmailService as any,
    );
  });

  afterEach(() => {
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
          },
        },
      },
    });
    expect(result.assignments).toHaveLength(1);
    expect(result.assignments?.[0].memberId).toBe("123456");
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
      standardHoursPerWeek: 40,
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
      projectName: "Platform Modernization",
      engagementTitle: "Senior Frontend Engineer",
      memberId: "123456",
      memberHandle: "testaws1",
      status: AssignmentStatus.ASSIGNED,
      agreementRate: "3020",
      ratePerHour: "75.50",
      standardHoursPerWeek: 40,
      durationMonths: 3,
      otherRemarks: "Complete onboarding within the first week.",
      startDate: new Date("2026-02-12T00:00:00.000Z"),
      endDate: new Date("2026-05-12T00:00:00.000Z"),
    });
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
    expect(
      (service as any).calculateAssignmentAgreementRate("10.5", 37.5),
    ).toBe("393.75");
  });

  it("rejects standardHoursPerWeek values with more than two decimals", () => {
    expect(() =>
      (service as any).calculateAssignmentAgreementRate("10.5", 37.555),
    ).toThrow(
      "standardHoursPerWeek must be a positive number with up to 2 decimal places.",
    );
  });

  it("throws BadRequestException when removing an engagement with active assignments", async () => {
    jest.spyOn(service, "findOne").mockResolvedValue({ id: "eng-1" } as any);
    db.engagementAssignment.count.mockResolvedValue(1);

    await expect(service.remove("eng-1")).rejects.toBeInstanceOf(
      BadRequestException,
    );

    expect(db.engagement.delete).not.toHaveBeenCalled();
  });

  it("deletes an engagement when there are no active assignments", async () => {
    jest.spyOn(service, "findOne").mockResolvedValue({ id: "eng-1" } as any);
    db.engagementAssignment.count.mockResolvedValue(0);

    await service.remove("eng-1");

    expect(db.engagement.delete).toHaveBeenCalledWith({
      where: { id: "eng-1" },
    });
  });
});
