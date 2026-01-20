import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { EngagementStatus, Role, Workload } from "@prisma/client";
import { Transform } from "class-transformer";
import { AssignmentResponseDto } from "./assignment-response.dto";

export class EngagementResponseDto {
  @ApiProperty({
    description: "Engagement ID",
    example: "4c4dd8a7-2f5a-4f6d-8f7b-1d2c3b4a5e6f",
  })
  id: string;

  @ApiProperty({
    description: "Project ID",
    example: "3d9b37b5-1a5d-4c48-a60f-5f73c2f7f1b6",
  })
  projectId: string;

  @ApiProperty({
    description: "Engagement title",
    example: "Senior Frontend Engineer",
  })
  title: string;

  @ApiProperty({
    description: "Engagement description",
    example: "Build a new hiring portal for enterprise clients.",
  })
  description: string;

  @ApiPropertyOptional({
    description: "Duration start date",
    example: "2025-01-01T00:00:00.000Z",
  })
  durationStartDate?: Date;

  @ApiPropertyOptional({
    description: "Duration end date",
    example: "2025-03-01T00:00:00.000Z",
  })
  durationEndDate?: Date;

  @ApiPropertyOptional({
    description: "Duration in weeks",
    example: 8,
  })
  durationWeeks?: number;

  @ApiPropertyOptional({
    description: "Duration in months",
    example: 2,
  })
  durationMonths?: number;

  @ApiProperty({
    description: "Accepted time zones",
    example: ["UTC", "America/New_York"],
  })
  timeZones: string[];

  @ApiProperty({
    description: "Accepted countries",
    example: ["US", "CA"],
  })
  countries: string[];

  @ApiProperty({
    description: "Required skill IDs",
    example: ["c1b3ac2c-5c8b-4d58-9c7c-1f50b75f0f0f"],
  })
  requiredSkills: string[];

  @ApiProperty({
    description: "Application deadline",
    example: "2025-02-15T00:00:00.000Z",
  })
  applicationDeadline: Date;

  @ApiProperty({
    description: "Engagement status",
    enum: EngagementStatus,
    example: EngagementStatus.OPEN,
  })
  status: EngagementStatus;

  @ApiProperty({
    description: "Created timestamp",
    example: "2025-01-01T12:00:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Created by user ID",
    example: "123456",
  })
  createdBy: string;

  @ApiPropertyOptional({
    description: "Created by user email",
    example: "jane_doe@example.com",
  })
  createdByEmail?: string | null;

  @ApiProperty({
    description: "Updated timestamp",
    example: "2025-01-10T12:00:00.000Z",
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: "Updated by user ID",
    example: "123456",
  })
  updatedBy?: string;

  @ApiPropertyOptional({
    description: "Deprecated: first assigned member ID (use assignments).",
    example: "123456",
    deprecated: true,
  })
  assignedMemberId?: string;

  @ApiPropertyOptional({
    description: "Deprecated: first assigned member handle (use assignments).",
    example: "jane_doe",
    deprecated: true,
  })
  assignedMemberHandle?: string;

  @ApiPropertyOptional({
    description: "Assignment records for this engagement (canonical collection)",
    type: AssignmentResponseDto,
    isArray: true,
    example: [
      {
        id: "9a9a5f4d-2a3b-4e9c-9f1c-2b3c4d5e6f7a",
        engagementId: "4c4dd8a7-2f5a-4f6d-8f7b-1d2c3b4a5e6f",
        memberId: "123456",
        memberHandle: "jane_doe",
        createdAt: "2025-01-01T12:00:00.000Z",
        updatedAt: "2025-01-10T12:00:00.000Z",
      },
    ],
  })
  assignments?: AssignmentResponseDto[];

  @ApiProperty({
    description: "Whether the engagement is private",
    example: false,
  })
  isPrivate: boolean;

  @ApiPropertyOptional({
    description: "Number of members required",
    example: 3,
  })
  requiredMemberCount?: number;

  @ApiPropertyOptional({
    description:
      "Deprecated: array of assigned member IDs derived from assignments (use assignments).",
    example: ["123456", "789012"],
    deprecated: true,
  })
  assignedMembers?: string[];

  @ApiPropertyOptional({
    description:
      "Deprecated: array of assigned member handles derived from assignments (use assignments).",
    example: ["john_doe", "jane_smith"],
    deprecated: true,
  })
  assignedMemberHandles?: string[];

  @ApiPropertyOptional({
    description: "Role for the engagement",
    enum: Role,
    example: Role.SOFTWARE_DEVELOPER,
  })
  @Transform(({ value }) => value?.toString())
  role?: Role;

  @ApiPropertyOptional({
    description: "Workload for the engagement",
    enum: Workload,
    example: Workload.FULL_TIME,
  })
  @Transform(({ value }) => value?.toString())
  workload?: Workload;

  @ApiPropertyOptional({
    description: "Compensation range",
    example: "$600-$700 USD",
  })
  compensationRange?: string;

  @ApiPropertyOptional({
    description: "Number of applications for the engagement",
    example: 12,
  })
  applicationsCount?: number;
}
