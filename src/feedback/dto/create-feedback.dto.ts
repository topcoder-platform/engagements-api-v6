import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { IsNotWhitespace } from "../../common/validation.util";

export class CreateFeedbackDto {
  @ApiProperty({
    description: "Feedback text",
    example: "Great collaboration and clear requirements.",
  })
  @IsString()
  @IsNotEmpty()
  @IsNotWhitespace()
  feedbackText: string;

  @ApiPropertyOptional({
    description: "Rating from 1 to 5",
    example: 4,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}
