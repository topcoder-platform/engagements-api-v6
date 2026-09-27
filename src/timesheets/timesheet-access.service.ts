import { Injectable, NotFoundException } from "@nestjs/common";
import { Scopes, TalentManagerRoles, UserRoles } from "../app-constants";
import { ERROR_MESSAGES } from "../common/constants";
import { getUserRoles, normalizeUserId } from "../common/user.util";
import { DbService } from "../db/db.service";
import { TimesheetViewerRole } from "./timesheet-roles";

/** A manager as displayed alongside a timesheet or an engagement. */
export interface EngagementManagerSummary {
  userId: string;
  handle: string;
  name: string | null;
}

/**
 * The subset of an engagement assignment needed to resolve timesheet access.
 */
export interface TimesheetAssignmentRef {
  id: string;
  engagementId: string;
  memberId: string;
}

@Injectable()
export class TimesheetAccessService {
  private static readonly administratorRoles = new Set([
    UserRoles.Admin.toLowerCase(),
  ]);

  private static readonly tmRoles = new Set(
    [...TalentManagerRoles].map((role) => role.toLowerCase()),
  );

  constructor(private readonly db: DbService) {}

  /**
   * Resolves the caller's relationship to one assignment's timesheet. Every timesheet endpoint must
   * call this before doing anything else.
   *
   * Order matters, first match wins:
   *   1. ADMINISTRATOR - a human administrator or a machine token with the manage scope.
   *   2. MEMBER        - the assignee themselves.
   *   3. MANAGER       - a live EngagementManager row for the assignment's engagement.
   *   4. TM            - a Task/Talent Manager platform role, read-only.
   *   5. otherwise     - NotFoundException.
   *
   * A caller with no relationship gets a 404, not a 403. A 403 would confirm that the assignment
   * exists, which is enough to enumerate assignment ids.
   */
  async resolveTimesheetRole(
    authUser: Record<string, any> | undefined,
    assignment: TimesheetAssignmentRef,
  ): Promise<TimesheetViewerRole> {
    if (this.isTimesheetAdmin(authUser)) {
      return TimesheetViewerRole.Administrator;
    }

    const userId = normalizeUserId(authUser?.userId);

    if (userId && userId === normalizeUserId(assignment.memberId)) {
      return TimesheetViewerRole.Member;
    }

    if (
      userId &&
      (await this.isEngagementManager(userId, assignment.engagementId))
    ) {
      return TimesheetViewerRole.Manager;
    }

    if (this.isTimesheetTm(authUser)) {
      return TimesheetViewerRole.Tm;
    }

    throw new NotFoundException(ERROR_MESSAGES.TimesheetNotFound);
  }

  /**
   * True when the caller is a timesheet administrator: a human Administrator or a machine token
   * carrying the manage scope.
   */
  isTimesheetAdmin(authUser?: Record<string, any>): boolean {
    if (!authUser) {
      return false;
    }

    if (authUser.isMachine) {
      return this.hasManageScope(authUser);
    }

    return getUserRoles(authUser).some((role) =>
      TimesheetAccessService.administratorRoles.has(role?.toLowerCase()),
    );
  }

  /** True when the caller holds a Task Manager or Talent Manager platform role. */
  isTimesheetTm(authUser?: Record<string, any>): boolean {
    if (!authUser) {
      return false;
    }

    return getUserRoles(authUser).some((role) =>
      TimesheetAccessService.tmRoles.has(role?.toLowerCase()),
    );
  }

  /** Backward-compatible alias for existing callers in the timesheets module. */
  isAdministrator(authUser?: Record<string, any>): boolean {
    return this.isTimesheetAdmin(authUser);
  }

  /** True when the caller may assign or remove engagement managers for timesheets. */
  canManageEngagementManagers(authUser?: Record<string, any>): boolean {
    return this.isTimesheetAdmin(authUser) || this.isTimesheetTm(authUser);
  }

  /**
   * True when the user currently holds approval authority on the engagement. A soft-removed manager
   * (removedAt set) holds none, which is what makes removal take effect on the next request.
   */
  async isEngagementManager(
    userId: string,
    engagementId: string,
  ): Promise<boolean> {
    const manager = await this.db.engagementManager.findFirst({
      where: {
        engagementId,
        managerUserId: userId,
        removedAt: null,
      },
      select: { id: true },
    });

    return Boolean(manager);
  }

  /**
   * Current managers for several engagements at once, keyed by engagement id.
   *
   * Lives here rather than in the manager registry because both the registry and the timesheet views
   * need it, and the timesheets module is the one both can depend on without a cycle.
   */
  async findActiveManagers(
    engagementIds: string[],
  ): Promise<Map<string, EngagementManagerSummary[]>> {
    const ids = Array.from(new Set(engagementIds.filter(Boolean)));
    const byEngagement = new Map<string, EngagementManagerSummary[]>();

    if (!ids.length) {
      return byEngagement;
    }

    const managers = await this.db.engagementManager.findMany({
      where: { engagementId: { in: ids }, removedAt: null },
      orderBy: { createdAt: "asc" },
    });

    managers.forEach((manager) => {
      const existing = byEngagement.get(manager.engagementId) ?? [];
      existing.push({
        userId: manager.managerUserId,
        handle: manager.managerHandle,
        name: manager.managerName ?? null,
      });
      byEngagement.set(manager.engagementId, existing);
    });

    return byEngagement;
  }

  private hasManageScope(authUser: Record<string, any>): boolean {
    const scopes: string[] = authUser.scopes ?? [];

    return scopes.some(
      (scope) => scope?.toLowerCase() === Scopes.ManageTimesheets,
    );
  }
}
