import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
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
import { HasDuration } from "../../common/validation.util";

export class CreateEngagementDto {
  @ApiProperty({
    description: "Project ID",
    example: "3d9b37b5-1a5d-4c48-a60f-5f73c2f7f1b6",
  })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({
    description: "Engagement title",
    example: "Senior Frontend Engineer",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: "Engagement description",
    example: "Build a new hiring portal for enterprise clients.",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: "Duration start date",
    example: "2025-01-01T00:00:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  durationStartDate?: string;

  @ApiPropertyOptional({
    description: "Duration end date",
    example: "2025-03-01T00:00:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  durationEndDate?: string;

  @ApiPropertyOptional({
    description: "Duration in weeks",
    example: 8,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationWeeks?: number;

  @ApiPropertyOptional({
    description: "Duration in months",
    example: 2,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationMonths?: number;

  @ApiProperty({
    description: "Accepted time zones",
    example: ["UTC", "America/New_York"],
  })
  @IsArray()
  @IsString({ each: true })
  timeZones: string[];

  @ApiProperty({
    description: "Accepted countries",
    example: ["US", "CA"],
  })
  @IsArray()
  @IsString({ each: true })
  countries: string[];

  @ApiProperty({
    description: "Required skill IDs",
    example: ["c1b3ac2c-5c8b-4d58-9c7c-1f50b75f0f0f"],
  })
  @IsArray()
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
    description: "Assigned member ID",
    example: "123456",
  })
  @IsOptional()
  @IsString()
  assignedMemberId?: string;

  @ApiPropertyOptional({
    description: "Assigned member handle",
    example: "jane_doe",
  })
  @IsOptional()
  @IsString()
  assignedMemberHandle?: string;

  @ApiHideProperty()
  @HasDuration()
  durationValidation?: boolean;
}
