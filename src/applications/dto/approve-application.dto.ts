import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
} from "class-validator";

const POSITIVE_DECIMAL_PATTERN = /^(?:\d+|\d*\.\d+)$/;

export class ApproveApplicationDto {
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
    description: "Assignment standard hours per week",
    example: 37.5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 },
    {
      message:
        "standardHoursPerWeek must be a positive number with up to 2 decimal places",
    },
  )
  @Min(0.01, {
    message:
      "standardHoursPerWeek must be a positive number with up to 2 decimal places",
  })
  standardHoursPerWeek?: number;

  @ApiPropertyOptional({
    description:
      "Calculated assignment rate per week. When omitted, the API computes it from ratePerHour multiplied by standardHoursPerWeek.",
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
