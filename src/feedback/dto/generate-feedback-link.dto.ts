import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class GenerateFeedbackLinkDto {
  @ApiProperty({
    description: "Customer email address",
    example: "customer@example.com",
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  customerEmail: string;

  @ApiPropertyOptional({
    description: "Expiration in days (defaults to 30)",
    example: 30,
    default: 30,
    minimum: 1,
    maximum: 90,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(90)
  expirationDays: number = 30;
}
