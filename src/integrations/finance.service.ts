import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import * as core from "tc-core-library-js";

/** The parts of a finance winning this service reads. */
type FinancePayment = {
  hoursWorked?: number | string | null;
  status?: string | null;
  details?: Array<{ status?: string | null }> | null;
};

/**
 * Finance statuses whose hours were never paid out, or were taken back. Every other status - paid,
 * processing, owed, on hold - has committed those hours to a payment. The Work App applies the same
 * rule to its Assignments view, so both show the same hours left.
 */
const UNPROCESSED_PAYMENT_STATUSES = new Set([
  "CANCELLED",
  "CREDITED",
  "FAILED",
  "RETURNED",
]);

/**
 * Reads engagement payments from the finance API.
 *
 * Calls go out with this service's own machine token: the people who need these numbers - engagement
 * managers - usually hold no role the finance API accepts, and their token must not be forwarded anyway.
 */
@Injectable()
export class FinanceService {
  private readonly logger = new Logger(FinanceService.name);
  private readonly m2m;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.m2m = core.auth.m2m({
      AUTH0_URL: this.configService.get<string>(
        "AUTH0_URL",
        "https://topcoder-dev.auth0.com/oauth/token",
      ),
      AUTH0_AUDIENCE: this.configService.get<string>(
        "AUTH0_AUDIENCE",
        "https://api.topcoder-dev.com",
      ),
    });
  }

  /**
   * Hours on an assignment's processed payments: every payment except cancelled, failed, returned,
   * and credited ones.
   *
   * @param assignmentId engagement assignment id, which finance stores as the winning's external id.
   * @returns processed hours rounded to 2 decimals, or `null` when finance could not be read - the
   *   caller should show the figure as unavailable rather than guess.
   */
  async getProcessedPaymentHours(assignmentId: string): Promise<number | null> {
    try {
      const token = await this.getM2MToken();
      const response = await firstValueFrom(
        this.httpService.get<{ data?: FinancePayment[] } | FinancePayment[]>(
          `${this.getFinanceApiUrl()}/winnings/by-external-id/${encodeURIComponent(assignmentId)}`,
          { headers: { Authorization: `Bearer ${token}` } },
        ),
      );
      const payments = Array.isArray(response.data)
        ? response.data
        : (response.data?.data ?? []);

      return this.sumProcessedHours(payments);
    } catch (error) {
      this.logger.warn(
        `Failed to read finance payments for assignment ${assignmentId}: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
      return null;
    }
  }

  private sumProcessedHours(payments: FinancePayment[]): number {
    // Summed in hundredths so 0.1 + 0.2 style float drift cannot leak into an hours figure.
    const totalHundredths = payments
      .filter((payment) => {
        // Finance reports status per installment; an engagement payment has exactly one.
        const status = String(
          payment.details?.[0]?.status ?? payment.status ?? "",
        )
          .trim()
          .toUpperCase();

        return !UNPROCESSED_PAYMENT_STATUSES.has(status);
      })
      .reduce((total, payment) => {
        const hours = Number(payment.hoursWorked);

        return Number.isFinite(hours) && hours > 0
          ? total + Math.round(hours * 100)
          : total;
      }, 0);

    return totalHundredths / 100;
  }

  private getFinanceApiUrl(): string {
    const explicitUrl = this.configService.get<string>("FINANCE_API_URL");
    if (explicitUrl) {
      return explicitUrl.replace(/\/$/, "");
    }

    const apiBaseUrl = this.configService.get<string>(
      "TOPCODER_API_URL_BASE",
      "https://api.topcoder-dev.com",
    );
    return `${apiBaseUrl.replace(/\/$/, "")}/v6/finance`;
  }

  private async getM2MToken(): Promise<string> {
    const clientId = this.configService.get<string>("M2M_CLIENT_ID");
    const clientSecret = this.configService.get<string>("M2M_CLIENT_SECRET");

    if (!clientId || !clientSecret) {
      throw new Error("M2M credentials are not configured.");
    }

    return (await this.m2m.getMachineToken(clientId, clientSecret)) as string;
  }
}
