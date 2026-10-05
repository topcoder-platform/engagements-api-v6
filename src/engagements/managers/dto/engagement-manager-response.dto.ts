import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class EngagementManagerResponseDto {
  @ApiProperty({
    description: "Manager's Topcoder user id",
    example: "2002",
  })
  userId: string;

  @ApiProperty({
    description: "Manager's Topcoder handle",
    example: "maryj",
  })
  handle: string;

  @ApiPropertyOptional({
    description: "Manager's display name, when the member profile exposes one",
    example: "Mary Jones",
    nullable: true,
  })
  name: string | null;
}
