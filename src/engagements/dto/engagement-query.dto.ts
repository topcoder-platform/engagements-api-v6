import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
} from "class-validator";
import { EngagementStatus } from "@prisma/client";
import { transformArray } from "../../common/validation.util";
import { PaginationDto } from "./pagination.dto";

export enum EngagementSortBy {
  CreatedAt = "createdAt",
  ApplicationDeadline = "applicationDeadline",
  Status = "status",
  Title = "title",
}

export const ENGAGEMENT_SORT_FIELDS: EngagementSortBy[] = [
  EngagementSortBy.CreatedAt,
  EngagementSortBy.ApplicationDeadline,
  EngagementSortBy.Status,
  EngagementSortBy.Title,
];

export class EngagementQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Filter by project ID",
    example: "3d9b37b5-1a5d-4c48-a60f-5f73c2f7f1b6",
  })
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiPropertyOptional({
    description: "Filter by status",
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
