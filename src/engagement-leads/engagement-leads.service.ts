import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import {
  EngagementLead,
  EngagementLeadStatus,
  ExperienceLevel,
  Prisma,
} from "@prisma/client";
import { nanoid } from "nanoid";
import { DbService } from "../db/db.service";
import { PaginatedResponse } from "../engagements/dto";
import {
  CreateEngagementLeadIntakeDto,
  EngagementLeadPrefillDto,
  EngagementLeadQueryDto,
  EngagementLeadResponseDto,
  UpdateEngagementLeadStatusDto,
} from "./dto";

@Injectable()
export class EngagementLeadsService {
  private readonly logger = new Logger(EngagementLeadsService.name);

  constructor(private readonly db: DbService) {}

  private transformToResponseDto(lead: EngagementLead): EngagementLeadResponseDto {
    return {
      id: lead.id,
      workEmail: lead.workEmail,
      accountName: lead.accountName,
      smu: lead.smu,
      engagementModel: lead.engagementModel,
      roleTitle: lead.roleTitle,
      jobDescription: lead.jobDescription,
      requiredSkills: lead.requiredSkills,
      experienceLevel: lead.experienceLevel,
      minYearsExperience: lead.minYearsExperience,
      industryDomain: lead.industryDomain,
      resourcesRequired: lead.resourcesRequired,
      preferredStartDate: lead.preferredStartDate,
      engagementDuration: lead.engagementDuration,
      workingHoursPerDay: lead.workingHoursPerDay,
      timeZoneRequirement: lead.timeZoneRequirement,
      remoteWorkAccepted: lead.remoteWorkAccepted,
      workLocationRestrictions: lead.workLocationRestrictions,
      billRateCurrency: lead.billRateCurrency,
      billRateAmount: lead.billRateAmount,
      priority: lead.priority,
      additionalRequirements: lead.additionalRequirements,
      status: lead.status,
      convertedEngagementId: lead.convertedEngagementId,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    };
  }

  async createFromIntake(
    intakeDto: CreateEngagementLeadIntakeDto,
  ): Promise<EngagementLeadResponseDto> {
    this.logger.debug("Creating engagement lead from intake", {
      workEmail: intakeDto.workEmail,
      accountName: intakeDto.accountName,
    });

    const lead = await this.db.engagementLead.create({
      data: {
        id: nanoid(),
        workEmail: intakeDto.workEmail.trim().toLowerCase(),
        accountName: intakeDto.accountName.trim(),
        smu: intakeDto.smu.trim(),
        engagementModel: intakeDto.engagementModel,
        roleTitle: intakeDto.roleTitle.trim(),
        jobDescription: intakeDto.jobDescription.trim(),
        requiredSkills: intakeDto.requiredSkills,
        experienceLevel: intakeDto.experienceLevel,
        minYearsExperience: intakeDto.minYearsExperience,
        industryDomain: intakeDto.industryDomain?.trim() || null,
        resourcesRequired: intakeDto.resourcesRequired,
        preferredStartDate: new Date(intakeDto.preferredStartDate),
        engagementDuration: intakeDto.engagementDuration.trim(),
        workingHoursPerDay: intakeDto.workingHoursPerDay,
        timeZoneRequirement: intakeDto.timeZoneRequirement.trim(),
        remoteWorkAccepted: intakeDto.remoteWorkAccepted,
        workLocationRestrictions:
          intakeDto.workLocationRestrictions?.trim() || null,
        billRateCurrency: intakeDto.billRateCurrency.trim().toUpperCase(),
        billRateAmount: intakeDto.billRateAmount.trim(),
        priority: intakeDto.priority,
        additionalRequirements:
          intakeDto.additionalRequirements?.trim() || null,
        status: EngagementLeadStatus.SUBMITTED,
      },
    });

    return this.transformToResponseDto(lead);
  }

  async findAll(
    query: EngagementLeadQueryDto,
  ): Promise<PaginatedResponse<EngagementLeadResponseDto>> {
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 20;
    const skip = (page - 1) * perPage;

    const where: Prisma.EngagementLeadWhereInput = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.priority) {
      where.priority = query.priority as Prisma.EnumLeadPriorityFilter["equals"];
    }

