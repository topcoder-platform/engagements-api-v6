import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AssignmentStatus, TimesheetEntryStatus } from "@prisma/client";
import { EngagementManagerResponseDto } from "../../engagements/managers/dto";
import { TimesheetViewerRole } from "../timesheet-roles";

export class TimesheetEntryResponseDto {
  @ApiProperty({ description: "Entry id", example: "9a9a5f4d-2a3b-4e9c" })
  id: string;

  @ApiProperty({
    description: "Calendar day the hours were worked, as YYYY-MM-DD",
    example: "2026-09-07",
  })
  workDate: string;

  @ApiProperty({
    description:
      "Hours worked, as an exact decimal string. A JSON number would put hours through a float on " +
      "the way to becoming a payment amount.",
    example: "8.50",
  })
  hoursWorked: string;

  @ApiPropertyOptional({
    description: "Work details or comments",
    example: "Sprint planning and API work",
    nullable: true,
  })
  remarks: string | null;

  @ApiProperty({
    description: "Workflow status. DRAFT is displayed as '-'.",
    enum: TimesheetEntryStatus,
    example: TimesheetEntryStatus.SUBMITTED,
  })
  status: TimesheetEntryStatus;

  @ApiPropertyOptional({
    description: "When the entry was submitted",
    nullable: true,
  })
  submittedAt: Date | null;

  @ApiPropertyOptional({
    description: "Handle of the manager who approved the entry",
    example: "maryj",
    nullable: true,
  })
  approvedByHandle: string | null;

  @ApiPropertyOptional({
    description: "When the entry was approved",
    nullable: true,
  })
  approvedAt: Date | null;

  @ApiPropertyOptional({
    description: "Comment the approving manager left",
    example: "Approved for week 37",
    nullable: true,
  })
  approvalComment: string | null;

  @ApiPropertyOptional({
    description:
      "Set when an administrator reopened a previously approved entry. The entry is back in DRAFT; " +
      "this is what lets the UI badge it 'Reopened'.",
    nullable: true,
  })
  reopenedAt: Date | null;

  @ApiProperty({
    description:
      "True when the work date falls outside the assignment's start/end dates. Such entries are " +
      "allowed - assignment dates are often set loosely - and flagged so the administrator view can " +
      "surface them.",
    example: false,
  })
  outsideAssignmentWindow: boolean;

  @ApiProperty({
    description:
      "True once a payment has consumed this entry, which makes it unpayable again.",
    example: false,
  })
  isPaid: boolean;

  @ApiPropertyOptional({
    description:
      "Identifier of the payment that consumed this entry. This is the entry -> payment leg of reconciliation.",
    example: "8f14e45f-ceea-467a-9c3d-2b1a5f6c7d8e",
    nullable: true,
  })
  paymentReference: string | null;

  @ApiPropertyOptional({
    description: "When this entry was linked to a payment",
    nullable: true,
  })
  paidAt: Date | null;
}

export class TimesheetAssignmentResponseDto {
  @ApiProperty({ description: "Assignment id" })
  id: string;

  @ApiProperty({ description: "Assigned member's user id", example: "1001" })
  memberId: string;

  @ApiProperty({
    description: "Assigned member's Topcoder handle",
    example: "johnsmith",
  })
  memberHandle: string;

  @ApiPropertyOptional({
    description:
      "Assigned member's display name, when the member profile exposes one",
    example: "John Smith",
    nullable: true,
  })
  memberName: string | null;

  @ApiProperty({ description: "Assignment status", enum: AssignmentStatus })
  status: AssignmentStatus;

  @ApiPropertyOptional({
    description:
      "Standard hours per day for this assignment, displayed in the timesheet header",
    example: 8,
    nullable: true,
  })
  standardHoursPerDay: number | null;

  @ApiPropertyOptional({
    description: "Assignment billing start date",
    nullable: true,
  })
  startDate: Date | null;

  @ApiPropertyOptional({ description: "Assignment end date", nullable: true })
  endDate: Date | null;
}

export class TimesheetViewResponseDto {
  @ApiProperty({
    description:
      "The caller's relationship to this timesheet, resolved server-side. The UI renders from this " +
      "rather than guessing from JWT roles.",
    enum: TimesheetViewerRole,
    example: TimesheetViewerRole.Member,
  })
  viewerRole: TimesheetViewerRole;

  @ApiProperty({ description: "Engagement id" })
  engagementId: string;

  @ApiProperty({
    description: "Engagement title",
    example: "Senior Frontend Engineer",
  })
  engagementTitle: string;

  @ApiProperty({ type: TimesheetAssignmentResponseDto })
  assignment: TimesheetAssignmentResponseDto;

  @ApiProperty({
    description:
      "Every manager currently authorized to approve this engagement's timesheets. The member view " +
      "displays all of them.",
    type: EngagementManagerResponseDto,
    isArray: true,
  })
  managers: EngagementManagerResponseDto[];

  @ApiProperty({ type: TimesheetEntryResponseDto, isArray: true })
  entries: TimesheetEntryResponseDto[];
}

export class SkippedTimesheetEntryDto {
  @ApiProperty({ description: "Entry that was not approved" })
  id: string;

  @ApiProperty({
    description: "Status the entry actually had, which is why it was skipped",
    enum: TimesheetEntryStatus,
  })
  currentStatus: TimesheetEntryStatus;

  @ApiPropertyOptional({
    description:
      "Handle of the manager who got there first, when the entry was already approved",
    example: "maryj",
    nullable: true,
  })
  approvedByHandle: string | null;
}

export class ApproveTimesheetEntriesResultDto {
  @ApiProperty({
    description: "Entries this call approved",
    type: String,
    isArray: true,
  })
  approved: string[];

  @ApiProperty({
    description:
      "Entries left alone because they were no longer submitted. A second manager approving the same " +
      "selection sees the entries here rather than getting an error for the whole batch.",
    type: SkippedTimesheetEntryDto,
    isArray: true,
  })
  skipped: SkippedTimesheetEntryDto[];
}
