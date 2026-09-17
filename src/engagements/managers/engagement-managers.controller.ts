import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
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
import { Scopes as AppScopes } from "../../app-constants";
import { Scopes as ScopesDecorator } from "../../auth/decorators/scopes.decorator";
import { PermissionsGuard } from "../../auth/guards/permissions.guard";
import {
  AssignEngagementManagerDto,
  EngagementManagerResponseDto,
} from "./dto";
import { EngagementManagersService } from "./engagement-managers.service";

/**
 * The engagement-manager registry: the single source of truth for who may approve timesheets on an
 * engagement.
 *
 * Both front ends - the Engagements Portal timesheet page and the Work App assignees page - read and
 * write these endpoints. That is what makes a manager added in one visible in the other, with no
 * replication between them.
 */
@ApiTags("Engagement Managers")
@Controller("engagements/:id/managers")
@UseGuards(PermissionsGuard)
@ApiBearerAuth()
export class EngagementManagersController {
  constructor(private readonly managersService: EngagementManagersService) {}

  // No @ScopesDecorator here on purpose: PermissionsGuard refuses a non-administrator human whenever
  // scopes are declared, and this list has to be readable by assignees and managers too. The guard
  // therefore only enforces authentication, and the service resolves who may read, the same shape as
  // the member-facing engagements endpoints.
  @Get()
  @ApiOperation({
    summary: "List engagement managers",
    description:
      "Returns the engagement's current managers. Readable by an administrator, by a manager of the engagement, and by a member assigned to it, since an assignee's timesheet header displays their managers. Removed managers are excluded.",
  })
  @ApiResponse({
    status: 200,
    description: "Managers retrieved.",
    type: EngagementManagerResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: "Caller is not authenticated." })
  @ApiForbiddenResponse({
    description: "Caller has no relationship to this engagement.",
  })
  @ApiNotFoundResponse({ description: "Engagement not found." })
  async findAll(
    @Param("id") engagementId: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementManagerResponseDto[]> {
    return this.managersService.findAll(engagementId, req.authUser);
  }

  @Post()
  @ScopesDecorator(AppScopes.ManageTimesheets)
  @ApiOperation({
    summary: "Assign an engagement manager",
    description:
      "Grants a member timesheet approval authority on this engagement, keyed on the member's Topcoder user id. Administrators only. Send handle and name alongside the user id when they are already known - both front ends pick the manager from a member search - and no member-API lookup is needed. Re-assigning a previously removed manager reactivates the existing record rather than creating a second one.",
  })
  @ApiResponse({
    status: 201,
    description: "Manager assigned.",
    type: EngagementManagerResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      "userId is missing, or no handle was supplied and none could be resolved for that user id.",
  })
  @ApiUnauthorizedResponse({ description: "Caller is not authenticated." })
  @ApiForbiddenResponse({ description: "Caller is not an administrator." })
  @ApiNotFoundResponse({ description: "Engagement not found." })
  @ApiConflictResponse({
    description: "That member is already a manager on this engagement.",
  })
  async assign(
    @Param("id") engagementId: string,
    @Body() body: AssignEngagementManagerDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementManagerResponseDto> {
    return this.managersService.assign(engagementId, body, req.authUser);
  }

  @Delete(":managerUserId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ScopesDecorator(AppScopes.ManageTimesheets)
  @ApiOperation({
    summary: "Remove an engagement manager",
    description:
      "Revokes a manager's timesheet approval authority. Administrators only. The record is soft-deleted so approvals made by this manager keep their attribution; the change takes effect on the manager's next request.",
  })
  @ApiResponse({ status: 204, description: "Manager removed." })
  @ApiUnauthorizedResponse({ description: "Caller is not authenticated." })
  @ApiForbiddenResponse({ description: "Caller is not an administrator." })
  @ApiNotFoundResponse({
    description: "Engagement not found, or that member is not a manager on it.",
  })
  async remove(
    @Param("id") engagementId: string,
    @Param("managerUserId") managerUserId: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<void> {
    await this.managersService.remove(
      engagementId,
      managerUserId,
      req.authUser,
    );
  }
}
