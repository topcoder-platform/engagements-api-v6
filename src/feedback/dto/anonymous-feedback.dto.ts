import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateFeedbackDto } from "./create-feedback.dto";

export class AnonymousFeedbackDto extends CreateFeedbackDto {
  @ApiProperty({
    description: "Secret token provided in the feedback link",
    example: "abc123token",
  })
  @IsString()
  @IsNotEmpty()
  secretToken: string;
}
