import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { ApplicationStatus } from "@prisma/client";
import { CreateApplicationDto } from "./create-application.dto";

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
  @ApiPropertyOptional({
    description: "Application status",
    enum: ApplicationStatus,
    example: ApplicationStatus.UNDER_REVIEW,
  })
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;
}
