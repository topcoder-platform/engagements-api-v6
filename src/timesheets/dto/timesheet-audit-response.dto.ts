import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TimesheetAuditAction } from "@prisma/client";

export class TimesheetAuditRecordDto {
  @ApiProperty({ description: "Audit record id" })
  id: string;

  @ApiProperty({
    description: "What happened to the entry",
    enum: TimesheetAuditAction,
    example: TimesheetAuditAction.APPROVED,
  })
  action: TimesheetAuditAction;

  @ApiPropertyOptional({
    description:
      "Values the entry held before the change: hours, remarks, and status, plus approval fields " +
      "where relevant. Decimals are exact strings.",
    example: {
      hoursWorked: "8.00",
      remarks: "Sprint planning",
      status: "SUBMITTED",
    },
    nullable: true,
  })
  previousValues: unknown;

  @ApiPropertyOptional({
    description: "Values the entry holds after the change",
    example: {
      hoursWorked: "8.50",
      remarks: "Sprint planning",
      status: "DRAFT",
    },
    nullable: true,
  })
  updatedValues: unknown;

  @ApiProperty({ description: "Who performed the action", example: "3003" })
  actorUserId: string;

  @ApiPropertyOptional({
    description: "Handle of the acting user, when the token carried one",
    example: "adminuser",
    nullable: true,
  })
  actorHandle: string | null;

  @ApiProperty({
    description:
      "Role the actor held: MEMBER, MANAGER, ADMINISTRATOR, or MACHINE",
    example: "ADMINISTRATOR",
  })
  actorRole: string;

  @ApiPropertyOptional({
    description:
      "Approval comment, or the override reason on an administrator action",
    example: "Corrected after payroll query",
    nullable: true,
  })
  comment: string | null;

  @ApiProperty({ description: "When the action happened" })
  createdAt: Date;
}
