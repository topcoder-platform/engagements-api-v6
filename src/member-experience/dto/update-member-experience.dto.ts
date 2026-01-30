import { PartialType } from "@nestjs/swagger";
import { CreateMemberExperienceDto } from "./create-member-experience.dto";

export class UpdateMemberExperienceDto extends PartialType(
  CreateMemberExperienceDto,
) {}
