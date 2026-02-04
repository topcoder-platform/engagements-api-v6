import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventBusService } from "./event-bus.service";
import { MemberService } from "./member.service";

export type AssignmentOfferRecipient = {
  memberId: string;
  memberHandle?: string | null;
  assignmentId?: string | null;
  engagementId?: string | null;
  engagementTitle?: string | null;
  assignmentStartDate?: Date | string | null;
  assignmentEndDate?: Date | string | null;
  agreementRate?: string | number | null;
  otherRemarks?: string | null;
};

@Injectable()
export class AssignmentOfferEmailService {
  private readonly logger = new Logger(AssignmentOfferEmailService.name);

  constructor(
    private readonly memberService: MemberService,
    private readonly eventBusService: EventBusService,
    private readonly configService: ConfigService,
  ) {}

  async sendAssignmentOfferEmail(
    recipient: AssignmentOfferRecipient,
  ): Promise<void> {
    const templateId = this.configService.get<string>(
      "SENDGRID_ASSIGNMENT_OFFER_TEMPLATE_ID",
    );

    if (!templateId) {
      this.logger.warn(
        "SendGrid template ID not configured (SENDGRID_ASSIGNMENT_OFFER_TEMPLATE_ID). Assignment offer emails are disabled.",
      );
      return;
    }

    const memberId = String(recipient.memberId ?? "").trim();
    if (!memberId) {
      this.logger.warn("Assignment offer email skipped: missing member ID.");
      return;
    }

    let memberDetails: {
      email: string | null;
      firstName: string | null;
      lastName: string | null;
    } | null = null;

    try {
      memberDetails = await this.memberService.getMemberByUserId(memberId);
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      this.logger.error(
        `Failed to fetch member details for assignment offer email (memberId=${memberId}): ${message}`,
      );
      return;
    }

    const email = memberDetails?.email ?? null;
    if (!email) {
      this.logger.warn(
        `Assignment offer email skipped: no email found for member ${memberId}.`,
      );
      return;
    }

    let handle = recipient.memberHandle?.trim();
    if (!handle) {
      try {
        handle =
          (await this.memberService.getMemberHandleByUserId(memberId)) ??
          undefined;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "unknown error";
        this.logger.error(
          `Failed to resolve handle for assignment offer email (memberId=${memberId}): ${message}`,
        );
      }
    }

    const formatDate = (value?: Date | string | null): string => {
      if (!value) {
        return "";
      }
      const date = value instanceof Date ? value : new Date(value);
      if (Number.isNaN(date.getTime())) {
        return value.toString();
      }
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
        .format(date)
        .replace(/,/g, "");
    };

    const assignmentStartDate = formatDate(recipient.assignmentStartDate);
    const assignmentEndDate = formatDate(recipient.assignmentEndDate);
    const agreementRate =
      recipient.agreementRate !== undefined && recipient.agreementRate !== null
        ? recipient.agreementRate.toString()
        : "";
    const engagementUrl = this.buildEngagementUrl();

    const payload = {
      data: {
        firstName: memberDetails?.firstName ?? "",
        lastName: memberDetails?.lastName ?? "",
        handle: handle ?? "",
        email,
        assignmentId: recipient.assignmentId ?? "",
        engagementId: recipient.engagementId ?? "",
        engagementTitle: recipient.engagementTitle ?? "",
        engagementUrl,
        assignmentStartDate,
        assignmentEndDate,
        agreementRate,
        otherRemarks: recipient.otherRemarks ?? "",
      },
      recipients: [email],
      sendgrid_template_id: templateId,
      version: "v3",
    };

    try {
      await this.eventBusService.postEvent("external.action.email", payload);
      this.logger.log(
        `Published 'external.action.email' (assignment offer) for member ${memberId} to ${email}.`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      this.logger.error(
        `Failed to publish assignment offer email for member ${memberId}: ${message}`,
      );
    }
  }

  async sendAssignmentOfferEmails(
    recipients: AssignmentOfferRecipient[],
  ): Promise<void> {
    if (!Array.isArray(recipients) || recipients.length === 0) {
      return;
    }

    await Promise.all(
      recipients.map((recipient) => this.sendAssignmentOfferEmail(recipient)),
    );
  }

  private buildEngagementUrl(): string {
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
    const resolvedHost = baseHost || "topcoder-dev.com";
    return `https://engagements.${resolvedHost}/assignments`;
  }
}
