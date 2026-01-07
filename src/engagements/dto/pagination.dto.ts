import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../common/constants";

export class PaginationDto {
  @ApiPropertyOptional({
    description: "Page number",
    default: DEFAULT_PAGE,
    example: DEFAULT_PAGE,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = DEFAULT_PAGE;

  @ApiPropertyOptional({
    description: "Items per page",
    default: DEFAULT_PER_PAGE,
    example: DEFAULT_PER_PAGE,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  perPage: number = DEFAULT_PER_PAGE;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    totalCount: number;
    totalPages: number;
  };
}
