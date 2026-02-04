import { ApiProperty } from "@nestjs/swagger";

export class GenerateFeedbackLinkResponseDto {
  @ApiProperty({
    description: "Feedback URL for anonymous submission",
    example: "http://localhost:3001/feedback/anonymous/abc123token",
  })
  feedbackUrl: string;

  @ApiProperty({
    description: "Expiration timestamp for the feedback link",
    example: "2025-01-31T00:00:00.000Z",
  })
  expiresAt: Date;

  @ApiProperty({
    description: "Customer email address tied to the feedback link",
    example: "customer@example.com",
  })
  customerEmail: string;
}
