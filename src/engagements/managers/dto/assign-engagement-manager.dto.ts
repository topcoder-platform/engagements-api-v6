import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class AssignEngagementManagerDto {
  @ApiProperty({
    description:
      "Topcoder handle of the member to grant timesheet approval authority on this engagement.",
    example: "maryj",
  })
  @IsString()
  @IsNotEmpty({ message: "handle is required." })
  @MaxLength(100)
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  handle: string;
}
