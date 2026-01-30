import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventBusService } from "./event-bus.service";
import { MemberService } from "./member.service";

export type AssignmentOfferRecipient = {
  memberId: string;
  memberHandle?: string | null;
  assignmentId?: string | null;
  engagementId?: string | null;
  assignmentStartDate?: Date | string | null;
  assignmentEndDate?: Date | string | null;
  agreementRate?: string | number | null;
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

    const normalizeDate = (value?: Date | string | null): string => {
      if (!value) {
        return "";
      }
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value.toString();
    };

    const assignmentStartDate = normalizeDate(recipient.assignmentStartDate);
    const assignmentEndDate = normalizeDate(recipient.assignmentEndDate);
    const agreementRate =
      recipient.agreementRate !== undefined && recipient.agreementRate !== null
        ? recipient.agreementRate.toString()
        : "";

    const payload = {
      data: {
        firstName: memberDetails?.firstName ?? "",
        lastName: memberDetails?.lastName ?? "",
        handle: handle ?? "",
        email,
        assignmentId: recipient.assignmentId ?? "",
        engagementId: recipient.engagementId ?? "",
        assignmentStartDate,
        assignmentEndDate,
        agreementRate,
        approvedRate: agreementRate,
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
}
