import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { EngagementFeedback, Prisma } from "@prisma/client";
import { nanoid } from "nanoid";
import { ERROR_MESSAGES } from "../common/constants";
import { DbService } from "../db/db.service";
import { EngagementsService } from "../engagements/engagements.service";
import {
  CreateFeedbackDto,
  FEEDBACK_SORT_FIELDS,
  FeedbackQueryDto,
  FeedbackSortBy,
} from "./dto";
import { PaginatedResponse } from "../engagements/dto";

@Injectable()
export class FeedbackService {
  private readonly logger = new Logger(FeedbackService.name);

  constructor(
    private readonly db: DbService,
    private readonly engagementsService: EngagementsService,
  ) {}

  async createAuthenticated(
    engagementId: string,
    createDto: CreateFeedbackDto,
    userId: string,
    handle: string,
  ): Promise<EngagementFeedback> {
    await this.engagementsService.findOne(engagementId);

    const engagement = await this.db.engagement.findUnique({
      where: { id: engagementId },
      select: { assignedMemberId: true },
    });

    if (!engagement?.assignedMemberId) {
      throw new BadRequestException(
        ERROR_MESSAGES.EngagementNotAssigned,
      );
    }

    return this.create(engagementId, createDto, userId, handle, undefined);
  }

  async generateFeedbackLink(
    engagementId: string,
    customerEmail: string,
    expirationDays = 30,
  ): Promise<{
    secretToken: string;
    expiresAt: Date;
    customerEmail: string;
  }> {
    await this.engagementsService.findOne(engagementId);

    const engagement = await this.db.engagement.findUnique({
      where: { id: engagementId },
      select: { assignedMemberId: true },
    });

    if (!engagement?.assignedMemberId) {
      throw new BadRequestException(
        ERROR_MESSAGES.EngagementNotAssigned,
      );
    }

    const expiresAt = new Date(
      Date.now() + expirationDays * 24 * 60 * 60 * 1000,
    );
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const secretToken = nanoid(32);

      try {
        await this.db.engagementFeedback.create({
          data: {
            id: nanoid(),
            engagementId,
            feedbackText: "",
            rating: null,
            givenByEmail: customerEmail,
            secretToken,
            secretTokenExpiresAt: expiresAt,
          },
        });

        return { secretToken, expiresAt, customerEmail };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          const target = (error.meta?.target as string[]) ?? [];
          if (error.code === "P2002" && target.includes("secretToken")) {
            this.logger.warn(
              "Secret token collision detected while generating feedback link",
              { attempt, engagementId },
            );
            continue;
          }
        }
        throw error;
      }
    }

    throw new BadRequestException(
      "Unable to generate a unique feedback link. Please try again.",
    );
  }

  async validateSecretToken(secretToken: string): Promise<EngagementFeedback> {
    const feedback = await this.db.engagementFeedback.findUnique({
      where: { secretToken },
      include: { engagement: true },
    });

    if (!feedback) {
      throw new NotFoundException(ERROR_MESSAGES.FeedbackTokenInvalid);
    }

    if (
      feedback.secretTokenExpiresAt &&
      feedback.secretTokenExpiresAt < new Date()
    ) {
      throw new BadRequestException(ERROR_MESSAGES.FeedbackTokenExpired);
    }

    return feedback;
  }

  async submitAnonymousFeedback(
    secretToken: string,
    createDto: CreateFeedbackDto,
  ): Promise<EngagementFeedback> {
    const feedback = await this.validateSecretToken(secretToken);

    this.logger.log("Submitting anonymous feedback", {
      feedbackId: feedback.id,
      engagementId: feedback.engagementId,
      givenByEmail: feedback.givenByEmail,
    });

    return this.db.engagementFeedback.update({
      where: { id: feedback.id },
      data: {
        feedbackText: createDto.feedbackText,
        rating: createDto.rating,
      },
      include: { engagement: true },
    });
  }

  async create(
    engagementId: string,
    createDto: CreateFeedbackDto,
    memberId?: string,
    handle?: string,
    email?: string,
  ): Promise<EngagementFeedback> {
    this.logger.debug("Creating feedback", {
      engagementId,
      memberId,
      handle,
      email,
    });

    return this.db.engagementFeedback.create({
      data: {
        id: nanoid(),
        engagementId,
        feedbackText: createDto.feedbackText,
        rating: createDto.rating,
        givenByMemberId: memberId,
        givenByHandle: handle,
        givenByEmail: email,
      },
    });
  }

  async findAll(
    query: FeedbackQueryDto,
  ): Promise<PaginatedResponse<EngagementFeedback>> {
    this.logger.debug("Listing feedback", {
      engagementId: query.engagementId,
      givenByMemberId: query.givenByMemberId,
    });

    const where: Prisma.EngagementFeedbackWhereInput = {};

    if (query.engagementId) {
      where.engagementId = query.engagementId;
    }

    if (query.givenByMemberId) {
      where.givenByMemberId = query.givenByMemberId;
    }

    const page = query.page;
    const perPage = query.perPage;
    const skip = (page - 1) * perPage;

    const sortBy = FEEDBACK_SORT_FIELDS.includes(query.sortBy)
      ? query.sortBy
      : FeedbackSortBy.CreatedAt;

    const orderBy: Prisma.EngagementFeedbackOrderByWithRelationInput = {
      [sortBy]: query.sortOrder,
    };

    const [data, totalCount] = await Promise.all([
      this.db.engagementFeedback.findMany({
        where,
        skip,
        take: perPage,
        orderBy,
      }),
      this.db.engagementFeedback.count({ where }),
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

  async findByEngagement(
    engagementId: string,
  ): Promise<EngagementFeedback[]> {
    this.logger.debug("Listing feedback for engagement", { engagementId });
    return this.db.engagementFeedback.findMany({
      where: { engagementId },
    });
  }

  async findOne(id: string): Promise<EngagementFeedback> {
    const feedback = await this.db.engagementFeedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException("Feedback not found.");
    }

    return feedback;
  }
}
