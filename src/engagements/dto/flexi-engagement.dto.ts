import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AssignmentStatus, EngagementStatus } from "@prisma/client";
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

export enum FlexiEngagementBucket {
  Total = "total",
  Active = "active",
  Closed = "closed",
}

export enum FlexiEngagementSortBy {
  Name = "name",
  MemberCount = "memberCount",
}

/**
 * Query parameters for the Flexi Talent engagement list endpoint.
 *
 * The query supports bucket filtering, title/project-name search, deterministic
 * sorting, and body-based pagination for `GET /engagements/flexi-talent/engagements`.
 */
export class FlexiEngagementListQueryDto {
  @ApiPropertyOptional({
    description: "Engagement bucket to return.",
    enum: FlexiEngagementBucket,
    default: FlexiEngagementBucket.Total,
    example: FlexiEngagementBucket.Active,
  })
  @IsOptional()
  @IsEnum(FlexiEngagementBucket)
  bucket: FlexiEngagementBucket = FlexiEngagementBucket.Total;

  @ApiPropertyOptional({
    description:
      "Case-insensitive search text matched against engagement title and, for values of at least three characters, project name.",
    example: "frontend",
  })
  @IsOptional()
  @IsString()
  searchText?: string;

  @ApiPropertyOptional({
    description: "Flexi engagement list sort field.",
    enum: FlexiEngagementSortBy,
    default: FlexiEngagementSortBy.Name,
    example: FlexiEngagementSortBy.Name,
  })
  @IsOptional()
  @IsEnum(FlexiEngagementSortBy)
  sortBy: FlexiEngagementSortBy = FlexiEngagementSortBy.Name;

  @ApiPropertyOptional({
    description: "Sort order.",
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
 * Skill reference returned by Flexi detail and history payloads.
 *
 * The `name` field falls back to the skill id when standardized-skills
 * hydration is unavailable.
 */
export class FlexiSkillReferenceDto {
  @ApiProperty({
    description: "Skill ID.",
    example: "c1b3ac2c-5c8b-4d58-9c7c-1f50b75f0f0f",
  })
  id: string;

  @ApiProperty({
    description: "Skill display name or fallback ID.",
    example: "React",
  })
  name: string;
}

/**
 * Assignment row returned inside a Flexi engagement detail payload.
 *
 * Rows expose member, assignment, duration, and derived timing fields without
 * payment data so the Flexi Talent UI can build Work links and status pills.
 */
export class FlexiEngagementAssignmentRowDto {
  @ApiProperty({
    description: "Engagement assignment ID.",
    example: "9a9a5f4d-2a3b-4e9c-9f1c-2b3c4d5e6f7a",
  })
  assignmentId: string;

  @ApiProperty({
    description: "Engagement ID.",
    example: "4c4dd8a7-2f5a-4f6d-8f7b-1d2c3b4a5e6f",
  })
  engagementId: string;

  @ApiProperty({
    description: "Project ID.",
    example: "3d9b37b5-1a5d-4c48-a60f-5f73c2f7f1b6",
  })
  projectId: string;

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
 * Counts for the Flexi Talent engagement summary endpoint.
 *
 * Used by `GET /engagements/flexi-talent/engagements/summary` to render the
 * top-level engagement buckets independent of list filters.
 */
export class FlexiEngagementSummaryDto {
  @ApiProperty({
    description: "Total number of engagements.",
    example: 120,
  })
  total: number;

  @ApiProperty({
    description: "Number of OPEN or ACTIVE engagements.",
    example: 84,
  })
  active: number;

  @ApiProperty({
    description: "Number of CLOSED or CANCELLED engagements.",
    example: 31,
  })
  closed: number;
}

/**
 * Flexi Talent engagement list row.
 *
 * Carries project and engagement identifiers, labels, status, and current
 * assigned-member count needed by the middle-pane engagement list.
 */
export class FlexiEngagementListItemDto {
  @ApiProperty({
    description: "Engagement ID.",
    example: "4c4dd8a7-2f5a-4f6d-8f7b-1d2c3b4a5e6f",
  })
  engagementId: string;

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
    description: "Engagement title.",
    example: "Senior Frontend Engineer",
  })
  engagementTitle: string;

  @ApiProperty({
    description: "Engagement status.",
    enum: EngagementStatus,
    example: EngagementStatus.ACTIVE,
  })
  status: EngagementStatus;

  @ApiProperty({
    description:
      "Current assigned-member count using active assignment statuses.",
    example: 2,
  })
  assignedMemberCount: number;

  @ApiPropertyOptional({
    description: "Required member count.",
    example: 3,
  })
  requiredMemberCount?: number | null;
}

/**
 * Body-paginated Flexi Talent engagement list response.
 *
 * Unlike legacy engagement lists, pagination fields are returned at the top
 * level instead of under a nested `meta` property.
 */
export class FlexiEngagementListResponseDto {
  @ApiProperty({
    description: "Page data.",
    type: FlexiEngagementListItemDto,
    isArray: true,
  })
  data: FlexiEngagementListItemDto[];

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
    example: 73,
  })
  total: number;

  @ApiProperty({
    description: "Total pages.",
    example: 4,
  })
  totalPages: number;
}

/**
 * Flexi Talent engagement detail response.
 *
 * Includes project, engagement, skills, duration inputs, and all assignment
 * rows for `GET /engagements/flexi-talent/engagements/:engagementId`.
 */
export class FlexiEngagementDetailDto {
  @ApiProperty({
    description: "Engagement ID.",
    example: "4c4dd8a7-2f5a-4f6d-8f7b-1d2c3b4a5e6f",
  })
  engagementId: string;

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
    description: "Engagement status.",
    enum: EngagementStatus,
    example: EngagementStatus.ACTIVE,
  })
  status: EngagementStatus;

  @ApiPropertyOptional({
    description: "Required member count.",
    example: 3,
  })
  requiredMemberCount?: number | null;

  @ApiProperty({
    description:
      "Current assigned-member count using active assignment statuses.",
    example: 2,
  })
  assignedMemberCount: number;

  @ApiProperty({
    description: "Hydrated required skills.",
    type: FlexiSkillReferenceDto,
    isArray: true,
  })
  skills: FlexiSkillReferenceDto[];

  @ApiPropertyOptional({
    description: "Engagement duration in months.",
    example: 3,
  })
  durationMonths?: number | null;

  @ApiPropertyOptional({
    description: "Engagement duration in weeks.",
    example: 8,
  })
  durationWeeks?: number | null;

  @ApiPropertyOptional({
    description: "Engagement duration start date.",
    example: "2026-01-01T00:00:00.000Z",
  })
  durationStartDate?: Date | null;

  @ApiPropertyOptional({
    description: "Engagement duration end date.",
    example: "2026-03-31T00:00:00.000Z",
  })
  durationEndDate?: Date | null;

  @ApiPropertyOptional({
    description: "Resolved duration label for display.",
    example: "3 months",
  })
  durationLabel?: string | null;

  @ApiProperty({
    description: "Assignment rows.",
    type: FlexiEngagementAssignmentRowDto,
    isArray: true,
  })
  assignments: FlexiEngagementAssignmentRowDto[];
}
