import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
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
import {
  ApplicationQueryDto,
  ApplicationResponseDto,
  CreateApplicationDto,
  UpdateApplicationStatusDto,
} from "./dto";
import { ApplicationsService } from "./applications.service";
import { ApplicationStatus, EngagementApplication } from "@prisma/client";
import { PaginatedResponse } from "../engagements/dto";
import { getUserRoles } from "../common/user.util";

@ApiTags("Applications")
@Controller()
export class ApplicationsController {
  private readonly privilegedRoles = new Set(
    PrivilegedUserRoles.map((role) => role.toLowerCase()),
  );

  constructor(
    private readonly applicationsService: ApplicationsService,
  ) {}

  @Post(":engagementId/applications")
  @UseGuards(PermissionsGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create an application",
    description:
      "Creates a new application for an engagement. Any authenticated user can apply.",
  })
  @ApiResponse({
    status: 201,
    description: "Application created.",
    type: ApplicationResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid request payload.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Authentication required.",
  })
  async create(
    @Param("engagementId") engagementId: string,
    @Body() createDto: CreateApplicationDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementApplication> {
    return this.applicationsService.create(
      engagementId,
      createDto,
      req.authUser ?? {},
    );
  }

  @Get("applications")
  @UseGuards(PermissionsGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List applications",
    description:
      "Returns a paginated list of applications visible to the caller. User tokens are limited to their own " +
      "applications; M2M clients require read:applications scope.",
  })
  @ApiResponse({
    status: 200,
    description: "Applications retrieved.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires read:applications scope for M2M clients.",
  })
  async findAll(
    @Query() query: ApplicationQueryDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<PaginatedResponse<EngagementApplication>> {
    this.assertMachineScope(req.authUser, AppScopes.ReadApplications);
    return this.applicationsService.findAll(query, req.authUser ?? {});
  }

  @Get("applications/:id")
  @UseGuards(PermissionsGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get application by ID",
    description:
      "Retrieves an application by ID. Users can only access their own application; " +
      "M2M clients require read:applications scope.",
  })
  @ApiResponse({
    status: 200,
    description: "Application retrieved.",
    type: ApplicationResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires read:applications scope for M2M clients.",
  })
  @ApiNotFoundResponse({ description: "Application not found." })
  async findOne(
    @Param("id") id: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementApplication> {
    this.assertMachineScope(req.authUser, AppScopes.ReadApplications);
    return this.applicationsService.findOne(id, req.authUser ?? {});
  }

  @Get(":engagementId/applications")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadApplications)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List applications for an engagement",
    description:
      "Lists all applications for a specific engagement. Requires admin, PM, Task Manager, or Talent Manager role for user tokens " +
      "or read:applications scope for M2M clients.",
  })
  @ApiResponse({
    status: 200,
    description: "Applications retrieved.",
    type: ApplicationResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires admin/PM/Task Manager/Talent Manager role for user tokens or read:applications scope for M2M clients.",
  })
  async findByEngagement(
    @Param("engagementId") engagementId: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementApplication[]> {
    this.assertAdminOrPm(req.authUser);
    return this.applicationsService.findByEngagement(
      engagementId,
      req.authUser ?? {},
    );
  }

  @Patch("applications/:id/status")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteApplications)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Update application status",
    description:
      "Updates the status for an application. Status is required in the request body. Requires admin, PM, Task Manager, or Talent Manager role for user tokens, " +
      "or write:applications scope for M2M clients.",
  })
  @ApiBody({
    type: UpdateApplicationStatusDto,
    description: "Status update payload",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "Application status updated.",
    type: ApplicationResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid request payload.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires admin/PM/Task Manager/Talent Manager role or write:applications scope.",
  })
  @ApiNotFoundResponse({ description: "Application not found." })
  async updateStatus(
    @Param("id") id: string,
    @Body() updateDto: UpdateApplicationStatusDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementApplication> {
    this.assertAdminOrPm(req.authUser);
    return this.applicationsService.updateStatus(
      id,
      updateDto.status as ApplicationStatus,
      req.authUser ?? {},
    );
  }

  @Patch("applications/:id/approve")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteApplications)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Approve application",
    description:
      "Approves a submitted application and creates an engagement assignment. Requires admin, PM, Task Manager, or Talent Manager role for user tokens, " +
      "or write:applications scope for M2M clients.",
  })
  @ApiResponse({
    status: 200,
    description: "Application approved.",
    type: ApplicationResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Unable to approve application.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires admin/PM/Task Manager/Talent Manager role or write:applications scope.",
  })
  @ApiNotFoundResponse({ description: "Application not found." })
  async approve(
    @Param("id") id: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementApplication> {
    this.assertAdminOrPm(req.authUser);
    return this.applicationsService.approve(id, req.authUser ?? {});
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
