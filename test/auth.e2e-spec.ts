import { INestApplication, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { EngagementsService } from "../src/engagements/engagements.service";
import { ApplicationsService } from "../src/applications/applications.service";
import { UserRoles } from "../src/app-constants";

jest.mock("nanoid", () => ({
  nanoid: () => "test-id",
}));

const tokenFixtures: Record<string, Record<string, any>> = {
  "m2m-read": {
    isMachine: true,
    scopes: ["read:engagements", "read:applications"],
  },
  "m2m-write": {
    isMachine: true,
    scopes: ["write:engagements"],
  },
  "m2m-invalid": {
    isMachine: true,
    scopes: ["write:engagements"],
  },
  "admin-user": {
    isMachine: false,
    userId: "123456",
    roles: [UserRoles.Admin],
  },
  "member-user": {
    isMachine: false,
    userId: "654321",
    roles: ["Member"],
    scopes: ["read:engagements", "read:applications"],
  },
  "bare-user": {
    isMachine: false,
    userId: "999999",
  },
};

const validEngagementPayload = {
  projectId: "3d9b37b5-1a5d-4c48-a60f-5f73c2f7f1b6",
  title: "Test Engagement",
  description: "Build a new hiring portal for enterprise clients.",
  timeZones: ["UTC"],
  countries: ["US"],
  requiredSkills: ["c1b3ac2c-5c8b-4d58-9c7c-1f50b75f0f0f"],
  anticipatedStart: "IMMEDIATE",
  durationWeeks: 4,
};

const validApplicationPayload = {
  coverLetter: "I am excited to apply for this engagement.",
};

describe("Authentication & Authorization (e2e)", () => {
  let app: INestApplication;

  const engagementsServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllActive: jest.fn(),
    findMyAssignments: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const applicationsServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByEngagement: jest.fn(),
    updateStatus: jest.fn(),
  };

  beforeAll(async () => {
    const mockEngagement = { id: "eng-1" };
    const mockApplication = { id: "app-1" };

    engagementsServiceMock.findAll.mockResolvedValue({
      data: [mockEngagement],
      meta: {
        page: 1,
        perPage: 20,
        totalCount: 1,
        totalPages: 1,
      },
    });
    engagementsServiceMock.findAllActive.mockResolvedValue([mockEngagement]);
    engagementsServiceMock.findMyAssignments.mockResolvedValue({
      data: [mockEngagement],
      meta: {
        page: 1,
        perPage: 20,
        totalCount: 1,
        totalPages: 1,
      },
    });
    engagementsServiceMock.findOne.mockResolvedValue(mockEngagement);
    engagementsServiceMock.create.mockResolvedValue(mockEngagement);
    applicationsServiceMock.create.mockResolvedValue(mockApplication);

    applicationsServiceMock.findAll.mockResolvedValue({
      data: [mockApplication],
      meta: {
        page: 1,
        perPage: 20,
        totalCount: 1,
        totalPages: 1,
      },
    });

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EngagementsService)
      .useValue(engagementsServiceMock)
      .overrideProvider(ApplicationsService)
      .useValue(applicationsServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();

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

  describe("M2M Token Authentication", () => {
    it("allows M2M token with valid scopes to access protected endpoints", async () => {
      const response = await request(app.getHttpServer())
        .get("/engagements/my-assignments")
        .set("Authorization", "Bearer m2m-read")
        .expect(200);

      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("denies M2M token with invalid scopes", async () => {
      await request(app.getHttpServer())
        .get("/engagements/my-assignments")
        .set("Authorization", "Bearer m2m-invalid")
        .expect(403);
    });

    it("creates engagement with M2M token and sets createdBy to system", async () => {
      engagementsServiceMock.create.mockClear();
      engagementsServiceMock.create.mockResolvedValueOnce({
        id: "eng-1",
        createdBy: "system",
      });

      const response = await request(app.getHttpServer())
        .post("/engagements")
        .set("Authorization", "Bearer m2m-write")
        .send(validEngagementPayload)
        .expect(201);

      expect(response.body.createdBy).toBe("system");
      expect(engagementsServiceMock.create).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ isMachine: true }),
      );
    });

    it("updates engagement with M2M token and sets updatedBy to system", async () => {
      engagementsServiceMock.update.mockClear();
      engagementsServiceMock.update.mockResolvedValueOnce({
        id: "eng-1",
        updatedBy: "system",
      });

      const response = await request(app.getHttpServer())
        .put("/engagements/eng-1")
        .set("Authorization", "Bearer m2m-write")
        .send({ title: "Updated engagement" })
        .expect(200);

      expect(response.body.updatedBy).toBe("system");
      expect(engagementsServiceMock.update).toHaveBeenCalledWith(
        "eng-1",
        expect.any(Object),
        expect.objectContaining({ isMachine: true }),
      );
    });
  });

  describe("User JWT Authentication", () => {
    it("allows admin user to access protected endpoints", async () => {
      await request(app.getHttpServer())
        .post("/engagements")
        .set("Authorization", "Bearer admin-user")
        .send(validEngagementPayload)
        .expect(201);
    });

    it("allows member user to access read endpoints only", async () => {
      await request(app.getHttpServer())
        .get("/engagements/my-assignments")
        .set("Authorization", "Bearer member-user")
        .expect(200);

      await request(app.getHttpServer())
        .post("/engagements")
        .set("Authorization", "Bearer member-user")
        .send(validEngagementPayload)
        .expect(403);
    });

    it("allows authenticated user without scopes to access my assignments", async () => {
      await request(app.getHttpServer())
        .get("/engagements/my-assignments")
        .set("Authorization", "Bearer bare-user")
        .expect(200);
    });
  });

  describe("Public Engagement Read Endpoints", () => {
    it("allows anonymous access to active engagements", async () => {
      const response = await request(app.getHttpServer())
        .get("/engagements/active")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it("allows authenticated user without scopes to access active engagements", async () => {
      const response = await request(app.getHttpServer())
        .get("/engagements/active")
        .set("Authorization", "Bearer bare-user")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it("allows anonymous access to engagement by ID", async () => {
      await request(app.getHttpServer())
        .get("/engagements/eng-1")
        .expect(200);
    });

    it("allows authenticated user without scopes to access engagement by ID", async () => {
      await request(app.getHttpServer())
        .get("/engagements/eng-1")
        .set("Authorization", "Bearer bare-user")
        .expect(200);
    });
  });

  describe("Role-Based Access", () => {
    it("returns 401 when token is missing", async () => {
      await request(app.getHttpServer())
        .get("/engagements/my-assignments")
        .expect(401);
    });

    it("returns 401 when token is malformed", async () => {
      await request(app.getHttpServer())
        .get("/engagements/my-assignments")
        .set("Authorization", "Bearer malformed")
        .expect(401);
    });
  });

  describe("Application Create Authentication", () => {
    it("returns 401 when token is missing", async () => {
      await request(app.getHttpServer())
        .post("/engagements/eng-1/applications")
        .send(validApplicationPayload)
        .expect(401);
    });

    it("returns 401 when token is malformed", async () => {
      await request(app.getHttpServer())
        .post("/engagements/eng-1/applications")
        .set("Authorization", "Bearer malformed")
        .send(validApplicationPayload)
        .expect(401);
    });

    it("allows any authenticated user to create an application", async () => {
      await request(app.getHttpServer())
        .post("/engagements/eng-1/applications")
        .set("Authorization", "Bearer bare-user")
        .send(validApplicationPayload)
        .expect(201);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
