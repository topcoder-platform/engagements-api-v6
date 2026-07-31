import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  AssignmentSource,
  AssignmentStatus,
  PaymentCycle,
} from "@prisma/client";

export class AssignmentResponseDto {
  @ApiProperty({
    description: "Assignment ID",
    example: "9a9a5f4d-2a3b-4e9c-9f1c-2b3c4d5e6f7a",
  })
  id: string;

  @ApiProperty({
    description: "Engagement ID",
    example: "4c4dd8a7-2f5a-4f6d-8f7b-1d2c3b4a5e6f",
  })
  engagementId: string;

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
    example: AssignmentStatus.SELECTED,
  })
  status: AssignmentStatus;

  @ApiProperty({
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
    description: "Assignment payment cycle",
    enum: PaymentCycle,
    example: PaymentCycle.WEEKLY,
  })
  paymentCycle?: PaymentCycle | null;

  @ApiPropertyOptional({
    description: "Assignment standard hours per day",
    example: 7.5,
  })
  standardHoursPerDay?: number | null;

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

  @ApiProperty({
    description: "Assignment billing start date",
    example: "2025-01-01T00:00:00.000Z",
  })
  startDate?: Date | null;

  @ApiProperty({
    description: "Actual assignment end date",
    example: "2025-03-01T00:00:00.000Z",
  })
  endDate?: Date | null;

  @ApiPropertyOptional({
    description: "Wipro ID end date",
    example: "2026-12-31T12:00:00.000Z",
  })
  wiproIdEndDate?: Date | null;

  @ApiPropertyOptional({
    description: "Candidate Wipro ID",
    example: "WIPRO-12345",
  })
  candidateWiproId?: string | null;

  @ApiPropertyOptional({
    description: "Assignment candidate source",
    enum: AssignmentSource,
    example: AssignmentSource.DIRECT,
  })
  source?: AssignmentSource | null;

  @ApiProperty({
    description: "Reason for terminating the assignment",
    example: "Client request to end engagement early.",
  })
  terminationReason?: string | null;

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
}
