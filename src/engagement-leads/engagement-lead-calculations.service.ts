import { Injectable, NotFoundException } from "@nestjs/common";
import { EngagementLeadCalculation, Prisma } from "@prisma/client";
import { DbService } from "../db/db.service";
import {
  EngagementLeadCalculationResponseDto,
  SaveEngagementLeadCalculationDto,
} from "./dto";

function toNumber(value: Prisma.Decimal | null): number | null {
  return value === null ? null : value.toNumber();
}

function trimOrNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/**
 * Saved Flexi Talent cost calculations. A lead can have several (e.g. one per resource); saving
 * one overwrites its previous values, so there is no version history.
 */
@Injectable()
export class EngagementLeadCalculationsService {
  constructor(private readonly db: DbService) {}

  async findAll(
    leadId: string,
  ): Promise<EngagementLeadCalculationResponseDto[]> {
    await this.assertLeadExists(leadId);

    const calculations = await this.db.engagementLeadCalculation.findMany({
      where: { engagementLeadId: leadId },
      orderBy: { createdAt: "asc" },
    });

    return calculations.map((calculation) => this.toResponse(calculation));
  }

  async create(
    leadId: string,
    dto: SaveEngagementLeadCalculationDto,
    userId?: string,
  ): Promise<EngagementLeadCalculationResponseDto> {
    await this.assertLeadExists(leadId);

    const created = await this.db.engagementLeadCalculation.create({
      data: {
        ...this.toData(dto),
        engagementLeadId: leadId,
        createdBy: userId ?? null,
        updatedBy: userId ?? null,
      },
    });

    return this.toResponse(created);
  }

  async update(
    leadId: string,
    calculationId: string,
    dto: SaveEngagementLeadCalculationDto,
    userId?: string,
  ): Promise<EngagementLeadCalculationResponseDto> {
    await this.assertCalculationExists(leadId, calculationId);

    const updated = await this.db.engagementLeadCalculation.update({
      where: { id: calculationId },
      data: {
        ...this.toData(dto),
        updatedBy: userId ?? null,
      },
    });

    return this.toResponse(updated);
  }

  async remove(leadId: string, calculationId: string): Promise<void> {
    await this.assertCalculationExists(leadId, calculationId);

    await this.db.engagementLeadCalculation.delete({
      where: { id: calculationId },
    });
  }

  private async assertLeadExists(leadId: string): Promise<void> {
    const lead = await this.db.engagementLead.findUnique({
      where: { id: leadId },
      select: { id: true },
    });

    if (!lead) {
      throw new NotFoundException("Engagement lead not found.");
    }
  }

  // Looked up by lead too, so a calculation can't be changed through another lead's URL.
  private async assertCalculationExists(
    leadId: string,
    calculationId: string,
  ): Promise<void> {
    const calculation = await this.db.engagementLeadCalculation.findFirst({
      where: { id: calculationId, engagementLeadId: leadId },
      select: { id: true },
    });

    if (!calculation) {
      throw new NotFoundException("Cost calculation not found.");
    }
  }

  // Every field is written, so a value the user cleared is cleared in the database too.
  private toData(dto: SaveEngagementLeadCalculationDto) {
    return {
      memberName: trimOrNull(dto.memberName),
      accountName: trimOrNull(dto.accountName),
      smu: trimOrNull(dto.smu),
      durationWeeks: dto.durationWeeks ?? null,
      hoursPerDay: dto.hoursPerDay ?? null,
      referral: dto.referral ?? false,
      memberInputField: dto.memberInputField ?? null,
      memberInputValue: dto.memberInputValue ?? null,
      commercialInputField: dto.commercialInputField ?? null,
      commercialInputValue: dto.commercialInputValue ?? null,
    };
  }

  private toResponse(
    calculation: EngagementLeadCalculation,
  ): EngagementLeadCalculationResponseDto {
    return {
      id: calculation.id,
      engagementLeadId: calculation.engagementLeadId,
      memberName: calculation.memberName,
      accountName: calculation.accountName,
      smu: calculation.smu,
      durationWeeks: toNumber(calculation.durationWeeks),
      hoursPerDay: toNumber(calculation.hoursPerDay),
      referral: calculation.referral,
      memberInputField: calculation.memberInputField,
      memberInputValue: toNumber(calculation.memberInputValue),
      commercialInputField: calculation.commercialInputField,
      commercialInputValue: toNumber(calculation.commercialInputValue),
      createdAt: calculation.createdAt,
      createdBy: calculation.createdBy,
      updatedAt: calculation.updatedAt,
      updatedBy: calculation.updatedBy,
    };
  }
}
