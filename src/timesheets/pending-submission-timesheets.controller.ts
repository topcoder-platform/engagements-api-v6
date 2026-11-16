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
  ApiBadRequestResponse,
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
  PendingSubmissionTimesheetListResponseDto,
  PendingSubmissionTimesheetQueryDto,
  SendPendingSubmissionRemindersDto,
  SendPendingSubmissionRemindersResponseDto,
} from "./dto";
import { PendingSubmissionTimesheetsService } from "./pending-submission-timesheets.service";

/**
 * The timesheets members have not submitted yet, which administrators chase them about.
 */
@ApiTags("Timesheets")
@Controller("timesheets/pending-submission")
@UseGuards(PermissionsGuard)
@ApiBearerAuth()
export class PendingSubmissionTimesheetsController {
  constructor(
    private readonly pendingSubmissionTimesheetsService: PendingSubmissionTimesheetsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: "List assignments with no timesheet submitted for a work period",
    description:
      "One row per active assignment that overlaps the work period and has no submitted or \
      approved entry dated inside it, with the engagement's current managers. The period is \
      required and at most 31 days. Administrators only.",
  })
  @ApiResponse({
    status: 200,
    description: "Paginated pending submission list retrieved.",
    type: PendingSubmissionTimesheetListResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      "The work period is missing, inverted, or longer than 31 days.",
  })
  @ApiUnauthorizedResponse({ description: "Caller is not authenticated." })
  @ApiForbiddenResponse({ description: "Caller is not an administrator." })
  async findPendingSubmissions(
    @Query() query: PendingSubmissionTimesheetQueryDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<PendingSubmissionTimesheetListResponseDto> {
    return this.pendingSubmissionTimesheetsService.findPendingSubmissions(
      query,
      req.authUser,
    );
  }

  @Post("reminders")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Remind members to submit their timesheets",
    description:
      "Emails the member of each given assignment - their Topcoder email and, when the assignment \
      holds one, their Wipro email - to submit their timesheet for the work period. Assignments no \
      longer pending for the period are skipped. Administrators only.",
  })
  @ApiResponse({
    status: 200,
    description: "Reminders processed; the body says who was reminded.",
    type: SendPendingSubmissionRemindersResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      "The work period is missing, inverted, or longer than 31 days.",
  })
  @ApiUnauthorizedResponse({ description: "Caller is not authenticated." })
  @ApiForbiddenResponse({ description: "Caller is not an administrator." })
  @ApiServiceUnavailableResponse({
    description: "The reminder email template is not configured.",
  })
  async sendReminders(
    @Body() body: SendPendingSubmissionRemindersDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<SendPendingSubmissionRemindersResponseDto> {
    return this.pendingSubmissionTimesheetsService.sendReminders(
      body,
      req.authUser,
    );
  }
}
