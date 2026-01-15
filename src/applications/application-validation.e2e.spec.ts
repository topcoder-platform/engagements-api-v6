import {
  INestApplication,
  UnauthorizedException,
  ValidationPipe,
} from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../app.module";
import { EngagementsService } from "../engagements/engagements.service";
import { ApplicationsService } from "./applications.service";
import { DbService } from "../db/db.service";

const tokenFixtures: Record<string, Record<string, any>> = {
  "bare-user": {
    isMachine: false,
    userId: "123456",
  },
};

const validationMessage =
  "Field cannot be empty or contain only whitespace";

describe("Application Validation (e2e)", () => {
  let app: INestApplication;

  const engagementsServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllActive: jest.fn(),
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

  const dbServiceMock = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  };

  const postApplication = (payload: Record<string, unknown>) =>
    request(app.getHttpServer())
      .post("/engagements/eng-1/applications")
      .set("Authorization", "Bearer bare-user")
      .send(payload);

  const expectValidationMessage = (body: any) => {
    const message = body?.message;
    if (Array.isArray(message)) {
      expect(message).toContain(validationMessage);
      return;
    }

    expect(message).toBe(validationMessage);
  };

  beforeAll(async () => {
    applicationsServiceMock.create.mockResolvedValue({ id: "app-1" });

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DbService)
      .useValue(dbServiceMock)
      .overrideProvider(EngagementsService)
      .useValue(engagementsServiceMock)
      .overrideProvider(ApplicationsService)
      .useValue(applicationsServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );

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

  it("accepts valid coverLetter without availability", async () => {
    await postApplication({
      coverLetter: "I am excited to apply for this engagement.",
    }).expect(201);
  });

  it("rejects empty coverLetter", async () => {
    const response = await postApplication({
      coverLetter: "",
    }).expect(400);

    expectValidationMessage(response.body);
  });

  it("rejects whitespace-only coverLetter", async () => {
    const response = await postApplication({
      coverLetter: "   ",
    }).expect(400);

    expectValidationMessage(response.body);
  });

  it("rejects missing coverLetter", async () => {
    const response = await postApplication({}).expect(400);

    expectValidationMessage(response.body);
  });

  it("rejects empty availability when provided", async () => {
    const response = await postApplication({
      coverLetter: "Cover letter is present.",
      availability: "",
    }).expect(400);

    expectValidationMessage(response.body);
  });

  it("rejects whitespace-only availability when provided", async () => {
    const response = await postApplication({
      coverLetter: "Cover letter is present.",
      availability: "   ",
    }).expect(400);

    expectValidationMessage(response.body);
  });

  it("accepts valid availability when provided", async () => {
    await postApplication({
      coverLetter: "Cover letter is present.",
      availability: "Available after next month.",
    }).expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