    const [leads, totalCount] = await Promise.all([
      this.db.engagementLead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: perPage,
      }),
      this.db.engagementLead.count({ where }),
    ]);

    return {
      data: leads.map((lead) => this.transformToResponseDto(lead)),
      meta: {
        page,
        perPage,
        totalCount,
        totalPages: Math.ceil(totalCount / perPage) || 1,
      },
    };
  }

  async findOne(id: string): Promise<EngagementLeadResponseDto> {
    const lead = await this.db.engagementLead.findUnique({
      where: { id },
    });

    if (!lead) {
      throw new NotFoundException("Engagement lead not found.");
    }

    return this.transformToResponseDto(lead);
  }

  async updateStatus(
    id: string,
    updateDto: UpdateEngagementLeadStatusDto,
    updatedBy?: string,
  ): Promise<EngagementLeadResponseDto> {
    const lead = await this.db.engagementLead.findUnique({
      where: { id },
    });

    if (!lead) {
      throw new NotFoundException("Engagement lead not found.");
    }

    if (lead.status === EngagementLeadStatus.CONVERTED) {
      throw new BadRequestException(
        "Cannot update status of a converted engagement lead.",
      );
    }

    const updated = await this.db.engagementLead.update({
      where: { id },
      data: {
        status: updateDto.status,
        updatedBy: updatedBy ?? null,
      },
    });

    return this.transformToResponseDto(updated);
  }

  async markConverted(
    id: string,
    engagementId: string,
    updatedBy?: string,
  ): Promise<EngagementLeadResponseDto> {
    const lead = await this.db.engagementLead.findUnique({
      where: { id },
    });

    if (!lead) {
      throw new NotFoundException("Engagement lead not found.");
    }

    if (lead.status === EngagementLeadStatus.CONVERTED) {
      throw new BadRequestException("Engagement lead is already converted.");
    }

    const updated = await this.db.engagementLead.update({
      where: { id },
      data: {
        status: EngagementLeadStatus.CONVERTED,
        convertedEngagementId: engagementId,
        updatedBy: updatedBy ?? null,
      },
    });

    return this.transformToResponseDto(updated);
  }

  getEngagementPrefill(id: string): Promise<EngagementLeadPrefillDto> {
    return this.findOne(id).then((lead) => this.mapLeadToPrefill(lead));
  }

  private mapLeadToPrefill(
    lead: EngagementLeadResponseDto,
  ): EngagementLeadPrefillDto {
    const descriptionParts = [lead.jobDescription];

    if (lead.industryDomain) {
      descriptionParts.push(
        `\n\nIndustry Domain Experience: ${lead.industryDomain}`,
      );
    }

    if (lead.engagementModel) {
      const modelLabel =
        lead.engagementModel === "TIME_AND_MATERIAL"
          ? "Time & Material (T&M)"
          : "Fixed Price Project (FPP)";
      descriptionParts.push(`\n\nEngagement Model: ${modelLabel}`);
    }

    if (lead.minYearsExperience > 0) {
      descriptionParts.push(
        `\n\nMinimum Years of Experience: ${lead.minYearsExperience}`,
      );
    }

    if (!lead.remoteWorkAccepted) {
      descriptionParts.push(
        "\n\nRemote Work: Fully remote engagement is NOT acceptable.",
      );
    }

    if (lead.workLocationRestrictions) {
      descriptionParts.push(
        `\n\nWork Location Restrictions: ${lead.workLocationRestrictions}`,
      );
    }

    if (lead.additionalRequirements) {
      descriptionParts.push(
        `\n\nAdditional Requirements: ${lead.additionalRequirements}`,
      );
    }

    return {
      account: lead.accountName,
      smu: lead.smu,
      spoc: lead.workEmail,
      title: lead.roleTitle,
      description: descriptionParts.join(""),
      requiredSkillNames: lead.requiredSkills,
      roleLevel: this.mapExperienceLevelToRoleLevel(lead.experienceLevel),
      requiredMemberCount: lead.resourcesRequired,
      durationStartDate: lead.preferredStartDate.toISOString(),
      durationMonths: this.parseDurationMonths(lead.engagementDuration),
      compensationRange: `${lead.billRateCurrency} ${lead.billRateAmount}/hour`,
      timeZones: this.parseTimeZones(lead.timeZoneRequirement),
      countries: this.parseCountries(lead.workLocationRestrictions),
      receivedDateFromAccount: lead.createdAt.toISOString(),
      additionalRequirements: lead.additionalRequirements ?? null,
    };
  }

  private mapExperienceLevelToRoleLevel(
    experienceLevel: string,
  ): string | null {
    switch (experienceLevel as ExperienceLevel) {
      case ExperienceLevel.JUNIOR:
        return "JUNIOR";
      case ExperienceLevel.MID:
        return "MID";
      case ExperienceLevel.SENIOR:
      case ExperienceLevel.LEAD_ARCHITECT:
        return "SENIOR";
      default:
        return null;
    }
  }

  private parseDurationMonths(duration: string): number | null {
    const normalized = duration.trim().toLowerCase();

    if (normalized === "ongoing") {
      return null;
    }

    const match = normalized.match(/(\d+)\s*month/);
    if (match) {
      return Number.parseInt(match[1], 10);
    }

    const weekMatch = normalized.match(/(\d+)\s*week/);
    if (weekMatch) {
      return Math.max(1, Math.ceil(Number.parseInt(weekMatch[1], 10) / 4));
    }

    return null;
  }

  private parseTimeZones(timeZoneRequirement: string): string[] {
    const normalized = timeZoneRequirement.trim();

    if (!normalized || normalized.toUpperCase() === "ANY") {
      return ["ANY"];
    }

    return normalized
      .split(/[,;/]/)
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  private parseCountries(workLocationRestrictions?: string | null): string[] {
    if (!workLocationRestrictions?.trim()) {
      return ["ANY"];
    }

    const normalized = workLocationRestrictions.trim();

    if (normalized.toUpperCase() === "ANY") {
      return ["ANY"];
    }

    return [normalized];
  }
}
