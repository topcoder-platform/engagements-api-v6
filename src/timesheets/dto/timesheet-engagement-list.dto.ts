import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { PaginationDto } from "../../engagements/dto";
import { TimesheetRollupStatus } from "../timesheet-constants";
import { TimesheetViewerRole } from "../timesheet-roles";

const trimOrUndefined = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim() || undefined : value;

export class TimesheetEngagementQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Filter by engagement title, case-insensitive substring match",
    example: "Frontend",
  })
  @IsOptional()
  @Transform(trimOrUndefined)
  @IsString()
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({
    description: "Filter by assignee handle, case-insensitive substring match",
    example: "johnsmith",
  })
  @IsOptional()
  @Transform(trimOrUndefined)
  @IsString()
  @MaxLength(100)
  assignee?: string;

  @ApiPropertyOptional({
    description:
      "Filter by assigned manager handle, case-insensitive substring match. Administrators only; a " +
      "manager caller is already restricted to their own engagements.",
    example: "maryj",
  })
  @IsOptional()
  @Transform(trimOrUndefined)
  @IsString()
  @MaxLength(100)
  manager?: string;

  @ApiPropertyOptional({
    description: "Filter by the rolled-up timesheet status",
    enum: Object.values(TimesheetRollupStatus),
    example: TimesheetRollupStatus.PendingApproval,
  })
  @IsOptional()
  @Transform(trimOrUndefined)
  @IsEnum(TimesheetRollupStatus)
  status?: TimesheetRollupStatus;

  @ApiPropertyOptional({
    description:
      "Only assignees with timesheet entries on or after this date, as YYYY-MM-DD",
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
    description:
      "Only assignees with timesheet entries on or before this date, as YYYY-MM-DD",
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

export class TimesheetEngagementRowDto {
  @ApiProperty({ description: "Engagement id" })
  engagementId: string;

  @ApiProperty({
    description: "Engagement title",
    example: "Senior Frontend Engineer",
  })
  engagementTitle: string;

  @ApiProperty({
    description: "Assignment id, which the timesheet page is opened with",
  })
  assignmentId: string;

  @ApiProperty({ description: "Assignee's user id", example: "1001" })
  assigneeId: string;

  @ApiProperty({
    description: "Assignee's Topcoder handle",
    example: "johnsmith",
  })
  assigneeHandle: string;

  @ApiPropertyOptional({
    description: "Assignee's display name, when the member profile exposes one",
    example: "John Smith",
    nullable: true,
  })
  assigneeName: string | null;

  @ApiProperty({
    description:
      "Pending Approval when the assignee has any submitted entry awaiting a manager, otherwise Approved.",
    enum: Object.values(TimesheetRollupStatus),
    example: TimesheetRollupStatus.PendingApproval,
  })
  timesheetStatus: TimesheetRollupStatus;

  @ApiProperty({
    description: "The caller's relationship to this row's timesheet",
    enum: TimesheetViewerRole,
    example: TimesheetViewerRole.Manager,
  })
  viewerRole: TimesheetViewerRole;
}
