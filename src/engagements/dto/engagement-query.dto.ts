import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
} from "class-validator";
import { EngagementStatus } from "@prisma/client";
import {
  transformArray,
  transformBoolean,
} from "../../common/validation.util";
import { PaginationDto } from "./pagination.dto";

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
      "Filter by status. ON_HOLD requires the same authorization as includePrivate=true (admin, talent manager, or M2M token).",
    enum: EngagementStatus,
    example: EngagementStatus.OPEN,
  })
  @IsOptional()
  @IsEnum(EngagementStatus)
  status?: EngagementStatus;

  @ApiPropertyOptional({
    description: "Search in title and description",
    example: "frontend",
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: "Filter by required skill IDs",
    example: ["c1b3ac2c-5c8b-4d58-9c7c-1f50b75f0f0f"],
  })
  @IsOptional()
  @IsArray()
  @Transform(transformArray)
  requiredSkills?: string[];

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
      "When true, return only engagements to which the authenticated current user has applied. False or omitted leaves the public list unfiltered. M2M tokens cannot use the true filter.",
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
