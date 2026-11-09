import {
  BadRequestException,
  NotFoundException,
  ValidationPipe,
} from "@nestjs/common";
import {
  EngagementLeadStatus,
  EngagementLeadType,
  EngagementModel,
  ExperienceLevel,
  LeadPriority,
} from "@prisma/client";
import { EngagementLeadsService } from "./engagement-leads.service";
import {
  CreateEngagementLeadIntakeDto,
  CreateWiproDirectEngagementLeadIntakeDto,
  EngagementLeadQueryDto,
  EngagementLeadSortField,
  EngagementLeadStatusGroup,
} from "./dto";

jest.mock("nanoid", () => ({
  nanoid: () => "test-id",
}));

describe("EngagementLeadsService", () => {
  let service: EngagementLeadsService;
  let db: {
    engagementLead: {
      findMany: jest.Mock;
      count: jest.Mock;
      create: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
    };
  };
  let skillsService: { resolveSkillFilterValues: jest.Mock };

  beforeEach(() => {
    db = {
      engagementLead: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
        create: jest.fn().mockImplementation(({ data }) => ({
          ...data,
          notes: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        findUnique: jest.fn(),
        update: jest.fn().mockImplementation(({ where, data }) => ({
          id: where.id,
          ...data,
          notes: [],
        })),
      },
    };
    skillsService = {
      resolveSkillFilterValues: jest.fn().mockResolvedValue({
        skillIds: [],
        skillNamesById: new Map(),
        unresolvedNames: [],
      }),
    };
    service = new EngagementLeadsService(db as any, skillsService as any);
  });

  describe("findAll", () => {
    it("applies accountName filter with case-insensitive contains", async () => {
      await service.findAll({
        page: 1,
        perPage: 10,
        accountName: "XYZ",
      } as EngagementLeadQueryDto);

      expect(db.engagementLead.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            accountName: {
              contains: "XYZ",
              mode: "insensitive",
            },
          },
        }),
      );
      expect(db.engagementLead.count).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            accountName: {
              contains: "XYZ",
              mode: "insensitive",
            },
          },
        }),
      );
    });

    it("applies smu, engagementModel, and roleTitle filters", async () => {
      await service.findAll({
        page: 1,
        perPage: 10,
        smu: "AMERICAS",
        engagementModel: EngagementModel.TIME_AND_MATERIAL,
        roleTitle: "PM",
      } as EngagementLeadQueryDto);

      expect(db.engagementLead.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            smu: {
              contains: "AMERICAS",
              mode: "insensitive",
            },
            engagementModel: EngagementModel.TIME_AND_MATERIAL,
            roleTitle: {
              contains: "PM",
              mode: "insensitive",
            },
          },
        }),
      );
    });

    it("applies leadType filter", async () => {
      await service.findAll({
        page: 1,
        perPage: 10,
        leadType: EngagementLeadType.WIPRO_DIRECT,
      });

      expect(db.engagementLead.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { leadType: EngagementLeadType.WIPRO_DIRECT },
        }),
      );
    });

    it("applies statusGroup NEW filter to submitted leads only", async () => {
      await service.findAll({
        page: 1,
        perPage: 10,
        statusGroup: EngagementLeadStatusGroup.NEW,
      } as EngagementLeadQueryDto);

      expect(db.engagementLead.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: EngagementLeadStatus.SUBMITTED },
        }),
      );
    });

    it("applies statusGroup IN_PROGRESS filter to leads under review or qualified", async () => {
      await service.findAll({
        page: 1,
        perPage: 10,
        statusGroup: EngagementLeadStatusGroup.IN_PROGRESS,
      });

      expect(db.engagementLead.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            status: {
              in: [
                EngagementLeadStatus.UNDER_REVIEW,
                EngagementLeadStatus.QUALIFIED,
              ],
            },
          },
        }),
      );
    });

    it("applies explicit status and priority filters", async () => {
      await service.findAll({
        page: 1,
        perPage: 10,
        status: EngagementLeadStatus.SUBMITTED,
        priority: LeadPriority.HIGH,
        experienceLevel: ExperienceLevel.SENIOR,
      } as EngagementLeadQueryDto);

      expect(db.engagementLead.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            status: EngagementLeadStatus.SUBMITTED,
            priority: LeadPriority.HIGH,
            experienceLevel: ExperienceLevel.SENIOR,
          },
        }),
      );
    });

    it("applies sortBy and sortOrder", async () => {
      await service.findAll({
        page: 1,
        perPage: 10,
        sortBy: EngagementLeadSortField.PREFERRED_START_DATE,
        sortOrder: "asc",
      } as EngagementLeadQueryDto);

      expect(db.engagementLead.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { preferredStartDate: { sort: "asc", nulls: "last" } },
        }),
      );
    });

    it("sorts leads without a priority last", async () => {
      await service.findAll({
        page: 1,
        perPage: 10,
        sortBy: EngagementLeadSortField.PRIORITY,
        sortOrder: "desc",
      });

      expect(db.engagementLead.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { priority: { sort: "desc", nulls: "last" } },
        }),
      );
    });
  });

  describe("createFromIntake", () => {
    it("stores a null priority when the intake does not provide one", async () => {
      const result = await service.createFromIntake({
        workEmail: "john.doe@wipro.com",
        accountName: "ABC Bank",
        smu: "EURP",
        roleTitle: "QA Engineer",
        jobDescription: "Test the product.",
        requiredSkills: ["Java"],
        experienceLevel: ExperienceLevel.MID,
        minYearsExperience: 3,
        resourcesRequired: 1,
        preferredStartDate: "2026-11-01T00:00:00.000Z",
        engagementDuration: "6 months",
        workingHoursPerDay: 8,
        timeZoneRequirement: "IST",
        remoteWorkAccepted: true,
        maximumCost: "USD 100/hour",
      });

      expect(db.engagementLead.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          leadType: EngagementLeadType.WIPRO_CONSUMPTION,
          priority: null,
        }),
        include: { notes: { orderBy: { createdAt: "asc" } } },
      });
      expect(result.priority).toBeNull();
    });

    it("stores a null experience level now that the form no longer asks for it", async () => {
      await service.createFromIntake({
        workEmail: "john.doe@wipro.com",
        accountName: "ABC Bank",
        smu: "EURP",
        roleTitle: "QA Engineer",
        jobDescription: "Test the product.",
        requiredSkills: ["Java"],
        minYearsExperience: 3,
        resourcesRequired: 1,
        preferredStartDate: "2026-11-01T00:00:00.000Z",
        engagementDuration: "6 months",
        workingHoursPerDay: 8,
        timeZoneRequirement: "IST",
        remoteWorkAccepted: true,
        maximumCost: "USD 100/hour",
      });

      expect(db.engagementLead.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ experienceLevel: null }),
        }),
      );
    });

    it("stores the maximum cost in place of the engagement model and bill rate", async () => {
      await service.createFromIntake({
        workEmail: "john.doe@wipro.com",
        accountName: "ABC Bank",
        smu: "EURP",
        roleTitle: "QA Engineer",
        jobDescription: "Test the product.",
        requiredSkills: ["Java", "Custom Framework"],
        minYearsExperience: 3,
        resourcesRequired: 1,
        preferredStartDate: "2026-11-01T00:00:00.000Z",
        engagementDuration: "6 months",
        workingHoursPerDay: 8,
        timeZoneRequirement: "IST",
        remoteWorkAccepted: true,
        maximumCost: "  USD 100/hour  ",
      });

      expect(db.engagementLead.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            billRateAmount: null,
            billRateCurrency: null,
            engagementModel: null,
            maximumCost: "USD 100/hour",
            requiredSkills: ["Java", "Custom Framework"],
          }),
        }),
      );
    });
  });

  describe("addNote", () => {
    it("adds a trimmed note with who wrote it and returns the notes oldest first", async () => {
      const earlier = {
        id: "note-1",
        content: "First call done.",
        createdAt: new Date("2026-10-30T10:00:00.000Z"),
        createdBy: "other-tm",
      };
      const added = {
        id: "note-2",
        content: "Call back next week.",
        createdAt: new Date("2026-11-02T10:00:00.000Z"),
        createdBy: "tm-handle",
      };
      db.engagementLead.findUnique.mockResolvedValue({
        id: "lead-1",
        status: EngagementLeadStatus.UNDER_REVIEW,
      });
      db.engagementLead.update.mockResolvedValue({
        id: "lead-1",
        status: EngagementLeadStatus.UNDER_REVIEW,
        notes: [earlier, added],
      });

      const result = await service.addNote(
        "lead-1",
        "  Call back next week.  ",
        "tm-handle",
      );

      expect(db.engagementLead.update).toHaveBeenCalledWith({
        where: { id: "lead-1" },
        data: {
          notes: {
            create: {
              content: "Call back next week.",
              createdBy: "tm-handle",
            },
          },
        },
        include: { notes: { orderBy: { createdAt: "asc" } } },
      });
      expect(result.notes).toEqual([earlier, added]);
    });

    it("rejects a note that is only whitespace", async () => {
      db.engagementLead.findUnique.mockResolvedValue({
        id: "lead-1",
        status: EngagementLeadStatus.SUBMITTED,
      });

      await expect(service.addNote("lead-1", "   ")).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(db.engagementLead.update).not.toHaveBeenCalled();
    });

    it.each([EngagementLeadStatus.CONVERTED, EngagementLeadStatus.REJECTED])(
      "adds notes to a %s lead",
      async (status) => {
        db.engagementLead.findUnique.mockResolvedValue({
          id: "lead-1",
          status,
        });

        await service.addNote("lead-1", "Follow up with the account.", "tm");

        expect(db.engagementLead.update).toHaveBeenCalledWith(
          expect.objectContaining({
            data: {
              notes: {
                create: {
                  content: "Follow up with the account.",
                  createdBy: "tm",
                },
              },
            },
          }),
        );
      },
    );

    it("throws when the lead does not exist", async () => {
      db.engagementLead.findUnique.mockResolvedValue(null);

      await expect(service.addNote("missing", "Note")).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe("createFromWiproDirectIntake", () => {
    const directIntake = {
      workEmail: " Jane.Doe@Customer.com ",
      accountName: "ABC Bank",
      smu: "AMR1",
      jobDescription: "Build the product.",
      requiredSkills: ["React"],
      resourcesRequired: 2,
      engagementDuration: "3 months",
      workingHoursPerDay: 8,
      timeZoneRequirement: "EST",
      remoteWorkAccepted: true,
    };

    it("stores a Wipro Direct lead without the consumption-only fields", async () => {
      const result = await service.createFromWiproDirectIntake(directIntake);

      const data = db.engagementLead.create.mock.calls[0][0].data;
      expect(data).toMatchObject({
        leadType: EngagementLeadType.WIPRO_DIRECT,
        workEmail: "jane.doe@customer.com",
        smu: "AMR1",
        preferredStartDate: null,
        workLocationRestrictions: null,
        status: EngagementLeadStatus.SUBMITTED,
      });
      expect(data).not.toHaveProperty("roleTitle");
      expect(data).not.toHaveProperty("billRateAmount");
      expect(result.leadType).toBe(EngagementLeadType.WIPRO_DIRECT);
    });

    it("stores the preferred start date when provided", async () => {
      await service.createFromWiproDirectIntake({
        ...directIntake,
        preferredStartDate: "2026-11-01T00:00:00.000Z",
      });

      expect(db.engagementLead.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          preferredStartDate: new Date("2026-11-01T00:00:00.000Z"),
        }),
        include: { notes: { orderBy: { createdAt: "asc" } } },
      });
    });
  });

  describe("getEngagementPrefill", () => {
    const directLead = {
      id: "lead-1",
      leadType: EngagementLeadType.WIPRO_DIRECT,
      workEmail: "jane.doe@customer.com",
      accountName: "ABC Bank",
      smu: "AMR1",
      engagementModel: null,
      roleTitle: null,
      jobDescription: "Build the product.",
      requiredSkills: ["React"],
      experienceLevel: null,
      minYearsExperience: null,
      industryDomain: null,
      resourcesRequired: 2,
      preferredStartDate: null,
      engagementDuration: "3 months",
      workingHoursPerDay: 8,
      timeZoneRequirement: "EST",
      remoteWorkAccepted: true,
      workLocationRestrictions: null,
      billRateCurrency: null,
      billRateAmount: null,
      maximumCost: null,
      priority: null,
      additionalRequirements: null,
      status: EngagementLeadStatus.QUALIFIED,
      convertedEngagementId: null,
      createdAt: new Date("2026-10-28T00:00:00.000Z"),
      updatedAt: new Date("2026-10-28T00:00:00.000Z"),
      notes: [],
    };

    it("maps a Wipro Direct lead without the consumption-only fields", async () => {
      db.engagementLead.findUnique.mockResolvedValue(directLead);

      const prefill = await service.getEngagementPrefill("lead-1");

      expect(prefill).toMatchObject({
        account: "ABC Bank",
        smu: "AMR1",
        spoc: "jane.doe@customer.com",
        title: "",
        description: "Build the product.",
        requiredSkillNames: ["React"],
        roleLevel: null,
        requiredMemberCount: 2,
        durationStartDate: null,
        durationMonths: 3,
        compensationRange: null,
        timeZones: ["EST"],
        countries: ["ANY"],
      });
    });

    it("uses the maximum cost as the compensation range", async () => {
      db.engagementLead.findUnique.mockResolvedValue({
        ...directLead,
        leadType: EngagementLeadType.WIPRO_CONSUMPTION,
        maximumCost: "USD 100/hour",
      });

      const prefill = await service.getEngagementPrefill("lead-1");

      expect(prefill.compensationRange).toBe("USD 100/hour");
    });

    it("falls back to the bill rate for leads submitted before the maximum cost field", async () => {
      db.engagementLead.findUnique.mockResolvedValue({
        ...directLead,
        leadType: EngagementLeadType.WIPRO_CONSUMPTION,
        billRateCurrency: "USD",
        billRateAmount: "90",
      });

      const prefill = await service.getEngagementPrefill("lead-1");

      expect(prefill.compensationRange).toBe("USD 90/hour");
    });

    it("matches the intake skill names to standardized skills", async () => {
      db.engagementLead.findUnique.mockResolvedValue({
        ...directLead,
        requiredSkills: ["React", "Node.js", "Legacy Skill"],
      });
      skillsService.resolveSkillFilterValues.mockResolvedValue({
        skillIds: ["skill-react", "skill-node"],
        skillNamesById: new Map([
          ["skill-react", "React"],
          ["skill-node", "Node.js"],
        ]),
        unresolvedNames: ["Legacy Skill"],
      });

      const prefill = await service.getEngagementPrefill("lead-1");

      expect(skillsService.resolveSkillFilterValues).toHaveBeenCalledWith([
        "React",
        "Node.js",
        "Legacy Skill",
      ]);
      expect(prefill.requiredSkills).toEqual([
        { id: "skill-react", name: "React" },
        { id: "skill-node", name: "Node.js" },
      ]);
      expect(prefill.unresolvedSkillNames).toEqual(["Legacy Skill"]);
      expect(prefill.requiredSkillNames).toEqual([
        "React",
        "Node.js",
        "Legacy Skill",
      ]);
    });
  });
});

