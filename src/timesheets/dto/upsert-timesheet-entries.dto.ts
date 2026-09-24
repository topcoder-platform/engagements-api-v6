import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { TIMESHEET_MAX_RANGE_DAYS } from "../timesheet-constants";

const trimOrUndefined = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim() || undefined : value;

export class UpsertTimesheetEntryDto {
  @ApiProperty({
    description: "Calendar day the hours were worked, as YYYY-MM-DD",
    example: "2026-09-07",
  })
  @IsISO8601(
    { strict: false },
    { message: "workDate must be a YYYY-MM-DD date." },
  )
  @IsNotEmpty()
  workDate: string;

  @ApiProperty({
    description:
      "Hours worked that day. Decimals are allowed (8, 8.5, 9.5). Sent as a string or a number; " +
      "stored as an exact decimal because approved hours become a payment amount.",
    example: "8.50",
    oneOf: [{ type: "string" }, { type: "number" }],
  })
  // Needs a validator even though the real parsing happens in the service: the global ValidationPipe
  // runs with whitelist: true, which strips any property that carries no validation decorator.
  @IsDefined({ message: "hoursWorked is required." })
  hoursWorked: string | number;

  @ApiPropertyOptional({
    description: "Free-text work details or comments",
    example: "Sprint planning and API work",
    nullable: true,
  })
  @IsOptional()
  // null is how a member clears a remark, so it has to survive validation rather than be rejected as
  // a non-string.
  @ValidateIf((_object, value) => value !== null)
  @IsString()
  @MaxLength(2000)
  remarks?: string | null;
}

export class UpsertTimesheetEntriesDto {
  @ApiProperty({
    description:
      "Entries to create or update, keyed on work date. Only the days the member actually filled in " +
      "are sent: there is no endpoint that pre-creates empty rows for a date range.",
    type: UpsertTimesheetEntryDto,
    isArray: true,
  })
  @IsArray()
  @ArrayMinSize(1, { message: "At least one entry is required." })
  @ArrayMaxSize(TIMESHEET_MAX_RANGE_DAYS, {
    message: `At most ${TIMESHEET_MAX_RANGE_DAYS} entries may be saved in one request.`,
  })
  @ValidateNested({ each: true })
  @Type(() => UpsertTimesheetEntryDto)
  entries: UpsertTimesheetEntryDto[];

  @ApiPropertyOptional({
    description:
      "Why an administrator is overriding a member's or manager's work. Required when an " +
      "administrator changes an approved entry; recorded on the audit trail.",
    example: "Corrected after payroll query",
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  @Transform(trimOrUndefined)
  overrideReason?: string;
}
