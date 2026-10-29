import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import {
  EngagementLeadStatus,
  EngagementLeadType,
  EngagementModel,
  ExperienceLevel,
  LeadPriority,
} from "@prisma/client";
import { PaginationDto } from "../../engagements/dto";

export enum EngagementLeadStatusGroup {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  CONVERTED = "CONVERTED",
  DECLINED = "DECLINED",
}

export enum EngagementLeadSortField {
  PREFERRED_START_DATE = "preferredStartDate",
  PRIORITY = "priority",
  CREATED_AT = "createdAt",
}

export class EngagementLeadQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Filter by the intake form the lead was submitted through",
    enum: EngagementLeadType,
  })
  @IsOptional()
  @IsEnum(EngagementLeadType)
  leadType?: EngagementLeadType;

  @ApiPropertyOptional({
    description: "Filter by account or customer name",
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  accountName?: string;

  @ApiPropertyOptional({
    description: "Filter by strategic market unit",
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  smu?: string;

  @ApiPropertyOptional({
    description: "Filter by engagement model",
    enum: EngagementModel,
  })
  @IsOptional()
  @IsEnum(EngagementModel)
  engagementModel?: EngagementModel;

  @ApiPropertyOptional({
    description: "Filter by role title",
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  roleTitle?: string;

  @ApiPropertyOptional({
    description: "Filter by experience level",
    enum: ExperienceLevel,
  })
  @IsOptional()
  @IsEnum(ExperienceLevel)
  experienceLevel?: ExperienceLevel;

  @ApiPropertyOptional({
    description: "Filter by lead status",
    enum: EngagementLeadStatus,
  })
  @IsOptional()
  @IsEnum(EngagementLeadStatus)
  status?: EngagementLeadStatus;

  @ApiPropertyOptional({
    description: "Filter by simplified status group",
    enum: EngagementLeadStatusGroup,
  })
  @IsOptional()
  @IsEnum(EngagementLeadStatusGroup)
  statusGroup?: EngagementLeadStatusGroup;

  @ApiPropertyOptional({
    description: "Filter by priority",
    enum: LeadPriority,
  })
  @IsOptional()
  @IsEnum(LeadPriority)
  priority?: LeadPriority;

  @ApiPropertyOptional({
    description: "Sort field",
    enum: EngagementLeadSortField,
  })
  @IsOptional()
  @IsEnum(EngagementLeadSortField)
  sortBy?: EngagementLeadSortField;

  @ApiPropertyOptional({
    description: "Sort order",
    enum: ["asc", "desc"],
  })
  @IsOptional()
  @IsIn(["asc", "desc"])
  sortOrder?: "asc" | "desc";
}

export class UpdateEngagementLeadStatusDto {
  @ApiProperty({
    description: "Updated lead status",
    enum: EngagementLeadStatus,
    example: EngagementLeadStatus.QUALIFIED,
  })
  @IsEnum(EngagementLeadStatus)
  status: EngagementLeadStatus;
}

export class UpdateEngagementLeadNotesDto {
  @ApiProperty({
    description:
      "Talent Manager notes for the lead. An empty value clears the notes.",
    example: "Customer prefers candidates with banking experience.",
  })
  @IsString()
  @MaxLength(5000)
  notes: string;
}

export class MarkEngagementLeadConvertedDto {
  @ApiProperty({
    description: "ID of the engagement created from this lead",
    example: "3d9b37b5-1a5d-4c48-a60f-5f73c2f7f1b6",
  })
  @IsString()
  @IsNotEmpty()
  engagementId: string;
}

export class EngagementLeadResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: EngagementLeadType })
  leadType: string;

  @ApiProperty()
  workEmail: string;

  @ApiProperty()
  accountName: string;

  @ApiProperty()
  smu: string;

  @ApiPropertyOptional()
  engagementModel?: string | null;

  @ApiPropertyOptional()
  roleTitle?: string | null;

  @ApiProperty()
  jobDescription: string;

  @ApiProperty({ type: [String] })
  requiredSkills: string[];

  @ApiPropertyOptional()
  experienceLevel?: string | null;

  @ApiPropertyOptional()
  minYearsExperience?: number | null;

  @ApiPropertyOptional()
  industryDomain?: string | null;

  @ApiProperty()
  resourcesRequired: number;

  @ApiPropertyOptional()
  preferredStartDate?: Date | null;

  @ApiProperty()
  engagementDuration: string;

  @ApiProperty()
  workingHoursPerDay: number;

  @ApiProperty()
  timeZoneRequirement: string;

  @ApiProperty()
  remoteWorkAccepted: boolean;

  @ApiPropertyOptional()
  workLocationRestrictions?: string | null;

  @ApiPropertyOptional()
  billRateCurrency?: string | null;

  @ApiPropertyOptional()
  billRateAmount?: string | null;

  @ApiPropertyOptional()
  priority?: string | null;

  @ApiPropertyOptional()
  additionalRequirements?: string | null;

  @ApiPropertyOptional()
  notes?: string | null;

  @ApiPropertyOptional()
  notesUpdatedAt?: Date | null;

  @ApiPropertyOptional()
  notesUpdatedBy?: string | null;

  @ApiProperty()
  status: string;

  @ApiPropertyOptional()
  convertedEngagementId?: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class EngagementLeadIntakeResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  message: string;
}

export class EngagementLeadPrefillSkillDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class EngagementLeadPrefillDto {
  @ApiProperty()
  account: string;

  @ApiProperty()
  smu: string;

  @ApiProperty()
  spoc: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [String] })
  requiredSkillNames: string[];

  @ApiProperty({
    description:
      "Standardized skills matched to the intake form's skill names, ready to use as engagement skills.",
    type: [EngagementLeadPrefillSkillDto],
  })
  requiredSkills: EngagementLeadPrefillSkillDto[];

  @ApiProperty({
    description:
      "Intake form skill names that did not match a standardized skill and must be added by hand.",
    type: [String],
  })
  unresolvedSkillNames: string[];

  @ApiPropertyOptional()
  roleLevel?: string | null;

  @ApiPropertyOptional()
  requiredMemberCount?: number | null;

  @ApiPropertyOptional()
  durationStartDate?: string | null;

  @ApiPropertyOptional()
  durationMonths?: number | null;

  @ApiPropertyOptional()
  compensationRange?: string | null;

  @ApiProperty({ type: [String] })
  timeZones: string[];

  @ApiProperty({ type: [String] })
  countries: string[];

  @ApiPropertyOptional()
  receivedDateFromAccount?: string | null;

  @ApiPropertyOptional()
  additionalRequirements?: string | null;
}
