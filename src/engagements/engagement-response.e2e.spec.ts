import { INestApplication, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import {
  AnticipatedStart,
  EngagementStatus,
  Role,
  Workload,
} from "@prisma/client";
import * as request from "supertest";
import { AppModule } from "../app.module";
import { DbService } from "../db/db.service";

jest.mock("nanoid", () => ({
  nanoid: () => "test-id",
}));

const tokenFixtures: Record<string, Record<string, any>> = {
  "m2m-read": {
    isMachine: true,
    scopes: ["read:engagements"],
  },
  "member-assigned": {
    userId: "123456",
    handle: "testaws1",
    roles: [],
  },
  "member-unassigned": {
    userId: "999999",
    handle: "someone_else",
    roles: [],
  },
};

describe("Engagement Response (e2e)", () => {
  let app: INestApplication;

  const dbServiceMock = {
    engagement: {
      findUnique: jest.fn(),
    },
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
    app.setGlobalPrefix("v6/engagements");

    app.use((req, _res, next) => {
      const header = req.headers?.authorization;
      if (!header) {
        return next();
      }

      const token = header.replace(/^Bearer\s+/i, "");
      const authUser = tokenFixtures[token];
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
    dbServiceMock.engagement.findUnique.mockReset();
    dbServiceMock.engagement.findUnique.mockResolvedValue({
      id: "eng-1",
      projectId: "proj-1",
      title: "Test engagement",
      description: "Test description",
      timeZones: ["UTC"],
      countries: ["US"],
      requiredSkills: ["skill-1"],
      anticipatedStart: AnticipatedStart.IMMEDIATE,
      status: EngagementStatus.OPEN,
      createdAt: new Date("2025-01-01T00:00:00.000Z"),
      updatedAt: new Date("2025-01-02T00:00:00.000Z"),
      createdBy: "123456",
      isPrivate: false,
      role: Role.SOFTWARE_DEVELOPER,
      workload: Workload.FULL_TIME,
      compensationRange: null,
      assignments: [],
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns enum fields and compensation range in the response", async () => {
    const response = await request(app.getHttpServer())
      .get("/v6/engagements/engagements/eng-1")
      .set("Authorization", "Bearer m2m-read")
      .expect(200);

    expect(response.body).toHaveProperty("role");
    expect(response.body).toHaveProperty("workload");
    expect(response.body).toHaveProperty("compensationRange");
    expect(typeof response.body.role).toBe("string");
    expect(typeof response.body.workload).toBe("string");
    expect(response.body.role).toBe(Role.SOFTWARE_DEVELOPER);
    expect(response.body.workload).toBe(Workload.FULL_TIME);
    expect(response.body.compensationRange).toBeNull();
  });

  it("allows an assigned member to view a private engagement", async () => {
    const privateEngagement = {
      id: "eng-private",
      projectId: "proj-1",
      title: "Private engagement",
      description: "Private description",
      timeZones: ["UTC"],
      countries: ["US"],
      requiredSkills: ["skill-1"],
      anticipatedStart: AnticipatedStart.IMMEDIATE,
      status: EngagementStatus.OPEN,
      createdAt: new Date("2025-01-01T00:00:00.000Z"),
      updatedAt: new Date("2025-01-02T00:00:00.000Z"),
      createdBy: "654321",
      isPrivate: true,
      role: Role.SOFTWARE_DEVELOPER,
      workload: Workload.FULL_TIME,
      compensationRange: null,
      assignments: [
        {
          id: "assignment-1",
          engagementId: "eng-private",
          memberId: "123456",
          memberHandle: "testaws1",
          status: "SELECTED",
          agreementRate: "400",
          otherRemarks: "remarks",
          terminationReason: null,
          startDate: null,
          endDate: null,
          createdAt: new Date("2025-01-01T00:00:00.000Z"),
          updatedAt: new Date("2025-01-02T00:00:00.000Z"),
        },
      ],
    };

    dbServiceMock.engagement.findUnique
      .mockResolvedValueOnce(privateEngagement)
      .mockResolvedValueOnce(privateEngagement);

    const response = await request(app.getHttpServer())
      .get("/v6/engagements/engagements/eng-private")
      .set("Authorization", "Bearer member-assigned")
      .expect(200);

    expect(response.body.isPrivate).toBe(true);
    expect(response.body.assignments).toHaveLength(1);
    expect(response.body.assignments[0].memberId).toBe("123456");
    expect(dbServiceMock.engagement.findUnique).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        include: {
          assignments: {
            where: {
              memberId: "123456",
            },
          },
        },
      }),
    );
  });

  it("rejects an unassigned member when viewing a private engagement", async () => {
    const privateEngagement = {
      id: "eng-private",
      projectId: "proj-1",
      title: "Private engagement",
      description: "Private description",
      timeZones: ["UTC"],
      countries: ["US"],
      requiredSkills: ["skill-1"],
      anticipatedStart: AnticipatedStart.IMMEDIATE,
      status: EngagementStatus.OPEN,
      createdAt: new Date("2025-01-01T00:00:00.000Z"),
      updatedAt: new Date("2025-01-02T00:00:00.000Z"),
      createdBy: "654321",
      isPrivate: true,
      role: Role.SOFTWARE_DEVELOPER,
      workload: Workload.FULL_TIME,
      compensationRange: null,
      assignments: [
        {
          id: "assignment-1",
          engagementId: "eng-private",
          memberId: "123456",
          memberHandle: "testaws1",
          status: "SELECTED",
          agreementRate: "400",
          otherRemarks: "remarks",
          terminationReason: null,
          startDate: null,
          endDate: null,
          createdAt: new Date("2025-01-01T00:00:00.000Z"),
          updatedAt: new Date("2025-01-02T00:00:00.000Z"),
        },
      ],
    };

    dbServiceMock.engagement.findUnique
      .mockResolvedValueOnce(privateEngagement)
      .mockResolvedValueOnce({
        ...privateEngagement,
        assignments: [],
      });

    const response = await request(app.getHttpServer())
      .get("/v6/engagements/engagements/eng-private")
      .set("Authorization", "Bearer member-unassigned")
      .expect(401);

    expect(response.body.message).toBe(
      "You are not authorized to access this private engagement.",
    );
  });
});
