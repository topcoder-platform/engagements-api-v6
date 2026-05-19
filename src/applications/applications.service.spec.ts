import { ForbiddenException } from "@nestjs/common";
import { ApplicationStatus, AssignmentStatus, PaymentCycle } from "@prisma/client";
import { ApplicationsService } from "./applications.service";

jest.mock("nanoid", () => ({
  nanoid: () => "test-id",
}));

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
      findFirst: jest.Mock;
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
  let assignmentOfferEmailService: {
    sendAssignmentOfferEmail: jest.Mock;
    sendAssignmentUpdatedEmail: jest.Mock;
  };
  let applicationStatusEmailService: {
    sendApplicationStatusEmail: jest.Mock;
  };

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
        findFirst: jest.fn(),
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
    assignmentOfferEmailService = {
      sendAssignmentOfferEmail: jest.fn().mockResolvedValue(undefined),
      sendAssignmentUpdatedEmail: jest.fn().mockResolvedValue(undefined),
    };
    applicationStatusEmailService = {
      sendApplicationStatusEmail: jest.fn().mockResolvedValue(undefined),
    };
    service = new ApplicationsService(
      db as any,
      memberService as any,
      engagementsService as any,
      eventBusService as any,
      assignmentOfferEmailService as any,
      applicationStatusEmailService as any,
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
    jest.spyOn(service, "findOne").mockResolvedValue(application as any);
    db.engagementApplication.update.mockResolvedValue({
      ...application,
      status: ApplicationStatus.REJECTED,
    });

    await service.updateStatus("app-1", ApplicationStatus.REJECTED, {
      isMachine: true,
    });

    expect(db.engagementApplication.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ updatedBy: "system" }),
      }),
    );
  });

  it.each([
    {
      status: ApplicationStatus.UNDER_REVIEW,
      emailStatus: "UNDER_REVIEW",
    },
    {
      status: ApplicationStatus.REJECTED,
      emailStatus: "REJECTED",
    },
  ] as const)(
    "sends application status email when status is $status",
    async ({ status, emailStatus }) => {
      const application = {
        id: "app-1",
        engagementId: "eng-1",
        userId: "user-1",
        status: ApplicationStatus.SUBMITTED,
        engagement: { title: "Senior Product Designer" },
      };
      const updatedApplication = {
        ...application,
        status,
      };
      jest.spyOn(service, "findOne").mockResolvedValue(application as any);
      db.engagementApplication.update.mockResolvedValue(updatedApplication);

      await service.updateStatus("app-1", status, { userId: "manager-1" });

      expect(
        applicationStatusEmailService.sendApplicationStatusEmail,
      ).toHaveBeenCalledWith({
        memberId: "user-1",
        status: emailStatus,
        engagementTitle: "Senior Product Designer",
      });
      expect(
        db.engagementApplication.update.mock.invocationCallOrder[0],
      ).toBeLessThan(
        applicationStatusEmailService.sendApplicationStatusEmail.mock
          .invocationCallOrder[0],
      );
    },
  );

  it("does not send application status email for statuses without notification side effects", async () => {
    const application = {
      id: "app-1",
      engagementId: "eng-1",
      userId: "user-1",
      status: ApplicationStatus.SUBMITTED,
      engagement: { title: "Senior Product Designer" },
    };
    const updatedApplication = {
      ...application,
      status: ApplicationStatus.SUBMITTED,
    };
    jest.spyOn(service, "findOne").mockResolvedValue(application as any);
    db.engagementApplication.update.mockResolvedValue(updatedApplication);

    await service.updateStatus("app-1", ApplicationStatus.SUBMITTED, {
      userId: "manager-1",
    });

    expect(
      applicationStatusEmailService.sendApplicationStatusEmail,
    ).not.toHaveBeenCalled();
  });

  it("returns updated application when application status email dispatch rejects", async () => {
    const application = {
      id: "app-1",
      engagementId: "eng-1",
      userId: "user-1",
      status: ApplicationStatus.SUBMITTED,
      engagement: { title: "Senior Product Designer" },
    };
    const updatedApplication = {
      ...application,
      status: ApplicationStatus.REJECTED,
    };
    jest.spyOn(service, "findOne").mockResolvedValue(application as any);
    db.engagementApplication.update.mockResolvedValue(updatedApplication);
    applicationStatusEmailService.sendApplicationStatusEmail.mockRejectedValue(
      new Error("send failed"),
    );

    await expect(
      service.updateStatus("app-1", ApplicationStatus.REJECTED, {
        userId: "manager-1",
      }),
    ).resolves.toEqual(updatedApplication);

    expect(
      applicationStatusEmailService.sendApplicationStatusEmail,
    ).toHaveBeenCalledWith({
      memberId: "user-1",
      status: "REJECTED",
      engagementTitle: "Senior Product Designer",
    });
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
        findFirst: jest.fn().mockResolvedValue(null),
        count: jest.fn().mockResolvedValue(0),
        create: jest.fn().mockResolvedValue({ id: "assign-1" }),
      },
    };

    jest.spyOn(service, "findOne").mockResolvedValue(application as any);
    memberService.getMemberHandleByUserId.mockResolvedValue("member-handle");
    db.$transaction.mockImplementation((callback) => callback(tx));
    db.engagementApplication.update.mockResolvedValue({
      ...application,
      status: ApplicationStatus.SELECTED,
    });

    await service.updateStatus("app-1", ApplicationStatus.SELECTED, {
      userId: "manager-1",
    });

    expect(txEngagementUpdate).not.toHaveBeenCalled();
  });

  it("emits engagement.member.assigned when accepting an application", async () => {
    const application = {
      id: "app-1",
      engagementId: "eng-1",
      userId: "123",
      status: ApplicationStatus.SUBMITTED,
    };
    const engagement = {
      id: "eng-1",
      requiredMemberCount: 3,
      requiredSkills: ["skill-1"],
    };
    const updatedEngagement = {
      ...engagement,
      assignments: [],
    };
    const tx = {
      engagement: {
        findUnique: jest
          .fn()
          .mockResolvedValueOnce(engagement)
          .mockResolvedValueOnce(updatedEngagement),
        update: jest.fn(),
      },
      engagementAssignment: {
        findFirst: jest.fn().mockResolvedValue(null),
        count: jest.fn().mockResolvedValue(0),
        create: jest.fn().mockResolvedValue({ id: "assign-1" }),
      },
    };

    jest.spyOn(service, "findOne").mockResolvedValue(application as any);
    memberService.getMemberHandleByUserId.mockResolvedValue("member-handle");
    db.$transaction.mockImplementation((callback) => callback(tx));
    db.engagementApplication.update.mockResolvedValue({
      ...application,
      status: ApplicationStatus.SELECTED,
    });

    await service.updateStatus("app-1", ApplicationStatus.SELECTED, {
      userId: "manager-1",
    });

    expect(eventBusService.postEvent).toHaveBeenCalledWith(
      "engagement.member.assigned",
      {
        engagementId: "eng-1",
        assignmentId: "assign-1",
        memberId: 123,
        memberHandle: "member-handle",
        skills: [{ id: "skill-1" }],
      },
    );
  });

  it("terminates active assignment when selected application is moved to submitted", async () => {
    const application = {
      id: "app-1",
      engagementId: "eng-1",
      userId: "user-1",
      status: ApplicationStatus.SELECTED,
    };
    jest.spyOn(service, "findOne").mockResolvedValue(application as any);
    db.engagementAssignment.findFirst.mockResolvedValue({
      id: "assign-1",
    });
    db.engagementApplication.update.mockResolvedValue({
      ...application,
      status: ApplicationStatus.SUBMITTED,
    });

    await service.updateStatus("app-1", ApplicationStatus.SUBMITTED, {
      userId: "user-2",
    });

    expect(db.engagementAssignment.findFirst).toHaveBeenCalledWith({
      where: {
        engagementId: "eng-1",
        memberId: "user-1",
        status: { in: [AssignmentStatus.SELECTED, AssignmentStatus.ASSIGNED] },
      },
      orderBy: { createdAt: "desc" },
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

  it("calculates agreement rates with fractional standard hours", () => {
    expect((service as any).calculateAgreementRate("10.5", 7.5)).toBe(
      "393.75",
    );
  });

  it("rejects standardHoursPerDay values with more than two decimals", () => {
    expect(() =>
      (service as any).calculateAgreementRate("10.5", 7.555),
    ).toThrow(
      "standardHoursPerDay must be a positive number with up to 2 decimal places.",
    );
  });

  it("approves application by setting status to SELECTED", async () => {
    const application = {
      id: "app-1",
      engagementId: "eng-1",
      userId: "user-1",
      status: ApplicationStatus.SELECTED,
    };
    const updateSpy = jest
      .spyOn(service, "updateStatus")
      .mockResolvedValue(application as any);

    const authUser = { userId: "manager-1" };
    const result = await service.approve("app-1", authUser);

    expect(updateSpy).toHaveBeenCalledWith(
      "app-1",
      ApplicationStatus.SELECTED,
      authUser,
      undefined,
    );
    expect(result).toBe(application);
  });

  it("updates assignment paymentCycle and sends updated email", async () => {
    const application = {
      id: "app-1",
      engagementId: "eng-1",
      userId: "user-1",
      status: ApplicationStatus.SUBMITTED,
    };
    const engagement = {
      id: "eng-1",
      title: "Senior Frontend Engineer",
      requiredMemberCount: 3,
      requiredSkills: ["skill-1"],
    };
    const existingAssignment = {
      id: "assign-1",
      engagementId: "eng-1",
      memberId: "user-1",
      memberHandle: "member-handle",
      status: AssignmentStatus.SELECTED,
      startDate: null,
      durationMonths: 3,
      paymentCycle: PaymentCycle.WEEKLY,
      ratePerHour: "10",
      standardHoursPerDay: 8,
      agreementRate: "400.00",
      otherRemarks: null,
    };
    const updatedAssignment = {
      ...existingAssignment,
      paymentCycle: PaymentCycle.MONTHLY,
    };
    const tx = {
      engagement: {
        findUnique: jest.fn().mockResolvedValue(engagement),
      },
      engagementAssignment: {
        findFirst: jest.fn().mockResolvedValue(existingAssignment),
        update: jest.fn().mockResolvedValue(updatedAssignment),
      },
    };

    jest.spyOn(service, "findOne").mockResolvedValue(application as any);
    memberService.getMemberHandleByUserId.mockResolvedValue("member-handle");
    db.$transaction.mockImplementation((callback) => callback(tx as any));
    db.engagementApplication.update.mockResolvedValue({
      ...application,
      status: ApplicationStatus.SELECTED,
    });

    await service.updateStatus(
      "app-1",
      ApplicationStatus.SELECTED,
      { userId: "manager-1" },
      { paymentCycle: PaymentCycle.MONTHLY } as any,
    );

    expect(tx.engagementAssignment.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          paymentCycle: PaymentCycle.MONTHLY,
        }),
      }),
    );
    expect(assignmentOfferEmailService.sendAssignmentUpdatedEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        paymentCycle: PaymentCycle.MONTHLY,
      }),
    );
  });
});
