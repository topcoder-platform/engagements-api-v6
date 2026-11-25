import { ApplicationStatusEmailService } from "./application-status-email.service";

describe("ApplicationStatusEmailService", () => {
  const config: Record<string, string> = {
    SENDGRID_UNDER_REVIEW_TEMPLATE_ID: "under-review-template",
    SENDGRID_REJECTED_TEMPLATE_ID: "rejected-template",
    SENDGRID_APPLICATION_REVOKED_TEMPLATE_ID: "revoked-template",
  };
  let eventBusService: { postEvent: jest.Mock };
  let service: ApplicationStatusEmailService;

  beforeEach(() => {
    eventBusService = { postEvent: jest.fn().mockResolvedValue(undefined) };
    service = new ApplicationStatusEmailService(
      {
        getMemberByUserId: jest.fn().mockResolvedValue({
          email: "john@example.com",
          firstName: "John",
          lastName: "Smith",
        }),
        getMemberHandleByUserId: jest.fn().mockResolvedValue("johns"),
      } as any,
      eventBusService as any,
      { get: jest.fn((key: string) => config[key]) } as any,
    );
  });

  it.each([
    ["UNDER_REVIEW", "under-review-template"],
    ["REJECTED", "rejected-template"],
    ["REVOKED", "revoked-template"],
  ] as const)(
    "sends the %s email with its own template",
    async (status, template) => {
      await service.sendApplicationStatusEmail({
        memberId: "1001",
        status,
        engagementTitle: "Senior Frontend Engineer",
      });

      expect(eventBusService.postEvent).toHaveBeenCalledWith(
        "external.action.email",
        {
          data: {
            firstName: "John",
            lastName: "Smith",
            handle: "johns",
            email: "john@example.com",
            engagementTitle: "Senior Frontend Engineer",
          },
          recipients: ["john@example.com"],
          sendgrid_template_id: template,
          version: "v3",
        },
      );
    },
  );
});
