import { Prisma, TimesheetAuditAction } from "@prisma/client";
import { TimesheetActorRole } from "./timesheet-roles";
import { TimesheetAuditService } from "./timesheet-audit.service";

jest.mock("nanoid", () => ({
  nanoid: () => "audit-id",
}));

describe("TimesheetAuditService", () => {
  let service: TimesheetAuditService;
  let create: jest.Mock;
  let tx: Prisma.TransactionClient;

  const baseInput = {
    timesheetEntryId: "entry1",
    action: TimesheetAuditAction.UPDATED,
    actorUserId: "1001",
    actorHandle: "johnsmith",
    actorRole: TimesheetActorRole.Member,
  };

  beforeEach(() => {
    create = jest.fn().mockResolvedValue({ id: "audit-id" });
    tx = {
      engagementTimesheetEntryAudit: { create },
    } as unknown as Prisma.TransactionClient;
    service = new TimesheetAuditService();
  });

  it("writes through the transaction client it is given", async () => {
    await service.record(tx, baseInput);

    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        id: "audit-id",
        timesheetEntryId: "entry1",
        action: TimesheetAuditAction.UPDATED,
        actorUserId: "1001",
        actorHandle: "johnsmith",
        actorRole: "MEMBER",
      }),
    });
  });

  it("holds no database client of its own, so it cannot write outside the caller's transaction", () => {
    // Structural guarantee rather than a behavioural one: the service takes no DbService, so there is
    // no connection available to it other than the transaction client passed in per call.
    expect(TimesheetAuditService.length).toBe(0);
    expect(
      Object.values(service as unknown as Record<string, unknown>),
    ).toHaveLength(0);
  });

  it("propagates a failed audit write so the caller's transaction rolls back", async () => {
    const failure = new Error("audit write failed");
    create.mockRejectedValue(failure);

    // The caller runs mutation + audit inside one $transaction. A rejected audit write must reject the
    // callback, which is what makes the surrounding mutation roll back.
    const transaction = async () => {
      await service.record(tx, baseInput);
    };

    await expect(transaction()).rejects.toThrow("audit write failed");
  });

  it("records previous and updated values", async () => {
    await service.record(tx, {
      ...baseInput,
      previousValues: {
        hoursWorked: "8.00",
        remarks: "a",
        status: "SUBMITTED",
      },
      updatedValues: { hoursWorked: "8.50", remarks: "b", status: "DRAFT" },
    });

    expect(create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        previousValues: {
          hoursWorked: "8.00",
          remarks: "a",
          status: "SUBMITTED",
        },
        updatedValues: { hoursWorked: "8.50", remarks: "b", status: "DRAFT" },
      }),
    });
  });

  it("serialises Decimal hours as an exact string, never a float", async () => {
    await service.record(tx, {
      ...baseInput,
      previousValues: { hoursWorked: new Prisma.Decimal("8.5") },
      updatedValues: { hoursWorked: new Prisma.Decimal("9.25") },
    });

    const { data } = create.mock.calls[0][0];

    expect(data.previousValues).toEqual({ hoursWorked: "8.50" });
    expect(data.updatedValues).toEqual({ hoursWorked: "9.25" });
    expect(typeof data.previousValues.hoursWorked).toBe("string");
  });

  it("stores DbNull rather than a JSON null when a snapshot is absent", async () => {
    await service.record(tx, baseInput);

    const { data } = create.mock.calls[0][0];

    expect(data.previousValues).toBe(Prisma.DbNull);
    expect(data.updatedValues).toBe(Prisma.DbNull);
  });

  it("drops undefined snapshot fields instead of recording them as null", async () => {
    await service.record(tx, {
      ...baseInput,
      updatedValues: { hoursWorked: "8.00", remarks: undefined },
    });

    const { data } = create.mock.calls[0][0];

    expect(data.updatedValues).toEqual({ hoursWorked: "8.00" });
    expect("remarks" in data.updatedValues).toBe(false);
  });

  it("keeps an explicit null, which is how a cleared remark is recorded", async () => {
    await service.record(tx, {
      ...baseInput,
      updatedValues: { remarks: null },
    });

    const { data } = create.mock.calls[0][0];

    expect(data.updatedValues).toEqual({ remarks: null });
  });

  it("carries the comment, which holds an approval comment or an override reason", async () => {
    await service.record(tx, {
      ...baseInput,
      action: TimesheetAuditAction.ADMIN_OVERRIDE,
      actorRole: TimesheetActorRole.Administrator,
      comment: "Corrected after payroll query",
    });

    expect(create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        action: TimesheetAuditAction.ADMIN_OVERRIDE,
        actorRole: "ADMINISTRATOR",
        comment: "Corrected after payroll query",
      }),
    });
  });

  it("nulls an absent comment and handle", async () => {
    await service.record(tx, {
      timesheetEntryId: "entry1",
      action: TimesheetAuditAction.CREATED,
      actorUserId: "system",
      actorRole: TimesheetActorRole.Machine,
    });

    expect(create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        actorHandle: null,
        comment: null,
        actorRole: "MACHINE",
      }),
    });
  });

  describe("recordMany", () => {
    it("writes one record per entry through the same transaction client", async () => {
      await service.recordMany(tx, [
        { ...baseInput, timesheetEntryId: "entry1" },
        { ...baseInput, timesheetEntryId: "entry2" },
        { ...baseInput, timesheetEntryId: "entry3" },
      ]);

      expect(create).toHaveBeenCalledTimes(3);
      expect(
        create.mock.calls.map(([call]) => call.data.timesheetEntryId),
      ).toEqual(["entry1", "entry2", "entry3"]);
    });

    it("stops and propagates when one record fails", async () => {
      create
        .mockResolvedValueOnce({ id: "a" })
        .mockRejectedValueOnce(new Error("boom"));

      await expect(
        service.recordMany(tx, [
          { ...baseInput, timesheetEntryId: "entry1" },
          { ...baseInput, timesheetEntryId: "entry2" },
          { ...baseInput, timesheetEntryId: "entry3" },
        ]),
      ).rejects.toThrow("boom");

      expect(create).toHaveBeenCalledTimes(2);
    });
  });
});
