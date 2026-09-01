import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
} from "class-validator";
import { EngagementStatus, Role } from "@prisma/client";
import { transformArray, transformBoolean } from "../../common/validation.util";
import { PaginationDto } from "./pagination.dto";

export const MAX_ENGAGEMENT_SKILL_FILTER_VALUES = 20;

export enum EngagementSortBy {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  AnticipatedStart = "anticipatedStart",
  Status = "status",
  Title = "title",
}

export const ENGAGEMENT_SORT_FIELDS: EngagementSortBy[] = [
  EngagementSortBy.CreatedAt,
  EngagementSortBy.UpdatedAt,
  EngagementSortBy.AnticipatedStart,
  EngagementSortBy.Status,
  EngagementSortBy.Title,
];

/**
 * Query parameters for listing engagements.
 *
 * `projectId` filters by a single project.
 * `projectIds` filters by multiple projects using an `IN` query.
 * When both are provided, `projectIds` takes precedence.
 * `role` applies an exact persisted engagement-role filter before pagination.
 */
export class EngagementQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Filter by project ID",
    example: "3d9b37b5-1a5d-4c48-a60f-5f73c2f7f1b6",
  })
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiPropertyOptional({
    description: "Filter by project IDs",
    example: [
      "3d9b37b5-1a5d-4c48-a60f-5f73c2f7f1b6",
      "4f5e9f5a-19b6-41e2-9dfe-8ce7adfce54b",
    ],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(transformArray)
  projectIds?: string[];

  @ApiPropertyOptional({
    description:
      "Filter by status. ON_HOLD requires the same authorization as includePrivate=true (admin, talent manager, or M2M token), except for member-scoped includePrivate=true&appliedByMe=true reads that remain limited to the caller's own private engagements and assignments.",
    enum: EngagementStatus,
    example: EngagementStatus.OPEN,
  })
  @IsOptional()
  @IsEnum(EngagementStatus)
  status?: EngagementStatus;

  @ApiPropertyOptional({
    description:
      "Case-insensitive search across title and description, plus exact standardized skill-name matches",
    example: "frontend",
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description:
      "Filter by up to 20 required standardized skill UUIDs or exact skill names (case-insensitive). Values are ORed. Names are resolved server-side with M2M authentication; unknown names match no engagement.",
    example: ["React", "c1b3ac2c-5c8b-4d58-9c7c-1f50b75f0f0f"],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_ENGAGEMENT_SKILL_FILTER_VALUES)
  @IsString({ each: true })
  @Transform(transformArray)
  requiredSkills?: string[];

  @ApiPropertyOptional({
    description: "Filter by engagement role",
    enum: Role,
    example: Role.SOFTWARE_DEVELOPER,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({
    description: "Filter by countries",
    example: ["US", "CA"],
  })
  @IsOptional()
  @IsArray()
  @Transform(transformArray)
  countries?: string[];

  @ApiPropertyOptional({
    description: "Filter by time zones",
    example: ["America/Chicago"],
  })
  @IsOptional()
  @IsArray()
  @Transform(transformArray)
  timeZones?: string[];

  @ApiPropertyOptional({
    description:
      "Include private engagements (requires admin, PM, Task Manager, or Talent Manager role)",
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(transformBoolean)
  includePrivate?: boolean;

  @ApiPropertyOptional({
    description:
      "When true, return only engagements the authenticated current user applied to. False or omitted leaves the public list unfiltered. M2M tokens cannot use the true filter. When paired with includePrivate=true, ordinary members may also receive their own assigned private engagements, and the response remains limited to their own assignments.",
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(transformBoolean)
  appliedByMe?: boolean;

  @ApiPropertyOptional({
    description: "Sort field",
    enum: EngagementSortBy,
    default: EngagementSortBy.CreatedAt,
    example: EngagementSortBy.CreatedAt,
  })
  @IsOptional()
  @IsEnum(EngagementSortBy)
  sortBy: EngagementSortBy = EngagementSortBy.CreatedAt;

  @ApiPropertyOptional({
    description: "Sort order",
    default: "desc",
    example: "desc",
  })
  @IsOptional()
  @IsIn(["asc", "desc"])
  sortOrder: "asc" | "desc" = "desc";
}
