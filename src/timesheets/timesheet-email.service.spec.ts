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
      SENDGRID_TIMESHEET_RETURNED_FOR_CORRECTIONS_TEMPLATE_ID:
        "returned-for-corrections-template",
      SENDGRID_TIMESHEET_REVERTED_TO_DRAFT_TEMPLATE_ID:
        "reverted-to-draft-template",
      SENDGRID_ENGAGEMENT_MANAGER_ASSIGNED_TEMPLATE_ID:
        "manager-assigned-template",
      SENDGRID_TIMESHEET_APPROVAL_REMINDER_TEMPLATE_ID: "reminder-template",
      SENDGRID_TIMESHEET_SUBMISSION_REMINDER_TEMPLATE_ID:
        "submission-reminder-template",
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
          workPeriod: "14-09-2026 - 15-09-2026",
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
    [
      TimesheetEventTopics.ReturnedForCorrections,
      "returned-for-corrections-template",
      undefined,
    ],
    [
      TimesheetEventTopics.RevertedToDraft,
      "reverted-to-draft-template",
      undefined,
    ],
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

  it("gives the reverted to draft email the work period, managers, admin and reason", async () => {
    await service.sendForEvent(TimesheetEventTopics.RevertedToDraft, {
      ...payload,
      actorHandle: "adminuser",
      comment: "Submitted for the wrong week",
    });

    const [, message] = eventBusService.postEvent.mock.calls[0];
    expect(message.data).toEqual(
      expect.objectContaining({
        engagementTitle: "Senior Frontend Engineer",
        managerDisplayNames: "Mary Jones (maryj), petek",
        workPeriod: "14-09-2026 - 15-09-2026",
        totalHours: "15.50",
        actorHandle: "adminuser",
        comment: "Submitted for the wrong week",
        recipientHandle: "johns",
        timesheetUrl:
          "https://engagements.topcoder-dev.com/eng1/timesheets/asg1",
      }),
    );
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

  it("still emails the member when the manager lookup fails", async () => {
    access.findActiveManagers.mockRejectedValue(new Error("db down"));

    await service.sendForEvent(TimesheetEventTopics.Approved, payload);

    expect(eventBusService.postEvent).toHaveBeenCalledTimes(1);
    const [, message] = eventBusService.postEvent.mock.calls[0];
    expect(message.recipients).toEqual(["john@example.com"]);
    expect(message.data.managerDisplayNames).toBe("");
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

  describe("sendApprovalReminderEmail", () => {
    const manager = { userId: "2002", handle: "maryj", name: "Mary Jones" };

    it("emails the manager a link to the timesheets awaiting their approval", async () => {
      await expect(service.sendApprovalReminderEmail(manager)).resolves.toBe(
        true,
      );

      expect(eventBusService.postEvent).toHaveBeenCalledWith(
        "external.action.email",
        {
          data: {
            recipientFirstName: "Mary",
            recipientHandle: "maryj",
            timesheetsUrl:
              "https://engagements.topcoder-dev.com/timesheets?status=pending-approval",
          },
          recipients: ["mary@example.com"],
          sendgrid_template_id: "reminder-template",
          version: "v3",
        },
      );
    });

    it("reports false when the manager has no email", async () => {
      await expect(
        service.sendApprovalReminderEmail({
          userId: "9999",
          handle: "ghost",
          name: null,
        }),
      ).resolves.toBe(false);

      expect(eventBusService.postEvent).not.toHaveBeenCalled();
    });

    it("reports false when publishing fails", async () => {
      eventBusService.postEvent.mockRejectedValue(new Error("bus down"));

      await expect(service.sendApprovalReminderEmail(manager)).resolves.toBe(
        false,
      );
    });

    it("reports whether the template is configured", async () => {
      expect(service.isApprovalReminderConfigured()).toBe(true);

      config.SENDGRID_TIMESHEET_APPROVAL_REMINDER_TEMPLATE_ID = " ";

      expect(service.isApprovalReminderConfigured()).toBe(false);
      await expect(service.sendApprovalReminderEmail(manager)).resolves.toBe(
        false,
      );
      expect(eventBusService.postEvent).not.toHaveBeenCalled();
    });
  });

  describe("sendSubmissionReminderEmail", () => {
    const params = {
      engagementId: "eng1",
      engagementTitle: "Senior Frontend Engineer",
      assignmentId: "asg1",
      memberUserId: "1001",
      memberHandle: "johns",
      candidateWiproId: "John.Smith@wipro.com",
      fromDate: "2026-11-09",
      toDate: "2026-11-13",
    };

    it("emails the member's Topcoder and Wipro addresses a link to the work period", async () => {
      await expect(service.sendSubmissionReminderEmail(params)).resolves.toBe(
        true,
      );

      expect(eventBusService.postEvent).toHaveBeenCalledTimes(1);
      expect(eventBusService.postEvent).toHaveBeenCalledWith(
        "external.action.email",
        {
          data: {
            recipientFirstName: "John",
            recipientHandle: "johns",
            engagementId: "eng1",
            engagementTitle: "Senior Frontend Engineer",
            fromDate: "09-11-2026",
            toDate: "13-11-2026",
            workPeriod: "09-11-2026 - 13-11-2026",
            timesheetUrl:
              "https://engagements.topcoder-dev.com/eng1/timesheets/asg1?fromDate=2026-11-09&toDate=2026-11-13",
          },
          recipients: ["john@example.com", "john.smith@wipro.com"],
          sendgrid_template_id: "submission-reminder-template",
          version: "v3",
        },
      );
    });

    it("ignores a Wipro ID that is not an email address", async () => {
      await service.sendSubmissionReminderEmail({
        ...params,
        candidateWiproId: "WP12345",
      });

      expect(eventBusService.postEvent.mock.calls[0][1].recipients).toEqual([
        "john@example.com",
      ]);
    });

    it("sends the same address only once", async () => {
      await service.sendSubmissionReminderEmail({
        ...params,
        candidateWiproId: " JOHN@example.com ",
      });

      expect(eventBusService.postEvent.mock.calls[0][1].recipients).toEqual([
        "john@example.com",
      ]);
    });

    it("still reaches the Wipro address when the member has no Topcoder email", async () => {
      await expect(
        service.sendSubmissionReminderEmail({
          ...params,
          memberUserId: "9999",
          memberHandle: "ghost",
        }),
      ).resolves.toBe(true);

      expect(eventBusService.postEvent.mock.calls[0][1]).toMatchObject({
        data: { recipientFirstName: "ghost", recipientHandle: "ghost" },
        recipients: ["john.smith@wipro.com"],
      });
    });

    it("reports false when there is no address at all", async () => {
      await expect(
        service.sendSubmissionReminderEmail({
          ...params,
          memberUserId: "9999",
          candidateWiproId: null,
        }),
      ).resolves.toBe(false);

      expect(eventBusService.postEvent).not.toHaveBeenCalled();
    });

    it("names a one-day period once", async () => {
      await service.sendSubmissionReminderEmail({
        ...params,
        toDate: "2026-11-09",
      });

      expect(eventBusService.postEvent.mock.calls[0][1].data.workPeriod).toBe(
        "09-11-2026",
      );
    });

    it("reports whether the template is configured", async () => {
      expect(service.isSubmissionReminderConfigured()).toBe(true);

      config.SENDGRID_TIMESHEET_SUBMISSION_REMINDER_TEMPLATE_ID = undefined;

      expect(service.isSubmissionReminderConfigured()).toBe(false);
      await expect(service.sendSubmissionReminderEmail(params)).resolves.toBe(
        false,
      );
    });
  });
});
