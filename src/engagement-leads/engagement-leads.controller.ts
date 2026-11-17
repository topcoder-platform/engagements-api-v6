import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  Get,
  Param,
  Patch,
  Post,
  Put,
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
  ApiNoContentResponse,
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
  CreateEngagementLeadNoteDto,
  CreateWiproDirectEngagementLeadIntakeDto,
  EngagementLeadCalculationResponseDto,
  EngagementLeadIntakeResponseDto,
  EngagementLeadPrefillDto,
  EngagementLeadQueryDto,
  EngagementLeadResponseDto,
  MarkEngagementLeadConvertedDto,
  SaveEngagementLeadCalculationDto,
  UpdateEngagementLeadStatusDto,
} from "./dto";
import { EngagementLeadCalculationsService } from "./engagement-lead-calculations.service";
import { EngagementLeadsService } from "./engagement-leads.service";

@ApiTags("Engagement Leads")
@Controller("engagement-leads")
export class EngagementLeadsController {
  private readonly leadManagerRoles = new Set(
    [UserRoles.Admin, ...TalentManagerRoles].map((role) => role.toLowerCase()),
  );

  constructor(
    private readonly engagementLeadsService: EngagementLeadsService,
    private readonly calculationsService: EngagementLeadCalculationsService,
  ) {}

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

  @Post("intake/wipro-direct")
  @ApiOperation({
    summary: "Submit Wipro Direct engagement lead intake form",
    description:
      "Public endpoint for Wipro Direct customers to submit engagement requirements without authentication.",
  })
  @ApiResponse({
    status: 201,
    description: "Engagement lead submitted.",
    type: EngagementLeadIntakeResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid request payload.",
  })
  async submitWiproDirectIntake(
    @Body() intakeDto: CreateWiproDirectEngagementLeadIntakeDto,
  ): Promise<EngagementLeadIntakeResponseDto> {
    const lead =
      await this.engagementLeadsService.createFromWiproDirectIntake(intakeDto);

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
      "Updates the status of an engagement lead to UNDER_REVIEW, FULFILLED, or REJECTED (Lost). Requires Admin or Talent Manager role.",
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

  @Post(":id/notes")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Add an engagement lead note",
    description:
      "Adds a Talent Manager note to an engagement lead, whatever its status. Notes are read-only once added.",
  })
  @ApiResponse({
    status: 201,
    description: "Engagement lead note added.",
    type: EngagementLeadResponseDto,
  })
  @ApiBadRequestResponse({
    description: "The note is empty.",
  })
  async addNote(
    @Param("id") id: string,
    @Body() createDto: CreateEngagementLeadNoteDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementLeadResponseDto> {
    this.assertLeadManager(req.authUser);
    // Each note shows who wrote it, so prefer the readable handle over the user ID.
    const handle =
      typeof req.authUser?.handle === "string"
        ? req.authUser.handle.trim()
        : "";
    const createdBy = handle || getUserIdentifier(req.authUser);
    return this.engagementLeadsService.addNote(
      id,
      createDto.content,
      createdBy,
    );
  }

  @Get(":id/calculations")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.ReadEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "List a lead's saved cost calculations",
    description:
      "Returns the Flexi Talent cost calculations saved for an engagement lead, oldest first.",
  })
  @ApiResponse({
    status: 200,
    description: "Cost calculations retrieved.",
    type: [EngagementLeadCalculationResponseDto],
  })
  @ApiNotFoundResponse({
    description: "Engagement lead not found.",
  })
  async findCalculations(
    @Param("id") id: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementLeadCalculationResponseDto[]> {
    this.assertLeadManager(req.authUser);
    return this.calculationsService.findAll(id);
  }

  @Post(":id/calculations")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Save a new cost calculation for a lead",
    description:
      "Saves a Flexi Talent cost calculation. A lead can have several, e.g. one per resource.",
  })
  @ApiResponse({
    status: 201,
    description: "Cost calculation saved.",
    type: EngagementLeadCalculationResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Engagement lead not found.",
  })
  async createCalculation(
    @Param("id") id: string,
    @Body() saveDto: SaveEngagementLeadCalculationDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementLeadCalculationResponseDto> {
    this.assertLeadManager(req.authUser);
    return this.calculationsService.create(
      id,
      saveDto,
      getUserIdentifier(req.authUser),
    );
  }

  @Put(":id/calculations/:calculationId")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Overwrite a saved cost calculation",
    description:
      "Replaces the calculation's values with the ones sent. Previous values are not kept.",
  })
  @ApiResponse({
    status: 200,
    description: "Cost calculation saved.",
    type: EngagementLeadCalculationResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Cost calculation not found on this lead.",
  })
  async updateCalculation(
    @Param("id") id: string,
    @Param("calculationId") calculationId: string,
    @Body() saveDto: SaveEngagementLeadCalculationDto,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<EngagementLeadCalculationResponseDto> {
    this.assertLeadManager(req.authUser);
    return this.calculationsService.update(
      id,
      calculationId,
      saveDto,
      getUserIdentifier(req.authUser),
    );
  }

  @Delete(":id/calculations/:calculationId")
  @HttpCode(204)
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Delete a saved cost calculation",
  })
  @ApiNoContentResponse({
    description: "Cost calculation deleted.",
  })
  @ApiNotFoundResponse({
    description: "Cost calculation not found on this lead.",
  })
  async deleteCalculation(
    @Param("id") id: string,
    @Param("calculationId") calculationId: string,
    @Req() req: Request & { authUser?: Record<string, any> },
  ): Promise<void> {
    this.assertLeadManager(req.authUser);
    await this.calculationsService.remove(id, calculationId);
  }

  @Patch(":id/convert")
  @UseGuards(PermissionsGuard)
  @ScopesDecorator(AppScopes.WriteEngagements)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Link an engagement lead to the engagement created from it",
    description:
      "Links an engagement lead to a created engagement and moves the lead to UNDER_REVIEW.",
  })
  @ApiResponse({
    status: 200,
    description: "Engagement lead linked to the engagement.",
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
