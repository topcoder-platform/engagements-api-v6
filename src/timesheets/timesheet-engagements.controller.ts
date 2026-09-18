import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Request } from "express";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import { PaginatedResponse } from "../engagements/dto";
import { TimesheetEngagementQueryDto, TimesheetEngagementRowDto } from "./dto";
import { TimesheetsService } from "./timesheets.service";

/**
 * The landing list behind the manager and administrator timesheet views.
 */
@ApiTags("Timesheets")
@Controller("timesheets/engagements")
@UseGuards(PermissionsGuard)
@ApiBearerAuth()
export class TimesheetEngagementsController {
  constructor(private readonly timesheetsService: TimesheetsService) {}

  @Get()
  @ApiOperation({
    summary: "List timesheets the caller may act on",
    description:
      "One row per (engagement, assignee), so an engagement with three assignees produces three rows.\
      A manager sees only engagements where they hold live approval authority; an administrator sees \
      every engagement eligible for timesheet management, meaning an active assignment or one that \
      already has entries. Each row carries a rolled-up status: Pending Approval when the assignee \
      has any submitted entry, otherwise Approved. The title, assignee, manager, status, and \
      date-range filters are for the administrator view; a manager caller is already \
      restricted to their own engagements.",
  })
  @ApiResponse({
    status: 200,
    description: "Paginated timesheet list retrieved.",
    type: TimesheetEngagementRowDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description:
      "Invalid date range: malformed dates, inverted range, or a span over 31 days.",
  })
  @ApiUnauthorizedResponse({ description: "Caller is not authenticated." })
  @ApiForbiddenResponse({
    description: "Caller has no user id and is not an administrator.",
  })
  async findEngagements(
    @Query() query: TimesheetEngagementQueryDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<PaginatedResponse<TimesheetEngagementRowDto>> {
    return this.timesheetsService.findEngagements(query, req.authUser);
  }
}
