import { ApiProperty } from "@nestjs/swagger";
import { AssignmentStatus } from "@prisma/client";

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
    description: "Whether the assignment terms were accepted",
    example: true,
  })
  termsAccepted: boolean;

  @ApiProperty({
    description: "Agreed upon rate for the assignment",
    example: "80",
  })
  agreementRate?: string | null;

  @ApiProperty({
    description: "Assignment start date",
    example: "2025-01-01T00:00:00.000Z",
  })
  startDate?: Date | null;

  @ApiProperty({
    description: "Assignment end date",
    example: "2025-03-01T00:00:00.000Z",
  })
  endDate?: Date | null;

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
