import {
  ApiHideProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { HasDurationIfProvided } from "../../common/validation.util";
import { CreateEngagementDto } from "./create-engagement.dto";

export class UpdateEngagementDto extends PartialType(
  OmitType(CreateEngagementDto, ["durationValidation"] as const),
) {
  @ApiPropertyOptional({
    description:
      "Assigned member ID. For private engagements only. Upserts an assignment record (creates if new, updates if existing). Add multiple members with repeated requests.",
    example: "123456",
  })
  @IsOptional()
  @IsString()
  assignedMemberId?: string;

  @ApiPropertyOptional({
    description:
      "Assigned member handle. For private engagements only. Upserts an assignment record (creates if new, updates if existing). Add multiple members with repeated requests.",
    example: "jane_doe",
  })
  @IsOptional()
  @IsString()
  assignedMemberHandle?: string;

  @ApiHideProperty()
  @HasDurationIfProvided()
  durationValidation?: boolean;
}
