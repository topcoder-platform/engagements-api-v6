import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Request } from "express";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import {
  PendingApprovalTimesheetListResponseDto,
  PendingApprovalTimesheetQueryDto,
  SendPendingApprovalRemindersDto,
  SendPendingApprovalRemindersResponseDto,
} from "./dto";
import { PendingApprovalTimesheetsService } from "./pending-approval-timesheets.service";

/**
 * The submitted-but-unapproved timesheets administrators chase managers about.
 */
@ApiTags("Timesheets")
@Controller("timesheets/pending-approval")
@UseGuards(PermissionsGuard)
@ApiBearerAuth()
export class PendingApprovalTimesheetsController {
  constructor(
    private readonly pendingApprovalTimesheetsService: PendingApprovalTimesheetsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: "List submitted timesheets awaiting approval",
    description:
      "One row per submission: the entries a member submitted together on one assignment that are \
      not yet approved, with the work period they cover, when they were submitted, and the \
      engagement's current managers. Entries leave the list once approved or sent back to draft. \
      Administrators only.",
  })
  @ApiResponse({
    status: 200,
    description: "Paginated pending approval list retrieved.",
    type: PendingApprovalTimesheetListResponseDto,
  })
  @ApiUnauthorizedResponse({ description: "Caller is not authenticated." })
  @ApiForbiddenResponse({ description: "Caller is not an administrator." })
  async findPendingApprovals(
    @Query() query: PendingApprovalTimesheetQueryDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<PendingApprovalTimesheetListResponseDto> {
    return this.pendingApprovalTimesheetsService.findPendingApprovals(
      query,
      req.authUser,
    );
  }

  @Post("reminders")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Remind managers to approve submitted timesheets",
    description:
      "Emails every current manager of the given assignments' engagements, once each, asking them \
      to review the timesheets awaiting their approval. Assignments with nothing submitted are \
      skipped. Administrators only.",
  })
  @ApiResponse({
    status: 200,
    description: "Reminders processed; the body says who was reminded.",
    type: SendPendingApprovalRemindersResponseDto,
  })
  @ApiUnauthorizedResponse({ description: "Caller is not authenticated." })
  @ApiForbiddenResponse({ description: "Caller is not an administrator." })
  @ApiServiceUnavailableResponse({
    description: "The reminder email template is not configured.",
  })
  async sendReminders(
    @Body() body: SendPendingApprovalRemindersDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<SendPendingApprovalRemindersResponseDto> {
    return this.pendingApprovalTimesheetsService.sendReminders(
      body,
      req.authUser,
    );
  }
}
