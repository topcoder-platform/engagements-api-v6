import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EngagementLeadStatus, LeadPriority } from "@prisma/client";
import { PaginationDto } from "../../engagements/dto";

export class EngagementLeadQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Filter by lead status",
    enum: EngagementLeadStatus,
  })
  @IsOptional()
  @IsEnum(EngagementLeadStatus)
  status?: EngagementLeadStatus;

  @ApiPropertyOptional({
    description: "Filter by priority",
    enum: LeadPriority,
  })
  @IsOptional()
  @IsEnum(LeadPriority)
  priority?: LeadPriority;
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
