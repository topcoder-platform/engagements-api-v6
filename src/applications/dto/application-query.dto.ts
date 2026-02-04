import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsIn, IsOptional, IsString } from "class-validator";
import { ApplicationStatus } from "@prisma/client";
import { PaginationDto } from "../../engagements/dto/pagination.dto";

export enum ApplicationSortBy {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  Status = "status",
}

export const APPLICATION_SORT_FIELDS: ApplicationSortBy[] = [
  ApplicationSortBy.CreatedAt,
  ApplicationSortBy.UpdatedAt,
  ApplicationSortBy.Status,
];

export class ApplicationQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Filter by engagement ID",
    example: "4c4dd8a7-2f5a-4f6d-8f7b-1d2c3b4a5e6f",
  })
  @IsOptional()
  @IsString()
  engagementId?: string;

  @ApiPropertyOptional({
    description: "Filter by user ID",
    example: "123456",
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({
    description:
      "Filter by status. Accepts a single status or a comma-separated list.",
    enum: ApplicationStatus,
    isArray: true,
    example: [ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_REVIEW],
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === "") {
      return undefined;
    }

    const values = Array.isArray(value) ? value : [value];
    const normalized = values
      .flatMap((item) => (typeof item === "string" ? item.split(",") : item))
      .map((item) => (typeof item === "string" ? item.trim() : item))
      .filter((item) => item !== "" && item !== undefined && item !== null);

    return normalized.length ? normalized : undefined;
  })
  @IsEnum(ApplicationStatus, { each: true })
  status?: ApplicationStatus[];

  @ApiPropertyOptional({
    description: "Sort field",
    enum: ApplicationSortBy,
    default: ApplicationSortBy.CreatedAt,
    example: ApplicationSortBy.CreatedAt,
  })
  @IsOptional()
  @IsEnum(ApplicationSortBy)
  sortBy: ApplicationSortBy = ApplicationSortBy.CreatedAt;

  @ApiPropertyOptional({
    description: "Sort order",
    default: "desc",
    example: "desc",
  })
  @IsOptional()
  @IsIn(["asc", "desc"])
  sortOrder: "asc" | "desc" = "desc";
}
