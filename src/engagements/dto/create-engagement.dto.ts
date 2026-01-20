import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
} from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";
import { EngagementStatus, Role, Workload } from "@prisma/client";
import { HasDuration, IsNotWhitespace } from "../../common/validation.util";

export class CreateEngagementDto {
  @ApiProperty({
    description: "Project ID",
    example: "3d9b37b5-1a5d-4c48-a60f-5f73c2f7f1b6",
  })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({
    description: "Engagement title. Cannot be empty or contain only whitespace.",
    example: "Senior Frontend Engineer",
  })
  @IsString()
  @IsNotEmpty()
  @IsNotWhitespace()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description:
      "Engagement description. Cannot be empty or contain only whitespace.",
    example: "Build a new hiring portal for enterprise clients.",
  })
  @IsString()
  @IsNotEmpty()
  @IsNotWhitespace()
  description: string;

  @ApiProperty({
    description:
      "Duration start date. Required with durationEndDate when durationWeeks/durationMonths are not provided.",
    example: "2025-01-01T00:00:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  durationStartDate?: string;

  @ApiProperty({
    description:
      "Duration end date. Required with durationStartDate when durationWeeks/durationMonths are not provided.",
    example: "2025-03-01T00:00:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  durationEndDate?: string;

  @ApiProperty({
    description:
      "Duration in weeks. Required if durationMonths and durationStartDate/durationEndDate are not provided.",
    example: 8,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationWeeks?: number;

  @ApiProperty({
    description:
      "Duration in months. Required if durationWeeks and durationStartDate/durationEndDate are not provided.",
    example: 2,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationMonths?: number;

  @ApiProperty({
    description: "Accepted time zones. Must contain at least one timezone.",
    example: ["UTC", "America/New_York"],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  timeZones: string[];

  @ApiProperty({
    description: "Accepted countries. Must contain at least one country.",
    example: ["US", "CA"],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  countries: string[];

  @ApiProperty({
    description: "Required skill IDs. Must contain at least one skill ID.",
    example: ["c1b3ac2c-5c8b-4d58-9c7c-1f50b75f0f0f"],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  requiredSkills: string[];

  @ApiPropertyOptional({
    description: "Role for the engagement",
    enum: Role,
    example: Role.SOFTWARE_DEVELOPER,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({
    description: "Workload for the engagement",
    enum: Workload,
    example: Workload.FULL_TIME,
  })
  @IsOptional()
  @IsEnum(Workload)
  workload?: Workload;

  @ApiPropertyOptional({
    description: "Compensation range",
    example: "$600-$700 USD",
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  compensationRange?: string;

  @ApiProperty({
    description: "Application deadline",
    example: "2025-02-15T00:00:00.000Z",
  })
  @IsDateString()
  @IsNotEmpty()
  applicationDeadline: string;

  @ApiPropertyOptional({
    description: "Engagement status",
    enum: EngagementStatus,
    example: EngagementStatus.OPEN,
  })
  @IsOptional()
  @IsEnum(EngagementStatus)
  status?: EngagementStatus;

  @ApiPropertyOptional({
    description: "Whether the engagement is private",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;

  @ApiPropertyOptional({
    description: "Number of members required for this engagement",
    example: 3,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  requiredMemberCount?: number;

  @ApiPropertyOptional({
    description:
      "Assigned member ID (string or number). For private engagements only. Use assignedMemberIds for multiple members. If both singular and array fields are provided, array fields take precedence.",
    example: "123456",
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "number" ? value.toString() : value,
  )
  @IsString()
  assignedMemberId?: string;

  @ApiPropertyOptional({
    description:
      "Assigned member handle. For private engagements only. Use assignedMemberHandles for multiple members. If both singular and array fields are provided, array fields take precedence.",
    example: "jane_doe",
  })
  @IsOptional()
  @IsString()
  assignedMemberHandle?: string;

  @ApiPropertyOptional({
    description:
      "Array of assigned member IDs (string or number). For private engagements only. Creates assignment records for all provided members.",
    example: ["123456", "789012"],
  })
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map((entry) =>
          typeof entry === "number" ? entry.toString() : entry,
        )
      : value,
  )
  @IsArray()
  @IsString({ each: true })
  assignedMemberIds?: string[];

  @ApiPropertyOptional({
    description:
      "Array of assigned member handles. For private engagements only. Creates assignment records for all provided members.",
    example: ["jane_doe", "john_smith"],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assignedMemberHandles?: string[];

  @ApiHideProperty()
  @HasDuration()
  durationValidation?: boolean;
}

export class CreateEngagementDurationWeeksDto extends OmitType(
  CreateEngagementDto,
  ["durationWeeks"] as const,
) {
  @ApiProperty({
    description:
      "Duration in weeks. Required if durationMonths and durationStartDate/durationEndDate are not provided.",
    example: 8,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationWeeks: number;
}

export class CreateEngagementDurationMonthsDto extends OmitType(
  CreateEngagementDto,
  ["durationMonths"] as const,
) {
  @ApiProperty({
    description:
      "Duration in months. Required if durationWeeks and durationStartDate/durationEndDate are not provided.",
    example: 2,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationMonths: number;
}

export class CreateEngagementDurationDatesDto extends OmitType(
  CreateEngagementDto,
  ["durationStartDate", "durationEndDate"] as const,
) {
  @ApiProperty({
    description:
      "Duration start date. Required with durationEndDate when durationWeeks/durationMonths are not provided.",
    example: "2025-01-01T00:00:00.000Z",
  })
  @IsDateString()
  durationStartDate: string;

  @ApiProperty({
    description:
      "Duration end date. Required with durationStartDate when durationWeeks/durationMonths are not provided.",
    example: "2025-03-01T00:00:00.000Z",
  })
  @IsDateString()
  durationEndDate: string;
}
