import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

const trim = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim() : value;

export class AssignEngagementManagerDto {
  @ApiProperty({
    description:
      "Topcoder user id of the member to grant timesheet approval authority on this engagement. " +
      "This is the authoritative field: approval authority is keyed on the user id, not the handle.",
    example: "2002",
  })
  @IsString()
  @IsNotEmpty({ message: "userId is required." })
  @MaxLength(80)
  @Transform(trim)
  userId: string;

  @ApiPropertyOptional({
    description:
      "Manager's Topcoder handle, stored for display. Callers that already resolved the member - " +
      "the portal and the Work App both pick from a member search - should send it, which saves a " +
      "member-API round trip. When omitted it is resolved from the user id.",
    example: "maryj",
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform(trim)
  handle?: string;

  @ApiPropertyOptional({
    description: "Manager's display name, stored for display only.",
    example: "Mary Jones",
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Transform(trim)
  name?: string;
}
