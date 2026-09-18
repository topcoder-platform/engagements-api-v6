import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { EngagementManager, TimesheetAuditAction } from "@prisma/client";
import { nanoid } from "nanoid";
import { ERROR_MESSAGES } from "../../common/constants";
import { getUserIdentifier, normalizeUserId } from "../../common/user.util";
import { DbService } from "../../db/db.service";
import { MemberService } from "../../integrations/member.service";
import {
  TimesheetAccessService,
  TimesheetActorRole,
  TimesheetAuditService,
} from "../../timesheets";
import { EngagementManagerResponseDto } from "./dto";

@Injectable()
export class EngagementManagersService {
  private readonly logger = new Logger(EngagementManagersService.name);

  constructor(
    private readonly db: DbService,
    private readonly memberService: MemberService,
    private readonly access: TimesheetAccessService,
    private readonly audit: TimesheetAuditService,
  ) {}

  /**
   * Lists the engagement's current managers.
   *
   * Readable by an administrator, by a manager of the engagement, and by a member assigned to it -
   * assignees need this list because their own timesheet header displays their managers.
   */
  async findAll(
    engagementId: string,
    authUser?: Record<string, any>,
  ): Promise<EngagementManagerResponseDto[]> {
    await this.assertEngagementExists(engagementId);
    await this.assertCanRead(engagementId, authUser);

    const managers = await this.db.engagementManager.findMany({
      where: { engagementId, removedAt: null },
      orderBy: { createdAt: "asc" },
    });

    return managers.map((manager) => this.toResponseDto(manager));
  }

  /**
   * Grants a member timesheet approval authority on the engagement.
   *
   * Keyed on the user id, which is what authority is actually checked against. The handle and name
   * are denormalized display fields: callers that already resolved the member - both front ends pick
   * from a member search - send them, and nothing has to be looked up. A caller that has only a user
   * id gets the handle resolved here, because the stored handle cannot be empty.
   */
  async assign(
    engagementId: string,
    input: { userId: string; handle?: string; name?: string },
    authUser?: Record<string, any>,
  ): Promise<EngagementManagerResponseDto> {
    await this.assertEngagementExists(engagementId);
    this.assertCanChange(authUser);

    const managerUserId = normalizeUserId(input.userId?.trim());
    if (!managerUserId) {
      throw new BadRequestException(ERROR_MESSAGES.ManagerUserIdRequired);
    }

    const member = await this.resolveManagerIdentity(managerUserId, input);

    const existing = await this.db.engagementManager.findUnique({
      where: {
        engagementId_managerUserId: {
          engagementId,
          managerUserId,
        },
      },
    });

    // An active row is a duplicate. A soft-removed row is not: it keeps the slot, so re-adding a
    // previously removed manager reactivates that row instead of hitting the unique constraint.
    if (existing && !existing.removedAt) {
      throw new ConflictException(ERROR_MESSAGES.DuplicateEngagementManager);
    }

    const actorUserId = getUserIdentifier(authUser);
    const actorHandle = authUser?.handle ?? null;

    const manager = await this.db.$transaction(async (tx) => {
      const saved = existing
        ? await tx.engagementManager.update({
            where: { id: existing.id },
            data: {
              managerHandle: member.handle,
              managerName: member.name,
              createdBy: actorUserId,
              removedAt: null,
              removedBy: null,
            },
          })
        : await tx.engagementManager.create({
            data: {
              id: nanoid(),
              engagementId,
              managerUserId,
              managerHandle: member.handle,
              managerName: member.name,
              createdBy: actorUserId,
            },
          });

      await this.audit.record(tx, {
        engagementId,
        action: TimesheetAuditAction.MANAGER_ASSIGNED,
        previousValues: existing
          ? {
              managerUserId: existing.managerUserId,
              managerHandle: existing.managerHandle,
              removedAt: existing.removedAt?.toISOString() ?? null,
            }
          : null,
        updatedValues: {
          managerUserId: saved.managerUserId,
          managerHandle: saved.managerHandle,
          managerName: saved.managerName,
        },
        actorUserId,
        actorHandle,
        actorRole: TimesheetActorRole.Administrator,
      });

      return saved;
    });

    this.logger.log(
      `Assigned manager ${manager.managerHandle} to engagement ${engagementId}`,
    );

    return this.toResponseDto(manager);
  }

