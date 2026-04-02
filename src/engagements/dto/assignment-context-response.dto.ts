import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AssignmentStatus } from "@prisma/client";

export class AssignmentContextResponseDto {
  @ApiProperty({
    description: "Assignment ID",
    example: "9a9a5f4d-2a3b-4e9c-9f1c-2b3c4d5e6f7a",
  })
  assignmentId: string;

  @ApiProperty({
    description: "Engagement ID",
    example: "4c4dd8a7-2f5a-4f6d-8f7b-1d2c3b4a5e6f",
  })
  engagementId: string;

  @ApiProperty({
    description: "Project ID",
    example: "3d9b37b5-1a5d-4c48-a60f-5f73c2f7f1b6",
  })
  projectId: string;

  @ApiPropertyOptional({
    description: "Project name",
    example: "Platform Modernization",
  })
  projectName?: string;

  @ApiProperty({
    description: "Engagement title",
    example: "Senior Frontend Engineer",
  })
  engagementTitle: string;

  @ApiProperty({
    description: "Assigned member ID",
    example: "123456",
  })
  memberId: string;

  @ApiProperty({
    description: "Assigned member handle",
    example: "jane_doe",
  })
  memberHandle: string;

  @ApiProperty({
    description: "Assignment status",
    enum: AssignmentStatus,
    example: AssignmentStatus.ASSIGNED,
  })
  status: AssignmentStatus;

  @ApiPropertyOptional({
    description: "Calculated assignment rate per week",
    example: "3020",
  })
  agreementRate?: string | null;

  @ApiPropertyOptional({
    description: "Assignment rate per hour in USD",
    example: "75.5",
  })
  ratePerHour?: string | null;

  @ApiPropertyOptional({
    description: "Assignment standard hours per week",
    example: 37.5,
  })
  standardHoursPerWeek?: number | null;

  @ApiPropertyOptional({
    description: "Assignment duration in months",
    example: 3,
  })
  durationMonths?: number | null;

  @ApiPropertyOptional({
    description:
      "Other remarks detailing additional terms the member must agree to",
    example: "Complete onboarding within the first week.",
  })
  otherRemarks?: string | null;

  @ApiPropertyOptional({
    description: "Assignment billing start date",
    example: "2025-01-01T00:00:00.000Z",
  })
  startDate?: Date | null;

  @ApiPropertyOptional({
    description: "Actual assignment end date",
    example: "2025-03-01T00:00:00.000Z",
  })
  endDate?: Date | null;
}
