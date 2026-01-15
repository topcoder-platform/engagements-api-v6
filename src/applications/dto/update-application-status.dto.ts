import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { ApplicationStatus } from "@prisma/client";

export class UpdateApplicationStatusDto {
  @ApiProperty({
    description: "Application status",
    enum: ApplicationStatus,
    example: ApplicationStatus.UNDER_REVIEW,
    required: true,
  })
  @IsNotEmpty({ message: "Status is required" })
  @IsEnum(ApplicationStatus, { message: "Invalid status value" })
  status: ApplicationStatus;
}
