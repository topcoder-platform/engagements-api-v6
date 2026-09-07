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
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
import {
  Scopes as AppScopes,
  TalentManagerRoles,
  UserRoles,
} from "../app-constants";
import { PaginatedResponse } from "../engagements/dto";
import { getUserIdentifier, getUserRoles } from "../common/user.util";
import {
  CreateEngagementLeadIntakeDto,
  EngagementLeadIntakeResponseDto,
  EngagementLeadPrefillDto,
  EngagementLeadQueryDto,
  EngagementLeadResponseDto,
  MarkEngagementLeadConvertedDto,
  UpdateEngagementLeadStatusDto,
} from "./dto";
import { EngagementLeadsService } from "./engagement-leads.service";

@ApiTags("Engagement Leads")
@Controller("engagement-leads")
export class EngagementLeadsController {
  private readonly leadManagerRoles = new Set(
    [UserRoles.Admin, ...TalentManagerRoles].map((role) => role.toLowerCase()),
  );

  constructor(private readonly engagementLeadsService: EngagementLeadsService) {}

  @Post("intake")
  @ApiOperation({
    summary: "Submit engagement lead intake form",
    description:
      "Public endpoint for customers to submit engagement requirements without authentication.",
  })
  @ApiResponse({
    status: 201,
    description: "Engagement lead submitted.",
    type: EngagementLeadIntakeResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid request payload.",
  })
  async submitIntake(
    @Body() intakeDto: CreateEngagementLeadIntakeDto,
  ): Promise<EngagementLeadIntakeResponseDto> {
    const lead = await this.engagementLeadsService.createFromIntake(intakeDto);

    return {
      id: lead.id,
      message:
        "Your engagement request has been submitted successfully. A Talent Manager will review it shortly.",
    };
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List engagement leads",
    description:
      "Returns a paginated list of engagement leads. Requires Admin or Talent Manager role.",
  })
  @ApiResponse({
    status: 200,
    description: "Engagement leads retrieved.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description: "Insufficient permissions.",
  })
  async findAll(
    @Query() query: EngagementLeadQueryDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<PaginatedResponse<EngagementLeadResponseDto>> {
    this.assertLeadManager(req.authUser);
    return this.engagementLeadsService.findAll(query);
  }

  @Get(":id")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get engagement lead by ID",
    description:
      "Retrieves a single engagement lead. Requires Admin or Talent Manager role.",
  })
  @ApiResponse({
    status: 200,
    description: "Engagement lead retrieved.",
    type: EngagementLeadResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description: "Insufficient permissions.",
  })
  @ApiNotFoundResponse({
    description: "Engagement lead not found.",
  })
  async findOne(
    @Param("id") id: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementLeadResponseDto> {
    this.assertLeadManager(req.authUser);
    return this.engagementLeadsService.findOne(id);
  }

  @Get(":id/prefill")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get engagement prefill data from lead",
    description:
      "Returns engagement editor prefill data mapped from an engagement lead.",
  })
  @ApiResponse({
    status: 200,
    description: "Prefill data retrieved.",
    type: EngagementLeadPrefillDto,
  })
  async getPrefill(
    @Param("id") id: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementLeadPrefillDto> {
    this.assertLeadManager(req.authUser);
    return this.engagementLeadsService.getEngagementPrefill(id);
  }

  @Patch(":id/status")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Update engagement lead status",
    description:
      "Updates the status of an engagement lead. Requires Admin or Talent Manager role.",
  })
  @ApiResponse({
    status: 200,
    description: "Engagement lead status updated.",
    type: EngagementLeadResponseDto,
  })
  async updateStatus(
    @Param("id") id: string,
    @Body() updateDto: UpdateEngagementLeadStatusDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementLeadResponseDto> {
    this.assertLeadManager(req.authUser);
    const updatedBy = getUserIdentifier(req.authUser);
    return this.engagementLeadsService.updateStatus(id, updateDto, updatedBy);
  }

  @Patch(":id/convert")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Mark engagement lead as converted",
    description:
      "Links an engagement lead to a created engagement and marks it as converted.",
  })
  @ApiResponse({
    status: 200,
    description: "Engagement lead marked as converted.",
    type: EngagementLeadResponseDto,
  })
  async markConverted(
    @Param("id") id: string,
    @Body() convertDto: MarkEngagementLeadConvertedDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementLeadResponseDto> {
    this.assertLeadManager(req.authUser);

    if (!convertDto.engagementId?.trim()) {
      throw new BadRequestException("engagementId is required.");
    }

    const updatedBy = getUserIdentifier(req.authUser);
    return this.engagementLeadsService.markConverted(
      id,
      convertDto.engagementId.trim(),
      updatedBy,
    );
  }

  private assertLeadManager(authUser?: Record<string, any>) {
    if (!authUser) {
      throw new UnauthorizedException("You are not authenticated.");
    }

    if (authUser.isMachine) {
      return;
    }

    const roles = getUserRoles(authUser);
    const isLeadManager = roles.some((role) =>
      this.leadManagerRoles.has(role?.toLowerCase()),
    );

    if (!isLeadManager) {
      throw new ForbiddenException(
        "You do not have permission to manage engagement leads.",
      );
    }
  }
}
