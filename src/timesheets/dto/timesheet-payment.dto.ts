import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

const trimOrUndefined = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim() || undefined : value;

export class TimesheetSummaryQueryDto {
  @ApiPropertyOptional({
    description: "Start of the payment period, as YYYY-MM-DD",
    example: "2026-09-01",
  })
  @IsOptional()
  @Transform(trimOrUndefined)
  @IsISO8601(
    { strict: false },
    { message: "fromDate must be a YYYY-MM-DD date." },
  )
  fromDate?: string;

  @ApiPropertyOptional({
    description: "End of the payment period, as YYYY-MM-DD",
    example: "2026-09-30",
  })
  @IsOptional()
  @Transform(trimOrUndefined)
  @IsISO8601(
    { strict: false },
    { message: "toDate must be a YYYY-MM-DD date." },
  )
  toDate?: string;
}

export class TimesheetSummaryResponseDto {
  @ApiProperty({
    description: "Number of approved, unpaid days in the period",
    example: 5,
  })
  totalDays: number;

  @ApiProperty({
    description:
      "Approved, unpaid hours in the period, as an exact decimal string. These hours become a " +
      "payment amount, so they never travel as a float.",
    example: "42.50",
  })
  totalHours: string;

  @ApiPropertyOptional({
    description:
      "Hourly rate on the assignment, for deriving the payment amount. Null when the assignment " +
      "has no rate set, which means nothing can be paid from it yet.",
    example: "45.00",
    nullable: true,
  })
  ratePerHour: string | null;

  @ApiProperty({
    description:
      "The approved, unpaid entries these totals cover - the ones a payment would consume",
    type: String,
    isArray: true,
  })
  entryIds: string[];

  @ApiProperty({
    description:
      "Approved entries in the period that a payment already consumed. Excluded from the totals, and " +
      "reported so the caller can explain why the total is lower than the member's logged hours.",
    type: String,
    isArray: true,
  })
  alreadyPaidEntryIds: string[];
}

export class LinkTimesheetPaymentDto {
  @ApiProperty({
    description: "Approved entries the payment consumed",
    type: String,
    isArray: true,
  })
  @IsArray()
  @ArrayMinSize(1, { message: "At least one entry id is required." })
  @ArrayUnique({ message: "entryIds must not repeat an id." })
  @IsString({ each: true })
  entryIds: string[];

  @ApiProperty({
    description:
      "Durable identifier of the payment that consumed these entries, used for reconciliation in " +
      "both directions.",
    example: "8f14e45f-ceea-467a-9c3d-2b1a5f6c7d8e",
  })
  @IsString()
  @IsNotEmpty({ message: "paymentReference is required." })
  @MaxLength(255)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  paymentReference: string;
}

export class LinkedTimesheetPaymentDto {
  @ApiProperty({ description: "Entry id" })
  id: string;

  @ApiProperty({
    description: "Work date, as YYYY-MM-DD",
    example: "2026-09-07",
  })
  workDate: string;

  @ApiProperty({ description: "Hours the payment covered", example: "8.50" })
  hoursWorked: string;

  @ApiProperty({
    description: "Payment that consumed the entry",
    example: "8f14e45f-ceea-467a-9c3d-2b1a5f6c7d8e",
  })
  paymentReference: string;

  @ApiProperty({ description: "When the entry was linked to the payment" })
  paidAt: Date;
}
