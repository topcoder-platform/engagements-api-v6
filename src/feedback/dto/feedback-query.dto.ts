import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsIn, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../engagements/dto/pagination.dto";

export enum FeedbackSortBy {
  CreatedAt = "createdAt",
  Rating = "rating",
}

export const FEEDBACK_SORT_FIELDS: FeedbackSortBy[] = [
  FeedbackSortBy.CreatedAt,
  FeedbackSortBy.Rating,
];

export class FeedbackQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Filter by engagement assignment ID",
    example: "9e3b5d41-5e5b-4f0a-9d7d-1b2c3d4e5f6a",
  })
  @IsOptional()
  @IsString()
  engagementAssignmentId?: string;

  @ApiPropertyOptional({
    description: "Filter by member ID",
    example: "123456",
  })
  @IsOptional()
  @IsString()
  givenByMemberId?: string;

  @ApiPropertyOptional({
    description: "Sort field",
    enum: FeedbackSortBy,
    default: FeedbackSortBy.CreatedAt,
    example: FeedbackSortBy.CreatedAt,
  })
  @IsOptional()
  @IsEnum(FeedbackSortBy)
  sortBy: FeedbackSortBy = FeedbackSortBy.CreatedAt;

  @ApiPropertyOptional({
    description: "Sort order",
    default: "desc",
    example: "desc",
  })
  @IsOptional()
  @IsIn(["asc", "desc"])
  sortOrder: "asc" | "desc" = "desc";
}
