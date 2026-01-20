import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { EngagementAssignment, MemberExperience } from "@prisma/client";
import { nanoid } from "nanoid";
import { PrivilegedUserRoles } from "../app-constants";
import { ERROR_MESSAGES } from "../common/constants";
import { getUserIdentifier, getUserRoles } from "../common/user.util";
import { DbService } from "../db/db.service";
import {
  CreateMemberExperienceDto,
  MemberExperienceResponseDto,
  UpdateMemberExperienceDto,
} from "./dto";

@Injectable()
export class MemberExperienceService {
  private readonly privilegedRoles = new Set(
    PrivilegedUserRoles.map((role) => role.toLowerCase()),
  );

  constructor(private readonly db: DbService) {}

  async create(
    engagementId: string,
    assignmentId: string,
    createDto: CreateMemberExperienceDto,
    authUser: Record<string, any>,
  ): Promise<MemberExperienceResponseDto> {
    const assignment = await this.validateAssignment(
      engagementId,
      assignmentId,
    );
    this.assertMemberOwnsAssignment(assignment, authUser);

    const experience = await this.db.memberExperience.create({
      data: {
        id: nanoid(),
        engagementAssignmentId: assignmentId,
        experienceText: createDto.experienceText,
      },
    });

    return this.transformToResponseDto(experience);
  }

  async update(
    engagementId: string,
    assignmentId: string,
    experienceId: string,
    updateDto: UpdateMemberExperienceDto,
    authUser: Record<string, any>,
  ): Promise<MemberExperienceResponseDto> {
    const assignment = await this.validateAssignment(
      engagementId,
      assignmentId,
    );

    const experience = await this.db.memberExperience.findUnique({
      where: { id: experienceId },
    });

    if (!experience || experience.engagementAssignmentId !== assignmentId) {
      throw new NotFoundException(ERROR_MESSAGES.MemberExperienceNotFound);
    }

    this.assertMemberOwnsAssignment(assignment, authUser);

    const updated = await this.db.memberExperience.update({
      where: { id: experienceId },
      data: {
        experienceText: updateDto.experienceText,
      },
    });

    return this.transformToResponseDto(updated);
  }

  async findByAssignment(
    engagementId: string,
    assignmentId: string,
    authUser: Record<string, any>,
  ): Promise<MemberExperienceResponseDto[]> {
    const assignment = await this.validateAssignment(
      engagementId,
      assignmentId,
    );

    const userIdentifier = getUserIdentifier(authUser);
    if (
      !this.isPrivilegedUser(authUser) &&
      assignment.memberId !== userIdentifier
    ) {
      throw new ForbiddenException(
        ERROR_MESSAGES.UnauthorizedExperienceAccess,
      );
    }

    const experiences = await this.db.memberExperience.findMany({
      where: { engagementAssignmentId: assignmentId },
      orderBy: { createdAt: "desc" },
    });

    return experiences.map((experience) =>
      this.transformToResponseDto(experience),
    );
  }

  async findOne(
    experienceId: string,
    authUser: Record<string, any>,
  ): Promise<MemberExperienceResponseDto> {
    const experience = await this.db.memberExperience.findUnique({
      where: { id: experienceId },
      include: { assignment: true },
    });

    if (!experience) {
      throw new NotFoundException(ERROR_MESSAGES.MemberExperienceNotFound);
    }

    const userIdentifier = getUserIdentifier(authUser);
    if (
      !this.isPrivilegedUser(authUser) &&
      experience.assignment.memberId !== userIdentifier
    ) {
      throw new ForbiddenException(
        ERROR_MESSAGES.UnauthorizedExperienceAccess,
      );
    }

    return this.transformToResponseDto(experience);
  }

  private async validateAssignment(
    engagementId: string,
    assignmentId: string,
  ): Promise<EngagementAssignment> {
    const assignment = await this.db.engagementAssignment.findUnique({
      where: { id: assignmentId },
    });

    if (!assignment) {
      throw new NotFoundException(ERROR_MESSAGES.AssignmentNotFound);
    }

    if (assignment.engagementId !== engagementId) {
      throw new BadRequestException(
        ERROR_MESSAGES.AssignmentEngagementMismatch,
      );
    }

    return assignment;
  }

  private assertMemberOwnsAssignment(
    assignment: EngagementAssignment,
    authUser: Record<string, any>,
  ) {
    const userIdentifier = getUserIdentifier(authUser);

    if (assignment.memberId !== userIdentifier) {
      throw new ForbiddenException(
        "You can only document experiences for your own assignments",
      );
    }
  }

  private isPrivilegedUser(authUser: Record<string, any>): boolean {
    if (authUser?.isMachine) {
      return true;
    }

    const roles = getUserRoles(authUser);
    return roles.some((role) =>
      this.privilegedRoles.has(role?.toLowerCase()),
    );
  }

  private transformToResponseDto(
    experience: MemberExperience,
  ): MemberExperienceResponseDto {
    return {
      id: experience.id,
      engagementAssignmentId: experience.engagementAssignmentId,
      experienceText: experience.experienceText,
      createdAt: experience.createdAt,
      updatedAt: experience.updatedAt,
    };
  }
}
