import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import {
  EngagementLead,
  EngagementLeadStatus,
  EngagementLeadType,
  ExperienceLevel,
  Prisma,
} from "@prisma/client";
import { nanoid } from "nanoid";
import { DbService } from "../db/db.service";
import { SkillsService } from "../integrations/skills.service";
import { PaginatedResponse } from "../engagements/dto";
import {
  CreateEngagementLeadIntakeDto,
  CreateWiproDirectEngagementLeadIntakeDto,
  EngagementLeadPrefillDto,
  EngagementLeadQueryDto,
  EngagementLeadResponseDto,
  EngagementLeadSortField,
  EngagementLeadStatusGroup,
  UpdateEngagementLeadStatusDto,
} from "./dto";

@Injectable()
export class EngagementLeadsService {
  private readonly logger = new Logger(EngagementLeadsService.name);

  constructor(
    private readonly db: DbService,
    private readonly skillsService: SkillsService,
  ) {}

  private transformToResponseDto(
    lead: EngagementLead,
  ): EngagementLeadResponseDto {
    return {
      id: lead.id,
      leadType: lead.leadType,
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
      notes: lead.notes,
      notesUpdatedAt: lead.notesUpdatedAt,
      notesUpdatedBy: lead.notesUpdatedBy,
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
        ...this.buildCommonLeadData(intakeDto),
        leadType: EngagementLeadType.WIPRO_CONSUMPTION,
        engagementModel: intakeDto.engagementModel,
        roleTitle: intakeDto.roleTitle.trim(),
        experienceLevel: intakeDto.experienceLevel,
        minYearsExperience: intakeDto.minYearsExperience,
        industryDomain: intakeDto.industryDomain?.trim() || null,
        preferredStartDate: new Date(intakeDto.preferredStartDate),
        billRateCurrency: intakeDto.billRateCurrency.trim().toUpperCase(),
        billRateAmount: intakeDto.billRateAmount.trim(),
        priority: intakeDto.priority ?? null,
        additionalRequirements:
          intakeDto.additionalRequirements?.trim() || null,
      },
    });

    return this.transformToResponseDto(lead);
  }

  async createFromWiproDirectIntake(
    intakeDto: CreateWiproDirectEngagementLeadIntakeDto,
  ): Promise<EngagementLeadResponseDto> {
    this.logger.debug("Creating engagement lead from Wipro Direct intake", {
      workEmail: intakeDto.workEmail,
      accountName: intakeDto.accountName,
    });

    const lead = await this.db.engagementLead.create({
      data: {
        ...this.buildCommonLeadData(intakeDto),
        leadType: EngagementLeadType.WIPRO_DIRECT,
        preferredStartDate: intakeDto.preferredStartDate
          ? new Date(intakeDto.preferredStartDate)
          : null,
      },
    });

    return this.transformToResponseDto(lead);
  }

  private buildCommonLeadData(
    intakeDto: CreateWiproDirectEngagementLeadIntakeDto,
  ) {
    return {
      id: nanoid(),
      workEmail: intakeDto.workEmail.trim().toLowerCase(),
      accountName: intakeDto.accountName.trim(),
      smu: intakeDto.smu.trim(),
      jobDescription: intakeDto.jobDescription.trim(),
      requiredSkills: intakeDto.requiredSkills,
      resourcesRequired: intakeDto.resourcesRequired,
      engagementDuration: intakeDto.engagementDuration.trim(),
      workingHoursPerDay: intakeDto.workingHoursPerDay,
      timeZoneRequirement: intakeDto.timeZoneRequirement.trim(),
      remoteWorkAccepted: intakeDto.remoteWorkAccepted,
      workLocationRestrictions:
        intakeDto.workLocationRestrictions?.trim() || null,
      status: EngagementLeadStatus.SUBMITTED,
    };
  }

  async findAll(
    query: EngagementLeadQueryDto,
  ): Promise<PaginatedResponse<EngagementLeadResponseDto>> {
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 20;
    const skip = (page - 1) * perPage;

    const where: Prisma.EngagementLeadWhereInput = {};

    if (query.leadType) {
      where.leadType = query.leadType;
    }

    if (query.accountName?.trim()) {
      where.accountName = {
        contains: query.accountName.trim(),
        mode: "insensitive",
      };
    }

    if (query.smu?.trim()) {
      where.smu = {
        contains: query.smu.trim(),
        mode: "insensitive",
      };
    }

    if (query.engagementModel) {
      where.engagementModel = query.engagementModel;
    }

    if (query.roleTitle?.trim()) {
      where.roleTitle = {
        contains: query.roleTitle.trim(),
        mode: "insensitive",
      };
    }

    if (query.experienceLevel) {
      where.experienceLevel = query.experienceLevel;
    }

    if (query.statusGroup) {
      if (query.statusGroup === EngagementLeadStatusGroup.NEW) {
        where.status = EngagementLeadStatus.SUBMITTED;
      } else if (query.statusGroup === EngagementLeadStatusGroup.IN_PROGRESS) {
        where.status = {
          in: [
            EngagementLeadStatus.UNDER_REVIEW,
            EngagementLeadStatus.QUALIFIED,
          ],
        };
      } else if (query.statusGroup === EngagementLeadStatusGroup.CONVERTED) {
        where.status = EngagementLeadStatus.CONVERTED;
      } else if (query.statusGroup === EngagementLeadStatusGroup.DECLINED) {
        where.status = EngagementLeadStatus.REJECTED;
      }
    } else if (query.status) {
      where.status = query.status;
    }

    if (query.priority) {
      where.priority = query.priority;
    }

    const sortBy = query.sortBy ?? EngagementLeadSortField.CREATED_AT;
    const sortOrder = query.sortOrder ?? "desc";
    const orderBy: Prisma.EngagementLeadOrderByWithRelationInput =
      sortBy === EngagementLeadSortField.PRIORITY
        ? { priority: { sort: sortOrder, nulls: "last" } }
        : sortBy === EngagementLeadSortField.PREFERRED_START_DATE
          ? { preferredStartDate: { sort: sortOrder, nulls: "last" } }
          : { createdAt: sortOrder };

    const [leads, totalCount] = await Promise.all([
      this.db.engagementLead.findMany({
        where,
        orderBy,
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

  async updateNotes(
    id: string,
    notes: string,
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
        "Cannot update notes of a converted engagement lead.",
      );
    }

    const updated = await this.db.engagementLead.update({
      where: { id },
      data: {
        notes: notes.trim() || null,
        notesUpdatedAt: new Date(),
        notesUpdatedBy: updatedBy ?? null,
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

  async getEngagementPrefill(id: string): Promise<EngagementLeadPrefillDto> {
    const lead = await this.findOne(id);
    // Leads keep the skill names picked on the intake form, while engagements need standardized
    // skill ids, so the names are matched here and only the misses are left for the TM.
    const skillResolution = await this.skillsService.resolveSkillFilterValues(
      lead.requiredSkills,
    );

    return {
      ...this.mapLeadToPrefill(lead),
      requiredSkills: skillResolution.skillIds.map((skillId) => ({
        id: skillId,
        name: skillResolution.skillNamesById.get(skillId) ?? skillId,
      })),
      unresolvedSkillNames: skillResolution.unresolvedNames,
    };
  }

  private mapLeadToPrefill(
    lead: EngagementLeadResponseDto,
  ): Omit<EngagementLeadPrefillDto, "requiredSkills" | "unresolvedSkillNames"> {
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

    if (lead.minYearsExperience) {
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
      title: lead.roleTitle ?? "",
      description: descriptionParts.join(""),
      requiredSkillNames: lead.requiredSkills,
      roleLevel: this.mapExperienceLevelToRoleLevel(lead.experienceLevel),
      requiredMemberCount: lead.resourcesRequired,
      durationStartDate: lead.preferredStartDate?.toISOString() ?? null,
      durationMonths: this.parseDurationMonths(lead.engagementDuration),
      compensationRange:
        lead.billRateCurrency && lead.billRateAmount
          ? `${lead.billRateCurrency} ${lead.billRateAmount}/hour`
          : null,
      timeZones: this.parseTimeZones(lead.timeZoneRequirement),
      countries: this.parseCountries(lead.workLocationRestrictions),
      receivedDateFromAccount: lead.createdAt.toISOString(),
      additionalRequirements: lead.additionalRequirements ?? null,
    };
  }

  private mapExperienceLevelToRoleLevel(
    experienceLevel?: string | null,
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
