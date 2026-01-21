import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AnonymousFeedbackResponseDto {
  @ApiProperty({
    description: "Assigned member handle",
    example: "jane_doe",
  })
  memberHandle: string;

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
}
