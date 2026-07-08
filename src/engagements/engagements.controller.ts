import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiBody,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { Request } from "express";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import { Scopes as ScopesDecorator } from "../auth/decorators/scopes.decorator";
import {
  Scopes as AppScopes,
  PrivilegedUserRoles,
  TalentManagerRoles,
  UserRoles,
} from "../app-constants";
import {
  AssignmentContextResponseDto,
  CreateEngagementDto,
  CreateEngagementDurationDatesDto,
  CreateEngagementDurationMonthsDto,
  CreateEngagementDurationWeeksDto,
  EngagementQueryDto,
  EngagementResponseDto,
  FlexiEngagementDetailDto,
  FlexiEngagementListQueryDto,
  FlexiEngagementListResponseDto,
  FlexiEngagementSummaryDto,
  FlexiMemberDetailDto,
  FlexiMemberHistoryDto,
  FlexiMemberListQueryDto,
  FlexiMemberListResponseDto,
  FlexiMemberSummaryDto,
  PaginatedResponse,
  UpdateAssignmentStatusDto,
  UpdateEngagementDto,
} from "./dto";
import { EngagementsService } from "./engagements.service";
import { Engagement, EngagementStatus } from "@prisma/client";
import { getUserIdentifier, getUserRoles } from "../common/user.util";

@ApiTags("Engagements")
@ApiExtraModels(
  CreateEngagementDto,
  CreateEngagementDurationWeeksDto,
  CreateEngagementDurationMonthsDto,
  CreateEngagementDurationDatesDto,
  FlexiEngagementSummaryDto,
  FlexiEngagementListResponseDto,
  FlexiEngagementDetailDto,
  FlexiMemberSummaryDto,
  FlexiMemberListResponseDto,
  FlexiMemberDetailDto,
  FlexiMemberHistoryDto,
)
@Controller("engagements")
export class EngagementsController {
  private readonly privilegedRoles = new Set(
    PrivilegedUserRoles.map((role) => role.toLowerCase()),
  );
  private readonly includePrivateRoles = new Set(
    [UserRoles.Admin, ...TalentManagerRoles].map((role) => role.toLowerCase()),
  );

