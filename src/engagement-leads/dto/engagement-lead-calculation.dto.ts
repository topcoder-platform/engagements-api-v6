import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";
import {
  LeadCalculationCommercialInput,
  LeadCalculationMemberInput,
} from "@prisma/client";

// Matches the Decimal(14, 4) columns the entered amounts are stored in.
const MAX_AMOUNT = 9_999_999_999;
const NUMBER_OPTIONS = {
  allowInfinity: false,
  allowNaN: false,
  maxDecimalPlaces: 4,
};

/**
 * What the Talent Manager entered in the cost calculator. Saving replaces the calculation's previous
 * values, so a field left out is cleared.
 */
export class SaveEngagementLeadCalculationDto {
  @ApiPropertyOptional({ example: "Jane Doe" })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  memberName?: string | null;

  @ApiPropertyOptional({ example: "Acme Bank" })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  accountName?: string | null;

  @ApiPropertyOptional({
    description: "SMU code the cost transfer % is taken from.",
    example: "EURP",
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  smu?: string | null;

  @ApiPropertyOptional({ example: 52 })
  @IsOptional()
  @IsNumber({ ...NUMBER_OPTIONS, maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999_999)
  durationWeeks?: number | null;

  @ApiPropertyOptional({ example: 8 })
  @IsOptional()
  @IsNumber({ ...NUMBER_OPTIONS, maxDecimalPlaces: 2 })
  @Min(0)
  @Max(24)
  hoursPerDay?: number | null;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  referral?: boolean;

  @ApiPropertyOptional({
    enum: LeadCalculationMemberInput,
    description: "Member value the other member values were calculated from.",
  })
  @IsOptional()
  @IsEnum(LeadCalculationMemberInput)
  memberInputField?: LeadCalculationMemberInput | null;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsNumber(NUMBER_OPTIONS)
  @Min(-MAX_AMOUNT)
  @Max(MAX_AMOUNT)
  memberInputValue?: number | null;

  @ApiPropertyOptional({
    enum: LeadCalculationCommercialInput,
    description:
      "Commercial value (margin, booking or actual cost) the others were calculated from.",
  })
  @IsOptional()
  @IsEnum(LeadCalculationCommercialInput)
  commercialInputField?: LeadCalculationCommercialInput | null;

  @ApiPropertyOptional({ example: 220000 })
  @IsOptional()
  @IsNumber(NUMBER_OPTIONS)
  @Min(-MAX_AMOUNT)
  @Max(MAX_AMOUNT)
  commercialInputValue?: number | null;
}

export class EngagementLeadCalculationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  engagementLeadId: string;

  @ApiPropertyOptional()
  memberName: string | null;

  @ApiPropertyOptional()
  accountName: string | null;

  @ApiPropertyOptional()
  smu: string | null;

  @ApiPropertyOptional()
  durationWeeks: number | null;

  @ApiPropertyOptional()
  hoursPerDay: number | null;

  @ApiProperty()
  referral: boolean;

  @ApiPropertyOptional({ enum: LeadCalculationMemberInput })
  memberInputField: LeadCalculationMemberInput | null;

  @ApiPropertyOptional()
  memberInputValue: number | null;

  @ApiPropertyOptional({ enum: LeadCalculationCommercialInput })
  commercialInputField: LeadCalculationCommercialInput | null;

  @ApiPropertyOptional()
  commercialInputValue: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional()
  createdBy: string | null;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional()
  updatedBy: string | null;
}
