import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { transformBoolean } from "../../common/validation.util";
import { PaginationDto } from "../../engagements/dto";
import { PendingApprovalTimesheetApproverDto } from "./pending-approval-timesheet-list.dto";

const trimOrUndefined = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim() || undefined : value;

/** How many assignments one submission reminder request may name; a page of the list at most. */
export const PENDING_SUBMISSION_REMINDER_MAX_ASSIGNMENTS = 200;

/**
 * The work period every pending submission request is about. Required: "not submitted" only means
 * something for a given period.
 */
export class PendingSubmissionWorkPeriodDto {
  @ApiProperty({
    description: "First day of the work period, as YYYY-MM-DD",
    example: "2026-11-09",
  })
  @Transform(trimOrUndefined)
  @IsNotEmpty({ message: "fromDate is required." })
  @IsISO8601(
    { strict: false },
    { message: "fromDate must be a YYYY-MM-DD date." },
  )
  fromDate: string;

  @ApiProperty({
    description: "Last day of the work period, as YYYY-MM-DD",
    example: "2026-11-13",
  })
  @Transform(trimOrUndefined)
  @IsNotEmpty({ message: "toDate is required." })
  @IsISO8601(
    { strict: false },
    { message: "toDate must be a YYYY-MM-DD date." },
  )
  toDate: string;
}

export class PendingSubmissionTimesheetQueryDto extends IntersectionType(
  PaginationDto,
  PendingSubmissionWorkPeriodDto,
) {
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
      "When true, leave out assignments on the test projects configured in TEST_PROJECT_IDS.",
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(transformBoolean)
  excludeTestProjects?: boolean;

  @ApiPropertyOptional({
    description:
      "When true, only assignments on engagements with at least one current manager. Otherwise " +
      "engagements without a manager are listed too.",
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(transformBoolean)
  managerAssigned?: boolean;
}

export class PendingSubmissionTimesheetRowDto {
  @ApiProperty({ description: "Stable row id; the assignment id" })
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
    description:
      "First day of the requested period the assignment covers, as YYYY-MM-DD - later than the " +
      "requested from date when the assignment started inside the period",
    example: "2026-11-09",
  })
  workPeriodStart: string;

  @ApiProperty({
    description:
      "Last day of the requested period the assignment covers, as YYYY-MM-DD - earlier than the " +
      "requested to date when the assignment ends inside the period",
    example: "2026-11-13",
  })
  workPeriodEnd: string;

  @ApiProperty({
    description:
      "The engagement's current managers - the people who will approve the timesheet. Empty when " +
      "the engagement has no manager assigned.",
    type: PendingApprovalTimesheetApproverDto,
    isArray: true,
  })
  approvers: PendingApprovalTimesheetApproverDto[];
}

export class PendingSubmissionTimesheetListMetaDto {
  @ApiProperty({ description: "Current page", example: 1 })
  page: number;

  @ApiProperty({ description: "Items per page", example: 20 })
  perPage: number;

  @ApiProperty({ description: "Total matching rows", example: 42 })
  totalCount: number;

  @ApiProperty({ description: "Total pages", example: 3 })
  totalPages: number;
}

export class PendingSubmissionTimesheetListResponseDto {
  @ApiProperty({ type: PendingSubmissionTimesheetRowDto, isArray: true })
  data: PendingSubmissionTimesheetRowDto[];

  @ApiProperty({ type: PendingSubmissionTimesheetListMetaDto })
  meta: PendingSubmissionTimesheetListMetaDto;
}

export class SendPendingSubmissionRemindersDto extends PendingSubmissionWorkPeriodDto {
  @ApiProperty({
    description:
      "Assignments whose members are reminded to submit their timesheet for the work period. Each " +
      "member gets one email per assignment.",
    type: String,
    isArray: true,
    example: ["0d6f3a52-5d0a-4b6e-9a61-1b9c2f0f6a10"],
  })
  @Transform(({ value }: { value: unknown }) =>
    Array.isArray(value)
      ? value.map((item) => (typeof item === "string" ? item.trim() : item))
      : value,
  )
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(PENDING_SUBMISSION_REMINDER_MAX_ASSIGNMENTS)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @MaxLength(64, { each: true })
  assignmentIds: string[];
}

export class PendingSubmissionReminderRecipientDto {
  @ApiProperty({ description: "Assignment the reminder is about" })
  assignmentId: string;

  @ApiProperty({ description: "Member's user id", example: "1001" })
  userId: string;

  @ApiProperty({
    description: "Member's Topcoder handle",
    example: "johnsmith",
  })
  handle: string;

  @ApiProperty({
    description:
      "True when the reminder was handed to the email service; false when the member has no email " +
      "address on file or publishing failed.",
  })
  sent: boolean;
}

export class SendPendingSubmissionRemindersResponseDto {
  @ApiProperty({
    description: "How many reminders were sent, one per assignment",
    example: 2,
  })
  sentCount: number;

  @ApiProperty({
    description: "Every assignment a reminder was attempted for",
    type: PendingSubmissionReminderRecipientDto,
    isArray: true,
  })
  recipients: PendingSubmissionReminderRecipientDto[];

  @ApiProperty({
    description:
      "Requested assignment ids with nothing pending for the period (submitted since, no longer " +
      "active, or unknown). They were skipped.",
    type: String,
    isArray: true,
  })
  skippedAssignmentIds: string[];
}
