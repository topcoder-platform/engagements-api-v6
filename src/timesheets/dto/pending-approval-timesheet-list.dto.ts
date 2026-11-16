import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsISO8601,
  IsOptional,
  IsString,
  IsNotEmpty,
  MaxLength,
} from "class-validator";
import { transformBoolean } from "../../common/validation.util";
import { PaginationDto } from "../../engagements/dto";

const trimOrUndefined = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim() || undefined : value;

/** How many assignments one reminder request may name; a page of the list at most. */
export const PENDING_APPROVAL_REMINDER_MAX_ASSIGNMENTS = 200;

export class PendingApprovalTimesheetQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Filter by engagement title, case-insensitive substring match",
    example: "Frontend",
  })
  @IsOptional()
  @Transform(trimOrUndefined)
  @IsString()
  @MaxLength(200)
  engagement?: string;

  @ApiPropertyOptional({
    description:
      "Only submitted entries worked on or after this date, as YYYY-MM-DD",
    example: "2026-10-01",
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
      "Only submitted entries worked on or before this date, as YYYY-MM-DD",
    example: "2026-10-31",
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
      "When true, leave out timesheets on the test projects configured in TEST_PROJECT_IDS.",
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(transformBoolean)
  excludeTestProjects?: boolean;
}

export class PendingApprovalTimesheetApproverDto {
  @ApiProperty({ description: "Manager's user id", example: "2002" })
  userId: string;

  @ApiProperty({ description: "Manager's Topcoder handle", example: "maryj" })
  handle: string;

  @ApiPropertyOptional({
    description: "Manager's display name, when known",
    nullable: true,
    example: "Mary Jones",
  })
  name: string | null;
}

export class PendingApprovalTimesheetRowDto {
  @ApiProperty({
    description:
      "Stable row id, derived from the assignment and the submission it groups",
  })
  id: string;

  @ApiProperty({ description: "Engagement id" })
  engagementId: string;

  @ApiProperty({
    description: "Engagement title",
    example: "Senior Frontend Engineer",
  })
  engagementTitle: string;

  @ApiProperty({ description: "Project id the engagement belongs to" })
  projectId: string;

  @ApiProperty({ description: "Assignment id" })
  assignmentId: string;

  @ApiProperty({ description: "Assignee's user id", example: "1001" })
  assigneeId: string;

  @ApiProperty({
    description: "Assignee's Topcoder handle",
    example: "johnsmith",
  })
  assigneeHandle: string;

  @ApiProperty({
    description: "First work date covered by this submission, as YYYY-MM-DD",
    example: "2026-10-05",
  })
  workPeriodStart: string;

  @ApiProperty({
    description: "Last work date covered by this submission, as YYYY-MM-DD",
    example: "2026-10-09",
  })
  workPeriodEnd: string;

  @ApiPropertyOptional({
    description: "When the entries were submitted for approval",
    nullable: true,
  })
  submittedAt: Date | null;

  @ApiProperty({
    description: "Submitted hours awaiting approval in this row",
    example: 40,
  })
  hours: number;

  @ApiProperty({
    description: "The submitted entry ids this row groups",
    type: String,
    isArray: true,
  })
  entryIds: string[];

  @ApiProperty({
    description:
      "The engagement's current managers - the people who can approve this timesheet. Empty when " +
      "the engagement has no manager assigned.",
    type: PendingApprovalTimesheetApproverDto,
    isArray: true,
  })
  approvers: PendingApprovalTimesheetApproverDto[];
}

export class PendingApprovalTimesheetListMetaDto {
  @ApiProperty({ description: "Current page", example: 1 })
  page: number;

  @ApiProperty({ description: "Items per page", example: 20 })
  perPage: number;

  @ApiProperty({ description: "Total matching rows", example: 42 })
  totalCount: number;

  @ApiProperty({ description: "Total pages", example: 3 })
  totalPages: number;
}

export class PendingApprovalTimesheetListResponseDto {
  @ApiProperty({ type: PendingApprovalTimesheetRowDto, isArray: true })
  data: PendingApprovalTimesheetRowDto[];

  @ApiProperty({ type: PendingApprovalTimesheetListMetaDto })
  meta: PendingApprovalTimesheetListMetaDto;
}

export class SendPendingApprovalRemindersDto {
  @ApiProperty({
    description:
      "Assignments whose submitted timesheets the reminder is about. Every current manager of their " +
      "engagements gets one reminder email, however many of the assignments they manage.",
    type: String,
    isArray: true,
    example: ["0d6f3a52-5d0a-4b6e-9a61-1b9c2f0f6a10"],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(PENDING_APPROVAL_REMINDER_MAX_ASSIGNMENTS)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @MaxLength(64, { each: true })
  assignmentIds: string[];
}

export class PendingApprovalReminderRecipientDto {
  @ApiProperty({ description: "Manager's user id", example: "2002" })
  userId: string;

  @ApiProperty({ description: "Manager's Topcoder handle", example: "maryj" })
  handle: string;

  @ApiProperty({
    description:
      "True when the reminder was handed to the email service; false when the manager has no " +
      "email address on file or publishing failed.",
  })
  sent: boolean;
}

export class PendingApprovalReminderEngagementDto {
  @ApiProperty({ description: "Engagement id" })
  engagementId: string;

  @ApiProperty({ description: "Engagement title" })
  engagementTitle: string;
}

export class SendPendingApprovalRemindersResponseDto {
  @ApiProperty({
    description: "How many managers the reminder was sent to",
    example: 2,
  })
  sentCount: number;

  @ApiProperty({
    description: "Every manager a reminder was attempted for, one per manager",
    type: PendingApprovalReminderRecipientDto,
    isArray: true,
  })
  recipients: PendingApprovalReminderRecipientDto[];

  @ApiProperty({
    description:
      "Engagements among the selection that have no current manager, so nobody could be reminded",
    type: PendingApprovalReminderEngagementDto,
    isArray: true,
  })
  engagementsWithoutManagers: PendingApprovalReminderEngagementDto[];

  @ApiProperty({
    description:
      "Requested assignment ids that have no submitted timesheet awaiting approval (already " +
      "approved, sent back to draft, or unknown). They were skipped.",
    type: String,
    isArray: true,
  })
  skippedAssignmentIds: string[];
}
