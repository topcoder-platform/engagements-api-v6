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
import { Scopes as AppScopes, PrivilegedUserRoles } from "../app-constants";
import {
  CreateEngagementDto,
  CreateEngagementDurationDatesDto,
  CreateEngagementDurationMonthsDto,
  CreateEngagementDurationWeeksDto,
  EngagementQueryDto,
  EngagementResponseDto,
  PaginatedResponse,
  UpdateAssignmentStatusDto,
  UpdateEngagementDto,
} from "./dto";
import { EngagementsService } from "./engagements.service";
import { Engagement } from "@prisma/client";
import { getUserRoles } from "../common/user.util";

@ApiTags("Engagements")
@ApiExtraModels(
  CreateEngagementDto,
  CreateEngagementDurationWeeksDto,
  CreateEngagementDurationMonthsDto,
  CreateEngagementDurationDatesDto,
)
@Controller("engagements")
export class EngagementsController {
  private readonly privilegedRoles = new Set(
    PrivilegedUserRoles.map((role) => role.toLowerCase()),
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
    if (query.includePrivate) {
      this.assertAdminOrPm(req.authUser);
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
      "Returns engagements assigned to the authenticated user. M2M clients require read:engagements scope.",
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

  @Get(":id")
  @ApiOperation({
    summary: "Get engagement by ID",
    description:
      "Retrieves a single engagement by ID. Authentication is optional.",
  })
  @ApiResponse({
    status: 200,
    description: "Engagement retrieved.",
    type: EngagementResponseDto,
  })
  @ApiNotFoundResponse({ description: "Engagement not found." })
  async findOne(@Param("id") id: string): Promise<Engagement> {
    return this.engagementsService.findOne(id, {
      includeCreatorEmail: true,
    });
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
    description: "Invalid request payload.",
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
    summary: "Remove engagement assignment",
    description:
      "Removes an assignment from an engagement. Requires admin, PM, Task Manager, or Talent Manager role for user tokens, " +
      "or write:engagements/manage:engagements scope for M2M clients.",
  })
  @ApiResponse({ status: 204, description: "Engagement assignment removed." })
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
      "Deletes an engagement. Requires admin, PM, Task Manager, or Talent Manager role for user tokens, " +
      "or manage:engagements scope for M2M clients.",
  })
  @ApiResponse({ status: 204, description: "Engagement deleted." })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires admin/PM/Task Manager/Talent Manager role or manage:engagements scope.",
  })
  @ApiNotFoundResponse({ description: "Engagement not found." })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param("id") id: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<void> {
    this.assertAdminOrPm(req.authUser);
    await this.engagementsService.remove(id);
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
}
