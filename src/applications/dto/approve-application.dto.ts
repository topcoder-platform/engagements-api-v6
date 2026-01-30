import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class ApproveApplicationDto {
  @ApiPropertyOptional({
    description: "Assignment start date",
    example: "2026-01-30T12:00:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: "Assignment end date",
    example: "2026-02-28T12:00:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: "Assignment rate",
    example: "75",
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) {
      return undefined;
    }
    const normalized = String(value).trim();
    return normalized.length > 0 ? normalized : undefined;
  })
  @IsString()
  agreementRate?: string;
}