  constructor(private readonly engagementsService: EngagementsService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteEngagements, AppScopes.ManageEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create a new engagement",
    description:
      "Creates a new engagement opportunity. Requires admin, PM, Task Manager, or Talent Manager role for user tokens, " +
      "or write:engagements/manage:engagements scope for M2M clients.",
  })
  @ApiBody({
    description:
      "Create engagement payload. Provide durationWeeks, durationMonths, or durationStartDate + durationEndDate.",
    schema: {
      anyOf: [
        {
          $ref: getSchemaPath(CreateEngagementDurationWeeksDto),
        },
        {
          $ref: getSchemaPath(CreateEngagementDurationMonthsDto),
        },
        {
          $ref: getSchemaPath(CreateEngagementDurationDatesDto),
        },
      ],
    },
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: "Engagement created.",
    type: EngagementResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid request payload.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires admin/PM/Task Manager/Talent Manager role or write:engagements/manage:engagements scope.",
  })
  async create(
    @Body() createDto: CreateEngagementDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<Engagement> {
    this.assertAdminOrPm(req.authUser);
    return this.engagementsService.create(createDto, req.authUser ?? {});
  }

  @Get()
  @ApiOperation({
    summary: "List engagements",
    description:
      "Returns a paginated list of engagements. Authentication is optional.",
  })
  @ApiResponse({
    status: 200,
    description: "Paginated engagements retrieved.",
  })
  async findAll(
    @Query() query: EngagementQueryDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<PaginatedResponse<Engagement>> {
    if (query.includePrivate || query.status === EngagementStatus.ON_HOLD) {
      this.assertCanIncludePrivate(req.authUser);
    }
    return this.engagementsService.findAll(query);
  }

  @Get("active")
  @ApiOperation({
    summary: "List active engagements",
    description: "Returns active engagements only. Authentication is optional.",
  })
  @ApiResponse({
    status: 200,
    description: "Active engagements retrieved.",
    type: EngagementResponseDto,
    isArray: true,
  })
  async findAllActive(): Promise<Engagement[]> {
    return this.engagementsService.findAllActive();
  }

  @Get("my-assignments")
  @UseGuards(PermissionsGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List assigned engagements",
    description:
      "Returns active and past engagements assigned to the authenticated user. M2M clients require read:engagements scope.",
  })
  @ApiResponse({
    status: 200,
    description: "Assigned engagements retrieved.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires read:engagements scope for M2M clients.",
  })
  async findMyAssignments(
    @Query() query: EngagementQueryDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<PaginatedResponse<Engagement>> {
    this.assertMachineScope(req.authUser, AppScopes.ReadEngagements);
    return this.engagementsService.findMyAssignments(req.authUser ?? {}, query);
  }

  @Get("assignments/:assignmentId/context")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get assignment context by ID",
    description:
      "Retrieves assignment, engagement, and project details for a single assignment. Requires privileged user access or read:engagements scope.",
  })
  @ApiResponse({
    status: 200,
    description: "Assignment context retrieved.",
    type: AssignmentContextResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires privileged user access or read:engagements scope.",
  })
  @ApiNotFoundResponse({ description: "Engagement assignment not found." })
  async findAssignmentContext(
    @Param("assignmentId") assignmentId: string,
  ): Promise<AssignmentContextResponseDto> {
    return this.engagementsService.findAssignmentContext(assignmentId);
  }

  @Get("flexi-talent/engagements/summary")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get Flexi Talent engagement summary",
    description:
      "Returns Flexi Talent engagement bucket counts. Human callers must be Administrators or Talent Managers. M2M callers require read:engagements.",
  })
  @ApiResponse({
    status: 200,
    description: "Flexi engagement summary retrieved.",
    type: FlexiEngagementSummaryDto,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Requires Administrator or Talent Manager role for humans, or read:engagements scope for M2M callers.",
  })
  /**
   * Returns Flexi Talent engagement summary counts.
   *
   * @param req Authenticated request context used for endpoint-local access
   * enforcement.
   * @returns Engagement total/active/closed counts.
   * @throws UnauthorizedException When authentication is missing.
   * @throws ForbiddenException When the caller is not an allowed Flexi reader.
   */
  async getFlexiEngagementSummary(
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<FlexiEngagementSummaryDto> {
    this.assertFlexiReadAccess(req.authUser);
    return this.engagementsService.getFlexiEngagementSummary();
  }

  @Get("flexi-talent/engagements")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List Flexi Talent engagements",
    description:
      "Returns Flexi Talent engagement rows with flat body pagination. Human callers must be Administrators or Talent Managers. M2M callers require read:engagements.",
  })
  @ApiResponse({
    status: 200,
    description: "Flexi engagement list retrieved.",
    type: FlexiEngagementListResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Requires Administrator or Talent Manager role for humans, or read:engagements scope for M2M callers.",
  })
  /**
   * Lists Flexi Talent engagements with bucket, search, sort, and pagination.
   *
   * @param query Flexi engagement list query parameters.
   * @param req Authenticated request context used for endpoint-local access
   * enforcement.
   * @returns Flat body-paginated engagement list response.
   * @throws UnauthorizedException When authentication is missing.
   * @throws ForbiddenException When the caller is not an allowed Flexi reader.
   */
  async getFlexiEngagementList(
    @Query() query: FlexiEngagementListQueryDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<FlexiEngagementListResponseDto> {
    this.assertFlexiReadAccess(req.authUser);
    return this.engagementsService.getFlexiEngagementList(query);
  }

  @Get("flexi-talent/engagements/:engagementId")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get Flexi Talent engagement detail",
    description:
      "Returns a Flexi Talent engagement detail read model. Human callers must be Administrators or Talent Managers. M2M callers require read:engagements.",
  })
  @ApiResponse({
    status: 200,
    description: "Flexi engagement detail retrieved.",
    type: FlexiEngagementDetailDto,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Requires Administrator or Talent Manager role for humans, or read:engagements scope for M2M callers.",
  })
  @ApiNotFoundResponse({ description: "Engagement not found." })
  /**
   * Gets one Flexi Talent engagement detail payload.
   *
   * @param engagementId Engagement id to fetch.
   * @param req Authenticated request context used for endpoint-local access
   * enforcement.
   * @returns Flexi engagement detail response.
   * @throws UnauthorizedException When authentication is missing.
   * @throws ForbiddenException When the caller is not an allowed Flexi reader.
   */
  async getFlexiEngagementDetail(
    @Param("engagementId") engagementId: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<FlexiEngagementDetailDto> {
    this.assertFlexiReadAccess(req.authUser);
    return this.engagementsService.getFlexiEngagementDetail(engagementId);
  }

  @Get("flexi-talent/members/summary")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get Flexi Talent member summary",
    description:
      "Returns Flexi Talent member bucket counts. Human callers must be Administrators or Talent Managers. M2M callers require read:engagements.",
  })
  @ApiResponse({
    status: 200,
    description: "Flexi member summary retrieved.",
    type: FlexiMemberSummaryDto,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Requires Administrator or Talent Manager role for humans, or read:engagements scope for M2M callers.",
  })
  /**
   * Returns Flexi Talent member summary counts.
   *
   * @param req Authenticated request context used for endpoint-local access
   * enforcement.
   * @returns Member total/assigned/completed counts.
   * @throws UnauthorizedException When authentication is missing.
   * @throws ForbiddenException When the caller is not an allowed Flexi reader.
   */
  async getFlexiMemberSummary(
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<FlexiMemberSummaryDto> {
    this.assertFlexiReadAccess(req.authUser);
    return this.engagementsService.getFlexiMemberSummary();
  }

  @Get("flexi-talent/members")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List Flexi Talent members",
    description:
      "Returns Flexi Talent member rows with flat body pagination. Human callers must be Administrators or Talent Managers. M2M callers require read:engagements.",
  })
  @ApiResponse({
    status: 200,
    description: "Flexi member list retrieved.",
    type: FlexiMemberListResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Requires Administrator or Talent Manager role for humans, or read:engagements scope for M2M callers.",
  })
  /**
   * Lists Flexi Talent members with bucket, search, sort, and pagination.
   *
   * @param query Flexi member list query parameters.
   * @param req Authenticated request context used for endpoint-local access
   * enforcement.
   * @returns Flat body-paginated member list response.
   * @throws UnauthorizedException When authentication is missing.
   * @throws ForbiddenException When the caller is not an allowed Flexi reader.
   */
  async getFlexiMemberList(
    @Query() query: FlexiMemberListQueryDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<FlexiMemberListResponseDto> {
    this.assertFlexiReadAccess(req.authUser);
    return this.engagementsService.getFlexiMemberList(query);
  }

  @Get("flexi-talent/members/:memberId/history")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get Flexi Talent member history",
    description:
      "Returns the full Flexi Talent assignment history for one member. Human callers must be Administrators or Talent Managers. M2M callers require read:engagements.",
  })
  @ApiResponse({
    status: 200,
    description: "Flexi member history retrieved.",
    type: FlexiMemberHistoryDto,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Requires Administrator or Talent Manager role for humans, or read:engagements scope for M2M callers.",
  })
  @ApiNotFoundResponse({ description: "Member assignment history not found." })
  /**
   * Gets the unpaginated Flexi Talent assignment history for one member.
   *
   * @param memberId Member id to fetch.
   * @param req Authenticated request context used for endpoint-local access
   * enforcement.
   * @returns Flexi member history response.
   * @throws UnauthorizedException When authentication is missing.
   * @throws ForbiddenException When the caller is not an allowed Flexi reader.
   */
  async getFlexiMemberHistory(
    @Param("memberId") memberId: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<FlexiMemberHistoryDto> {
    this.assertFlexiReadAccess(req.authUser);
    return this.engagementsService.getFlexiMemberHistory(memberId);
  }

  @Get("flexi-talent/members/:memberId")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get Flexi Talent member detail",
    description:
      "Returns the Flexi Talent right-rail detail for one member. Human callers must be Administrators or Talent Managers. M2M callers require read:engagements.",
  })
  @ApiResponse({
    status: 200,
    description: "Flexi member detail retrieved.",
    type: FlexiMemberDetailDto,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Requires Administrator or Talent Manager role for humans, or read:engagements scope for M2M callers.",
  })
  @ApiNotFoundResponse({ description: "Member assignment history not found." })
  /**
   * Gets the Flexi Talent right-rail detail for one member.
   *
   * @param memberId Member id to fetch.
   * @param req Authenticated request context used for endpoint-local access
   * enforcement.
   * @returns Flexi member detail response.
   * @throws UnauthorizedException When authentication is missing.
   * @throws ForbiddenException When the caller is not an allowed Flexi reader.
   */
  async getFlexiMemberDetail(
    @Param("memberId") memberId: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<FlexiMemberDetailDto> {
    this.assertFlexiReadAccess(req.authUser);
    return this.engagementsService.getFlexiMemberDetail(memberId);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get engagement by ID",
    description:
      "Retrieves a single engagement by ID. Authentication is optional for public engagements. " +
      "Private engagements are limited to privileged users, M2M clients, and assigned members.",
  })
  @ApiResponse({
    status: 200,
    description: "Engagement retrieved.",
    type: EngagementResponseDto,
  })
  @ApiUnauthorizedResponse({
    description:
      "Private engagements require privileged, assigned-member, or M2M authentication.",
  })
  @ApiNotFoundResponse({ description: "Engagement not found." })
  async findOne(
    @Param("id") id: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<Engagement> {
    const canViewAllAssignments = this.canViewAssignmentDetails(req.authUser);
    const viewerId =
      req.authUser && !req.authUser.isMachine
        ? getUserIdentifier(req.authUser)
        : undefined;

    let engagement = await this.engagementsService.findOne(id, {
      includeCreatorEmail: true,
      includeAssignments: canViewAllAssignments,
    });

    if (engagement.isPrivate && !canViewAllAssignments) {
      if (!req.authUser || !viewerId) {
        throw new UnauthorizedException(
          "You are not authorized to access this private engagement.",
        );
      }

      engagement = await this.engagementsService.findOne(id, {
        includeCreatorEmail: true,
        includeAssignments: true,
        assignmentMemberId: viewerId,
      });

      const isAssignedMember = engagement.assignments?.some(
        (assignment) => assignment.memberId === viewerId,
      );
      if (!isAssignedMember) {
        throw new UnauthorizedException(
          "You are not authorized to access this private engagement.",
        );
      }
    }

    return engagement;
  }

  @Put(":id")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteEngagements, AppScopes.ManageEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Update engagement",
    description:
      "Updates an existing engagement. Requires admin, PM, Task Manager, or Talent Manager role for user tokens, " +
      "or write:engagements/manage:engagements scope for M2M clients.",
  })
  @ApiResponse({
    status: 200,
    description: "Engagement updated.",
    type: EngagementResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      "Invalid request payload, or project reassignment is blocked because the current project has a billing account.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires admin/PM/Task Manager/Talent Manager role or write:engagements/manage:engagements scope.",
  })
  @ApiNotFoundResponse({ description: "Engagement not found." })
  async update(
    @Param("id") id: string,
    @Body() updateDto: UpdateEngagementDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<Engagement> {
    this.assertAdminOrPm(req.authUser);
    return this.engagementsService.update(id, updateDto, req.authUser ?? {});
  }

  @Delete(":id/assignments/:assignmentId")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteEngagements, AppScopes.ManageEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Terminate engagement assignment",
    description:
      "Marks an active assignment as TERMINATED while preserving its assignment history. Requires admin, PM, Task Manager, or Talent Manager role for user tokens, " +
      "or write:engagements/manage:engagements scope for M2M clients.",
  })
  @ApiResponse({
    status: 204,
    description: "Engagement assignment terminated.",
  })
  @ApiBadRequestResponse({
    description: "Invalid request payload.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires admin/PM/Task Manager/Talent Manager role or write:engagements/manage:engagements scope.",
  })
  @ApiNotFoundResponse({ description: "Engagement assignment not found." })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAssignment(
    @Param("id") id: string,
    @Param("assignmentId") assignmentId: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<void> {
    this.assertAdminOrPm(req.authUser);
    await this.engagementsService.removeAssignment(id, assignmentId);
  }

  @Patch(":id/assignments/:assignmentId/status")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteEngagements, AppScopes.ManageEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Update engagement assignment status",
    description:
      "Updates the status for an engagement assignment. Requires admin, PM, Task Manager, or Talent Manager role for user tokens, " +
      "or write:engagements/manage:engagements scope for M2M clients.",
  })
  @ApiResponse({
    status: 200,
    description: "Engagement assignment status updated.",
  })
  @ApiBadRequestResponse({
    description: "Invalid request payload.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires admin/PM/Task Manager/Talent Manager role or write:engagements/manage:engagements scope.",
  })
  @ApiNotFoundResponse({ description: "Engagement assignment not found." })
  async updateAssignmentStatus(
    @Param("id") id: string,
    @Param("assignmentId") assignmentId: string,
    @Body() updateDto: UpdateAssignmentStatusDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ) {
    this.assertAdminOrPm(req.authUser);
    return this.engagementsService.updateAssignmentStatus(
      id,
      assignmentId,
      updateDto.status,
      updateDto.terminationReason,
      updateDto.otherRemarks,
    );
  }

  @Patch(":id/assignments/:assignmentId/accept-offer")
  @UseGuards(PermissionsGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Accept assignment offer",
    description:
      "Accepts an assignment offer for the authenticated member. Only the assigned member may accept; admins and M2M tokens are not allowed.",
  })
  @ApiResponse({
    status: 200,
    description: "Assignment offer accepted.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Only the assigned member can accept this offer. Admin and M2M tokens are not allowed.",
  })
  @ApiNotFoundResponse({ description: "Engagement assignment not found." })
  async acceptAssignmentOffer(
    @Param("id") id: string,
    @Param("assignmentId") assignmentId: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ) {
    return this.engagementsService.acceptAssignmentOffer(
      id,
      assignmentId,
      req.authUser ?? {},
    );
  }

  @Patch(":id/assignments/:assignmentId/reject-offer")
  @UseGuards(PermissionsGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Reject assignment offer",
    description:
      "Rejects an assignment offer for the authenticated member. Only the assigned member may reject; admins and M2M tokens are not allowed.",
  })
  @ApiResponse({
    status: 200,
    description: "Assignment offer rejected.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Only the assigned member can reject this offer. Admin and M2M tokens are not allowed.",
  })
  @ApiNotFoundResponse({ description: "Engagement assignment not found." })
  async rejectAssignmentOffer(
    @Param("id") id: string,
    @Param("assignmentId") assignmentId: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ) {
    return this.engagementsService.rejectAssignmentOffer(
      id,
      assignmentId,
      req.authUser ?? {},
    );
  }

  @Delete(":id")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ManageEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Delete engagement",
    description:
      "Deletes an engagement. Requires Administrator role for user tokens, or manage:engagements scope for M2M clients. " +
      "The engagement must have no assignment history.",
  })
  @ApiResponse({ status: 204, description: "Engagement deleted." })
  @ApiBadRequestResponse({
    description:
      "Engagement has member assignment history and cannot be deleted.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires Administrator role or manage:engagements scope.",
  })
  @ApiNotFoundResponse({ description: "Engagement not found." })
  @HttpCode(HttpStatus.NO_CONTENT)
  /**
   * Deletes an engagement by ID.
   *
   * Restricted to Administrator users for user tokens. M2M clients may call this
   * endpoint with the manage:engagements scope.
   *
   * Engagements with member assignment history are rejected with HTTP 400 so
   * assignment rows are never deleted through cascading engagement deletion.
   */
  async remove(
    @Param("id") id: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<void> {
    this.assertAdminOnly(req.authUser);
    await this.engagementsService.remove(id);
  }

  private assertAdminOnly(authUser?: Record<string, any>) {
    if (authUser?.isMachine) {
      return;
    }

    const roles = getUserRoles(authUser);
    const isAdmin = roles.some(
      (role) => role?.toLowerCase() === UserRoles.Admin.toLowerCase(),
    );

    if (!isAdmin) {
      throw new ForbiddenException(
        "Only Administrator users can delete engagements.",
      );
    }
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

  private assertMachineScope(
    authUser: Record<string, any> | undefined,
    requiredScope: string,
  ) {
    if (!authUser?.isMachine) {
      return;
    }

    const scopes: string[] = authUser.scopes ?? [];
    const normalizedScopes = scopes.map((scope) => scope?.toLowerCase());

    if (!normalizedScopes.includes(requiredScope.toLowerCase())) {
      throw new ForbiddenException(
        "You do not have the required permissions to access this resource.",
      );
    }
  }

  /**
   * Enforces endpoint-local Flexi Talent read access.
   *
   * Human callers must carry the Administrator or Talent Manager role set used
   * for private engagement inclusion. M2M callers must carry the requested
   * read:engagements scope.
   *
   * @param authUser Authenticated user or M2M claims from the request.
   * @throws UnauthorizedException When authentication is missing.
   * @throws ForbiddenException When the caller is outside the Flexi read
   * contract.
   */
  private assertFlexiReadAccess(authUser?: Record<string, any>): void {
    if (!authUser) {
      throw new UnauthorizedException(
        "Authentication is required to access Flexi Talent engagement data.",
      );
    }

    if (authUser.isMachine) {
      this.assertMachineScope(authUser, AppScopes.ReadEngagements);
      return;
    }

    const roles = getUserRoles(authUser);
    const isAllowed = roles.some((role) =>
      this.includePrivateRoles.has(role?.toLowerCase()),
    );

    if (!isAllowed) {
      throw new ForbiddenException(
        "Flexi Talent engagement reads require Administrator or Talent Manager role.",
      );
    }
  }

  private assertCanIncludePrivate(authUser?: Record<string, any>) {
    if (!authUser) {
      throw new UnauthorizedException(
        "Authentication is required to include private engagements.",
      );
    }

    if (authUser.isMachine) {
      return;
    }

    const roles = getUserRoles(authUser);
    const isAllowed = roles.some((role) =>
      this.includePrivateRoles.has(role?.toLowerCase()),
    );

    if (!isAllowed) {
      throw new UnauthorizedException(
        "You are not authorized to include private engagements.",
      );
    }
  }

  private canViewAssignmentDetails(authUser?: Record<string, any>): boolean {
    if (!authUser) {
      return false;
    }

    if (authUser.isMachine) {
      return true;
    }

    const roles = getUserRoles(authUser);
    return roles.some((role) =>
      this.includePrivateRoles.has(role?.toLowerCase()),
    );
  }
}
