import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Request } from "express";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import { ApprovedTimesheetsService } from "./approved-timesheets.service";
import {
  ApprovedTimesheetListResponseDto,
  ApprovedTimesheetQueryDto,
} from "./dto";

/**
 * The approved-but-unpaid timesheets Admins and TMs pay from.
 */
@ApiTags("Timesheets")
@Controller("timesheets/approved")
@UseGuards(PermissionsGuard)
@ApiBearerAuth()
export class ApprovedTimesheetsController {
  constructor(
    private readonly approvedTimesheetsService: ApprovedTimesheetsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: "List approved, unpaid timesheets",
    description:
      "One row per approval: the unpaid entries one approver approved together on one assignment, \
      with the work period they cover, their hours, the approver, and the approval comment. Paid \
      entries drop off the list. An administrator sees every engagement; a TM sees only engagements \
      on projects they are a member of.",
  })
  @ApiResponse({
    status: 200,
    description: "Paginated approved timesheet list retrieved.",
    type: ApprovedTimesheetListResponseDto,
  })
  @ApiUnauthorizedResponse({ description: "Caller is not authenticated." })
  @ApiForbiddenResponse({
    description: "Caller is neither an administrator nor a talent manager.",
  })
  async findApprovedTimesheets(
    @Query() query: ApprovedTimesheetQueryDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<ApprovedTimesheetListResponseDto> {
    return this.approvedTimesheetsService.findApprovedTimesheets(
      query,
      req.authUser,
      req.headers?.authorization,
    );
  }
}
