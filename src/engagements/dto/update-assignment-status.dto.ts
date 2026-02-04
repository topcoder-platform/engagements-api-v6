import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AssignmentStatus } from "@prisma/client";
import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateAssignmentStatusDto {
  @ApiProperty({
    description: "Assignment status",
    enum: AssignmentStatus,
    example: AssignmentStatus.TERMINATED,
  })
  @IsEnum(AssignmentStatus)
  status: AssignmentStatus;

  @ApiPropertyOptional({
    description:
      "Reason for terminating the assignment (when status is TERMINATED)",
    example: "Client request to end engagement early.",
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  terminationReason?: string;

  @ApiPropertyOptional({
    description:
      "Other remarks detailing additional terms the member must agree to",
    example: "Complete onboarding within the first week.",
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  otherRemarks?: string;
}
