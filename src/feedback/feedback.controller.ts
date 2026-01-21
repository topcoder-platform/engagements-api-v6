import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Request } from "express";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import { Scopes as ScopesDecorator } from "../auth/decorators/scopes.decorator";
import { Scopes as AppScopes, PrivilegedUserRoles } from "../app-constants";
import { PaginatedResponse } from "../engagements/dto";
import { getUserRoles } from "../common/user.util";
import {
  AnonymousFeedbackDto,
  AnonymousFeedbackResponseDto,
  CreateFeedbackDto,
  FeedbackQueryDto,
  FeedbackResponseDto,
  GenerateFeedbackLinkDto,
  GenerateFeedbackLinkResponseDto,
} from "./dto";
import { FeedbackService } from "./feedback.service";

@ApiTags("Feedback")
@Controller()
export class FeedbackController {
  private readonly privilegedRoles = new Set(
    PrivilegedUserRoles.map((role) => role.toLowerCase()),
  );

  constructor(private readonly feedbackService: FeedbackService) {}

  @Get("feedback")
  @ApiOperation({
    summary: "List feedback",
    description: "Returns a paginated list of feedback entries.",
  })
  @ApiResponse({
    status: 200,
    description: "Feedback retrieved.",
  })
  async findAll(
    @Query() query: FeedbackQueryDto,
  ): Promise<PaginatedResponse<FeedbackResponseDto>> {
    return this.feedbackService.findAll(query);
  }

  @Get("feedback/:id")
  @ApiOperation({
    summary: "Get feedback by ID",
    description: "Retrieves a single feedback entry by ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Feedback retrieved.",
    type: FeedbackResponseDto,
  })
  async findOne(@Param("id") id: string): Promise<FeedbackResponseDto> {
    return this.feedbackService.findOne(id);
  }

  @Post(":engagementId/assignments/:assignmentId/feedback/generate-link")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteFeedback)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Generate anonymous feedback link",
    description:
      "Generates a secret token and feedback URL for collecting anonymous customer feedback per assignment.",
  })
  @ApiResponse({
    status: 201,
    description: "Feedback link generated.",
    type: GenerateFeedbackLinkResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      "Invalid request payload or engagement is not assigned to a member.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires admin/PM/Task Manager/Talent Manager role or write:feedback scope.",
  })
  @ApiNotFoundResponse({
    description: "Engagement not found.",
  })
  async generateFeedbackLink(
    @Param("engagementId") engagementId: string,
    @Param("assignmentId") assignmentId: string,
    @Body() generateDto: GenerateFeedbackLinkDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<GenerateFeedbackLinkResponseDto> {
    this.assertAdminOrPm(req.authUser);

    const { secretToken, expiresAt, customerEmail } =
      await this.feedbackService.generateFeedbackLink(
        engagementId,
        assignmentId,
        generateDto.customerEmail,
        generateDto.expirationDays,
      );

    const baseUrl =
      process.env.PLATFORM_UI_BASE_URL || "http://localhost:3001";
    const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
    const feedbackUrl = `${normalizedBaseUrl}/feedback/anonymous/${secretToken}`;

    return {
      feedbackUrl,
      expiresAt,
      customerEmail,
    };
  }

  @Post(":engagementId/assignments/:assignmentId/feedback")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteFeedback)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create feedback for an assignment",
    description:
      "Creates feedback for an assignment. Requires admin, PM, Task Manager, or Talent Manager role for user tokens, " +
      "or write:feedback scope for M2M clients.",
  })
  @ApiResponse({
    status: 201,
    description: "Feedback created.",
    type: FeedbackResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid request payload.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires admin/PM/Task Manager/Talent Manager role or write:feedback scope.",
  })
  @ApiNotFoundResponse({
    description: "Engagement not found.",
  })
  async create(
    @Param("engagementId") engagementId: string,
    @Param("assignmentId") assignmentId: string,
    @Body() createDto: CreateFeedbackDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<FeedbackResponseDto> {
    this.assertAdminOrPm(req.authUser);
    const userId = req.authUser?.userId as string;
    const handle = req.authUser?.handle as string;
    return this.feedbackService.createAuthenticated(
      engagementId,
      assignmentId,
      createDto,
      userId,
      handle,
    );
  }

  @Post("feedback/anonymous")
  @ApiOperation({
    summary: "Submit anonymous feedback",
    description:
      "Public endpoint for customers to submit feedback using a secret token.",
  })
  @ApiResponse({
    status: 201,
    description: "Feedback submitted.",
    type: FeedbackResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid or expired feedback link.",
  })
  @ApiNotFoundResponse({
    description: "Invalid feedback link.",
  })
  async submitAnonymousFeedback(
    @Body() anonymousDto: AnonymousFeedbackDto,
  ): Promise<FeedbackResponseDto> {
    return this.feedbackService.submitAnonymousFeedback(
      anonymousDto.secretToken,
      anonymousDto,
    );
  }

  @Get("feedback/anonymous/:secretToken")
  @ApiOperation({
    summary: "Get anonymous feedback details",
    description:
      "Public endpoint for customers to view anonymous feedback details using a secret token.",
  })
  @ApiResponse({
    status: 200,
    description: "Anonymous feedback retrieved.",
    type: AnonymousFeedbackResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid or expired feedback link.",
  })
  @ApiNotFoundResponse({
    description: "Invalid feedback link.",
  })
  async getAnonymousFeedback(
    @Param("secretToken") secretToken: string,
  ): Promise<AnonymousFeedbackResponseDto> {
    return this.feedbackService.getAnonymousFeedback(secretToken);
  }

  @Get(":engagementId/assignments/:assignmentId/feedback")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadFeedback)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List feedback for an assignment",
    description: "Lists all feedback entries for a specific assignment.",
  })
  @ApiResponse({
    status: 200,
    description: "Feedback retrieved.",
    type: FeedbackResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires admin/PM/Task Manager/Talent Manager role for user tokens or read:feedback scope for M2M clients.",
  })
  async findByAssignment(
    @Param("engagementId") engagementId: string,
    @Param("assignmentId") assignmentId: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<FeedbackResponseDto[]> {
    this.assertAdminOrPm(req.authUser);
    return this.feedbackService.findByAssignment(
      engagementId,
      assignmentId,
    );
  }

  private assertAdminOrPm(authUser?: Record<string, any>) {
    if (authUser?.isMachine) {
      return;
    }

    const roles = getUserRoles(authUser);
    const isPrivileged = roles.some((role) =>
      this.privilegedRoles.has(role?.toLowerCase()),
    );

    if (!isPrivileged) {
      throw new ForbiddenException(
        "You do not have permission to perform this action.",
      );
    }
  }
}
