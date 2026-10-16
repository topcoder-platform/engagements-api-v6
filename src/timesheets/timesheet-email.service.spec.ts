import { TimesheetEventTopics } from "./timesheet-constants";
import { TimesheetEmailService } from "./timesheet-email.service";
import type { TimesheetEventPayload } from "./timesheet-events.service";

describe("TimesheetEmailService", () => {
  let service: TimesheetEmailService;
  let access: { findActiveManagers: jest.Mock };
  let memberService: {
    getMemberByUserId: jest.Mock;
    getMemberNamesByUserIds: jest.Mock;
  };
  let eventBusService: { postEvent: jest.Mock };
  let configService: { get: jest.Mock };
  let config: Record<string, string | undefined>;

  const members: Record<
    string,
    { email: string | null; firstName: string | null; lastName: string | null }
  > = {
    "1001": { email: "john@example.com", firstName: "John", lastName: "Smith" },
    "2002": { email: "mary@example.com", firstName: "Mary", lastName: "Jones" },
    "2003": { email: "pete@example.com", firstName: null, lastName: null },
  };

  const payload: TimesheetEventPayload = {
    engagementId: "eng1",
    engagementTitle: "Senior Frontend Engineer",
    assignmentId: "asg1",
    memberId: "1001",
    memberHandle: "johns",
    actorUserId: "1001",
    actorHandle: "johns",
    actorRole: "MEMBER",
    entryIds: ["e2", "e1"],
    workDates: ["2026-09-15", "2026-09-14"],
    totalHours: "15.50",
    comment: null,
  };

  beforeEach(() => {
    config = {
      SENDGRID_TIMESHEET_SUBMITTED_TEMPLATE_ID: "submitted-template",
      SENDGRID_TIMESHEET_RESUBMISSION_REQUIRED_TEMPLATE_ID:
        "resubmission-template",
      SENDGRID_TIMESHEET_APPROVED_TEMPLATE_ID: "approved-template",
      SENDGRID_TIMESHEET_ADMIN_CHANGED_TEMPLATE_ID: "admin-changed-template",
      SENDGRID_ENGAGEMENT_MANAGER_ASSIGNED_TEMPLATE_ID:
        "manager-assigned-template",
      TOPCODER_API_URL_BASE: "https://api.topcoder-dev.com",
    };
    access = {
      findActiveManagers: jest.fn().mockResolvedValue(
        new Map([
          [
            "eng1",
            [
              { userId: "2002", handle: "maryj", name: "Mary Jones" },
              { userId: "2003", handle: "petek", name: null },
            ],
          ],
        ]),
      ),
    };
    memberService = {
      getMemberByUserId: jest.fn((userId: string) =>
        Promise.resolve(members[userId] ?? null),
      ),
      getMemberNamesByUserIds: jest
        .fn()
        .mockResolvedValue(new Map([["1001", "John Smith"]])),
    };
    eventBusService = { postEvent: jest.fn().mockResolvedValue(undefined) };
    configService = { get: jest.fn((key: string) => config[key]) };

    service = new TimesheetEmailService(
      access as any,
      memberService as any,
      eventBusService as any,
      configService as any,
    );
  });

  it("emails every current manager separately when a timesheet is submitted", async () => {
    await service.sendForEvent(TimesheetEventTopics.Submitted, payload);

    expect(eventBusService.postEvent).toHaveBeenCalledTimes(2);
    expect(eventBusService.postEvent).toHaveBeenCalledWith(
      "external.action.email",
      {
        data: {
          engagementId: "eng1",
          engagementTitle: "Senior Frontend Engineer",
          assignmentId: "asg1",
          memberHandle: "johns",
          actorHandle: "johns",
          memberDisplayName: "John Smith (johns)",
          managerDisplayNames: "Mary Jones (maryj), petek",
          actorDisplayName: "John Smith (johns)",
          entryCount: 2,
          totalHours: "15.50",
          workDates: ["14-09-2026", "15-09-2026"],
          fromDate: "14-09-2026",
          toDate: "15-09-2026",
          comment: "",
          timesheetUrl:
            "https://engagements.topcoder-dev.com/eng1/timesheets/asg1",
          recipientFirstName: "Mary",
          recipientHandle: "maryj",
        },
        recipients: ["mary@example.com"],
        sendgrid_template_id: "submitted-template",
        version: "v3",
      },
    );
    expect(eventBusService.postEvent).toHaveBeenCalledWith(
      "external.action.email",
      expect.objectContaining({
        data: expect.objectContaining({
          recipientFirstName: "petek",
          recipientHandle: "petek",
        }),
        recipients: ["pete@example.com"],
      }),
    );
  });

  it.each([
    [TimesheetEventTopics.Unsubmitted, "resubmission-template", undefined],
    [TimesheetEventTopics.Approved, "approved-template", undefined],
    [TimesheetEventTopics.Reopened, "admin-changed-template", "reopened"],
    [TimesheetEventTopics.AdminOverride, "admin-changed-template", "modified"],
  ])("emails the member for %s", async (topic, templateId, changeType) => {
    await service.sendForEvent(topic, {
      ...payload,
      actorHandle: "adminuser",
      comment: "Corrected per client",
    });

    expect(access.findActiveManagers).toHaveBeenCalledWith(["eng1"]);
    expect(eventBusService.postEvent).toHaveBeenCalledTimes(1);

    const [, message] = eventBusService.postEvent.mock.calls[0];
    expect(message.recipients).toEqual(["john@example.com"]);
    expect(message.sendgrid_template_id).toBe(templateId);
    expect(message.data).toEqual(
      expect.objectContaining({
        recipientFirstName: "John",
        actorHandle: "adminuser",
        comment: "Corrected per client",
      }),
    );
    expect(message.data.changeType).toBe(changeType);
  });

  it("uses a manager's stored name and only looks up the names it is missing", async () => {
    await service.sendForEvent(TimesheetEventTopics.Approved, {
      ...payload,
      actorUserId: "2002",
      actorHandle: "maryj",
    });

    expect(memberService.getMemberNamesByUserIds).toHaveBeenCalledWith([
      "1001",
      "2003",
    ]);
    const [, message] = eventBusService.postEvent.mock.calls[0];
    expect(message.data).toEqual(
      expect.objectContaining({
        memberDisplayName: "John Smith (johns)",
        managerDisplayNames: "Mary Jones (maryj), petek",
        actorDisplayName: "Mary Jones (maryj)",
      }),
    );
  });

  it("falls back to handles when the name lookup fails", async () => {
    memberService.getMemberNamesByUserIds.mockRejectedValue(
      new Error("member api down"),
    );

    await service.sendForEvent(TimesheetEventTopics.Approved, payload);

    const [, message] = eventBusService.postEvent.mock.calls[0];
    expect(message.data).toEqual(
      expect.objectContaining({
        memberDisplayName: "johns",
        managerDisplayNames: "Mary Jones (maryj), petek",
        actorDisplayName: "johns",
      }),
    );
  });

  it("skips quietly when the template id is not configured", async () => {
    config.SENDGRID_TIMESHEET_APPROVED_TEMPLATE_ID = undefined;

    await service.sendForEvent(TimesheetEventTopics.Approved, payload);

    expect(memberService.getMemberByUserId).not.toHaveBeenCalled();
    expect(eventBusService.postEvent).not.toHaveBeenCalled();
  });

  it("ignores topics that have no email", async () => {
    await service.sendForEvent("engagement.timesheet.unknown", payload);

    expect(eventBusService.postEvent).not.toHaveBeenCalled();
  });

  it("skips a manager without an email and still emails the others", async () => {
    memberService.getMemberByUserId.mockImplementation((userId: string) =>
      userId === "2002"
        ? Promise.reject(new Error("member api down"))
        : Promise.resolve(members[userId]),
    );

    await service.sendForEvent(TimesheetEventTopics.Submitted, payload);

    expect(eventBusService.postEvent).toHaveBeenCalledTimes(1);
    expect(eventBusService.postEvent).toHaveBeenCalledWith(
      "external.action.email",
      expect.objectContaining({ recipients: ["pete@example.com"] }),
    );
  });

  it("never throws when publishing fails", async () => {
    eventBusService.postEvent.mockRejectedValue(new Error("bus down"));
    access.findActiveManagers.mockRejectedValueOnce(new Error("db down"));

    await expect(
      service.sendForEvent(TimesheetEventTopics.Submitted, payload),
    ).resolves.toBeUndefined();
    await expect(
      service.sendForEvent(TimesheetEventTopics.Approved, payload),
    ).resolves.toBeUndefined();
  });

  describe("sendManagerAssignedEmail", () => {
    it("emails the assigned manager a link to the timesheets list", async () => {
      await service.sendManagerAssignedEmail({
        engagementId: "eng1",
        engagementTitle: "Senior Frontend Engineer",
        managerUserId: "2002",
        managerHandle: "maryj",
        actorHandle: "adminuser",
      });

      expect(eventBusService.postEvent).toHaveBeenCalledWith(
        "external.action.email",
        {
          data: {
            recipientFirstName: "Mary",
            recipientHandle: "maryj",
            engagementId: "eng1",
            engagementTitle: "Senior Frontend Engineer",
            actorHandle: "adminuser",
            timesheetsUrl: "https://engagements.topcoder-dev.com/timesheets",
          },
          recipients: ["mary@example.com"],
          sendgrid_template_id: "manager-assigned-template",
          version: "v3",
        },
      );
    });

    it("skips when the manager has no email", async () => {
      await service.sendManagerAssignedEmail({
        engagementId: "eng1",
        engagementTitle: "Senior Frontend Engineer",
        managerUserId: "9999",
        managerHandle: "ghost",
      });

      expect(eventBusService.postEvent).not.toHaveBeenCalled();
    });
  });
});
