import { AssignmentOfferEmailService } from "./assignment-offer-email.service";

describe("AssignmentOfferEmailService", () => {
  let service: AssignmentOfferEmailService;
  let memberService: {
    getMemberByUserId: jest.Mock;
    getMemberHandleByUserId: jest.Mock;
  };
  let eventBusService: {
    postEvent: jest.Mock;
  };
  let configService: {
    get: jest.Mock;
  };

  beforeEach(() => {
    memberService = {
      getMemberByUserId: jest.fn().mockResolvedValue({
        email: "member@example.com",
        firstName: "Jane",
        lastName: "Doe",
      }),
      getMemberHandleByUserId: jest.fn().mockResolvedValue("janedoe"),
    };
    eventBusService = {
      postEvent: jest.fn().mockResolvedValue(undefined),
    };
    configService = {
      get: jest.fn((key: string) => {
        const values: Record<string, string | undefined> = {
          SENDGRID_ASSIGNMENT_OFFER_TEMPLATE_ID: "offer-template",
          SENDGRID_ENGAGEMENT_ASSIGNMENT_UPDATED_TEMPLATE_ID:
            "updated-template",
        };
        return values[key];
      }),
    };

    service = new AssignmentOfferEmailService(
      memberService as any,
      eventBusService as any,
      configService as any,
    );
  });

  it("sends the update template payload with the full offer payload fields", async () => {
    const recipient = {
      memberId: "12345",
      memberHandle: "janedoe",
      assignmentId: "assignment-1",
      engagementId: "engagement-1",
      engagementTitle: "Senior Designer",
      assignmentStartDate: "2026-03-01T00:00:00.000Z",
      assignmentEndDate: "2026-03-31T00:00:00.000Z",
      durationMonths: 3,
      ratePerHour: "125.5",
      standardHoursPerWeek: 40,
      agreementRate: "5020",
      otherRemarks: "Bring your own device.",
    };

    await service.sendAssignmentOfferEmail(recipient);

    const offerPayload = eventBusService.postEvent.mock.calls[0][1];

    expect(offerPayload).toEqual({
      data: {
        engagementTitle: "Senior Designer",
        contractDuration: 3,
        assignmentStartDate: "1 March 2026",
        hoursPerWeek: 40,
        ratePerHour: "125.50",
        weeklyPayment: "5020.00",
        otherRemarks: "Bring your own device.",
        otherRemarts: "Bring your own device.",
        engagementUrl: "https://engagements.topcoder-dev.com/assignments",
      },
      recipients: ["member@example.com"],
      sendgrid_template_id: "offer-template",
      version: "v3",
    });

    eventBusService.postEvent.mockClear();

    await service.sendAssignmentUpdatedEmail(recipient);

    const updatedPayload = eventBusService.postEvent.mock.calls[0][1];

    expect(updatedPayload).toEqual({
      data: expect.objectContaining({
        ...offerPayload.data,
        firstName: "Jane",
        lastName: "Doe",
        handle: "janedoe",
        email: "member@example.com",
        assignmentId: "assignment-1",
        engagementId: "engagement-1",
        assignmentEndDate: "Mar 31 2026",
        billingStartDate: "Mar 01 2026",
        durationMonths: 3,
        standardHoursPerWeek: 40,
        agreementRate: "5020",
      }),
      recipients: ["member@example.com"],
      sendgrid_template_id: "updated-template",
      version: "v3",
    });
  });
});
