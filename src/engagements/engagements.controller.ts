import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
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
import { Scopes as AppScopes, UserRoles } from "../app-constants";
import {
  CreateEngagementDto,
  EngagementQueryDto,
  EngagementResponseDto,
  PaginatedResponse,
  UpdateEngagementDto,
} from "./dto";
import { EngagementsService } from "./engagements.service";
import { Engagement } from "@prisma/client";

@ApiTags("Engagements")
@Controller("engagements")
export class EngagementsController {
  private readonly privilegedRoles = new Set(
    Object.values(UserRoles).map((role) => role.toLowerCase()),
  );

  constructor(private readonly engagementsService: EngagementsService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteEngagements, AppScopes.ManageEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create a new engagement",
    description:
      "Creates a new engagement opportunity. Requires admin, PM, or Task Manager role for user tokens, " +
      "or write:engagements/manage:engagements scope for M2M clients.",
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
      "Insufficient permissions. Requires admin/PM/Task Manager role or write:engagements/manage:engagements scope.",
  })
  async create(
    @Body() createDto: CreateEngagementDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<Engagement> {
    this.assertAdminOrPm(req.authUser);
    return this.engagementsService.create(
      createDto,
      req.authUser ?? {},
    );
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
  ): Promise<PaginatedResponse<Engagement>> {
    return this.engagementsService.findAll(query);
  }

  @Get("active")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List active engagements",
    description:
      "Returns active engagements only. Requires read:engagements scope.",
  })
  @ApiResponse({
    status: 200,
    description: "Active engagements retrieved.",
    type: EngagementResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description: "Insufficient permissions. Requires read:engagements scope.",
  })
  async findAllActive(): Promise<Engagement[]> {
    return this.engagementsService.findAllActive();
  }

  @Get("my-assignments")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List assigned engagements",
    description:
      "Returns engagements assigned to the authenticated user. Requires read:engagements scope.",
  })
  @ApiResponse({
    status: 200,
    description: "Assigned engagements retrieved.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description: "Insufficient permissions. Requires read:engagements scope.",
  })
  async findMyAssignments(
    @Query() query: EngagementQueryDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<PaginatedResponse<Engagement>> {
    return this.engagementsService.findMyAssignments(
      req.authUser ?? {},
      query,
    );
  }

  @Get(":id")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get engagement by ID",
    description:
      "Retrieves a single engagement by ID. Requires read:engagements scope.",
  })
  @ApiResponse({
    status: 200,
    description: "Engagement retrieved.",
    type: EngagementResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description: "Insufficient permissions. Requires read:engagements scope.",
  })
  @ApiNotFoundResponse({ description: "Engagement not found." })
  async findOne(@Param("id") id: string): Promise<Engagement> {
    return this.engagementsService.findOne(id);
  }

  @Put(":id")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteEngagements, AppScopes.ManageEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Update engagement",
    description:
      "Updates an existing engagement. Requires admin, PM, or Task Manager role for user tokens, " +
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
      "Insufficient permissions. Requires admin/PM/Task Manager role or write:engagements/manage:engagements scope.",
  })
  @ApiNotFoundResponse({ description: "Engagement not found." })
  async update(
    @Param("id") id: string,
    @Body() updateDto: UpdateEngagementDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<Engagement> {
    this.assertAdminOrPm(req.authUser);
    return this.engagementsService.update(
      id,
      updateDto,
      req.authUser ?? {},
    );
  }

  @Delete(":id/assignments/:assignmentId")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteEngagements, AppScopes.ManageEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Remove engagement assignment",
    description:
      "Removes an assignment from an engagement. Requires admin, PM, or Task Manager role for user tokens, " +
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
      "Insufficient permissions. Requires admin/PM/Task Manager role or write:engagements/manage:engagements scope.",
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

  @Delete(":id")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ManageEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Delete engagement",
    description:
      "Deletes an engagement. Requires admin, PM, or Task Manager role for user tokens, " +
      "or manage:engagements scope for M2M clients.",
  })
  @ApiResponse({ status: 204, description: "Engagement deleted." })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires admin/PM/Task Manager role or manage:engagements scope.",
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

    const roles: string[] = authUser?.roles ?? [];
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
