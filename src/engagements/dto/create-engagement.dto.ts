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
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateIf,
  ValidateNested,
  MaxLength,
  Min,
} from "class-validator";
import {
  AnticipatedStart,
  EngagementStatus,
  PaymentCycle,
  Role,
  RoleLevel,
  Workload,
} from "@prisma/client";
import { HasDuration, IsNotWhitespace } from "../../common/validation.util";

const POSITIVE_DECIMAL_PATTERN = /^(?:\d+|\d*\.\d+)$/;

export class AssignmentDetailsDto {
  @ApiPropertyOptional({
    description: "Assigned member ID (string or number).",
    example: "123456",
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "number" ? value.toString() : value,
  )
  @IsString()
  memberId?: string;

  @ApiPropertyOptional({
    description: "Assigned member handle.",
    example: "jane_doe",
  })
  @IsOptional()
  @IsString()
  memberHandle?: string;

  @ApiPropertyOptional({
    description: "Assignment billing start date",
    example: "2026-01-30T12:00:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: "Assignment duration in months",
    example: 3,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationMonths?: number;

  @ApiPropertyOptional({
    description: "Assignment rate per hour in USD",
    example: "75.5",
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) {
      return undefined;
    }
    const normalized = String(value).trim();
    return normalized.length > 0 ? normalized : undefined;
  })
  @IsString()
  @Matches(POSITIVE_DECIMAL_PATTERN, {
    message: "ratePerHour must be a positive number",
  })
  ratePerHour?: string;

  @ApiPropertyOptional({
    description: "Assignment payment cycle",
    enum: PaymentCycle,
    example: PaymentCycle.WEEKLY,
  })
  @IsOptional()
  @IsEnum(PaymentCycle)
  paymentCycle?: PaymentCycle;

  @ApiPropertyOptional({
    description: "Assignment standard hours per day",
    example: 7.5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 },
    {
      message:
        "standardHoursPerDay must be a positive number with up to 2 decimal places",
    },
  )
  @Min(0.01, {
    message:
      "standardHoursPerDay must be a positive number with up to 2 decimal places",
  })
  standardHoursPerDay?: number;

  @ApiPropertyOptional({
    description:
      "Calculated assignment rate per week. When omitted, the API computes it from ratePerHour multiplied by standardHoursPerDay * 5.",
    example: "3020",
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) {
      return undefined;
    }
    const normalized = String(value).trim();
    return normalized.length > 0 ? normalized : undefined;
  })
  @IsString()
  @Matches(POSITIVE_DECIMAL_PATTERN, {
    message: "agreementRate must be a positive number",
  })
  agreementRate?: string;

  @ApiPropertyOptional({
    description:
      "Other remarks detailing additional terms the member must agree to",
    example: "Complete onboarding within the first week.",
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) {
      return undefined;
    }
    const normalized = String(value).trim();
    return normalized.length > 0 ? normalized : undefined;
  })
  @IsString()
  @MaxLength(2000)
  otherRemarks?: string;
}

export class CreateEngagementDto {
  @ApiProperty({
    description: "Project ID",
    example: "3d9b37b5-1a5d-4c48-a60f-5f73c2f7f1b6",
  })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({
    description:
      "Engagement title. Cannot be empty or contain only whitespace.",
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

  @ApiPropertyOptional({
    description:
      "Accepted time zones. Required for public engagements; optional for private engagements.",
    example: ["UTC", "America/New_York"],
  })
  @ValidateIf((dto: { isPrivate?: boolean }) => dto.isPrivate !== true)
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  timeZones?: string[];

  @ApiPropertyOptional({
    description:
      "Accepted countries. Required for public engagements; optional for private engagements.",
    example: ["US", "CA"],
  })
  @ValidateIf((dto: { isPrivate?: boolean }) => dto.isPrivate !== true)
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  countries?: string[];

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

  @ApiPropertyOptional({
    description: "Internal: date the request was received from the account",
    example: "2026-07-15T00:00:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  receivedDateFromAccount?: string | null;

  @ApiPropertyOptional({
    description: "Internal: account name",
    example: "Acme Corp",
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  account?: string | null;

  @ApiPropertyOptional({
    description: "Internal: SMU",
    example: "North America",
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  smu?: string | null;

  @ApiPropertyOptional({
    description: "Internal: SPOC",
    example: "Jane Doe",
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  spoc?: string | null;

  @ApiPropertyOptional({
    description: "Internal: role level for the engagement",
    enum: RoleLevel,
    example: RoleLevel.SENIOR,
  })
  @IsOptional()
  @IsEnum(RoleLevel)
  roleLevel?: RoleLevel | null;

  @ApiPropertyOptional({
    description:
      "Anticipated start timeframe. Required for public engagements; optional for private engagements.",
    enum: AnticipatedStart,
    example: AnticipatedStart.IMMEDIATE,
  })
  @ValidateIf((dto: { isPrivate?: boolean }) => dto.isPrivate !== true)
  @IsEnum(AnticipatedStart)
  @IsNotEmpty()
  anticipatedStart?: AnticipatedStart;

  @ApiPropertyOptional({
    description: "Engagement status, including ON_HOLD when applicable",
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

  @ApiPropertyOptional({
    description:
      "Assignment details for private engagements. Each entry must include memberId or memberHandle.",
    example: [
      {
        memberHandle: "jane_doe",
        startDate: "2026-01-30T12:00:00.000Z",
        durationMonths: 3,
        ratePerHour: "75.5",
        paymentCycle: PaymentCycle.WEEKLY,
        standardHoursPerDay: 7.5,
        agreementRate: "2831.25",
        otherRemarks: "Complete onboarding within the first week.",
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssignmentDetailsDto)
  assignmentDetails?: AssignmentDetailsDto[];

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
