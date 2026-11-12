import { EngagementLeadEmailService } from "./engagement-lead-email.service";

describe("EngagementLeadEmailService", () => {
  let service: EngagementLeadEmailService;
  let identityService: { getRoleMembers: jest.Mock };
  let memberService: {
    getMemberEmailsByUserIds: jest.Mock;
    getMemberHandleByUserId: jest.Mock;
  };
  let eventBusService: { postEvent: jest.Mock };
  let config: Record<string, string | undefined>;

  const lead = {
    id: "lead-1",
    leadType: "WIPRO_CONSUMPTION",
    accountName: "ABC Bank",
    roleTitle: "QA Engineer",
  };

  beforeEach(() => {
    identityService = { getRoleMembers: jest.fn().mockResolvedValue([]) };
    memberService = {
      getMemberEmailsByUserIds: jest.fn().mockResolvedValue(new Map()),
      getMemberHandleByUserId: jest.fn().mockResolvedValue(null),
    };
    eventBusService = { postEvent: jest.fn().mockResolvedValue(undefined) };
    config = {
      SENDGRID_ENGAGEMENT_LEAD_SUBMITTED_TEMPLATE_ID: "lead-template",
      TOPCODER_API_URL_BASE: "https://api.topcoder-dev.com",
    };

    service = new EngagementLeadEmailService(
      identityService as any,
      memberService as any,
      eventBusService as any,
      { get: jest.fn((key: string) => config[key]) } as any,
    );
  });

  it("emails every Flexi Talent Manager once by handle with a link to the lead", async () => {
    identityService.getRoleMembers.mockResolvedValue([
      { userId: "1", handle: "tm-one", email: "One@Example.com" },
      { userId: "2", handle: "tm-two", email: "two@example.com" },
      { userId: "3", handle: "tm-one-alt", email: "one@EXAMPLE.com" },
    ]);

    await service.sendLeadSubmittedEmails(lead);

    expect(identityService.getRoleMembers).toHaveBeenCalledWith(
      "Flexi Talent Manager",
    );
    expect(eventBusService.postEvent).toHaveBeenCalledTimes(2);
    expect(eventBusService.postEvent).toHaveBeenCalledWith(
      "external.action.email",
      {
        data: {
          handle: "tm-one",
          leadId: "lead-1",
          leadUrl: "https://work.topcoder-dev.com/engagement-leads/lead-1",
          leadType: "WIPRO_CONSUMPTION",
          accountName: "ABC Bank",
          roleTitle: "QA Engineer",
        },
        recipients: ["One@Example.com"],
        sendgrid_template_id: "lead-template",
        version: "v3",
      },
    );
    expect(eventBusService.postEvent.mock.calls[1][1].recipients).toEqual([
      "two@example.com",
    ]);
    expect(memberService.getMemberEmailsByUserIds).not.toHaveBeenCalled();
  });

  it("fills a missing email and handle from the member API and skips members without an email", async () => {
    identityService.getRoleMembers.mockResolvedValue([
      { userId: "1", handle: null, email: null },
      { userId: "2", handle: "tm-two", email: null },
    ]);
    memberService.getMemberEmailsByUserIds.mockResolvedValue(
      new Map([["1", "one@example.com"]]),
    );
    memberService.getMemberHandleByUserId.mockResolvedValue("tm-one");

    await service.sendLeadSubmittedEmails(lead);

    expect(memberService.getMemberEmailsByUserIds).toHaveBeenCalledWith([
      "1",
      "2",
    ]);
    expect(memberService.getMemberHandleByUserId).toHaveBeenCalledWith("1");
    expect(eventBusService.postEvent).toHaveBeenCalledTimes(1);
    expect(eventBusService.postEvent.mock.calls[0][1]).toMatchObject({
      data: { handle: "tm-one" },
      recipients: ["one@example.com"],
    });
  });

  it("uses the configured role name and work app URL", async () => {
    config.FLEXI_TALENT_MANAGER_ROLE_NAME = "Custom Role";
    config.WORK_APP_BASE_URL = "https://work.topcoder.com/";
    identityService.getRoleMembers.mockResolvedValue([
      { userId: "1", handle: "tm-one", email: "one@example.com" },
    ]);

    await service.sendLeadSubmittedEmails(lead);

    expect(identityService.getRoleMembers).toHaveBeenCalledWith("Custom Role");
    expect(eventBusService.postEvent.mock.calls[0][1].data.leadUrl).toBe(
      "https://work.topcoder.com/engagement-leads/lead-1",
    );
  });

  it("does nothing while the template is not configured", async () => {
    config.SENDGRID_ENGAGEMENT_LEAD_SUBMITTED_TEMPLATE_ID = undefined;

    await service.sendLeadSubmittedEmails(lead);

    expect(identityService.getRoleMembers).not.toHaveBeenCalled();
    expect(eventBusService.postEvent).not.toHaveBeenCalled();
  });

  it("does not throw when publishing fails", async () => {
    identityService.getRoleMembers.mockResolvedValue([
      { userId: "1", handle: "tm-one", email: "one@example.com" },
    ]);
    eventBusService.postEvent.mockRejectedValue(new Error("bus down"));

    await expect(
      service.sendLeadSubmittedEmails(lead),
    ).resolves.toBeUndefined();
  });
});
