import {
  INestApplication,
  UnauthorizedException,
  ValidationPipe,
} from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AssignmentStatus, Prisma, TimesheetEntryStatus } from "@prisma/client";
import * as request from "supertest";
import { AppModule } from "../app.module";
import { UserRoles } from "../app-constants";
import { DbService } from "../db/db.service";

jest.mock("nanoid", () => ({ nanoid: () => "test-id" }));

/**
 * The guarantee under test is "direct URL manipulation must not provide access to unauthorized
 * timesheets". That is a property of the whole role x endpoint matrix rather than of any one handler,
 * so it gets a suite of its own instead of a case tacked onto each endpoint's tests.
 */
const tokens: Record<string, Record<string, any>> = {
  assignee: { userId: "1001", handle: "johnsmith", roles: [] },
  "other-member": { userId: "9009", handle: "someone", roles: [] },
  "assigned-manager": { userId: "2002", handle: "maryj", roles: [] },
  "unassigned-manager": { userId: "2003", handle: "robertl", roles: [] },
  administrator: {
    userId: "3003",
    handle: "adminuser",
    roles: [UserRoles.Admin],
  },
  "platform-manager": {
    userId: "4004",
    handle: "pmuser",
    roles: [UserRoles.ProjectManager],
  },
  "m2m-read": { isMachine: true, scopes: ["read:timesheets"] },
  "m2m-manage": { isMachine: true, scopes: ["manage:timesheets"] },
};

const BASE = "/v6/engagements/engagements/eng-1/assignments/asg-1/timesheets";

