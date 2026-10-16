import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventBusService } from "../integrations/event-bus.service";
import { MemberService } from "../integrations/member.service";
import {
  EngagementManagerSummary,
  TimesheetAccessService,
} from "./timesheet-access.service";
import { TimesheetEventTopics } from "./timesheet-constants";
import type { TimesheetEventPayload } from "./timesheet-events.service";

/** Who a lifecycle email goes to: the assignee, or every current manager of the engagement. */
type TimesheetEmailAudience = "member" | "managers";

interface TimesheetEmailRoute {
  templateKey: string;
  audience: TimesheetEmailAudience;
  logLabel: string;
}

/**
 * One email per lifecycle topic (requirements §10). Reopened and overridden share a template: to the
 * member both mean "hours you had approved were changed by an administrator", and `changeType` lets
 * the template word the two cases differently.
 */
const TIMESHEET_EMAIL_ROUTES: Record<string, TimesheetEmailRoute> = {
  [TimesheetEventTopics.Submitted]: {
    templateKey: "SENDGRID_TIMESHEET_SUBMITTED_TEMPLATE_ID",
    audience: "managers",
    logLabel: "timesheet submitted",
  },
  [TimesheetEventTopics.Unsubmitted]: {
    templateKey: "SENDGRID_TIMESHEET_RESUBMISSION_REQUIRED_TEMPLATE_ID",
    audience: "member",
    logLabel: "timesheet resubmission required",
  },
  [TimesheetEventTopics.Approved]: {
    templateKey: "SENDGRID_TIMESHEET_APPROVED_TEMPLATE_ID",
    audience: "member",
    logLabel: "timesheet approved",
  },
  [TimesheetEventTopics.Reopened]: {
    templateKey: "SENDGRID_TIMESHEET_ADMIN_CHANGED_TEMPLATE_ID",
    audience: "member",
    logLabel: "timesheet reopened",
  },
  [TimesheetEventTopics.AdminOverride]: {
    templateKey: "SENDGRID_TIMESHEET_ADMIN_CHANGED_TEMPLATE_ID",
    audience: "member",
    logLabel: "timesheet modified",
  },
};

const MANAGER_ASSIGNED_TEMPLATE_KEY =
  "SENDGRID_ENGAGEMENT_MANAGER_ASSIGNED_TEMPLATE_ID";

/** Pre-formatted people lines, in the same `Name (handle)` form the timesheet header shows. */
interface TimesheetPeople {
  memberDisplayName: string;
  managerDisplayNames: string;
  actorDisplayName: string;
}

interface EmailRecipient {
  userId: string;
  email: string;
  firstName: string;
  handle: string;
}

export interface ManagerAssignedEmailParams {
  engagementId: string;
  engagementTitle: string;
  managerUserId: string;
  managerHandle: string;
  actorHandle?: string | null;
}

/**
 * Timesheet workflow emails, published as `external.action.email` events the same way the assignment
 * offer emails are.
 *
 * Nothing here throws. Every send runs after the workflow mutation has committed, so a missing
 * template id, an unresolvable recipient, or a bus failure is logged and the caller carries on.
 */
@Injectable()
export class TimesheetEmailService {
  private readonly logger = new Logger(TimesheetEmailService.name);

