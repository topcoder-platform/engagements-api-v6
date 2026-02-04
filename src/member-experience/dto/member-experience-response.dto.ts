import { ApiProperty } from "@nestjs/swagger";

export class MemberExperienceResponseDto {
  @ApiProperty({
    description: "Member experience ID",
    example: "a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
  })
  id: string;

  @ApiProperty({
    description: "Engagement assignment ID",
    example: "9e3b5d41-5e5b-4f0a-9d7d-1b2c3d4e5f6a",
  })
  engagementAssignmentId: string;

  @ApiProperty({
    description: "Member experience text (markdown)",
    example: "## Key Responsibilities\n\n- Developed REST APIs",
  })
  experienceText: string;

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
