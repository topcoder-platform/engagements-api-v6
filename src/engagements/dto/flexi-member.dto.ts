import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AssignmentStatus } from "@prisma/client";
import { Type } from "class-transformer";
import {
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../common/constants";
import { FlexiSkillReferenceDto } from "./flexi-engagement.dto";

export enum FlexiMemberBucket {
  Total = "total",
  Assigned = "assigned",
  Completed = "completed",
}

export enum FlexiMemberSortBy {
  Time = "time",
  Handle = "handle",
}

/**
 * Query parameters for the Flexi Talent member list endpoint.
 *
 * The query supports assignment-centric bucket filtering, member-handle search,
 * stable sorting, and body-based pagination for `GET /engagements/flexi-talent/members`.
 */
export class FlexiMemberListQueryDto {
  @ApiPropertyOptional({
    description: "Member bucket to return.",
    enum: FlexiMemberBucket,
    default: FlexiMemberBucket.Total,
    example: FlexiMemberBucket.Assigned,
  })
  @IsOptional()
  @IsEnum(FlexiMemberBucket)
  bucket: FlexiMemberBucket = FlexiMemberBucket.Total;

  @ApiPropertyOptional({
    description: "Case-insensitive member handle search.",
    example: "jane",
  })
  @IsOptional()
  @IsString()
  searchText?: string;

  @ApiPropertyOptional({
    description: "Flexi member list sort field.",
    enum: FlexiMemberSortBy,
    default: FlexiMemberSortBy.Handle,
    example: FlexiMemberSortBy.Handle,
  })
  @IsOptional()
  @IsEnum(FlexiMemberSortBy)
  sortBy: FlexiMemberSortBy = FlexiMemberSortBy.Handle;

  @ApiPropertyOptional({
    description: "Sort order for member list sorting.",
    default: "asc",
    example: "asc",
  })
  @IsOptional()
  @IsIn(["asc", "desc"])
  sortOrder: "asc" | "desc" = "asc";

  @ApiPropertyOptional({
    description: "Page number.",
    default: DEFAULT_PAGE,
    example: DEFAULT_PAGE,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = DEFAULT_PAGE;

  @ApiPropertyOptional({
    description: "Items per page.",
    default: DEFAULT_PER_PAGE,
    example: DEFAULT_PER_PAGE,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  perPage: number = DEFAULT_PER_PAGE;
}

/**
 * Counts for the Flexi Talent member summary endpoint.
 *
 * Members are counted by unique memberId across qualifying assignment rows,
 * not by raw assignment count.
 */
export class FlexiMemberSummaryDto {
  @ApiProperty({
    description:
      "Unique members with any current or completion-status assignment.",
    example: 58,
  })
  totalUniqueMembers: number;

  @ApiProperty({
    description: "Unique members with at least one current assignment.",
    example: 41,
  })
  assignedMembers: number;

  @ApiProperty({
    description:
      "Unique members with completion-status assignments and no current assignment.",
    example: 17,
  })
  completedMembers: number;
}

/**
 * Flexi Talent member list row.
 *
 * Carries member identity, primary assignment context, timing, and status
 * fields needed by the middle-pane member list without another fetch.
 */
export class FlexiMemberListItemDto {
  @ApiProperty({
    description: "Member ID.",
    example: "123456",
  })
  memberId: string;

  @ApiProperty({
    description: "Member handle.",
    example: "jane_doe",
  })
  handle: string;

  @ApiProperty({
    description: "Primary assignment ID.",
    example: "9a9a5f4d-2a3b-4e9c-9f1c-2b3c4d5e6f7a",
  })
  assignmentId: string;

  @ApiProperty({
    description: "Primary project ID.",
    example: "3d9b37b5-1a5d-4c48-a60f-5f73c2f7f1b6",
  })
  primaryProjectId: string;

  @ApiPropertyOptional({
    description: "Primary project display name when available.",
    example: "Platform Modernization",
  })
  primaryProjectName?: string;

  @ApiProperty({
    description: "Primary engagement ID.",
    example: "4c4dd8a7-2f5a-4f6d-8f7b-1d2c3b4a5e6f",
  })
  primaryEngagementId: string;

  @ApiProperty({
    description: "Primary engagement title.",
    example: "Senior Frontend Engineer",
  })
  primaryEngagementTitle: string;

  @ApiProperty({
    description: "Whether the member has a current assignment.",
    example: true,
  })
  isCurrentlyAssigned: boolean;

  @ApiPropertyOptional({
    description: "Whole days remaining for the chosen current assignment.",
    example: 12,
  })
  daysRemaining?: number | null;

  @ApiPropertyOptional({
    description:
      "Latest terminal timestamp for completed-only members, including offer rejection time.",
    example: "2026-03-31T00:00:00.000Z",
  })
  latestCompletedAt?: Date | null;

  @ApiProperty({
    description: "Raw primary assignment status.",
    enum: AssignmentStatus,
    example: AssignmentStatus.SELECTED,
  })
  status: AssignmentStatus;

  @ApiProperty({
    description: "UI-facing assignment status label.",
    example: "Selected",
  })
  displayStatusLabel: string;
}

/**
 * Body-paginated Flexi Talent member list response.
 *
 * Unlike legacy engagement lists, pagination fields are returned at the top
 * level instead of under a nested `meta` property.
 */
export class FlexiMemberListResponseDto {
  @ApiProperty({
    description: "Page data.",
    type: FlexiMemberListItemDto,
    isArray: true,
  })
  data: FlexiMemberListItemDto[];

  @ApiProperty({
    description: "Current page number.",
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: "Items per page.",
    example: 20,
  })
  perPage: number;

  @ApiProperty({
    description: "Total matching rows.",
    example: 58,
  })
  total: number;

  @ApiProperty({
    description: "Total pages.",
    example: 3,
  })
  totalPages: number;
}

/**
 * Flexi Talent member detail response.
 *
 * Represents the right-rail payload for the member's selected primary
 * assignment, with project, engagement, skills, duration, and timing fields.
 */
export class FlexiMemberDetailDto {
  @ApiProperty({
    description: "Member ID.",
    example: "123456",
  })
  memberId: string;

  @ApiProperty({
    description: "Member handle.",
    example: "jane_doe",
  })
  handle: string;

  @ApiProperty({
    description: "Whether the member has a current assignment.",
    example: true,
  })
  isCurrentlyAssigned: boolean;

  @ApiProperty({
    description: "Assignment ID.",
    example: "9a9a5f4d-2a3b-4e9c-9f1c-2b3c4d5e6f7a",
  })
  assignmentId: string;

  @ApiProperty({
    description: "Project ID.",
    example: "3d9b37b5-1a5d-4c48-a60f-5f73c2f7f1b6",
  })
  projectId: string;

  @ApiPropertyOptional({
    description: "Project display name when available.",
    example: "Platform Modernization",
  })
  projectName?: string;

  @ApiProperty({
    description: "Engagement ID.",
    example: "4c4dd8a7-2f5a-4f6d-8f7b-1d2c3b4a5e6f",
  })
  engagementId: string;

  @ApiProperty({
    description: "Engagement title.",
    example: "Senior Frontend Engineer",
  })
  engagementTitle: string;

  @ApiProperty({
    description: "Engagement description.",
    example: "Build a new hiring portal for enterprise clients.",
  })
  description: string;

  @ApiProperty({
    description: "Raw assignment status.",
    enum: AssignmentStatus,
    example: AssignmentStatus.ASSIGNED,
  })
  status: AssignmentStatus;

  @ApiProperty({
    description: "UI-facing assignment status label.",
    example: "Assigned",
  })
  displayStatusLabel: string;

  @ApiProperty({
    description: "Hydrated required skills.",
    type: FlexiSkillReferenceDto,
    isArray: true,
  })
  skills: FlexiSkillReferenceDto[];

  @ApiPropertyOptional({
    description: "Assignment billing start date.",
    example: "2026-01-01T00:00:00.000Z",
  })
  startDate?: Date | null;

  @ApiPropertyOptional({
    description: "Explicit assignment end date.",
    example: "2026-03-31T00:00:00.000Z",
  })
  endDate?: Date | null;

  @ApiPropertyOptional({
    description:
      "Resolved end date from explicit endDate or startDate plus durationMonths.",
    example: "2026-03-31T00:00:00.000Z",
  })
  resolvedEndDate?: Date | null;

  @ApiPropertyOptional({
    description:
      "Whole days remaining until resolvedEndDate. Negative values indicate overdue work.",
    example: 12,
  })
  timeLeftDays?: number | null;

  @ApiProperty({
    description: "Whether the assignment resolved end date is in the past.",
    example: false,
  })
  isOverdue: boolean;

  @ApiPropertyOptional({
    description:
      "Duration in months, preferring assignment duration before engagement fallback.",
    example: 3,
  })
  durationMonths?: number | null;

  @ApiPropertyOptional({
    description: "Engagement fallback duration in weeks.",
    example: 8,
  })
  durationWeeks?: number | null;

  @ApiPropertyOptional({
    description: "Engagement fallback duration start date.",
    example: "2026-01-01T00:00:00.000Z",
  })
  durationStartDate?: Date | null;

  @ApiPropertyOptional({
    description: "Engagement fallback duration end date.",
    example: "2026-03-31T00:00:00.000Z",
  })
  durationEndDate?: Date | null;

  @ApiPropertyOptional({
    description: "Resolved duration label for display.",
    example: "3 months",
  })
  durationLabel?: string | null;
}

/**
 * Flexi Talent member history row.
 *
 * Each row contains assignment, project, engagement, skills, status, duration,
 * and timing fields for the full unpaginated member history response.
 */
export class FlexiMemberHistoryItemDto {
  @ApiProperty({
    description: "Assignment ID.",
    example: "9a9a5f4d-2a3b-4e9c-9f1c-2b3c4d5e6f7a",
  })
  assignmentId: string;

  @ApiProperty({
    description: "Member ID.",
    example: "123456",
  })
  memberId: string;

  @ApiProperty({
    description: "Member handle.",
    example: "jane_doe",
  })
  memberHandle: string;

  @ApiProperty({
    description: "Project ID.",
    example: "3d9b37b5-1a5d-4c48-a60f-5f73c2f7f1b6",
  })
  projectId: string;

  @ApiPropertyOptional({
    description: "Project display name when available.",
    example: "Platform Modernization",
  })
  projectName?: string;

  @ApiProperty({
    description: "Engagement ID.",
    example: "4c4dd8a7-2f5a-4f6d-8f7b-1d2c3b4a5e6f",
  })
  engagementId: string;

  @ApiProperty({
    description: "Engagement title.",
    example: "Senior Frontend Engineer",
  })
  engagementTitle: string;

  @ApiProperty({
    description: "Raw assignment status.",
    enum: AssignmentStatus,
    example: AssignmentStatus.COMPLETED,
  })
  status: AssignmentStatus;

  @ApiProperty({
    description: "UI-facing assignment status label.",
    example: "Completed",
  })
  displayStatusLabel: string;

  @ApiProperty({
    description: "Whether this is a current assignment.",
    example: false,
  })
  isCurrent: boolean;

  @ApiProperty({
    description: "Hydrated required skills.",
    type: FlexiSkillReferenceDto,
    isArray: true,
  })
  skills: FlexiSkillReferenceDto[];

  @ApiPropertyOptional({
    description: "Assignment billing start date.",
    example: "2026-01-01T00:00:00.000Z",
  })
  startDate?: Date | null;

  @ApiPropertyOptional({
    description: "Explicit assignment end date.",
    example: "2026-03-31T00:00:00.000Z",
  })
  endDate?: Date | null;

  @ApiPropertyOptional({
    description:
      "Resolved end date from explicit endDate or startDate plus durationMonths.",
    example: "2026-03-31T00:00:00.000Z",
  })
  resolvedEndDate?: Date | null;

  @ApiPropertyOptional({
    description:
      "Whole days remaining until resolvedEndDate. Negative values indicate overdue work.",
    example: -4,
  })
  timeLeftDays?: number | null;

  @ApiProperty({
    description: "Whether the assignment resolved end date is in the past.",
    example: true,
  })
  isOverdue: boolean;

  @ApiPropertyOptional({
    description:
      "Resolved terminal timestamp for past-assignment sorting, including offer rejection time.",
    example: "2026-03-31T00:00:00.000Z",
  })
  completedAt?: Date | null;

  @ApiPropertyOptional({
    description:
      "Duration in months, preferring assignment duration before engagement fallback.",
    example: 3,
  })
  durationMonths?: number | null;

  @ApiPropertyOptional({
    description: "Engagement fallback duration in weeks.",
    example: 8,
  })
  durationWeeks?: number | null;

  @ApiPropertyOptional({
    description: "Engagement fallback duration start date.",
    example: "2026-01-01T00:00:00.000Z",
  })
  durationStartDate?: Date | null;

  @ApiPropertyOptional({
    description: "Engagement fallback duration end date.",
    example: "2026-03-31T00:00:00.000Z",
  })
  durationEndDate?: Date | null;

  @ApiPropertyOptional({
    description: "Resolved duration label for display.",
    example: "3 months",
  })
  durationLabel?: string | null;
}

/**
 * Unpaginated Flexi Talent member history response.
 *
 * Returned by `GET /engagements/flexi-talent/members/:memberId/history` with
 * current assignments first and past assignments newest first.
 */
export class FlexiMemberHistoryDto {
  @ApiProperty({
    description: "Member ID.",
    example: "123456",
  })
  memberId: string;

  @ApiProperty({
    description: "Best-known member handle from assignment history.",
    example: "jane_doe",
  })
  handle: string;

  @ApiProperty({
    description: "Unpaginated history rows.",
    type: FlexiMemberHistoryItemDto,
    isArray: true,
  })
  data: FlexiMemberHistoryItemDto[];
}