  /**
   * Revokes a manager's approval authority.
   *
   * Soft delete: the row stays so the approval records that name this manager keep their attribution
   * and the audit history survives. Authority is `removedAt IS NULL`, so removal takes effect on the
   * manager's next request with no cache to wait out.
   */
  async remove(
    engagementId: string,
    managerUserId: string,
    authUser?: Record<string, any>,
  ): Promise<void> {
    await this.assertEngagementExists(engagementId);
    this.assertCanChange(authUser);

    const normalizedManagerUserId = normalizeUserId(managerUserId);
    const existing = normalizedManagerUserId
      ? await this.db.engagementManager.findUnique({
          where: {
            engagementId_managerUserId: {
              engagementId,
              managerUserId: normalizedManagerUserId,
            },
          },
        })
      : null;

    if (!existing || existing.removedAt) {
      throw new NotFoundException(ERROR_MESSAGES.EngagementManagerNotFound);
    }

    const actorUserId = getUserIdentifier(authUser);
    const actorHandle = authUser?.handle ?? null;
    const removedAt = new Date();

    await this.db.$transaction(async (tx) => {
      await tx.engagementManager.update({
        where: { id: existing.id },
        data: { removedAt, removedBy: actorUserId },
      });

      await this.audit.record(tx, {
        engagementId,
        action: TimesheetAuditAction.MANAGER_REMOVED,
        previousValues: {
          managerUserId: existing.managerUserId,
          managerHandle: existing.managerHandle,
          removedAt: null,
        },
        updatedValues: {
          managerUserId: existing.managerUserId,
          managerHandle: existing.managerHandle,
          removedAt: removedAt.toISOString(),
        },
        actorUserId,
        actorHandle,
        actorRole: TimesheetActorRole.Administrator,
      });
    });

    this.logger.log(
      `Removed manager ${existing.managerHandle} from engagement ${engagementId}`,
    );
  }

  /**
   * Current managers for several engagements at once, keyed by engagement id. Used to attach managers
   * to engagement and assignment responses without a query per row.
   */
  async findByEngagementIds(
    engagementIds: string[],
  ): Promise<Map<string, EngagementManagerResponseDto[]>> {
    return this.access.findActiveManagers(engagementIds);
  }

  private toResponseDto(
    manager: EngagementManager,
  ): EngagementManagerResponseDto {
    return {
      userId: manager.managerUserId,
      handle: manager.managerHandle,
      name: manager.managerName ?? null,
    };
  }

  /**
   * Settles the handle and name to store for a manager.
   *
   * A supplied handle is taken as-is: it is a display field, and the front ends only ever send one
   * they picked out of a member search. Only a caller that omits it pays for a member-API lookup.
   */
  private async resolveManagerIdentity(
    managerUserId: string,
    input: { handle?: string; name?: string },
  ): Promise<{ handle: string; name: string | null }> {
    const suppliedHandle = input.handle?.trim();
    if (suppliedHandle) {
      return {
        handle: suppliedHandle,
        name: input.name?.trim() || null,
      };
    }

    const resolvedHandle =
      await this.memberService.getMemberHandleByUserId(managerUserId);
    if (!resolvedHandle) {
      throw new BadRequestException(
        `${ERROR_MESSAGES.ManagerHandleUnresolved} (${managerUserId})`,
      );
    }

    return {
      handle: resolvedHandle,
      name: input.name?.trim() || null,
    };
  }

  private async assertEngagementExists(engagementId: string): Promise<void> {
    const engagement = await this.db.engagement.findUnique({
      where: { id: engagementId },
      select: { id: true },
    });

    if (!engagement) {
      throw new NotFoundException(ERROR_MESSAGES.EngagementNotFound);
    }
  }

  private assertCanChange(authUser?: Record<string, any>): void {
    if (!this.access.isAdministrator(authUser)) {
      throw new ForbiddenException(ERROR_MESSAGES.UnauthorizedManagerChange);
    }
  }

  private async assertCanRead(
    engagementId: string,
    authUser?: Record<string, any>,
  ): Promise<void> {
    if (this.access.isAdministrator(authUser)) {
      return;
    }

    const userId = normalizeUserId(authUser?.userId);
    if (!userId) {
      throw new ForbiddenException(ERROR_MESSAGES.UnauthorizedManagerRead);
    }

    if (await this.access.isEngagementManager(userId, engagementId)) {
      return;
    }

    const assignment = await this.db.engagementAssignment.findFirst({
      where: { engagementId, memberId: userId },
      select: { id: true },
    });

    if (!assignment) {
      throw new ForbiddenException(ERROR_MESSAGES.UnauthorizedManagerRead);
    }
  }
}
