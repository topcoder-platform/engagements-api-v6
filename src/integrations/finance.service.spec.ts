import { of, throwError } from "rxjs";
import { FinanceService } from "./finance.service";

jest.mock("tc-core-library-js", () => ({
  auth: {
    m2m: () => ({ getMachineToken: jest.fn().mockResolvedValue("m2m-token") }),
  },
}));

describe("FinanceService", () => {
  const config: Record<string, string> = {
    M2M_CLIENT_ID: "client",
    M2M_CLIENT_SECRET: "secret",
    TOPCODER_API_URL_BASE: "https://api.example.com",
  };
  const configService = {
    get: jest.fn((key: string, fallback?: string) => config[key] ?? fallback),
  };
  let httpService: { get: jest.Mock };
  let service: FinanceService;

  const payment = (hoursWorked: number, status: string) => ({
    hoursWorked,
    details: [{ status }],
  });

  beforeEach(() => {
    httpService = { get: jest.fn() };
    service = new FinanceService(httpService as never, configService as never);
  });

  it("sums hours on processed payments with the service's own token", async () => {
    httpService.get.mockReturnValue(
      of({
        data: {
          data: [
            payment(40, "PAID"),
            payment(8.5, "PROCESSING"),
            payment(10, "OWED"),
            payment(2, "ON_HOLD_ADMIN"),
          ],
        },
      }),
    );

    await expect(service.getProcessedPaymentHours("asg-1")).resolves.toBe(60.5);
    expect(httpService.get).toHaveBeenCalledWith(
      "https://api.example.com/v6/finance/winnings/by-external-id/asg-1",
      { headers: { Authorization: "Bearer m2m-token" } },
    );
  });

  it("leaves out cancelled, failed, returned, and credited payments", async () => {
    httpService.get.mockReturnValue(
      of({
        data: {
          data: [
            payment(40, "PAID"),
            payment(8, "CANCELLED"),
            payment(8, "FAILED"),
            payment(8, "RETURNED"),
            payment(8, "CREDITED"),
          ],
        },
      }),
    );

    await expect(service.getProcessedPaymentHours("asg-1")).resolves.toBe(40);
  });

  it("returns null instead of a guess when finance cannot be read", async () => {
    httpService.get.mockReturnValue(throwError(() => new Error("503")));

    await expect(service.getProcessedPaymentHours("asg-1")).resolves.toBeNull();
  });
});
