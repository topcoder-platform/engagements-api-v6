import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { Engagement, EngagementStatus, Prisma } from "@prisma/client";
import { nanoid } from "nanoid";
import { DbService } from "../db/db.service";
import { ProjectService } from "../integrations/project.service";
import { SkillsService } from "../integrations/skills.service";
import {
  CreateEngagementDto,
  ENGAGEMENT_SORT_FIELDS,
  EngagementQueryDto,
  EngagementSortBy,
  PaginatedResponse,
  UpdateEngagementDto,
} from "./dto";
import { ERROR_MESSAGES } from "../common/constants";
import { normalizeUserId } from "../common/user.util";

@Injectable()
export class EngagementsService {
  private readonly logger = new Logger(EngagementsService.name);

  constructor(
    private readonly db: DbService,
    private readonly projectService: ProjectService,
    private readonly skillsService: SkillsService,
  ) {}

  async create(
    createDto: CreateEngagementDto,
    userId: string,
  ): Promise<Engagement> {
    const normalizedUserId = normalizeUserId(userId) ?? userId;

    this.logger.debug("Creating engagement", {
      projectId: createDto.projectId,
      userId: normalizedUserId,
    });

    await this.assertProjectExists(createDto.projectId);
    await this.assertSkillsValid(createDto.requiredSkills);

    const applicationDeadline = this.ensureFutureDate(
      createDto.applicationDeadline,
    );

    const { durationValidation: _durationValidation, ...payload } = createDto;

    return this.db.engagement.create({
      data: {
        id: nanoid(),
        ...payload,
        durationStartDate: this.normalizeDate(payload.durationStartDate),
        durationEndDate: this.normalizeDate(payload.durationEndDate),
        applicationDeadline,
        createdBy: normalizedUserId,
      },
    });
  }

  async findAll(
    query: EngagementQueryDto,
  ): Promise<PaginatedResponse<Engagement>> {
    this.logger.debug("Listing engagements", {
      projectId: query.projectId,
      status: query.status,
      search: query.search,
    });

    const where: Prisma.EngagementWhereInput = {};

    if (query.projectId) {
      where.projectId = query.projectId;
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.search) {
      where.OR = [
        {
          title: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (query.requiredSkills?.length) {
      where.requiredSkills = { hasSome: query.requiredSkills };
    }

    if (query.countries?.length) {
      where.countries = { hasSome: query.countries };
    }

    const page = query.page;
    const perPage = query.perPage;
    const skip = (page - 1) * perPage;

    const sortBy = ENGAGEMENT_SORT_FIELDS.includes(query.sortBy)
      ? query.sortBy
      : EngagementSortBy.CreatedAt;

    const orderBy: Prisma.EngagementOrderByWithRelationInput = {
      [sortBy]: query.sortOrder,
    };

    const [data, totalCount] = await Promise.all([
      this.db.engagement.findMany({
        where,
        skip,
        take: perPage,
        orderBy,
      }),
      this.db.engagement.count({ where }),
    ]);

    const totalPages = totalCount ? Math.ceil(totalCount / perPage) : 0;

    return {
      data,
      meta: {
        page,
        perPage,
        totalCount,
        totalPages,
      },
    };
  }

  async findOne(id: string): Promise<Engagement> {
    const engagement = await this.db.engagement.findUnique({ where: { id } });
    if (!engagement) {
      throw new NotFoundException("Engagement not found.");
    }

    return engagement;
  }

  async update(
    id: string,
    updateDto: UpdateEngagementDto,
    userId: string,
  ): Promise<Engagement> {
    const normalizedUserId = normalizeUserId(userId) ?? userId;
    this.logger.debug("Updating engagement", {
      id,
      userId: normalizedUserId,
    });
    await this.findOne(id);

    if (updateDto.projectId) {
      await this.assertProjectExists(updateDto.projectId);
    }

    if (updateDto.requiredSkills) {
      await this.assertSkillsValid(updateDto.requiredSkills);
    }

    const { durationValidation: _durationValidation, ...payload } = updateDto;

    const data: Prisma.EngagementUpdateInput = {
      updatedBy: normalizedUserId,
    };

    if (payload.projectId !== undefined) {
      data.projectId = payload.projectId;
    }
    if (payload.title !== undefined) {
      data.title = payload.title;
    }
    if (payload.description !== undefined) {
      data.description = payload.description;
    }
    if (payload.durationStartDate !== undefined) {
      data.durationStartDate = this.normalizeDate(payload.durationStartDate);
    }
    if (payload.durationEndDate !== undefined) {
      data.durationEndDate = this.normalizeDate(payload.durationEndDate);
    }
    if (payload.durationWeeks !== undefined) {
      data.durationWeeks = payload.durationWeeks;
    }
    if (payload.durationMonths !== undefined) {
      data.durationMonths = payload.durationMonths;
    }
    if (payload.timeZones !== undefined) {
      data.timeZones = payload.timeZones;
    }
    if (payload.countries !== undefined) {
      data.countries = payload.countries;
    }
    if (payload.requiredSkills !== undefined) {
      data.requiredSkills = payload.requiredSkills;
    }
    if (payload.applicationDeadline !== undefined) {
      data.applicationDeadline = this.ensureFutureDate(
        payload.applicationDeadline,
      );
    }
    if (payload.status !== undefined) {
      data.status = payload.status;
    }

    return this.db.engagement.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    this.logger.debug("Removing engagement", { id });
    await this.findOne(id);
    await this.db.engagement.delete({ where: { id } });
  }

  async findAllActive(): Promise<Engagement[]> {
    this.logger.debug("Listing active engagements");
    return this.db.engagement.findMany({
      where: {
        status: EngagementStatus.OPEN,
        applicationDeadline: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  private async assertProjectExists(projectId: string): Promise<void> {
    const exists = await this.projectService.validateProjectExists(projectId);
    if (!exists) {
      throw new NotFoundException(ERROR_MESSAGES.ProjectNotFound);
    }
  }

  private async assertSkillsValid(skillIds: string[]): Promise<void> {
    const { invalid } = await this.skillsService.validateSkillsExist(skillIds);
    if (invalid.length) {
      throw new BadRequestException(
        `${ERROR_MESSAGES.InvalidSkills}: ${invalid.join(", ")}`,
      );
    }
  }

  private ensureFutureDate(dateValue: string | Date): Date {
    const parsedDate = new Date(dateValue);

    if (Number.isNaN(parsedDate.getTime()) || parsedDate <= new Date()) {
      throw new BadRequestException(ERROR_MESSAGES.ApplicationDeadlineInPast);
    }

    return parsedDate;
  }

  private normalizeDate(dateValue?: string | Date): Date | undefined {
    if (!dateValue) {
      return undefined;
    }

    return new Date(dateValue);
  }
}
