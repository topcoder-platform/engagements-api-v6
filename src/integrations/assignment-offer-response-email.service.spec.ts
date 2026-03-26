import { AssignmentOfferResponseEmailService } from "./assignment-offer-response-email.service";

describe("AssignmentOfferResponseEmailService", () => {
  let service: AssignmentOfferResponseEmailService;
  let projectService: {
    getProjectUsers: jest.Mock;
  };
  let memberService: {
    getMemberByUserId: jest.Mock;
    getMemberEmailsByUserIds: jest.Mock;
    getMemberHandleByUserId: jest.Mock;
  };
  let eventBusService: {
    postEvent: jest.Mock;
  };
  let configService: {
    get: jest.Mock;
  };

  beforeEach(() => {
    projectService = {
      getProjectUsers: jest.fn().mockResolvedValue({
        members: [],
        invites: [],
      }),
    };
    memberService = {
      getMemberByUserId: jest.fn().mockResolvedValue({
        email: "assigned-member@example.com",
      }),
      getMemberEmailsByUserIds: jest.fn().mockResolvedValue(new Map()),
      getMemberHandleByUserId: jest.fn().mockResolvedValue("assigned-member"),
    };
    eventBusService = {
      postEvent: jest.fn().mockResolvedValue(undefined),
    };
    configService = {
      get: jest.fn((key: string) => {
        const values: Record<string, string | undefined> = {
          SENDGRID_ASSIGNMENT_OFFER_ACCEPTED_TEMPLATE_ID: "accepted-template",
          SENDGRID_ASSIGNMENT_OFFER_REJECTED_TEMPLATE_ID: "rejected-template",
        };
        return values[key];
      }),
    };

    service = new AssignmentOfferResponseEmailService(
      projectService as any,
      memberService as any,
      eventBusService as any,
      configService as any,
    );
  });

  it("sends rejection emails only to project members with the manager role", async () => {
    projectService.getProjectUsers.mockResolvedValue({
      members: [
        { userId: "manager-1", role: "manager" },
        { userId: "customer-1", role: "customer" },
        { userId: "copilot-1", role: "copilot" },
      ],
      invites: [
        { userId: "manager-2", role: "manager" },
        { email: "customer-invite@example.com", role: "customer" },
        { email: "manager-invite@example.com", role: "manager" },
      ],
    });
    memberService.getMemberEmailsByUserIds.mockResolvedValue(
      new Map<string, string>([
        ["manager-1", "manager-1@example.com"],
        ["manager-2", "manager-2@example.com"],
        ["customer-1", "customer-1@example.com"],
        ["copilot-1", "copilot-1@example.com"],
      ]),
    );

    await service.sendAssignmentOfferResponseEmails({
      projectId: "project-123",
      assignmentMemberId: "member-123",
      accepted: false,
      engagementId: "engagement-123",
      engagementTitle: "Senior Designer",
    });

    expect(memberService.getMemberEmailsByUserIds).toHaveBeenCalledWith([
      "manager-1",
    ]);
    expect(memberService.getMemberByUserId).toHaveBeenCalledWith("member-123");
    expect(eventBusService.postEvent).toHaveBeenCalledTimes(1);
    expect(eventBusService.postEvent.mock.calls).toEqual([
      [
        "external.action.email",
        expect.objectContaining({
          data: expect.objectContaining({
            handle: "assigned-member",
            email: "assigned-member@example.com",
          }),
          recipients: ["manager-1@example.com"],
          sendgrid_template_id: "rejected-template",
        }),
      ],
    ]);
  });
});
