import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaymentCycle } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { PaginationDto } from "../../engagements/dto";

const trimOrUndefined = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim() || undefined : value;

export class ApprovedTimesheetQueryDto extends PaginationDto {
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
    description: "Filter by assignee handle, case-insensitive substring match",
    example: "johnsmith",
  })
  @IsOptional()
  @Transform(trimOrUndefined)
  @IsString()
  @MaxLength(100)
  assignee?: string;
}

export class ApprovedTimesheetRowDto {
  @ApiProperty({
    description:
      "Stable row id, derived from the assignment and the approval it groups",
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

  @ApiPropertyOptional({
    description: "Project name, when the projects API could resolve it",
    nullable: true,
  })
  projectName: string | null;

  @ApiProperty({ description: "Assignment id" })
  assignmentId: string;

  @ApiProperty({ description: "Assignee's user id", example: "1001" })
  assigneeId: string;

  @ApiProperty({
    description: "Assignee's Topcoder handle",
    example: "johnsmith",
  })
  assigneeHandle: string;

  @ApiPropertyOptional({
    description: "Assignment agreement rate, as stored on the assignment",
    nullable: true,
  })
  agreementRate: string | null;

  @ApiPropertyOptional({
    description: "Assignment hourly rate, as stored on the assignment",
    nullable: true,
  })
  ratePerHour: string | null;

  @ApiProperty({
    description:
      "Assignment payment cycle; with the standard hours, derives an hourly rate when none is set",
    enum: PaymentCycle,
  })
  paymentCycle: PaymentCycle;

  @ApiPropertyOptional({
    description: "Assignment standard hours per day",
    nullable: true,
  })
  standardHoursPerDay: number | null;

  @ApiPropertyOptional({
    description: "Assignment standard hours per week (deprecated)",
    nullable: true,
  })
  standardHoursPerWeek: number | null;

  @ApiPropertyOptional({
    description:
      "Assignment total hours minus the hours finance has processed for payment. Null when the " +
      "assignment has no total or finance could not be read.",
    nullable: true,
    example: 120.5,
  })
  hoursLeft: number | null;

  @ApiProperty({
    description: "First work date covered by this approval, as YYYY-MM-DD",
    example: "2026-10-05",
  })
  workPeriodStart: string;

  @ApiProperty({
    description: "Last work date covered by this approval, as YYYY-MM-DD",
    example: "2026-10-09",
  })
  workPeriodEnd: string;

  @ApiProperty({
    description: "Approved, unpaid hours in this approval",
    example: 40,
  })
  hours: number;

  @ApiProperty({
    description: "The approved, unpaid entry ids this row pays for",
    type: String,
    isArray: true,
  })
  entryIds: string[];

  @ApiProperty({ description: "When the entries were approved" })
  approvedAt: Date;

  @ApiPropertyOptional({
    description: "Approver's user id",
    nullable: true,
  })
  approvedBy: string | null;

  @ApiPropertyOptional({
    description: "Approver's Topcoder handle",
    nullable: true,
    example: "maryj",
  })
  approvedByHandle: string | null;

  @ApiPropertyOptional({
    description: "Approver's display name, when the member profile exposes one",
    nullable: true,
    example: "Mary Jones",
  })
  approvedByName: string | null;

  @ApiPropertyOptional({
    description: "The comment the approver left when approving",
    nullable: true,
  })
  approvalComment: string | null;
}

export class ApprovedTimesheetListMetaDto {
  @ApiProperty({ description: "Current page", example: 1 })
  page: number;

  @ApiProperty({ description: "Items per page", example: 20 })
  perPage: number;

  @ApiProperty({ description: "Total matching rows", example: 42 })
  totalCount: number;

  @ApiProperty({ description: "Total pages", example: 3 })
  totalPages: number;
}

export class ApprovedTimesheetListResponseDto {
  @ApiProperty({ type: ApprovedTimesheetRowDto, isArray: true })
  data: ApprovedTimesheetRowDto[];

  @ApiProperty({ type: ApprovedTimesheetListMetaDto })
  meta: ApprovedTimesheetListMetaDto;
}