  constructor(
    private readonly access: TimesheetAccessService,
    private readonly memberService: MemberService,
    private readonly eventBusService: EventBusService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Sends the email that belongs to a timesheet lifecycle event, if any.
   */
  async sendForEvent(
    topic: string,
    payload: TimesheetEventPayload,
  ): Promise<void> {
    const route = TIMESHEET_EMAIL_ROUTES[topic];
    if (!route) {
      return;
    }

    try {
      const templateId = this.resolveTemplateId(
        route.templateKey,
        route.logLabel,
      );
      if (!templateId) {
        return;
      }

      const managers = await this.findManagers(payload.engagementId);
      const recipients =
        route.audience === "managers"
          ? await this.resolveManagerRecipients(managers)
          : await this.resolveMemberRecipients(
              payload.memberId,
              payload.memberHandle,
            );

      if (!recipients.length) {
        this.logger.warn(
          `${route.logLabel} email skipped for assignment ${payload.assignmentId}: no recipient with an email address.`,
        );
        return;
      }

      const people = await this.resolvePeople(payload, managers);
      const data = this.buildTimesheetData(topic, payload, people);

      await Promise.all(
        recipients.map((recipient) =>
          this.publish(
            templateId,
            recipient,
            {
              ...data,
              recipientFirstName: recipient.firstName,
              recipientHandle: recipient.handle,
            },
            route.logLabel,
          ),
        ),
      );
    } catch (error) {
      this.logger.error(
        `Failed to send ${route.logLabel} email for assignment ${payload.assignmentId}: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
    }
  }

  /**
   * Tells a newly assigned manager they can now review and approve the engagement's timesheets.
   */
  async sendManagerAssignedEmail(
    params: ManagerAssignedEmailParams,
  ): Promise<void> {
    const logLabel = "engagement manager assigned";

    try {
      const templateId = this.resolveTemplateId(
        MANAGER_ASSIGNED_TEMPLATE_KEY,
        logLabel,
      );
      if (!templateId) {
        return;
      }

      const [recipient] = await this.resolveMemberRecipients(
        params.managerUserId,
        params.managerHandle,
      );
      if (!recipient) {
        this.logger.warn(
          `${logLabel} email skipped: no email found for manager ${params.managerUserId}.`,
        );
        return;
      }

      await this.publish(
        templateId,
        recipient,
        {
          recipientFirstName: recipient.firstName,
          recipientHandle: recipient.handle,
          engagementId: params.engagementId,
          engagementTitle: params.engagementTitle,
          actorHandle: params.actorHandle ?? "",
          timesheetsUrl: this.buildEngagementsAppUrl("timesheets"),
        },
        logLabel,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send ${logLabel} email for manager ${params.managerUserId}: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
    }
  }

  private resolveTemplateId(
    templateKey: string,
    logLabel: string,
  ): string | null {
    const templateId = this.configService.get<string>(templateKey)?.trim();

    if (!templateId) {
      this.logger.warn(
        `SendGrid template ID not configured (${templateKey}). ${logLabel} emails are disabled.`,
      );
      return null;
    }

    return templateId;
  }

  private async findManagers(
    engagementId: string,
  ): Promise<EngagementManagerSummary[]> {
    return (
      (await this.access.findActiveManagers([engagementId])).get(
        engagementId,
      ) ?? []
    );
  }

  /**
   * One email per manager rather than one email to all of them, so managers - who may be on the
   * client side - do not see each other's addresses.
   */
  private async resolveManagerRecipients(
    managers: EngagementManagerSummary[],
  ): Promise<EmailRecipient[]> {
    if (!managers.length) {
      return [];
    }

    const resolved = await Promise.all(
      managers.map((manager) =>
        this.resolveMemberRecipients(manager.userId, manager.handle),
      ),
    );

    return resolved.flat();
  }

  private async resolveMemberRecipients(
    userId: string,
    handle: string,
  ): Promise<EmailRecipient[]> {
    const normalizedUserId = String(userId ?? "").trim();
    if (!normalizedUserId) {
      return [];
    }

    try {
      const member =
        await this.memberService.getMemberByUserId(normalizedUserId);
      const email = member?.email?.trim();

      if (!email) {
        return [];
      }

      return [
        {
          userId: normalizedUserId,
          email,
          firstName: member?.firstName?.trim() || handle,
          handle,
        },
      ];
    } catch (error) {
      this.logger.error(
        `Failed to fetch member details for timesheet email (userId=${normalizedUserId}): ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
      return [];
    }
  }

  /**
   * Names for the assignee, the managers, and whoever acted, in one batched member lookup. A manager's
   * stored name wins, as it does on the timesheet page. A failed lookup is not worth losing the email
   * over: everyone falls back to their handle.
   */
  private async resolvePeople(
    payload: TimesheetEventPayload,
    managers: EngagementManagerSummary[],
  ): Promise<TimesheetPeople> {
    const managerNames = new Map(
      managers
        .filter((manager) => manager.name?.trim())
        .map((manager) => [manager.userId, manager.name!.trim()]),
    );
    const userIdsToResolve = [
      payload.memberId,
      payload.actorUserId,
      ...managers.map((manager) => manager.userId),
    ].filter((userId) => userId && !managerNames.has(userId));

    let resolvedNames = new Map<string, string>();
    try {
      resolvedNames =
        await this.memberService.getMemberNamesByUserIds(userIdsToResolve);
    } catch (error) {
      this.logger.warn(
        `Failed to resolve names for timesheet email (assignment ${payload.assignmentId}): ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
    }

    const nameOf = (userId: string): string | undefined =>
      managerNames.get(userId) ?? resolvedNames.get(userId)?.trim();

    return {
      memberDisplayName: withHandle(
        nameOf(payload.memberId),
        payload.memberHandle,
      ),
      managerDisplayNames: managers
        .map((manager) => withHandle(nameOf(manager.userId), manager.handle))
        .join(", "),
      actorDisplayName: payload.actorHandle
        ? withHandle(nameOf(payload.actorUserId), payload.actorHandle)
        : "",
    };
  }

  private buildTimesheetData(
    topic: string,
    payload: TimesheetEventPayload,
    people: TimesheetPeople,
  ): Record<string, unknown> {
    const workDates = [...payload.workDates].sort().map(formatWorkDate);

    return {
      engagementId: payload.engagementId,
      engagementTitle: payload.engagementTitle,
      assignmentId: payload.assignmentId,
      memberHandle: payload.memberHandle,
      actorHandle: payload.actorHandle ?? "",
      ...people,
      entryCount: workDates.length,
      totalHours: payload.totalHours,
      workDates,
      fromDate: workDates[0] ?? "",
      toDate: workDates[workDates.length - 1] ?? "",
      comment: payload.comment ?? "",
      ...(topic === TimesheetEventTopics.Reopened ||
      topic === TimesheetEventTopics.AdminOverride
        ? {
            changeType:
              topic === TimesheetEventTopics.Reopened ? "reopened" : "modified",
          }
        : {}),
      timesheetUrl: this.buildEngagementsAppUrl(
        `${encodeURIComponent(payload.engagementId)}/timesheets/${encodeURIComponent(
          payload.assignmentId,
        )}`,
      ),
    };
  }

  private async publish(
    templateId: string,
    recipient: EmailRecipient,
    data: Record<string, unknown>,
    logLabel: string,
  ): Promise<void> {
    try {
      await this.eventBusService.postEvent("external.action.email", {
        data,
        recipients: [recipient.email],
        sendgrid_template_id: templateId,
        version: "v3",
      });
      this.logger.log(
        `Published 'external.action.email' (${logLabel}) for user ${recipient.userId}.`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to publish ${logLabel} email for user ${recipient.userId}: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
    }
  }

  /**
   * Same host derivation as the assignment-offer email: the engagements app lives at
   * `engagements.<env domain>`, derived from the API base URL.
   */
  private buildEngagementsAppUrl(path: string): string {
    const baseUrl =
      this.configService.get<string>("TOPCODER_API_URL_BASE") ??
      this.configService.get<string>("PLATFORM_UI_BASE_URL") ??
      "https://api.topcoder-dev.com";
    const normalizedBaseUrl = baseUrl.trim();
    let hostname = "";

    if (normalizedBaseUrl) {
      try {
        hostname = new URL(normalizedBaseUrl).hostname;
      } catch {
        hostname = normalizedBaseUrl.replace(/^https?:\/\//i, "").split("/")[0];
      }
    }

    const baseHost = hostname
      .replace(/^api\./, "")
      .replace(/^platform\./, "")
      .replace(/^engagements\./, "");
    return `https://engagements.${baseHost || "topcoder-dev.com"}/${path}`;
  }
}

/** `Name (handle)`, or the bare handle when there is no name - the timesheet header's format. */
function withHandle(name: string | null | undefined, handle: string): string {
  return name ? `${name} (${handle})` : handle;
}

/** `YYYY-MM-DD` to the `DD-MM-YYYY` the timesheet pages display. */
function formatWorkDate(value: string): string {
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}-${month}-${year}` : value;
}
