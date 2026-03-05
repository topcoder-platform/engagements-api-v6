import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventBusService } from "./event-bus.service";
import { MemberService } from "./member.service";

/**
 * Publishes applicant status notification emails to the external email pipeline.
 *
 * This service consumes `SENDGRID_UNDER_REVIEW_TEMPLATE_ID` and
 * `SENDGRID_REJECTED_TEMPLATE_ID` to select the SendGrid template used for each
 * status notification.
 */
@Injectable()
export class ApplicationStatusEmailService {
  private readonly logger = new Logger(ApplicationStatusEmailService.name);

  constructor(
    private readonly memberService: MemberService,
    private readonly eventBusService: EventBusService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Sends an email notification when an application transitions to an
   * externally visible status.
   *
   * @param params - Email parameters including applicant user ID, target status,
   *   and optional engagement title used in the template payload.
   * @returns A promise that resolves after the event bus publish attempt
   *   completes.
   * @throws This method does not intentionally throw; operational failures are
   *   logged and the method returns early.
   */
  async sendApplicationStatusEmail(params: {
    memberId: string;
    status: "UNDER_REVIEW" | "REJECTED";
    engagementTitle?: string | null;
  }): Promise<void> {
    const templateKey =
      params.status === "UNDER_REVIEW"
        ? "SENDGRID_UNDER_REVIEW_TEMPLATE_ID"
        : "SENDGRID_REJECTED_TEMPLATE_ID";
    const templateId = this.configService.get<string>(templateKey);

    if (!templateId) {
      this.logger.warn(
        `SendGrid template ID not configured (${templateKey}). Application status emails are disabled.`,
      );
      return;
    }

    const memberId = String(params.memberId ?? "").trim();
    if (!memberId) {
      this.logger.warn("Application status email skipped: missing member ID.");
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
        `Failed to fetch member details for application status email (memberId=${memberId}): ${message}`,
      );
      return;
    }

    const email = memberDetails?.email?.trim() ?? "";
    if (!email) {
      this.logger.warn(
        `Application status email skipped: no email found for member ${memberId}.`,
      );
      return;
    }

    let handle = "";
    try {
      handle =
        (await this.memberService.getMemberHandleByUserId(memberId)) ?? "";
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      this.logger.error(
        `Failed to resolve handle for application status email (memberId=${memberId}): ${message}`,
      );
    }

    const payload = {
      data: {
        firstName: memberDetails?.firstName ?? "",
        lastName: memberDetails?.lastName ?? "",
        handle,
        email,
        engagementTitle: params.engagementTitle ?? "",
      },
      recipients: [email],
      sendgrid_template_id: templateId,
      version: "v3",
    };

    try {
      await this.eventBusService.postEvent("external.action.email", payload);
      this.logger.log(
        `Published 'external.action.email' (application ${params.status.toLowerCase()}) for member ${memberId} to ${email}.`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      this.logger.error(
        `Failed to publish application ${params.status.toLowerCase()} email for member ${memberId}: ${message}`,
      );
    }
  }
}
