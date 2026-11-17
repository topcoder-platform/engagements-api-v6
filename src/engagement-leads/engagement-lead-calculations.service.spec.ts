import { NotFoundException, ValidationPipe } from "@nestjs/common";
import {
  LeadCalculationCommercialInput,
  LeadCalculationMemberInput,
  Prisma,
} from "@prisma/client";
import { SaveEngagementLeadCalculationDto } from "./dto";
import { EngagementLeadCalculationsService } from "./engagement-lead-calculations.service";

const createdAt = new Date("2026-11-10T10:00:00.000Z");
const updatedAt = new Date("2026-11-11T10:00:00.000Z");

function storedCalculation(overrides: Record<string, unknown> = {}) {
  return {
    id: "calc-1",
    engagementLeadId: "lead-1",
    memberName: "Jane Doe",
    accountName: "Acme",
    smu: "Others",
    costTransferPercent: new Prisma.Decimal("72.5"),
    durationWeeks: new Prisma.Decimal("52"),
    hoursPerDay: new Prisma.Decimal("8"),
    referral: true,
    memberInputField: LeadCalculationMemberInput.MEMBER_RATE,
    memberInputValue: new Prisma.Decimal("50.5"),
    commercialInputField: LeadCalculationCommercialInput.BOOKING_COST,
    commercialInputValue: new Prisma.Decimal("220000"),
    createdAt,
    createdBy: "tm-1",
    updatedAt,
    updatedBy: "tm-2",
    ...overrides,
  };
}

