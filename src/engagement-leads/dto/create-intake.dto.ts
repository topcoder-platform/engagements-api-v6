import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";
import {
  EngagementModel,
  ExperienceLevel,
  LeadPriority,
} from "@prisma/client";
import { IsNotWhitespace } from "../../common/validation.util";

export class CreateEngagementLeadIntakeDto {
  @ApiProperty({
    description: "Wipro work email address for the primary SPOC",
    example: "john.doe@wipro.com",
  })
  @IsEmail()
  @MaxLength(255)
  workEmail: string;

  @ApiProperty({
    description: "Account or customer name",
    example: "ABC Bank",
  })
  @IsString()
  @IsNotEmpty()
  @IsNotWhitespace()
  @MaxLength(255)
  accountName: string;

  @ApiProperty({
    description: "Strategic Market Unit (SMU)",
    example: "APMEA",
  })
  @IsString()
  @IsNotEmpty()
  @IsNotWhitespace()
  @MaxLength(255)
  smu: string;

  @ApiProperty({
    description: "Commercial engagement model",
    enum: EngagementModel,
    example: EngagementModel.TIME_AND_MATERIAL,
  })
  @IsEnum(EngagementModel)
  engagementModel: EngagementModel;

  @ApiProperty({
    description: "Role title for the engagement",
    example: "Full Stack Developer",
  })
  @IsString()
  @IsNotEmpty()
  @IsNotWhitespace()
  @MaxLength(255)
  roleTitle: string;

  @ApiProperty({
    description: "Detailed job description including responsibilities and deliverables",
    example: "Build and maintain enterprise web applications using React and Java.",
  })
  @IsString()
  @IsNotEmpty()
  @IsNotWhitespace()
  @MaxLength(10000)
  jobDescription: string;

  @ApiProperty({
    description: "Mandatory skills required for the role",
    example: ["React", "Java", "AWS"],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @Transform(({ value }) =>
    Array.isArray(value)
      ? value.map((entry) => String(entry).trim()).filter(Boolean)
      : value,
  )
  requiredSkills: string[];

  @ApiProperty({
    description: "Required experience level",
    enum: ExperienceLevel,
    example: ExperienceLevel.SENIOR,
  })
  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @ApiProperty({
    description: "Minimum years of relevant experience",
    example: 5,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minYearsExperience: number;

  @ApiPropertyOptional({
    description: "Industry domain experience requirement",
    example: "Banking",
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  industryDomain?: string;

  @ApiProperty({
    description: "Number of resources required",
    example: 2,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  resourcesRequired: number;

  @ApiProperty({
    description: "Preferred start date for the resource(s)",
    example: "2026-04-01T00:00:00.000Z",
  })
  @IsDateString()
  preferredStartDate: string;

  @ApiProperty({
    description: "Expected engagement duration",
    example: "6 months",
  })
  @IsString()
  @IsNotEmpty()
  @IsNotWhitespace()
  @MaxLength(100)
  engagementDuration: string;

  @ApiProperty({
    description: "Expected working hours per day",
    example: 8,
  })
  @Type(() => Number)
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @Min(0.01)
  workingHoursPerDay: number;

  @ApiProperty({
    description: "Time zone or working-hours overlap requirement",
    example: "IST",
  })
  @IsString()
  @IsNotEmpty()
  @IsNotWhitespace()
  @MaxLength(255)
  timeZoneRequirement: string;

  @ApiProperty({
    description: "Whether a fully remote engagement is acceptable",
    example: true,
  })
  @IsBoolean()
  remoteWorkAccepted: boolean;

  @ApiPropertyOptional({
    description: "Country, region, or location constraints",
    example: "India-only",
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  workLocationRestrictions?: string;

  @ApiProperty({
    description: "Approved client bill rate currency",
    example: "USD",
  })
  @IsString()
  @IsNotEmpty()
  @IsNotWhitespace()
  @MaxLength(10)
  billRateCurrency: string;

  @ApiProperty({
    description: "Approved hourly bill rate amount",
    example: "100",
  })
  @IsString()
  @IsNotEmpty()
  @IsNotWhitespace()
  @MaxLength(50)
  billRateAmount: string;

  @ApiProperty({
    description: "Priority of the request",
    enum: LeadPriority,
    example: LeadPriority.HIGH,
  })
  @IsEnum(LeadPriority)
  priority: LeadPriority;

  @ApiPropertyOptional({
    description: "Additional requirements or constraints",
    example: "Prior client-facing experience required.",
  })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  additionalRequirements?: string;
}
