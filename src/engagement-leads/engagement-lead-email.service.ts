import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventBusService } from "../integrations/event-bus.service";
import { IdentityService, RoleMember } from "../integrations/identity.service";
import { MemberService } from "../integrations/member.service";

const LEAD_SUBMITTED_TEMPLATE_KEY =
  "SENDGRID_ENGAGEMENT_LEAD_SUBMITTED_TEMPLATE_ID";
const DEFAULT_FLEXI_TALENT_MANAGER_ROLE = "Flexi Talent Manager";

type SubmittedLead = {
  id: string;
  leadType: string;
  accountName: string;
  roleTitle: string | null;
};

/**
 * Emails the Flexi Talent Managers when a new engagement lead is submitted.
 *
 * The recipients are the members of the Identity role named by `FLEXI_TALENT_MANAGER_ROLE_NAME`
 * (default `Flexi Talent Manager`). The email is disabled while
 * `SENDGRID_ENGAGEMENT_LEAD_SUBMITTED_TEMPLATE_ID` is empty.
 */
@Injectable()
export class EngagementLeadEmailService {
  private readonly logger = new Logger(EngagementLeadEmailService.name);

  constructor(
    private readonly identityService: IdentityService,
    private readonly memberService: MemberService,
    private readonly eventBusService: EventBusService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Sends one email per Flexi Talent Manager, each greeting the recipient by handle. Never throws:
   * a failed notification must not fail the lead submission.
   */
  async sendLeadSubmittedEmails(lead: SubmittedLead): Promise<void> {
    try {
      const templateId = this.configService
        .get<string>(LEAD_SUBMITTED_TEMPLATE_KEY)
        ?.trim();
      if (!templateId) {
        this.logger.warn(
          `SendGrid template ID not configured (${LEAD_SUBMITTED_TEMPLATE_KEY}). Lead submitted emails are disabled.`,
        );
        return;
      }

      const roleName =
        this.configService
          .get<string>("FLEXI_TALENT_MANAGER_ROLE_NAME")
          ?.trim() || DEFAULT_FLEXI_TALENT_MANAGER_ROLE;
      const recipients = await this.resolveRecipients(
        await this.identityService.getRoleMembers(roleName),
      );

      if (!recipients.length) {
        this.logger.warn(
          `Lead submitted email for lead ${lead.id} skipped: no members with an email in role '${roleName}'.`,
        );
        return;
      }

      const leadUrl = this.buildLeadUrl(lead.id);

      await Promise.all(
        recipients.map((recipient) =>
          this.publish(templateId, lead, leadUrl, recipient),
        ),
      );
    } catch (error) {
      this.logger.error(
        `Failed to send lead submitted emails for lead ${lead.id}: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
    }
  }

  /** Role subjects usually carry handle and email; the member API fills in whatever is missing. */
  private async resolveRecipients(
    members: RoleMember[],
  ): Promise<Array<{ userId: string; handle: string; email: string }>> {
    const missing = members.filter((member) => !member.email || !member.handle);
    const emailsByUserId = new Map<string, string>();
    const handlesByUserId = new Map<string, string>();

    if (missing.length) {
      try {
        const emails = await this.memberService.getMemberEmailsByUserIds(
          missing.filter((member) => !member.email).map((m) => m.userId),
        );
        emails.forEach((email, userId) => emailsByUserId.set(userId, email));
      } catch (error) {
        this.logger.error(
          `Failed to look up emails of Flexi Talent Managers: ${
            error instanceof Error ? error.message : "unknown error"
          }`,
        );
      }

      await Promise.all(
        missing
          .filter((member) => !member.handle)
          .map(async (member) => {
            try {
              const handle = await this.memberService.getMemberHandleByUserId(
                member.userId,
              );
              if (handle) {
                handlesByUserId.set(member.userId, handle);
              }
            } catch {
              // The greeting falls back to a blank handle.
            }
          }),
      );
    }

    const seenEmails = new Set<string>();
    return members.flatMap((member) => {
      const email = (
        member.email ??
        emailsByUserId.get(member.userId) ??
        ""
      ).trim();
      // Addresses are compared case-insensitively but sent as stored.
      const dedupeKey = email.toLowerCase();
      if (!email || seenEmails.has(dedupeKey)) {
        return [];
      }
      seenEmails.add(dedupeKey);
      return [
        {
          userId: member.userId,
          handle: member.handle ?? handlesByUserId.get(member.userId) ?? "",
          email,
        },
      ];
    });
  }

  private async publish(
    templateId: string,
    lead: SubmittedLead,
    leadUrl: string,
    recipient: { userId: string; handle: string; email: string },
  ): Promise<void> {
    try {
      await this.eventBusService.postEvent("external.action.email", {
        data: {
          handle: recipient.handle,
          leadId: lead.id,
          leadUrl,
          leadType: lead.leadType,
          accountName: lead.accountName,
          roleTitle: lead.roleTitle ?? "",
        },
        recipients: [recipient.email],
        sendgrid_template_id: templateId,
        version: "v3",
      });
      this.logger.log(
        `Published 'external.action.email' (lead submitted) for lead ${lead.id} to user ${recipient.userId}.`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to publish lead submitted email for lead ${lead.id} to user ${recipient.userId}: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
    }
  }

  /**
   * The lead detail page lives in the work app at `work.<env domain>/engagement-leads/:id`;
   * `WORK_APP_BASE_URL` overrides the host derived from the API base URL.
   */
  private buildLeadUrl(leadId: string): string {
    const path = `engagement-leads/${encodeURIComponent(leadId)}`;
    const override = this.configService
      .get<string>("WORK_APP_BASE_URL")
      ?.trim();
    if (override) {
      return `${override.replace(/\/$/, "")}/${path}`;
    }

    const apiBaseUrl =
      this.configService.get<string>("TOPCODER_API_URL_BASE")?.trim() ||
      "https://api.topcoder-dev.com";
    let hostname: string;
    try {
      hostname = new URL(apiBaseUrl).hostname;
    } catch {
      hostname = apiBaseUrl.replace(/^https?:\/\//i, "").split("/")[0];
    }

    const baseHost = hostname.replace(/^(api|platform|work)\./, "");
    return `https://work.${baseHost || "topcoder-dev.com"}/${path}`;
  }
}