describe("EngagementLeadCalculationsService", () => {
  let service: EngagementLeadCalculationsService;
  let db: {
    engagementLead: { findUnique: jest.Mock };
    engagementLeadCalculation: {
      create: jest.Mock;
      delete: jest.Mock;
      findFirst: jest.Mock;
      findMany: jest.Mock;
      update: jest.Mock;
    };
  };

  beforeEach(() => {
    db = {
      engagementLead: {
        findUnique: jest.fn().mockResolvedValue({ id: "lead-1" }),
      },
      engagementLeadCalculation: {
        create: jest.fn().mockResolvedValue(storedCalculation()),
        delete: jest.fn().mockResolvedValue(undefined),
        findFirst: jest.fn().mockResolvedValue({ id: "calc-1" }),
        findMany: jest.fn().mockResolvedValue([storedCalculation()]),
        update: jest.fn().mockResolvedValue(storedCalculation()),
      },
    };
    service = new EngagementLeadCalculationsService(db as any);
  });

  describe("findAll", () => {
    it("lists the lead's calculations oldest first with amounts as numbers", async () => {
      const result = await service.findAll("lead-1");

      expect(db.engagementLeadCalculation.findMany).toHaveBeenCalledWith({
        where: { engagementLeadId: "lead-1" },
        orderBy: { createdAt: "asc" },
      });
      expect(result).toEqual([
        {
          id: "calc-1",
          engagementLeadId: "lead-1",
          memberName: "Jane Doe",
          accountName: "Acme",
          smu: "Others",
          costTransferPercent: 72.5,
          durationWeeks: 52,
          hoursPerDay: 8,
          referral: true,
          memberInputField: LeadCalculationMemberInput.MEMBER_RATE,
          memberInputValue: 50.5,
          commercialInputField: LeadCalculationCommercialInput.BOOKING_COST,
          commercialInputValue: 220000,
          createdAt,
          createdBy: "tm-1",
          updatedAt,
          updatedBy: "tm-2",
        },
      ]);
    });

    it("returns null for amounts that were not entered", async () => {
      db.engagementLeadCalculation.findMany.mockResolvedValue([
        storedCalculation({
          commercialInputField: null,
          commercialInputValue: null,
          costTransferPercent: null,
          durationWeeks: null,
        }),
      ]);

      const [result] = await service.findAll("lead-1");

      expect(result.commercialInputValue).toBeNull();
      expect(result.durationWeeks).toBeNull();
      expect(result.costTransferPercent).toBeNull();
    });

    it("throws when the lead does not exist", async () => {
      db.engagementLead.findUnique.mockResolvedValue(null);

      await expect(service.findAll("missing")).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe("create", () => {
    it("saves the entered values against the lead with who saved them", async () => {
      await service.create(
        "lead-1",
        {
          memberName: "  Jane Doe  ",
          smu: "Others",
          costTransferPercent: 72.5,
          durationWeeks: 52,
          hoursPerDay: 8,
          memberInputField: LeadCalculationMemberInput.MEMBER_RATE,
          memberInputValue: 50,
        },
        "tm-1",
      );

      expect(db.engagementLeadCalculation.create).toHaveBeenCalledWith({
        data: {
          engagementLeadId: "lead-1",
          memberName: "Jane Doe",
          accountName: null,
          smu: "Others",
          costTransferPercent: 72.5,
          durationWeeks: 52,
          hoursPerDay: 8,
          referral: false,
          memberInputField: LeadCalculationMemberInput.MEMBER_RATE,
          memberInputValue: 50,
          commercialInputField: null,
          commercialInputValue: null,
          createdBy: "tm-1",
          updatedBy: "tm-1",
        },
      });
    });

    it.each(["EURP", undefined])(
      "drops the cost transfer %% when the SMU is %s",
      async (smu) => {
        await service.create("lead-1", { smu, costTransferPercent: 72.5 });

        expect(db.engagementLeadCalculation.create).toHaveBeenCalledWith({
          data: expect.objectContaining({ costTransferPercent: null }),
        });
      },
    );

    it("keeps the cost transfer % for the Others SMU whatever its case", async () => {
      await service.create("lead-1", {
        smu: " others ",
        costTransferPercent: 72.5,
      });

      expect(db.engagementLeadCalculation.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          smu: "others",
          costTransferPercent: 72.5,
        }),
      });
    });

    it("throws when the lead does not exist", async () => {
      db.engagementLead.findUnique.mockResolvedValue(null);

      await expect(service.create("missing", {})).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(db.engagementLeadCalculation.create).not.toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("overwrites every value, clearing the ones left out", async () => {
      await service.update(
        "lead-1",
        "calc-1",
        {
          commercialInputField:
            LeadCalculationCommercialInput.TC_MARGIN_PERCENT,
          commercialInputValue: 25,
        },
        "tm-2",
      );

      expect(db.engagementLeadCalculation.findFirst).toHaveBeenCalledWith({
        where: { id: "calc-1", engagementLeadId: "lead-1" },
        select: { id: true },
      });
      expect(db.engagementLeadCalculation.update).toHaveBeenCalledWith({
        where: { id: "calc-1" },
        data: {
          memberName: null,
          accountName: null,
          smu: null,
          costTransferPercent: null,
          durationWeeks: null,
          hoursPerDay: null,
          referral: false,
          memberInputField: null,
          memberInputValue: null,
          commercialInputField:
            LeadCalculationCommercialInput.TC_MARGIN_PERCENT,
          commercialInputValue: 25,
          updatedBy: "tm-2",
        },
      });
    });

    it("throws when the calculation does not belong to the lead", async () => {
      db.engagementLeadCalculation.findFirst.mockResolvedValue(null);

      await expect(
        service.update("other-lead", "calc-1", {}),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(db.engagementLeadCalculation.update).not.toHaveBeenCalled();
    });
  });

  describe("remove", () => {
    it("deletes the calculation", async () => {
      await service.remove("lead-1", "calc-1");

      expect(db.engagementLeadCalculation.delete).toHaveBeenCalledWith({
        where: { id: "calc-1" },
      });
    });

    it("throws when the calculation does not belong to the lead", async () => {
      db.engagementLeadCalculation.findFirst.mockResolvedValue(null);

      await expect(
        service.remove("other-lead", "calc-1"),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(db.engagementLeadCalculation.delete).not.toHaveBeenCalled();
    });
  });
});

describe("SaveEngagementLeadCalculationDto", () => {
  const pipe = new ValidationPipe({ transform: true, whitelist: true });
  const validate = (body: Record<string, unknown>) =>
    pipe.transform(body, {
      type: "body",
      metatype: SaveEngagementLeadCalculationDto,
    });

  it.each([[{ costTransferPercent: 100 }], [{ costTransferPercent: 0.01 }]])(
    "accepts %o",
    async (body) => {
      await expect(validate(body)).resolves.toBeDefined();
    },
  );

  it("accepts nulls to clear values", async () => {
    await expect(
      validate({ commercialInputValue: null, smu: null }),
    ).resolves.toBeDefined();
  });

  it.each([
    [{ hoursPerDay: 25 }],
    [{ memberInputField: "SOMETHING_ELSE" }],
    [{ commercialInputValue: "220000" }],
    [{ commercialInputValue: 1.23456 }],
    [{ referral: "yes" }],
    [{ costTransferPercent: 0 }],
    [{ costTransferPercent: 100.01 }],
    [{ costTransferPercent: 72.555 }],
  ])("rejects %o", async (body) => {
    await expect(validate(body)).rejects.toBeDefined();
  });
});
