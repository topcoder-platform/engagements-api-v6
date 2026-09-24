import { NotFoundException } from "@nestjs/common";
import { UserRoles } from "../app-constants";
import { DbService } from "../db/db.service";
import { TimesheetAccessService } from "./timesheet-access.service";
import { TimesheetViewerRole } from "./timesheet-roles";

describe("TimesheetAccessService", () => {
  let service: TimesheetAccessService;
  let findFirst: jest.Mock;

  const assignment = {
    id: "asg1",
    engagementId: "eng1",
    memberId: "1001",
  };

  const asManager = () => findFirst.mockResolvedValue({ id: "mgr1" });
  const asNotManager = () => findFirst.mockResolvedValue(null);

  beforeEach(() => {
    findFirst = jest.fn().mockResolvedValue(null);
    const db = {
      engagementManager: { findFirst },
    } as unknown as DbService;
    service = new TimesheetAccessService(db);
  });

  describe("resolveTimesheetRole", () => {
    it("resolves the assignee as MEMBER", async () => {
      asNotManager();

      await expect(
        service.resolveTimesheetRole({ userId: "1001" }, assignment),
      ).resolves.toBe(TimesheetViewerRole.Member);
    });

    it("resolves the assignee as MEMBER when the id arrives as a number", async () => {
      asNotManager();

      await expect(
        service.resolveTimesheetRole({ userId: 1001 }, assignment),
      ).resolves.toBe(TimesheetViewerRole.Member);
    });

    it("resolves an assigned manager as MANAGER", async () => {
      asManager();

      await expect(
        service.resolveTimesheetRole({ userId: "2002" }, assignment),
      ).resolves.toBe(TimesheetViewerRole.Manager);

      expect(findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            engagementId: "eng1",
            managerUserId: "2002",
            removedAt: null,
          },
        }),
      );
    });

    it("denies a removed manager", async () => {
      // A soft-removed row is excluded by the removedAt: null filter, so the lookup finds nothing.
      asNotManager();

      await expect(
        service.resolveTimesheetRole({ userId: "2002" }, assignment),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("denies an unrelated member with a 404 rather than a 403", async () => {
      asNotManager();

      await expect(
        service.resolveTimesheetRole({ userId: "9009" }, assignment),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("denies an unauthenticated caller", async () => {
      await expect(
        service.resolveTimesheetRole(undefined, assignment),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("resolves an Administrator role as ADMINISTRATOR", async () => {
      await expect(
        service.resolveTimesheetRole(
          { userId: "3003", roles: [UserRoles.Admin] },
          assignment,
        ),
      ).resolves.toBe(TimesheetViewerRole.Administrator);

      // Administrators short-circuit before the manager lookup.
      expect(findFirst).not.toHaveBeenCalled();
    });

    it("resolves a platform manager role as ADMINISTRATOR, not MANAGER", async () => {
      asNotManager();

      await expect(
        service.resolveTimesheetRole(
          { userId: "4004", roles: [UserRoles.ProjectManager] },
          assignment,
        ),
      ).resolves.toBe(TimesheetViewerRole.Administrator);
    });

    it("resolves a machine token with the manage scope as ADMINISTRATOR", async () => {
      await expect(
        service.resolveTimesheetRole(
          { isMachine: true, scopes: ["manage:timesheets"] },
          assignment,
        ),
      ).resolves.toBe(TimesheetViewerRole.Administrator);
    });

    it("denies a machine token without the manage scope", async () => {
      await expect(
        service.resolveTimesheetRole(
          { isMachine: true, scopes: ["read:timesheets"] },
          assignment,
        ),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("does not disclose whether the assignment exists", async () => {
      asNotManager();

      await expect(
        service.resolveTimesheetRole({ userId: "9009" }, assignment),
      ).rejects.toThrow("Timesheet not found");
    });

    it("prefers MEMBER over MANAGER when the assignee is also a manager", async () => {
      asManager();

      await expect(
        service.resolveTimesheetRole({ userId: "1001" }, assignment),
      ).resolves.toBe(TimesheetViewerRole.Member);
    });
  });

  describe("isAdministrator", () => {
    it("accepts every privileged platform role", () => {
      [
        UserRoles.Admin,
        UserRoles.ProjectManager,
        UserRoles.TaskManager,
        UserRoles.TalentManager,
      ].forEach((role) => {
        expect(service.isAdministrator({ roles: [role] })).toBe(true);
      });
    });

    it("is case insensitive", () => {
      expect(service.isAdministrator({ roles: ["administrator"] })).toBe(true);
    });

    it("rejects a plain member", () => {
      expect(service.isAdministrator({ roles: ["Topcoder User"] })).toBe(false);
    });

    it("rejects an undefined caller", () => {
      expect(service.isAdministrator(undefined)).toBe(false);
    });
  });

  describe("isEngagementManager", () => {
    it("excludes soft-removed rows", async () => {
      asNotManager();

      await expect(service.isEngagementManager("2002", "eng1")).resolves.toBe(
        false,
      );
      expect(findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ removedAt: null }),
        }),
      );
    });
  });
});
