import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
import { Scopes as AppScopes } from "../app-constants";
import {
  CreateMemberExperienceDto,
  MemberExperienceResponseDto,
  UpdateMemberExperienceDto,
} from "./dto";
import { MemberExperienceService } from "./member-experience.service";

@ApiTags("Member Experience")
@Controller()
export class MemberExperienceController {
  constructor(
    private readonly memberExperienceService: MemberExperienceService,
  ) {}

  @Post(":engagementId/assignments/:assignmentId/experiences")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteMemberExperience)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create member experience",
    description:
      "Creates a member experience entry for an assignment. Only assigned members can create experiences.",
  })
  @ApiResponse({
    status: 201,
    description: "Member experience created.",
    type: MemberExperienceResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid request payload.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires write:member-experience scope.",
  })
  @ApiNotFoundResponse({
    description: "Engagement assignment not found.",
  })
  async create(
    @Param("engagementId") engagementId: string,
    @Param("assignmentId") assignmentId: string,
    @Body() createDto: CreateMemberExperienceDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<MemberExperienceResponseDto> {
    return this.memberExperienceService.create(
      engagementId,
      assignmentId,
      createDto,
      req.authUser ?? {},
    );
  }

  @Put(":engagementId/assignments/:assignmentId/experiences/:experienceId")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteMemberExperience)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Update member experience",
    description:
      "Updates a member experience entry. Only the assigned member can update their own experiences.",
  })
  @ApiResponse({
    status: 200,
    description: "Member experience updated.",
    type: MemberExperienceResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid request payload.",
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires write:member-experience scope.",
  })
  @ApiNotFoundResponse({
    description: "Member experience record not found.",
  })
  async update(
    @Param("engagementId") engagementId: string,
    @Param("assignmentId") assignmentId: string,
    @Param("experienceId") experienceId: string,
    @Body() updateDto: UpdateMemberExperienceDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<MemberExperienceResponseDto> {
    return this.memberExperienceService.update(
      engagementId,
      assignmentId,
      experienceId,
      updateDto,
      req.authUser ?? {},
    );
  }

  @Get(":engagementId/assignments/:assignmentId/experiences")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadMemberExperience)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List member experiences",
    description:
      "Lists all member experiences for an assignment. Access is limited to the assigned member or privileged users.",
  })
  @ApiResponse({
    status: 200,
    description: "Member experiences retrieved.",
    type: MemberExperienceResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires read:member-experience scope.",
  })
  @ApiNotFoundResponse({
    description: "Engagement assignment not found.",
  })
  async findByAssignment(
    @Param("engagementId") engagementId: string,
    @Param("assignmentId") assignmentId: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<MemberExperienceResponseDto[]> {
    return this.memberExperienceService.findByAssignment(
      engagementId,
      assignmentId,
      req.authUser ?? {},
    );
  }

  @Get("experiences/:experienceId")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadMemberExperience)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get member experience",
    description:
      "Retrieves a member experience by ID. Access is limited to the assigned member or privileged users.",
  })
  @ApiResponse({
    status: 200,
    description: "Member experience retrieved.",
    type: MemberExperienceResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Missing or invalid authentication token.",
  })
  @ApiForbiddenResponse({
    description:
      "Insufficient permissions. Requires read:member-experience scope.",
  })
  @ApiNotFoundResponse({
    description: "Member experience record not found.",
  })
  async findOne(
    @Param("experienceId") experienceId: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<MemberExperienceResponseDto> {
    return this.memberExperienceService.findOne(
      experienceId,
      req.authUser ?? {},
    );
  }
}
