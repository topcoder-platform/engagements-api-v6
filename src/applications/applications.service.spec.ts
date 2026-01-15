import { ForbiddenException } from "@nestjs/common";
import { ApplicationStatus } from "@prisma/client";
import { ApplicationsService } from "./applications.service";

describe("ApplicationsService", () => {
  let service: ApplicationsService;
  let db: {
    engagementApplication: {
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
    };
  };
  let memberService: {
    getMemberByUserId: jest.Mock;
    getMemberAddress: jest.Mock;
    getMemberHandleByUserId: jest.Mock;
  };
  let engagementsService: { findOne: jest.Mock };
  let eventBusService: { postEvent: jest.Mock };

  const createDto = {
    coverLetter: "I am excited to apply for this engagement.",
  };

  beforeEach(() => {
    db = {
      engagementApplication: {
        findUnique: jest.fn(),
        create: jest.fn(),
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
});
