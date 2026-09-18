import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsISO8601, IsOptional } from "class-validator";
import { TimesheetEntryStatus } from "@prisma/client";

const trimOrUndefined = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim() || undefined : value;

export class TimesheetQueryDto {
  @ApiPropertyOptional({
    description: "Earliest work date to return, as YYYY-MM-DD",
    example: "2026-09-07",
  })
  @IsOptional()
  @Transform(trimOrUndefined)
  @IsISO8601(
    { strict: false },
    { message: "fromDate must be a YYYY-MM-DD date." },
  )
  fromDate?: string;

  @ApiPropertyOptional({
    description: "Latest work date to return, as YYYY-MM-DD",
    example: "2026-09-11",
  })
  @IsOptional()
  @Transform(trimOrUndefined)
  @IsISO8601(
    { strict: false },
    { message: "toDate must be a YYYY-MM-DD date." },
  )
  toDate?: string;

  @ApiPropertyOptional({
    description:
      "Restrict to one status. Managers reviewing work use SUBMITTED; the approved view uses APPROVED.",
    enum: TimesheetEntryStatus,
    example: TimesheetEntryStatus.SUBMITTED,
  })
  @IsOptional()
  @Transform(trimOrUndefined)
  @IsEnum(TimesheetEntryStatus)
  status?: TimesheetEntryStatus;
}
