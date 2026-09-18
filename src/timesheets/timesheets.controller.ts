import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Request } from "express";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import {
  ApproveTimesheetEntriesDto,
  ApproveTimesheetEntriesResultDto,
  ReopenTimesheetEntriesDto,
  SubmitTimesheetEntriesDto,
  TimesheetQueryDto,
  TimesheetViewResponseDto,
  UpsertTimesheetEntriesDto,
} from "./dto";
import { TimesheetsService } from "./timesheets.service";

/**
 * One assignment's timesheet: read, write, submit, approve, reopen.
 *
 * Every endpoint resolves the caller's relationship to the assignment before touching anything, and
 * returns it as `viewerRole`. A caller with no relationship gets a `404` rather than a `403`, so
 * assignment ids cannot be enumerated by probing. None of these endpoints declares a scope: the guard
 * would then refuse every non-administrator human, and members and managers are exactly who these are
 * for. Authorization is resolved per assignment in the service instead.
 */
@ApiTags("Timesheets")
@Controller("engagements/:engagementId/assignments/:assignmentId/timesheets")
@UseGuards(PermissionsGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: "Caller is not authenticated." })
@ApiNotFoundResponse({
  description:
    "The assignment does not exist, or the caller has no relationship to it. The two are deliberately indistinguishable.",
})
export class TimesheetsController {
  constructor(private readonly timesheetsService: TimesheetsService) {}

  @Get()
  @ApiOperation({
    summary: "Read an assignment's timesheet",
    description:
      "Returns the timesheet entries plus the header every view displays: engagement title, standard hours per day, the assignee's name and handle, and every manager authorized to approve. Filter by date range for the member view, or by status for the manager views. Approval details on an approved entry are visible to any assigned manager, not only the approver.",
  })
  @ApiResponse({
    status: 200,
    description: "Timesheet retrieved.",
    type: TimesheetViewResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      "Invalid date range: malformed dates, inverted range, or a span over 31 days.",
  })
  async findTimesheet(
    @Param("engagementId") engagementId: string,
    @Param("assignmentId") assignmentId: string,
    @Query() query: TimesheetQueryDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<TimesheetViewResponseDto> {
    return this.timesheetsService.findTimesheet(
      engagementId,
      assignmentId,
      query,
      req.authUser,
    );
  }

  @Put("entries")
  @ApiOperation({
    summary: "Create or update timesheet entries",
    description:
      "Bulk upsert keyed on (assignment, work date). Only the days actually filled in are sent - there is no endpoint that pre-creates empty rows for a date range, so a row existing means someone entered hours for that day. The resulting status is derived server-side by comparing stored values with incoming ones; a status sent by the client is ignored. Editing a submitted entry's hours or remarks returns that entry to draft and leaves its siblings alone. Approved entries are read-only unless an administrator supplies an override reason.",
  })
  @ApiResponse({
    status: 200,
    description: "Entries saved; the refreshed timesheet is returned.",
    type: TimesheetViewResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      "Invalid hours (non-numeric, negative, or above 24), a duplicate work date, a range over 31 days, or an administrator change to an approved entry with no override reason.",
  })
  @ApiForbiddenResponse({
    description:
      "Managers can approve entries but cannot change hours or remarks.",
  })
  @ApiConflictResponse({
    description: "A member or manager tried to change an approved entry.",
  })
  async upsertEntries(
    @Param("engagementId") engagementId: string,
    @Param("assignmentId") assignmentId: string,
    @Body() body: UpsertTimesheetEntriesDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<TimesheetViewResponseDto> {
    return this.timesheetsService.upsertEntries(
      engagementId,
      assignmentId,
      body,
      req.authUser,
    );
  }

  @Post("submit")
  @ApiOperation({
    summary: "Submit timesheet entries for approval",
    description:
      "Moves draft entries to submitted and records who submitted them and when. Atomic: an entry that is missing hours or is no longer a draft fails the whole call with per-entry detail, rather than half-submitting a week. An administrator may submit on a member's behalf with an override reason.",
  })
  @ApiResponse({
    status: 200,
    description: "Entries submitted; the refreshed timesheet is returned.",
    type: TimesheetViewResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      "One or more entries cannot be submitted (wrong status or zero hours), or an administrator submitted on a member's behalf without an override reason. Nothing is submitted.",
  })
  @ApiForbiddenResponse({
    description: "Managers cannot submit on a member's behalf.",
  })
  async submitEntries(
    @Param("engagementId") engagementId: string,
    @Param("assignmentId") assignmentId: string,
    @Body() body: SubmitTimesheetEntriesDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<TimesheetViewResponseDto> {
    return this.timesheetsService.submitEntries(
      engagementId,
      assignmentId,
      body,
      req.authUser,
    );
  }

  @Post("approve")
  @ApiOperation({
    summary: "Approve submitted timesheet entries",
    description:
      "Approves the named entries, recording the approving manager, the timestamp, and a required comment. The update is guarded on the entries still being submitted, which is what makes multi-manager approval safe: two managers approving the same selection at once approve every entry exactly once, and whatever the guard skipped comes back in the response with the handle of whoever got there first. Callable by an assigned manager, or by an administrator with an override reason.",
  })
  @ApiResponse({
    status: 200,
    description:
      "Approval processed. Check `skipped` for entries another manager had already taken.",
    type: ApproveTimesheetEntriesResultDto,
  })
  @ApiBadRequestResponse({
    description:
      "Missing approval comment, or an administrator approving on a manager's behalf without an override reason.",
  })
  @ApiForbiddenResponse({
    description: "The assignee cannot approve their own timesheet.",
  })
  async approveEntries(
    @Param("engagementId") engagementId: string,
    @Param("assignmentId") assignmentId: string,
    @Body() body: ApproveTimesheetEntriesDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<ApproveTimesheetEntriesResultDto> {
    return this.timesheetsService.approveEntries(
      engagementId,
      assignmentId,
      body,
      req.authUser,
    );
  }

  @Post("reopen")
  @ApiOperation({
    summary: "Reopen approved timesheet entries",
    description:
      "Administrators only, and an override reason is always required: reopening overrides a manager's approval. The entries return to draft with `reopenedAt` set and the approval fields cleared, so the fact that they were once approved survives in `reopenedAt` and the audit trail without the state machine growing a fourth status.",
  })
  @ApiResponse({
    status: 200,
    description: "Entries reopened; the refreshed timesheet is returned.",
    type: TimesheetViewResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      "Missing override reason, or one of the entries is not approved.",
  })
  @ApiForbiddenResponse({
    description: "Only an administrator can reopen approved entries.",
  })
  async reopenEntries(
    @Param("engagementId") engagementId: string,
    @Param("assignmentId") assignmentId: string,
    @Body() body: ReopenTimesheetEntriesDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<TimesheetViewResponseDto> {
    return this.timesheetsService.reopenEntries(
      engagementId,
      assignmentId,
      body,
      req.authUser,
    );
  }
}
