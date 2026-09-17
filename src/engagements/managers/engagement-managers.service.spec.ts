import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import { TimesheetAuditAction } from "@prisma/client";
import { UserRoles } from "../../app-constants";
import { DbService } from "../../db/db.service";
import { MemberService } from "../../integrations/member.service";
import {
  TimesheetAccessService,
  TimesheetAuditService,
} from "../../timesheets";
import { EngagementManagersService } from "./engagement-managers.service";

jest.mock("nanoid", () => ({
  nanoid: () => "manager-row-id",
}));

describe("EngagementManagersService", () => {
  let service: EngagementManagersService;
  let db: {
    engagement: { findUnique: jest.Mock };
    engagementAssignment: { findFirst: jest.Mock };
    engagementManager: {
      findUnique: jest.Mock;
      findFirst: jest.Mock;
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
    };
    $transaction: jest.Mock;
  };
  let memberService: { getMemberHandleByUserId: jest.Mock };
  let audit: { record: jest.Mock };

  const admin = {
    userId: "3003",
    handle: "adminuser",
    roles: [UserRoles.Admin],
  };
  const member = { userId: "1001", handle: "johnsmith", roles: [] };
  const outsider = { userId: "9009", handle: "someone", roles: [] };

  const activeManagerRow = {
    id: "mgr-row",
    engagementId: "eng1",
    managerUserId: "2002",
    managerHandle: "maryj",
    managerName: "Mary Jones",
    createdAt: new Date("2026-09-01T00:00:00.000Z"),
    createdBy: "3003",
    removedAt: null,
    removedBy: null,
  };

  beforeEach(() => {
    db = {
      engagement: { findUnique: jest.fn().mockResolvedValue({ id: "eng1" }) },
      engagementAssignment: { findFirst: jest.fn().mockResolvedValue(null) },
      engagementManager: {
        findUnique: jest.fn().mockResolvedValue(null),
        findFirst: jest.fn().mockResolvedValue(null),
        findMany: jest.fn().mockResolvedValue([]),
        create: jest.fn(),
        update: jest.fn(),
      },
      // Run the callback against the same mock, the way an interactive transaction would.
      $transaction: jest.fn((callback: (tx: unknown) => unknown) =>
        Promise.resolve(callback(db)),
      ),
    };
    memberService = {
      getMemberHandleByUserId: jest.fn().mockResolvedValue("maryj"),
    };
    audit = { record: jest.fn().mockResolvedValue(undefined) };

    service = new EngagementManagersService(
      db as unknown as DbService,
      memberService as unknown as MemberService,
      new TimesheetAccessService(db as unknown as DbService),
      audit as unknown as TimesheetAuditService,
    );
  });

  describe("assign", () => {
    const selection = { userId: "2002", handle: "maryj", name: "Mary Jones" };

    it("assigns a manager by user id and records the audit inside the transaction", async () => {
      db.engagementManager.create.mockResolvedValue(activeManagerRow);

      const result = await service.assign("eng1", selection, admin);

      expect(result).toEqual({
        userId: "2002",
        handle: "maryj",
        name: "Mary Jones",
      });
      expect(db.engagementManager.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          engagementId: "eng1",
          managerUserId: "2002",
          managerHandle: "maryj",
          managerName: "Mary Jones",
          createdBy: "3003",
        }),
      });
      expect(audit.record).toHaveBeenCalledWith(
        db,
        expect.objectContaining({
          engagementId: "eng1",
          action: TimesheetAuditAction.MANAGER_ASSIGNED,
          actorUserId: "3003",
          actorHandle: "adminuser",
          actorRole: "ADMINISTRATOR",
        }),
      );
    });

    it("does not call the member API when the caller already resolved the member", async () => {
      db.engagementManager.create.mockResolvedValue(activeManagerRow);

      await service.assign("eng1", selection, admin);

      expect(memberService.getMemberHandleByUserId).not.toHaveBeenCalled();
    });

    it("trims the submitted values", async () => {
      db.engagementManager.create.mockResolvedValue(activeManagerRow);

      await service.assign(
        "eng1",
        { userId: " 2002 ", handle: "  maryj  ", name: "  Mary Jones  " },
        admin,
      );

      expect(db.engagementManager.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          managerUserId: "2002",
          managerHandle: "maryj",
          managerName: "Mary Jones",
        }),
      });
    });

    it("resolves the handle when the caller sends only a user id", async () => {
      db.engagementManager.create.mockResolvedValue(activeManagerRow);

      await service.assign("eng1", { userId: "2002" }, admin);

      expect(memberService.getMemberHandleByUserId).toHaveBeenCalledWith(
        "2002",
      );
      expect(db.engagementManager.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          managerHandle: "maryj",
          managerName: null,
        }),
      });
    });

    it("rejects a user id with no resolvable handle", async () => {
      memberService.getMemberHandleByUserId.mockResolvedValue(null);

      await expect(
        service.assign("eng1", { userId: "404404" }, admin),
      ).rejects.toThrow(/404404/);
      expect(db.engagementManager.create).not.toHaveBeenCalled();
    });

    it("rejects a missing user id without calling the member API", async () => {
      await expect(
        service.assign("eng1", { userId: "   " }, admin),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(memberService.getMemberHandleByUserId).not.toHaveBeenCalled();
    });

    it("rejects a duplicate assignment without creating a second row", async () => {
      db.engagementManager.findUnique.mockResolvedValue(activeManagerRow);

      await expect(
        service.assign("eng1", selection, admin),
      ).rejects.toBeInstanceOf(ConflictException);
      expect(db.engagementManager.create).not.toHaveBeenCalled();
      expect(db.engagementManager.update).not.toHaveBeenCalled();
    });

    it("reactivates a soft-removed row instead of inserting a duplicate", async () => {
      db.engagementManager.findUnique.mockResolvedValue({
        ...activeManagerRow,
        removedAt: new Date("2026-09-10T00:00:00.000Z"),
        removedBy: "3003",
      });
      db.engagementManager.update.mockResolvedValue(activeManagerRow);

      const result = await service.assign("eng1", selection, admin);

      expect(result.handle).toBe("maryj");
      expect(db.engagementManager.create).not.toHaveBeenCalled();
      expect(db.engagementManager.update).toHaveBeenCalledWith({
        where: { id: "mgr-row" },
        data: expect.objectContaining({ removedAt: null, removedBy: null }),
      });
    });

    it("refuses a non-administrator", async () => {
      await expect(
        service.assign("eng1", selection, member),
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(memberService.getMemberHandleByUserId).not.toHaveBeenCalled();
    });

    it("404s for an unknown engagement", async () => {
      db.engagement.findUnique.mockResolvedValue(null);

      await expect(
        service.assign("missing", selection, admin),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe("remove", () => {
    it("soft-deletes and records the audit inside the transaction", async () => {
      db.engagementManager.findUnique.mockResolvedValue(activeManagerRow);
      db.engagementManager.update.mockResolvedValue({
        ...activeManagerRow,
        removedAt: new Date(),
      });

      await service.remove("eng1", "2002", admin);

      expect(db.engagementManager.update).toHaveBeenCalledWith({
        where: { id: "mgr-row" },
        data: expect.objectContaining({ removedBy: "3003" }),
      });
      expect(
        db.engagementManager.update.mock.calls[0][0].data.removedAt,
      ).toBeInstanceOf(Date);
      expect(audit.record).toHaveBeenCalledWith(
        db,
        expect.objectContaining({
          engagementId: "eng1",
          action: TimesheetAuditAction.MANAGER_REMOVED,
          actorUserId: "3003",
          actorRole: "ADMINISTRATOR",
        }),
      );
    });

    it("404s when the member is not a manager", async () => {
      db.engagementManager.findUnique.mockResolvedValue(null);

      await expect(
        service.remove("eng1", "2002", admin),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("404s when the manager was already removed", async () => {
      db.engagementManager.findUnique.mockResolvedValue({
        ...activeManagerRow,
        removedAt: new Date(),
      });

      await expect(
        service.remove("eng1", "2002", admin),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(db.engagementManager.update).not.toHaveBeenCalled();
    });

    it("refuses a non-administrator", async () => {
      await expect(
        service.remove("eng1", "2002", member),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe("findAll", () => {
    it("returns current managers for an administrator", async () => {
      db.engagementManager.findMany.mockResolvedValue([activeManagerRow]);

      await expect(service.findAll("eng1", admin)).resolves.toEqual([
        { userId: "2002", handle: "maryj", name: "Mary Jones" },
      ]);
      expect(db.engagementManager.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { engagementId: "eng1", removedAt: null },
        }),
      );
    });

    it("lets an assigned member read their managers", async () => {
      db.engagementAssignment.findFirst.mockResolvedValue({ id: "asg1" });
      db.engagementManager.findMany.mockResolvedValue([activeManagerRow]);

      await expect(service.findAll("eng1", member)).resolves.toHaveLength(1);
    });

    it("lets a manager of the engagement read the list", async () => {
      db.engagementManager.findFirst.mockResolvedValue({ id: "mgr-row" });
      db.engagementManager.findMany.mockResolvedValue([activeManagerRow]);

      await expect(
        service.findAll("eng1", { userId: "2002", roles: [] }),
      ).resolves.toHaveLength(1);
    });

    it("refuses a caller with no relationship to the engagement", async () => {
      await expect(service.findAll("eng1", outsider)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });

    it("refuses an unauthenticated caller", async () => {
      await expect(service.findAll("eng1", undefined)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });
  });

  describe("findByEngagementIds", () => {
    it("groups current managers by engagement", async () => {
      db.engagementManager.findMany.mockResolvedValue([
        activeManagerRow,
        {
          ...activeManagerRow,
          managerUserId: "2003",
          managerHandle: "robertl",
        },
        { ...activeManagerRow, engagementId: "eng2", managerUserId: "2004" },
      ]);

      const result = await service.findByEngagementIds(["eng1", "eng2"]);

      expect(result.get("eng1")).toHaveLength(2);
      expect(result.get("eng2")).toHaveLength(1);
    });

    it("does not query when given no ids", async () => {
      const result = await service.findByEngagementIds([]);

      expect(result.size).toBe(0);
      expect(db.engagementManager.findMany).not.toHaveBeenCalled();
    });
  });
});
