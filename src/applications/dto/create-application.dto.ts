import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from "class-validator";

export class CreateApplicationDto {
  @ApiPropertyOptional({
    description: "Cover letter",
    example: "I am excited to apply for this engagement.",
    maxLength: 5000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  coverLetter?: string;

  @ApiPropertyOptional({
    description: "Resume URL",
    example: "https://example.com/resume.pdf",
  })
  @IsOptional()
  @IsUrl()
  resumeUrl?: string;

  @ApiPropertyOptional({
    description: "Portfolio URLs",
    example: ["https://portfolio.example.com"],
  })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  portfolioUrls?: string[];

  @ApiPropertyOptional({
    description: "Years of experience",
    example: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  yearsOfExperience?: number;

  @ApiPropertyOptional({
    description: "Availability details",
    example: "Available to start within two weeks.",
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  availability?: string;
}
