import { BadRequestException } from "@nestjs/common";
import { AssignmentStatus, EngagementStatus } from "@prisma/client";
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
    };
  };
  let projectService: {
    getProjectNamesByIds: jest.Mock;
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
      },
    };
    projectService = {
      getProjectNamesByIds: jest.fn().mockResolvedValue(new Map()),
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
