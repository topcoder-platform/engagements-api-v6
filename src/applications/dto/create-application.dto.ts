import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  Min,
  ValidateIf,
} from "class-validator";
import { IsNotWhitespace, trimTransformer } from "../../common/validation.util";

export class CreateApplicationDto {
  @ApiProperty({
    description: "Cover letter",
    example: "I am excited to apply for this engagement.",
    maxLength: 5000,
    required: true,
  })
  @Transform(trimTransformer)
  @IsNotWhitespace()
  @IsString()
  @MaxLength(5000)
  coverLetter: string;

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
  @Transform(trimTransformer)
  @ValidateIf((o) => o.availability !== undefined)
  @IsNotWhitespace()
  @IsString()
  @MaxLength(500)
  availability?: string;

  @ApiPropertyOptional({
    description: "Mobile phone number",
    example: "+1 (555) 123-4567",
    maxLength: 20,
  })
  @IsOptional()
  @Transform(trimTransformer)
  @IsString()
  @MaxLength(20)
  @Matches(/^[\d\s\-+()]+$/, {
    message:
      "Mobile number must contain only digits, spaces, hyphens, plus signs, and parentheses",
  })
  mobileNumber?: string;
}
