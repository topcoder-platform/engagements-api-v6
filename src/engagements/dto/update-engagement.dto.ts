import { ApiHideProperty, OmitType, PartialType } from "@nestjs/swagger";
import { HasDurationIfProvided } from "../../common/validation.util";
import { CreateEngagementDto } from "./create-engagement.dto";

export class UpdateEngagementDto extends PartialType(
  OmitType(CreateEngagementDto, ["durationValidation"] as const),
) {
  @ApiHideProperty()
  @HasDurationIfProvided()
  durationValidation?: boolean;
}
