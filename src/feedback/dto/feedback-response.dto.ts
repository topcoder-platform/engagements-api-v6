import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { EngagementResponseDto } from "../../engagements/dto";

export class FeedbackResponseDto {
  @ApiProperty({
    description: "Feedback ID",
    example: "f7d6c084-2b9f-4d4f-8d4b-3f9b47dbfbe9",
  })
  id: string;

  @ApiProperty({
    description: "Engagement assignment ID",
    example: "9e3b5d41-5e5b-4f0a-9d7d-1b2c3d4e5f6a",
  })
  engagementAssignmentId: string;

  @ApiProperty({
    description: "Feedback text",
    example: "Great collaboration and clear requirements.",
  })
  feedbackText: string;

  @ApiPropertyOptional({
    description: "Rating from 1 to 5",
    example: 4,
  })
  rating?: number | null;

  @ApiPropertyOptional({
    description: "Member ID that submitted feedback",
    example: "123456",
  })
  givenByMemberId?: string | null;

  @ApiPropertyOptional({
    description: "Handle that submitted feedback",
    example: "jane_doe",
  })
  givenByHandle?: string | null;

  @ApiPropertyOptional({
    description: "Email that submitted feedback",
    example: "member@example.com",
  })
  givenByEmail?: string | null;

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
    description: "Engagement details",
    type: EngagementResponseDto,
  })
  engagement?: EngagementResponseDto;
}