describe("Timesheet authorization (e2e)", () => {
  let app: INestApplication;

  const assignment = {
    id: "asg-1",
    engagementId: "eng-1",
    memberId: "1001",
    memberHandle: "johnsmith",
    status: AssignmentStatus.ASSIGNED,
    standardHoursPerDay: 8,
    startDate: new Date("2026-09-01T00:00:00.000Z"),
    endDate: new Date("2026-09-30T00:00:00.000Z"),
    engagement: { id: "eng-1", title: "Senior Frontend Engineer" },
  };

  const submittedEntry = {
    id: "entry-1",
    engagementAssignmentId: "asg-1",
    workDate: new Date("2026-09-07T00:00:00.000Z"),
    hoursWorked: new Prisma.Decimal("8.50"),
    remarks: "Sprint planning",
    status: TimesheetEntryStatus.SUBMITTED,
    submittedAt: new Date("2026-09-08T00:00:00.000Z"),
    submittedBy: "1001",
    approvedAt: null,
    approvedBy: null,
    approvedByHandle: null,
    approvalComment: null,
    reopenedAt: null,
    paidPaymentReference: null,
  };

  const dbServiceMock = {
    engagementAssignment: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
    engagementManager: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
    engagementTimesheetEntry: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      groupBy: jest.fn(),
    },
    engagementTimesheetAudit: { create: jest.fn() },
    $transaction: jest.fn(),
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DbService)
      .useValue(dbServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    // Mirrors main.ts: DTO validation and whitelisting are what enforce required fields and drop
    // unknown ones, so the suite has to run with the same pipe production does.
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    app.setGlobalPrefix("v6/engagements");

    app.use((req: any, _res: unknown, next: (error?: unknown) => void) => {
      const header = req.headers?.authorization;
      if (!header) {
        return next();
      }

      const authUser = tokens[header.replace(/^Bearer\s+/i, "")];
      if (!authUser) {
        return next(new UnauthorizedException("Invalid token"));
      }

      req.authUser = authUser;
      delete req.headers.authorization;
      return next();
    });

    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    dbServiceMock.engagementAssignment.findUnique.mockResolvedValue(assignment);
    dbServiceMock.engagementAssignment.findMany.mockResolvedValue([]);
    dbServiceMock.engagementAssignment.count.mockResolvedValue(0);
    // Only maryj holds a live manager row on eng-1.
    dbServiceMock.engagementManager.findFirst.mockImplementation(
      ({ where }: any) =>
        Promise.resolve(
          where.managerUserId === "2002" && where.engagementId === "eng-1"
            ? { id: "mgr-row" }
            : null,
        ),
    );
    dbServiceMock.engagementManager.findMany.mockResolvedValue([]);
    dbServiceMock.engagementTimesheetEntry.findMany.mockResolvedValue([
      submittedEntry,
    ]);
    dbServiceMock.engagementTimesheetEntry.updateMany.mockResolvedValue({
      count: 1,
    });
    dbServiceMock.engagementTimesheetEntry.update.mockResolvedValue(
      submittedEntry,
    );
    dbServiceMock.engagementTimesheetEntry.groupBy.mockResolvedValue([]);
    dbServiceMock.$transaction.mockImplementation((callback: any) =>
      Promise.resolve(callback(dbServiceMock)),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  const get = (token?: string) => {
    const call = request(app.getHttpServer()).get(BASE);
    return token ? call.set("Authorization", `Bearer ${token}`) : call;
  };

  describe("read access", () => {
    it.each([
      ["the assignee", "assignee", "MEMBER"],
      ["an assigned manager", "assigned-manager", "MANAGER"],
      ["an administrator", "administrator", "ADMINISTRATOR"],
      ["a machine token with the manage scope", "m2m-manage", "ADMINISTRATOR"],
    ])(
      "lets %s read, reporting viewerRole %s",
      async (_label, token, viewerRole) => {
        const response = await get(token).expect(200);

        expect(response.body.viewerRole).toBe(viewerRole);
      },
    );

    it("treats a platform manager role as an administrator, not a manager", async () => {
      const response = await get("platform-manager").expect(200);

      expect(response.body.viewerRole).toBe("ADMINISTRATOR");
    });

    it.each([
      ["another member reading someone else's timesheet", "other-member"],
      ["a manager with no row on this engagement", "unassigned-manager"],
      ["a machine token without the manage scope", "m2m-read"],
    ])("404s for %s", async (_label, token) => {
      const response = await get(token).expect(404);

      // The message must not distinguish "does not exist" from "not yours", or assignment ids could
      // be enumerated by probing.
      expect(response.body.message).toBe("Timesheet not found");
    });

    it("401s an anonymous caller", async () => {
      await get().expect(401);
    });

    it("404s when the assignment belongs to a different engagement in the path", async () => {
      await request(app.getHttpServer())
        .get(
          "/v6/engagements/engagements/eng-other/assignments/asg-1/timesheets",
        )
        .set("Authorization", "Bearer assignee")
        .expect(404);
    });

    it("stops a manager whose row was removed", async () => {
      dbServiceMock.engagementManager.findFirst.mockResolvedValue(null);

      await get("assigned-manager").expect(404);
    });
  });

  describe("write access", () => {
    const put = (token: string) =>
      request(app.getHttpServer())
        .put(`${BASE}/entries`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          entries: [{ workDate: "2026-09-07", hoursWorked: "8.5" }],
        });

    it("lets the assignee save entries", async () => {
      await put("assignee").expect(200);
    });

    it("403s an assigned manager: approving is their power, editing is not", async () => {
      await put("assigned-manager").expect(403);
    });

    it("404s an unrelated member", async () => {
      await put("other-member").expect(404);
    });

    it("404s a manager of another engagement", async () => {
      await put("unassigned-manager").expect(404);
    });

    it("accepts a cleared remark", async () => {
      dbServiceMock.engagementTimesheetEntry.findMany.mockResolvedValue([]);
      dbServiceMock.engagementTimesheetEntry.create.mockResolvedValue({
        ...submittedEntry,
        remarks: null,
      });

      await request(app.getHttpServer())
        .put(`${BASE}/entries`)
        .set("Authorization", "Bearer assignee")
        .send({
          entries: [
            { workDate: "2026-09-07", hoursWorked: "8.5", remarks: null },
          ],
        })
        .expect(200);
    });

    it("ignores a status the client sends", async () => {
      dbServiceMock.engagementTimesheetEntry.findMany.mockResolvedValue([]);
      dbServiceMock.engagementTimesheetEntry.create.mockResolvedValue(
        submittedEntry,
      );

      await request(app.getHttpServer())
        .put(`${BASE}/entries`)
        .set("Authorization", "Bearer assignee")
        .send({
          entries: [
            {
              workDate: "2026-09-07",
              hoursWorked: "8.5",
              status: TimesheetEntryStatus.APPROVED,
            },
          ],
        })
        .expect(200);

      const { data } =
        dbServiceMock.engagementTimesheetEntry.create.mock.calls[0][0];
      expect(data.status).toBe(TimesheetEntryStatus.DRAFT);
    });
  });

  describe("approval access", () => {
    const approve = (token: string, body?: Record<string, unknown>) =>
      request(app.getHttpServer())
        .post(`${BASE}/approve`)
        .set("Authorization", `Bearer ${token}`)
        .send({ entryIds: ["entry-1"], approvalComment: "ok", ...body });

    it("lets an assigned manager approve", async () => {
      await approve("assigned-manager").expect(201);
    });

    it("403s the assignee approving their own hours", async () => {
      await approve("assignee").expect(403);
    });

    it("404s a manager of another engagement", async () => {
      await approve("unassigned-manager").expect(404);
    });

    it("400s an administrator approving with no override reason", async () => {
      await approve("administrator").expect(400);
    });

    it("lets an administrator approve with an override reason", async () => {
      await approve("administrator", {
        overrideReason: "Manager on leave",
      }).expect(201);
    });

    it("400s an approval with no comment", async () => {
      await request(app.getHttpServer())
        .post(`${BASE}/approve`)
        .set("Authorization", "Bearer assigned-manager")
        .send({ entryIds: ["entry-1"] })
        .expect(400);
    });
  });

  describe("administrator-only access", () => {
    const reopen = (token: string) =>
      request(app.getHttpServer())
        .post(`${BASE}/reopen`)
        .set("Authorization", `Bearer ${token}`)
        .send({ entryIds: ["entry-1"], overrideReason: "Wrong hours" });

    it("lets an administrator reopen", async () => {
      dbServiceMock.engagementTimesheetEntry.findMany.mockResolvedValue([
        { ...submittedEntry, status: TimesheetEntryStatus.APPROVED },
      ]);

      await reopen("administrator").expect(201);
    });

    it("403s an assigned manager", async () => {
      await reopen("assigned-manager").expect(403);
    });

    it("403s the assignee", async () => {
      await reopen("assignee").expect(403);
    });

    it("404s an unrelated member", async () => {
      await reopen("other-member").expect(404);
    });
  });

  describe("landing list access", () => {
    it("scopes a manager's list to their own engagements", async () => {
      await request(app.getHttpServer())
        .get("/v6/engagements/timesheets/engagements")
        .set("Authorization", "Bearer assigned-manager")
        .expect(200);

      const { where } =
        dbServiceMock.engagementAssignment.findMany.mock.calls[0][0];
      expect(where.engagement.managers.some).toEqual({
        managerUserId: "2002",
        removedAt: null,
      });
    });

    it("does not scope an administrator's list by manager authority", async () => {
      await request(app.getHttpServer())
        .get("/v6/engagements/timesheets/engagements")
        .set("Authorization", "Bearer administrator")
        .expect(200);

      const { where } =
        dbServiceMock.engagementAssignment.findMany.mock.calls[0][0];
      expect(where.engagement).toBeUndefined();
    });

    it("401s an anonymous caller", async () => {
      await request(app.getHttpServer())
        .get("/v6/engagements/timesheets/engagements")
        .expect(401);
    });
  });
});
