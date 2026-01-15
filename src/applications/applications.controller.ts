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
  ApplicationQueryDto,
  ApplicationResponseDto,
  CreateApplicationDto,
  UpdateApplicationDto,
} from "./dto";
import { ApplicationsService } from "./applications.service";
import { ApplicationStatus, EngagementApplication } from "@prisma/client";
import { PaginatedResponse } from "../engagements/dto";

@ApiTags("Applications")
@Controller()
export class ApplicationsController {
  private readonly privilegedRoles = new Set(
    Object.values(UserRoles).map((role) => role.toLowerCase()),
  );

  constructor(
    private readonly applicationsService: ApplicationsService,
  ) {}

  @Post("engagements/:engagementId/applications")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteApplications)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create an application",
    description:
      "Creates a new application for an engagement. Requires write:applications scope.",
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
      "Insufficient permissions. Requires write:applications scope.",
  })
  async create(
    @Param("engagementId") engagementId: string,
    @Body() createDto: CreateApplicationDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementApplication> {
    const userId = req.authUser?.userId as string;
    return this.applicationsService.create(
      engagementId,
      createDto,
      userId,
    );
  }

  @Get("applications")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadApplications)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List applications",
    description:
      "Returns a paginated list of applications visible to the caller. Requires read:applications scope.",
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
      "Insufficient permissions. Requires read:applications scope.",
  })
  async findAll(
    @Query() query: ApplicationQueryDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<PaginatedResponse<EngagementApplication>> {
    return this.applicationsService.findAll(query, req.authUser ?? {});
  }

  @Get("applications/:id")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadApplications)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get application by ID",
    description:
      "Retrieves an application by ID. Requires read:applications scope.",
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
      "Insufficient permissions. Requires read:applications scope.",
  })
  @ApiNotFoundResponse({ description: "Application not found." })
  async findOne(
    @Param("id") id: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementApplication> {
    return this.applicationsService.findOne(id, req.authUser ?? {});
  }

  @Get("engagements/:engagementId/applications")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadApplications)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List applications for an engagement",
    description:
      "Lists all applications for a specific engagement. Requires admin, PM, or Task Manager role for user tokens " +
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
      "Insufficient permissions. Requires admin/PM/Task Manager role for user tokens or read:applications scope for M2M clients.",
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
      "Updates the status for an application. Requires admin, PM, or Task Manager role for user tokens, " +
      "or write:applications scope for M2M clients.",
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
      "Insufficient permissions. Requires admin/PM/Task Manager role or write:applications scope.",
  })
  @ApiNotFoundResponse({ description: "Application not found." })
  async updateStatus(
    @Param("id") id: string,
    @Body() updateDto: UpdateApplicationDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementApplication> {
    this.assertAdminOrPm(req.authUser);
    return this.applicationsService.updateStatus(
      id,
      updateDto.status as ApplicationStatus,
      req.authUser ?? {},
    );
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
