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
    description: "Filter by engagement ID",
    example: "4c4dd8a7-2f5a-4f6d-8f7b-1d2c3b4a5e6f",
  })
  @IsOptional()
  @IsString()
  engagementId?: string;

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
