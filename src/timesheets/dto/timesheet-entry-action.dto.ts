import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

const trimOrUndefined = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim() || undefined : value;

class TimesheetEntryIdsDto {
  @ApiProperty({
    description: "Entries the action applies to",
    example: ["9a9a5f4d-2a3b-4e9c-9f1c-2b3c4d5e6f7a"],
    type: String,
    isArray: true,
  })
  @IsArray()
  @ArrayMinSize(1, { message: "At least one entry id is required." })
  @ArrayUnique({ message: "entryIds must not repeat an id." })
  @IsString({ each: true })
  entryIds: string[];
}

export class SubmitTimesheetEntriesDto extends TimesheetEntryIdsDto {
  @ApiPropertyOptional({
    description:
      "Required when an administrator submits on a member's behalf. Recorded on the audit trail.",
    example: "Submitted on behalf of the member after a portal outage",
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  @Transform(trimOrUndefined)
  overrideReason?: string;
}

export class ApproveTimesheetEntriesDto extends TimesheetEntryIdsDto {
  @ApiProperty({
    description: "Approval comment, stored against every approved entry",
    example: "Approved for week 37",
  })
  @IsString()
  @IsNotEmpty({ message: "approvalComment is required." })
  @MaxLength(1000)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  approvalComment: string;

  @ApiPropertyOptional({
    description:
      "Required when an administrator approves on a manager's behalf. Recorded on the audit trail.",
    example: "Approved on behalf of maryj while she is on leave",
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  @Transform(trimOrUndefined)
  overrideReason?: string;
}

export class ReopenTimesheetEntriesDto extends TimesheetEntryIdsDto {
  @ApiProperty({
    description:
      "Why the approved entries are being reopened. Always required: reopening overrides a " +
      "manager's approval.",
    example: "Member reported the wrong hours for the week",
  })
  @IsString()
  @IsNotEmpty({ message: "overrideReason is required when reopening entries." })
  @MaxLength(1000)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  overrideReason: string;
}
