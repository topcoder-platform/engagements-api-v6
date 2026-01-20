import { ForbiddenException } from "@nestjs/common";
import { ApplicationStatus } from "@prisma/client";
import { ApplicationsService } from "./applications.service";

describe("ApplicationsService", () => {
  let service: ApplicationsService;
  let db: {
    $transaction: jest.Mock;
    engagementApplication: {
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
    };
    engagementAssignment: {
      findUnique: jest.Mock;
      count: jest.Mock;
      create: jest.Mock;
    };
    engagement: {
      findUnique: jest.Mock;
      update: jest.Mock;
    };
  };
  let memberService: {
    getMemberByUserId: jest.Mock;
    getMemberAddress: jest.Mock;
    getMemberHandleByUserId: jest.Mock;
  };
  let engagementsService: {
    findOne: jest.Mock;
    removeAssignment: jest.Mock;
  };
  let eventBusService: { postEvent: jest.Mock };

  const createDto = {
    coverLetter: "I am excited to apply for this engagement.",
  };

  beforeEach(() => {
    db = {
      $transaction: jest.fn(),
      engagementApplication: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      engagementAssignment: {
        findUnique: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
      },
      engagement: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };
    memberService = {
      getMemberByUserId: jest.fn(),
      getMemberAddress: jest.fn(),
      getMemberHandleByUserId: jest.fn(),
    };
    engagementsService = {
      findOne: jest.fn(),
      removeAssignment: jest.fn(),
    };
    eventBusService = {
      postEvent: jest.fn(),
    };
    service = new ApplicationsService(
      db as any,
      memberService as any,
      engagementsService as any,
      eventBusService as any,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("rejects M2M application create", async () => {
    await expect(
      service.create("eng-1", createDto as any, { isMachine: true }),
    ).rejects.toThrow(ForbiddenException);

    expect(db.engagementApplication.create).not.toHaveBeenCalled();
    expect(engagementsService.findOne).not.toHaveBeenCalled();
  });

  it("sets updatedBy to system for M2M status update", async () => {
    const application = {
      id: "app-1",
      engagementId: "eng-1",
      userId: "user-1",
    };
    jest
      .spyOn(service, "findOne")
      .mockResolvedValue(application as any);
    db.engagementApplication.update.mockResolvedValue({
      ...application,
      status: ApplicationStatus.REJECTED,
    });

    await service.updateStatus(
      "app-1",
      ApplicationStatus.REJECTED,
      { isMachine: true },
    );

    expect(db.engagementApplication.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ updatedBy: "system" }),
      }),
    );
  });

  it("does not activate engagement when accepting an application", async () => {
    const application = {
      id: "app-1",
      engagementId: "eng-1",
      userId: "user-1",
      status: ApplicationStatus.SUBMITTED,
    };
    const engagement = {
      id: "eng-1",
      requiredMemberCount: 3,
      requiredSkills: [],
    };
    const updatedEngagement = {
      ...engagement,
      assignments: [],
    };
    const txEngagementUpdate = jest.fn();
    const tx = {
      engagement: {
        findUnique: jest
          .fn()
          .mockResolvedValueOnce(engagement)
          .mockResolvedValueOnce(updatedEngagement),
        update: txEngagementUpdate,
      },
      engagementAssignment: {
        findUnique: jest.fn().mockResolvedValue(null),
        count: jest.fn().mockResolvedValue(0),
        create: jest.fn().mockResolvedValue({ id: "assign-1" }),
      },
    };

    jest
      .spyOn(service, "findOne")
      .mockResolvedValue(application as any);
    memberService.getMemberHandleByUserId.mockResolvedValue(
      "member-handle",
    );
    db.$transaction.mockImplementation(async (callback) =>
      callback(tx),
    );
    db.engagementApplication.update.mockResolvedValue({
      ...application,
      status: ApplicationStatus.ACCEPTED,
    });

    await service.updateStatus(
      "app-1",
      ApplicationStatus.ACCEPTED,
      { userId: "manager-1" },
    );

    expect(txEngagementUpdate).not.toHaveBeenCalled();
  });

  it("removes assignment when accepted application is moved to submitted", async () => {
    const application = {
      id: "app-1",
      engagementId: "eng-1",
      userId: "user-1",
      status: ApplicationStatus.ACCEPTED,
    };
    jest
      .spyOn(service, "findOne")
      .mockResolvedValue(application as any);
    db.engagementAssignment.findUnique.mockResolvedValue({
      id: "assign-1",
    });
    db.engagementApplication.update.mockResolvedValue({
      ...application,
      status: ApplicationStatus.SUBMITTED,
    });

    await service.updateStatus(
      "app-1",
      ApplicationStatus.SUBMITTED,
      { userId: "user-2" },
    );

    expect(
      db.engagementAssignment.findUnique,
    ).toHaveBeenCalledWith({
      where: {
        engagementId_memberId: {
          engagementId: "eng-1",
          memberId: "user-1",
        },
      },
      select: { id: true },
    });
    expect(engagementsService.removeAssignment).toHaveBeenCalledWith(
      "eng-1",
      "assign-1",
    );
    expect(db.engagementApplication.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: ApplicationStatus.SUBMITTED,
          updatedBy: "user-2",
        }),
      }),
    );
  });
});
