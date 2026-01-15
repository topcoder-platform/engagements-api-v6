import { EngagementsService } from "./engagements.service";

describe("EngagementsService", () => {
  let service: EngagementsService;
  let db: {
    $transaction: jest.Mock;
    engagement: {
      create: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
    };
  };
  let projectService: { validateProjectExists: jest.Mock };
  let skillsService: { validateSkillsExist: jest.Mock };
  let memberService: {
    getMemberHandleByUserId: jest.Mock;
    getMemberUserIdByHandle: jest.Mock;
  };

  const createDto = {
    projectId: "project-1",
    title: "Test Engagement",
    description: "Test description",
    timeZones: ["UTC"],
    countries: ["US"],
    requiredSkills: ["skill-1"],
    applicationDeadline: new Date(
      Date.now() + 60 * 60 * 1000,
    ).toISOString(),
  };

  beforeEach(() => {
    db = {
      $transaction: jest.fn(),
      engagement: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };
    projectService = {
      validateProjectExists: jest.fn().mockResolvedValue(true),
    };
    skillsService = {
      validateSkillsExist: jest.fn().mockResolvedValue({ invalid: [] }),
    };
    memberService = {
      getMemberHandleByUserId: jest.fn(),
      getMemberUserIdByHandle: jest.fn(),
    };
    service = new EngagementsService(
      db as any,
      projectService as any,
      skillsService as any,
      memberService as any,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
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

    db.$transaction.mockImplementation(async (callback: any) =>
      callback(tx),
    );

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
    jest
      .spyOn(service, "findOne")
      .mockResolvedValue(existingEngagement as any);

    const tx = {
      engagement: {
        update: jest.fn().mockResolvedValue(existingEngagement),
      },
    };

    db.$transaction.mockImplementation(async (callback: any) =>
      callback(tx),
    );

    await service.update(
      "eng-1",
      { title: "Updated" } as any,
      { isMachine: true },
    );

    expect(tx.engagement.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ updatedBy: "system" }),
      }),
    );
  });
});
