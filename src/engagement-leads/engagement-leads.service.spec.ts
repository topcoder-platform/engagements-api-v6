import { ValidationPipe } from "@nestjs/common";
import {
  EngagementLeadStatus,
  EngagementModel,
  ExperienceLevel,
  LeadPriority,
} from "@prisma/client";
import { EngagementLeadsService } from "./engagement-leads.service";
import {
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
    };
  };

  beforeEach(() => {
    db = {
      engagementLead: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
    };
    service = new EngagementLeadsService(db as any);
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

    it("applies statusGroup NEW filter", async () => {
      await service.findAll({
        page: 1,
        perPage: 10,
        statusGroup: EngagementLeadStatusGroup.NEW,
      } as EngagementLeadQueryDto);

      expect(db.engagementLead.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            status: {
              in: [
                EngagementLeadStatus.SUBMITTED,
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
          orderBy: { preferredStartDate: "asc" },
        }),
      );
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
