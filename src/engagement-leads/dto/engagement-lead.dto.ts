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
  EngagementModel,
  ExperienceLevel,
  LeadPriority,
} from "@prisma/client";
import { PaginationDto } from "../../engagements/dto";

export enum EngagementLeadStatusGroup {
  NEW = "NEW",
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

  @ApiProperty()
  workEmail: string;

  @ApiProperty()
  accountName: string;

  @ApiProperty()
  smu: string;

  @ApiProperty()
  engagementModel: string;

  @ApiProperty()
  roleTitle: string;

  @ApiProperty()
  jobDescription: string;

  @ApiProperty({ type: [String] })
  requiredSkills: string[];

  @ApiProperty()
  experienceLevel: string;

  @ApiProperty()
  minYearsExperience: number;

  @ApiPropertyOptional()
  industryDomain?: string | null;

  @ApiProperty()
  resourcesRequired: number;

  @ApiProperty()
  preferredStartDate: Date;

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

  @ApiProperty()
  billRateCurrency: string;

  @ApiProperty()
  billRateAmount: string;

  @ApiProperty()
  priority: string;

  @ApiPropertyOptional()
  additionalRequirements?: string | null;

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
