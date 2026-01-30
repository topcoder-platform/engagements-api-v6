import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IsNotWhitespace } from "../../common/validation.util";

export class CreateMemberExperienceDto {
  @ApiProperty({
    description: "Member experience text (markdown supported)",
    example:
      "## Key Responsibilities\n\n- Developed REST APIs\n- Collaborated with design team",
  })
  @IsString()
  @IsNotEmpty()
  @IsNotWhitespace()
  experienceText: string;
}
