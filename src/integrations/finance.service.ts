import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import * as core from "tc-core-library-js";
import { auth0M2mOptions } from "./m2m-options";

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
    // USE_KEYCLOAK=true uses KEYCLOAK_*; otherwise the pre-migration Auth0 settings.
    this.m2m = core.auth.m2m(auth0M2mOptions(this.configService));
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

  /**
   * Return this workload's M2M token from the provider selected by `USE_KEYCLOAK`:
   * a verified Keycloak token (`KEYCLOAK_CLIENT_ID`/`SECRET`) when `true`, otherwise an
   * Auth0 token for `M2M_CLIENT_ID`/`M2M_CLIENT_SECRET` (see `auth0M2mOptions`).
   * Takes no parameters; rejects if the credentials are missing or issuance fails.
   */
  private async getM2MToken(): Promise<string> {
    return this.m2m.getMachineToken();
  }
}
