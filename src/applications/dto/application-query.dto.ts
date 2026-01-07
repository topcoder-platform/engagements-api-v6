import { ApiPropertyOptional } from "@nestjs/swagger";
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
    description: "Filter by status",
    enum: ApplicationStatus,
    example: ApplicationStatus.SUBMITTED,
  })
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

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
