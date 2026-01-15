import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { EngagementFeedback, Prisma } from "@prisma/client";
import { nanoid } from "nanoid";
import { ERROR_MESSAGES } from "../common/constants";
import { normalizeUserId } from "../common/user.util";
import { DbService } from "../db/db.service";
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
  ) {}

  private async validateAssignment(
    engagementId: string,
    assignmentId: string,
  ) {
    const assignment = await this.db.engagementAssignment.findUnique({
      where: { id: assignmentId },
    });

    if (!assignment) {
      throw new NotFoundException(ERROR_MESSAGES.AssignmentNotFound);
    }

    if (assignment.engagementId !== engagementId) {
      throw new BadRequestException(
        ERROR_MESSAGES.AssignmentEngagementMismatch,
      );
    }

    return assignment;
  }

  async createAuthenticated(
    engagementId: string,
    assignmentId: string,
    createDto: CreateFeedbackDto,
    userId: string,
    handle: string,
  ): Promise<EngagementFeedback> {
    const normalizedUserId = normalizeUserId(userId) ?? userId;
    await this.validateAssignment(engagementId, assignmentId);

    return this.create(
      assignmentId,
      createDto,
      normalizedUserId,
      handle,
      undefined,
    );
  }

  async generateFeedbackLink(
    engagementId: string,
    assignmentId: string,
    customerEmail: string,
    expirationDays = 30,
  ): Promise<{
    secretToken: string;
    expiresAt: Date;
    customerEmail: string;
  }> {
    await this.validateAssignment(engagementId, assignmentId);

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
            engagementAssignmentId: assignmentId,
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
              { attempt, engagementId, assignmentId },
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
      engagementAssignmentId: feedback.engagementAssignmentId,
      givenByEmail: feedback.givenByEmail,
    });

    return this.db.engagementFeedback.update({
      where: { id: feedback.id },
      data: {
        feedbackText: createDto.feedbackText,
        rating: createDto.rating,
      },
    });
  }

  async create(
    assignmentId: string,
    createDto: CreateFeedbackDto,
    memberId?: string,
    handle?: string,
    email?: string,
  ): Promise<EngagementFeedback> {
    const normalizedMemberId = normalizeUserId(memberId) ?? memberId;
    this.logger.debug("Creating feedback", {
      engagementAssignmentId: assignmentId,
      memberId: normalizedMemberId,
      handle,
      email,
    });

    return this.db.engagementFeedback.create({
      data: {
        id: nanoid(),
        engagementAssignmentId: assignmentId,
        feedbackText: createDto.feedbackText,
        rating: createDto.rating,
        givenByMemberId: normalizedMemberId,
        givenByHandle: handle,
        givenByEmail: email,
      },
    });
  }

  async findAll(
    query: FeedbackQueryDto,
  ): Promise<PaginatedResponse<EngagementFeedback>> {
    this.logger.debug("Listing feedback", {
      engagementAssignmentId: query.engagementAssignmentId,
      givenByMemberId: query.givenByMemberId,
    });

    const where: Prisma.EngagementFeedbackWhereInput = {};

    if (query.engagementAssignmentId) {
      where.engagementAssignmentId = query.engagementAssignmentId;
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

  async findByAssignment(
    engagementId: string,
    assignmentId: string,
  ): Promise<EngagementFeedback[]> {
    await this.validateAssignment(engagementId, assignmentId);
    this.logger.debug("Listing feedback for assignment", {
      engagementId,
      assignmentId,
    });
    return this.db.engagementFeedback.findMany({
      where: { engagementAssignmentId: assignmentId },
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
