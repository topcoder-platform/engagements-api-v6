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
  let httpService: { get: jest.Mock; post: jest.Mock };
  let service: FinanceService;

  const payment = (hoursWorked: number, status: string) => ({
    hoursWorked,
    details: [{ status }],
  });

  beforeEach(() => {
    httpService = { get: jest.fn(), post: jest.fn() };
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

  describe("getLastPaidAtByAssignmentIds", () => {
    const winning = (
      externalId: string,
      createdAt: string,
      status = "PAID",
    ) => ({ externalId, createdAt, details: [{ status }] });

    it("returns each assignment's latest processed payment date", async () => {
      httpService.post.mockReturnValue(
        of({
          data: {
            data: [
              winning("asg-1", "2026-09-01T10:00:00.000Z"),
              winning("asg-1", "2026-10-01T10:00:00.000Z", "ON_HOLD_ADMIN"),
              winning("asg-1", "2026-10-20T10:00:00.000Z", "CANCELLED"),
              winning("asg-2", "2026-08-15T10:00:00.000Z"),
            ],
          },
        }),
      );

      const result = await service.getLastPaidAtByAssignmentIds([
        "asg-1",
        "asg-2",
        "asg-3",
        "asg-1",
      ]);

      expect(result).toEqual(
        new Map([
          ["asg-1", new Date("2026-10-01T10:00:00.000Z")],
          ["asg-2", new Date("2026-08-15T10:00:00.000Z")],
        ]),
      );
      expect(httpService.post).toHaveBeenCalledWith(
        "https://api.example.com/v6/finance/winnings/list",
        {
          externalIds: ["asg-1", "asg-2", "asg-3"],
          type: "PAYMENT",
          limit: 500,
          offset: 0,
        },
        { headers: { Authorization: "Bearer m2m-token" } },
      );
    });

    it("reads every page of a batch", async () => {
      const fullPage = Array.from({ length: 500 }, () =>
        winning("asg-1", "2026-09-01T10:00:00.000Z"),
      );
      httpService.post
        .mockReturnValueOnce(of({ data: { data: fullPage } }))
        .mockReturnValueOnce(
          of({
            data: { data: [winning("asg-1", "2026-10-05T10:00:00.000Z")] },
          }),
        );

      const result = await service.getLastPaidAtByAssignmentIds(["asg-1"]);

      expect(httpService.post).toHaveBeenCalledTimes(2);
      expect(httpService.post.mock.calls[1][1]).toEqual(
        expect.objectContaining({ offset: 500 }),
      );
      expect(result?.get("asg-1")).toEqual(
        new Date("2026-10-05T10:00:00.000Z"),
      );
    });

    it("does not call finance without assignments", async () => {
      await expect(service.getLastPaidAtByAssignmentIds([])).resolves.toEqual(
        new Map(),
      );
      expect(httpService.post).not.toHaveBeenCalled();
    });

    it("returns null when finance cannot be read", async () => {
      httpService.post.mockReturnValue(throwError(() => new Error("503")));

      await expect(
        service.getLastPaidAtByAssignmentIds(["asg-1"]),
      ).resolves.toBeNull();
    });
  });
});
