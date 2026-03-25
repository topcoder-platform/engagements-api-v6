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
  durationMonths?: number | null;
  ratePerHour?: string | number | null;
  standardHoursPerWeek?: string | number | null;
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

  /**
   * Sends the initial assignment-offer email to a member after they are newly
   * selected or assigned to an engagement.
   *
   * @param recipient - Assignment and member details used to populate the
   *   SendGrid template.
   * @returns A promise that resolves after the email event is published or
   *   skipped due to missing configuration/member data.
   */
  async sendAssignmentOfferEmail(
    recipient: AssignmentOfferRecipient,
  ): Promise<void> {
    await this.sendAssignmentEmail(
      recipient,
      "SENDGRID_ASSIGNMENT_OFFER_TEMPLATE_ID",
      "assignment offer",
      "offer",
    );
  }

  /**
   * Sends the assignment-update email to a member when assignment terms are
   * edited after the initial offer has already been created.
   *
   * @param recipient - Assignment and member details used to populate the
   *   SendGrid template.
   * @returns A promise that resolves after the email event is published or
   *   skipped due to missing configuration/member data.
   */
  async sendAssignmentUpdatedEmail(
    recipient: AssignmentOfferRecipient,
  ): Promise<void> {
    await this.sendAssignmentEmail(
      recipient,
      "SENDGRID_ENGAGEMENT_ASSIGNMENT_UPDATED_TEMPLATE_ID",
      "engagement assignment updated",
      "updated",
    );
  }

  /**
   * Sends initial assignment-offer emails in parallel for a batch of members.
   *
   * @param recipients - Member-specific assignment offer payloads.
   * @returns A promise that resolves when all publish attempts settle.
   */
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

  /**
   * Sends assignment-update emails in parallel for a batch of members whose
   * assignment details were modified.
   *
   * @param recipients - Member-specific assignment update payloads.
   * @returns A promise that resolves when all publish attempts settle.
   */
  async sendAssignmentUpdatedEmails(
    recipients: AssignmentOfferRecipient[],
  ): Promise<void> {
    if (!Array.isArray(recipients) || recipients.length === 0) {
      return;
    }

    await Promise.all(
      recipients.map((recipient) => this.sendAssignmentUpdatedEmail(recipient)),
    );
  }

  /**
   * Resolves member context, builds the SendGrid payload, and publishes the
   * email event for assignment notifications.
   *
   * @param recipient - Assignment and member details used in the template
   *   payload.
   * @param templateKey - Configuration key containing the SendGrid template ID.
   * @param logLabel - Human-readable label used in structured logs.
   * @returns A promise that resolves after the publish attempt completes.
   */
  private async sendAssignmentEmail(
    recipient: AssignmentOfferRecipient,
    templateKey: string,
    logLabel: string,
    payloadType: "offer" | "updated",
  ): Promise<void> {
    const templateId = this.configService.get<string>(templateKey);

    if (!templateId) {
      this.logger.warn(
        `SendGrid template ID not configured (${templateKey}). ${logLabel} emails are disabled.`,
      );
      return;
    }

    const memberId = String(recipient.memberId ?? "").trim();
    if (!memberId) {
      this.logger.warn(`${logLabel} email skipped: missing member ID.`);
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
        `Failed to fetch member details for ${logLabel} email (memberId=${memberId}): ${message}`,
      );
      return;
    }

    const email = memberDetails?.email ?? null;
    if (!email) {
      this.logger.warn(
        `${logLabel} email skipped: no email found for member ${memberId}.`,
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
          `Failed to resolve handle for ${logLabel} email (memberId=${memberId}): ${message}`,
        );
      }
    }

    const payload = {
      data:
        payloadType === "offer"
          ? this.buildAssignmentOfferPayload(recipient)
          : this.buildAssignmentUpdatedPayload(
              recipient,
              email,
              memberDetails,
              handle,
            ),
      recipients: [email],
      sendgrid_template_id: templateId,
      version: "v3",
    };

    try {
      await this.eventBusService.postEvent("external.action.email", payload);
      this.logger.log(
        `Published 'external.action.email' (${logLabel}) for member ${memberId} to ${email}.`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      this.logger.error(
        `Failed to publish ${logLabel} email for member ${memberId}: ${message}`,
      );
    }
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

  /**
   * Builds the fields shared by assignment-offer and assignment-update
   * templates.
   *
   * @param recipient - Assignment details provided by the calling service.
   * @returns The shared SendGrid dynamic template data delivered to both
   *   templates.
   */
  private buildSharedAssignmentPayload(
    recipient: AssignmentOfferRecipient,
  ): Record<string, number | string> {
    const contractDuration = this.toIntegerValue(recipient.durationMonths);
    const hoursPerWeek = this.toDecimalValue(recipient.standardHoursPerWeek);
    const parsedRatePerHour = this.toDecimalValue(recipient.ratePerHour);
    const weeklyPayment =
      parsedRatePerHour !== null && hoursPerWeek !== null
        ? (parsedRatePerHour * hoursPerWeek).toFixed(2)
        : this.formatDecimalValue(recipient.agreementRate);
    const otherRemarks = recipient.otherRemarks ?? "";

    return {
      engagementTitle: recipient.engagementTitle ?? "",
      contractDuration: contractDuration ?? "",
      assignmentStartDate: this.formatLongDate(recipient.assignmentStartDate),
      hoursPerWeek: hoursPerWeek ?? "",
      ratePerHour: this.formatDecimalValue(recipient.ratePerHour),
      weeklyPayment,
      otherRemarks,
      otherRemarts: otherRemarks,
      engagementUrl: this.buildEngagementUrl(),
    };
  }

  /**
   * Builds the template payload for the initial assignment-offer email.
   *
   * @param recipient - Assignment details provided by the calling service.
   * @returns The SendGrid dynamic template data for the offer email.
   */
  private buildAssignmentOfferPayload(
    recipient: AssignmentOfferRecipient,
  ): Record<string, number | string> {
    return this.buildSharedAssignmentPayload(recipient);
  }

  /**
   * Builds the template payload for assignment-update emails, including the
   * same offer fields sent by the initial assignment-offer template.
   *
   * @param recipient - Assignment details provided by the calling service.
   * @param email - Member email address used by the notification.
   * @param memberDetails - Member profile fields resolved from the member API.
   * @param handle - Optional member handle for personalization.
   * @returns The SendGrid dynamic template data for the update email.
   */
  private buildAssignmentUpdatedPayload(
    recipient: AssignmentOfferRecipient,
    email: string,
    memberDetails: {
      email: string | null;
      firstName: string | null;
      lastName: string | null;
    } | null,
    handle?: string,
  ): Record<string, number | string> {
    const billingStartDate = this.formatShortDate(
      recipient.assignmentStartDate,
    );
    const assignmentEndDate = this.formatShortDate(recipient.assignmentEndDate);
    const durationMonths = this.toIntegerValue(recipient.durationMonths);
    const standardHoursPerWeek = this.toDecimalValue(
      recipient.standardHoursPerWeek,
    );

    return {
      firstName: memberDetails?.firstName ?? "",
      lastName: memberDetails?.lastName ?? "",
      handle: handle ?? "",
      email,
      assignmentId: recipient.assignmentId ?? "",
      engagementId: recipient.engagementId ?? "",
      assignmentEndDate,
      billingStartDate,
      durationMonths: durationMonths ?? "",
      standardHoursPerWeek: standardHoursPerWeek ?? "",
      agreementRate: this.formatRawValue(recipient.agreementRate),
      ...this.buildSharedAssignmentPayload(recipient),
    };
  }

  /**
   * Formats assignment dates for the existing update-email template.
   *
   * @param value - Date-like input received from the assignment record.
   * @returns A short date string such as `Feb 16 2026`, or an empty string.
   */
  private formatShortDate(value?: Date | string | null): string {
    if (!value) {
      return "";
    }

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value.toString();
    }

    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      timeZone: "UTC",
      year: "numeric",
    })
      .format(date)
      .replace(/,/g, "");
  }

  /**
   * Formats assignment dates for the assignment-offer template.
   *
   * @param value - Date-like input received from the assignment record.
   * @returns A long date string such as `16 February 2026`, or an empty
   *   string.
   */
  private formatLongDate(value?: Date | string | null): string {
    return this.formatDate(value, "en-GB", "long");
  }

  /**
   * Converts a date-like input into a UTC string tailored to the target
   * template.
   *
   * @param value - Date-like input received from the assignment record.
   * @param locale - Locale used to render the final string.
   * @param month - Month display format required by the template.
   * @returns The formatted date string, the original string for invalid dates,
   *   or an empty string when the value is absent.
   */
  private formatDate(
    value: Date | string | null | undefined,
    locale: string,
    month: "long" | "short",
  ): string {
    if (!value) {
      return "";
    }

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value.toString();
    }

    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month,
      timeZone: "UTC",
      year: "numeric",
    })
      .format(date)
      .replace(/,/g, "");
  }

  /**
   * Normalizes numeric inputs that should be delivered as integers.
   *
   * @param value - Assignment field value that may be numeric or string-like.
   * @returns The integer value, or `null` when the input is absent/invalid.
   */
  private toIntegerValue(value?: number | string | null): number | null {
    if (value === undefined || value === null || value === "") {
      return null;
    }

    const parsedValue =
      typeof value === "number" ? value : Number.parseInt(value, 10);

    if (!Number.isFinite(parsedValue)) {
      return null;
    }

    return Math.trunc(parsedValue);
  }

  /**
   * Normalizes numeric inputs that should be formatted with two decimal places.
   *
   * @param value - Assignment field value that may be numeric or string-like.
   * @returns The decimal value, or `null` when the input is absent/invalid.
   */
  private toDecimalValue(value?: number | string | null): number | null {
    if (value === undefined || value === null || value === "") {
      return null;
    }

    const parsedValue = typeof value === "number" ? value : Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  /**
   * Formats numeric inputs as currency-style decimal strings.
   *
   * @param value - Assignment field value that may be numeric or string-like.
   * @returns A string with two decimal places, or an empty string.
   */
  private formatDecimalValue(value?: number | string | null): string {
    const parsedValue = this.toDecimalValue(value);
    return parsedValue === null ? "" : parsedValue.toFixed(2);
  }

  /**
   * Preserves existing update-email behavior for loosely formatted values.
   *
   * @param value - Assignment field value that may be numeric or string-like.
   * @returns The string representation of the value, or an empty string.
   */
  private formatRawValue(value?: number | string | null): string {
    return value === undefined || value === null ? "" : value.toString();
  }
}