describe("EngagementLeadQueryDto validation", () => {
  const pipe = new ValidationPipe({ transform: true, whitelist: true });

  it("preserves filter query params after validation", async () => {
    const query = await pipe.transform(
      {
        page: "1",
        perPage: "10",
        accountName: "XYZ",
        smu: "AMERICAS",
        engagementModel: "TIME_AND_MATERIAL",
        roleTitle: "PM",
        sortBy: "createdAt",
        sortOrder: "desc",
      },
      { type: "query", metatype: EngagementLeadQueryDto },
    );

    expect(query).toMatchObject({
      page: 1,
      perPage: 10,
      accountName: "XYZ",
      smu: "AMERICAS",
      engagementModel: EngagementModel.TIME_AND_MATERIAL,
      roleTitle: "PM",
      sortBy: EngagementLeadSortField.CREATED_AT,
      sortOrder: "desc",
    });
  });
});

describe("CreateEngagementLeadIntakeDto validation", () => {
  const pipe = new ValidationPipe({ transform: true, whitelist: true });

  const intake = {
    workEmail: "john.doe@wipro.com",
    accountName: "ABC Bank",
    smu: "EURP",
    roleTitle: "QA Engineer",
    jobDescription: "Test the product.",
    requiredSkills: ["Java"],
    minYearsExperience: 3,
    resourcesRequired: 1,
    preferredStartDate: "2026-11-01T00:00:00.000Z",
    engagementDuration: "6 months",
    workingHoursPerDay: 8,
    timeZoneRequirement: "IST",
    remoteWorkAccepted: true,
    maximumCost: "USD 100/hour",
  };

  it("accepts an intake without an experience level, engagement model, or bill rate", async () => {
    await expect(
      pipe.transform(intake, {
        type: "body",
        metatype: CreateEngagementLeadIntakeDto,
      }),
    ).resolves.toMatchObject(intake);
  });

  it("rejects an intake without a maximum cost", async () => {
    await expect(
      pipe.transform(
        { ...intake, maximumCost: " " },
        { type: "body", metatype: CreateEngagementLeadIntakeDto },
      ),
    ).rejects.toThrow();
  });
});

describe("CreateWiproDirectEngagementLeadIntakeDto validation", () => {
  const pipe = new ValidationPipe({ transform: true, whitelist: true });
  const validIntake = {
    workEmail: "jane.doe@customer.com",
    accountName: "ABC Bank",
    smu: "AMR1",
    jobDescription: "Build the product.",
    requiredSkills: ["React"],
    resourcesRequired: 2,
    engagementDuration: "3 months",
    workingHoursPerDay: 8,
    timeZoneRequirement: "EST",
    remoteWorkAccepted: true,
  };

  it("accepts an intake without a preferred start date", async () => {
    await expect(
      pipe.transform(validIntake, {
        type: "body",
        metatype: CreateWiproDirectEngagementLeadIntakeDto,
      }),
    ).resolves.toMatchObject(validIntake);
  });

  it("rejects an intake missing a mandatory field", async () => {
    await expect(
      pipe.transform(
        { ...validIntake, jobDescription: undefined },
        {
          type: "body",
          metatype: CreateWiproDirectEngagementLeadIntakeDto,
        },
      ),
    ).rejects.toThrow();
  });
});
