import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ApplicationStatus } from "@prisma/client";
import { EngagementResponseDto } from "../../engagements/dto";

export class ApplicationResponseDto {
  @ApiProperty({
    description: "Application ID",
    example: "f7d6c084-2b9f-4d4f-8d4b-3f9b47dbfbe9",
  })
  id: string;

  @ApiProperty({
    description: "Engagement ID",
    example: "4c4dd8a7-2f5a-4f6d-8f7b-1d2c3b4a5e6f",
  })
  engagementId: string;

  @ApiProperty({
    description: "Applicant user ID",
    example: "123456",
  })
  userId: string;

  @ApiProperty({
    description: "Applicant email",
    example: "member@example.com",
  })
  email: string;

  @ApiProperty({
    description: "Applicant name",
    example: "Jane Doe",
  })
  name: string;

  @ApiPropertyOptional({
    description: "Applicant address",
    example: "123 Main St, Springfield, IL 62704",
  })
  address?: string | null;

  @ApiPropertyOptional({
    description: "Cover letter",
    example: "I am excited to apply for this engagement.",
  })
  coverLetter?: string | null;

  @ApiPropertyOptional({
    description: "Resume URL",
    example: "https://example.com/resume.pdf",
  })
  resumeUrl?: string | null;

  @ApiProperty({
    description: "Portfolio URLs",
    example: ["https://portfolio.example.com"],
  })
  portfolioUrls: string[];

  @ApiPropertyOptional({
    description: "Years of experience",
    example: 5,
  })
  yearsOfExperience?: number | null;

  @ApiPropertyOptional({
    description: "Availability details",
    example: "Available to start within two weeks.",
  })
  availability?: string | null;

  @ApiProperty({
    description: "Application status",
    enum: ApplicationStatus,
    example: ApplicationStatus.SUBMITTED,
  })
  status: ApplicationStatus;

  @ApiProperty({
    description: "Created timestamp",
    example: "2025-01-01T12:00:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Updated timestamp",
    example: "2025-01-10T12:00:00.000Z",
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: "Updated by user ID",
    example: "123456",
  })
  updatedBy?: string | null;

  @ApiPropertyOptional({
    description: "Engagement details",
    type: EngagementResponseDto,
  })
  engagement?: EngagementResponseDto;
}
