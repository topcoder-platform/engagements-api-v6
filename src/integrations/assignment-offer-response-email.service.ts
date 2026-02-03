import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventBusService } from "./event-bus.service";
import { MemberService } from "./member.service";
import { ProjectService } from "./project.service";

type AssignmentOfferResponseParams = {
  projectId: string;
  assignmentMemberId?: string | null;
  assignmentMemberHandle?: string | null;
  accepted: boolean;
  engagementId?: string | null;
  engagementTitle?: string | null;
};

type ProjectUser = {
  userId?: string | number | null;
  email?: string | null;
};

type ProjectUsers = {
  members?: ProjectUser[] | null;
  invites?: ProjectUser[] | null;
};

@Injectable()
export class AssignmentOfferResponseEmailService {
  private readonly logger = new Logger(
    AssignmentOfferResponseEmailService.name,
  );

  constructor(
    private readonly projectService: ProjectService,
    private readonly memberService: MemberService,
    private readonly eventBusService: EventBusService,
    private readonly configService: ConfigService,
  ) {}

  async sendAssignmentOfferResponseEmails(
    params: AssignmentOfferResponseParams,
  ): Promise<void> {
    const templateKey = params.accepted
      ? "SENDGRID_ASSIGNMENT_OFFER_ACCEPTED_TEMPLATE_ID"
      : "SENDGRID_ASSIGNMENT_OFFER_REJECTED_TEMPLATE_ID";
    const templateId = this.configService.get<string>(templateKey);

    if (!templateId) {
      this.logger.warn(
        `SendGrid template ID not configured (${templateKey}). Assignment offer response emails are disabled.`,
      );
      return;
    }

    const projectId = params.projectId?.trim();
    if (!projectId) {
      this.logger.warn(
        "Assignment offer response email skipped: missing project ID.",
      );
      return;
    }

    let handle = params.assignmentMemberHandle?.trim();
    if (!handle) {
      const memberId = params.assignmentMemberId?.trim();
      if (memberId) {
        try {
          handle =
            (await this.memberService.getMemberHandleByUserId(memberId)) ??
            undefined;
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "unknown error";
          this.logger.error(
            `Failed to resolve handle for assignment offer response email (memberId=${memberId}): ${message}`,
          );
        }
      }
    }

    let projectUsers: ProjectUsers | null = null;
    try {
      projectUsers = await this.projectService.getProjectUsers(projectId);
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      this.logger.error(
        `Failed to fetch project users for assignment offer response email (projectId=${projectId}): ${message}`,
      );
      return;
    }

    if (!projectUsers) {
      this.logger.warn(
        `Assignment offer response email skipped: project not found (projectId=${projectId}).`,
      );
      return;
    }

    let recipientEmails: string[] = [];
    try {
      recipientEmails = await this.resolveRecipientEmails(projectUsers);
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      this.logger.error(
        `Failed to resolve project user emails for assignment offer response email (projectId=${projectId}): ${message}`,
      );
      return;
    }
    if (recipientEmails.length === 0) {
      this.logger.warn(
        `Assignment offer response email skipped: no project user emails found (projectId=${projectId}).`,
      );
      return;
    }

    const decisionLabel = params.accepted ? "accepted" : "rejected";
    const payloadHandle = handle ?? "";

    await Promise.all(
      recipientEmails.map((email) =>
        this.sendAssignmentOfferResponseEmail({
          email,
          handle: payloadHandle,
          templateId,
          decisionLabel,
          engagementId: params.engagementId ?? undefined,
          engagementTitle: params.engagementTitle ?? undefined,
          projectId,
        }),
      ),
    );
  }

  private async resolveRecipientEmails(
    projectUsers: ProjectUsers,
  ): Promise<string[]> {
    const memberUserIds = this.collectUserIds(projectUsers.members ?? []);
    const inviteUserIds = this.collectUserIds(projectUsers.invites ?? []);
    const inviteEmails = this.collectEmails(projectUsers.invites ?? []);
    const userIds = Array.from(new Set([...memberUserIds, ...inviteUserIds]));

    const emailByUserId = userIds.length
      ? await this.memberService.getMemberEmailsByUserIds(userIds)
      : new Map<string, string>();

    const emailSet = new Map<string, string>();
    const addEmail = (email?: string | null) => {
      const normalized = email?.trim();
      if (!normalized) {
        return;
      }
      const key = normalized.toLowerCase();
      if (!emailSet.has(key)) {
        emailSet.set(key, normalized);
      }
    };

    inviteEmails.forEach(addEmail);
    emailByUserId.forEach((email) => addEmail(email));

    return Array.from(emailSet.values());
  }

  private collectUserIds(users: ProjectUser[]): string[] {
    return users
      .map((user) => user.userId)
      .filter(
        (userId): userId is string | number =>
          userId !== null && userId !== undefined,
      )
      .map((userId) => String(userId).trim())
      .filter((userId) => Boolean(userId));
  }

  private collectEmails(users: ProjectUser[]): string[] {
    return users
      .map((user) => user.email)
      .filter((email): email is string => Boolean(email))
      .map((email) => email.trim())
      .filter((email) => Boolean(email));
  }

  private async sendAssignmentOfferResponseEmail(params: {
    email: string;
    handle: string;
    templateId: string;
    decisionLabel: string;
    engagementId?: string;
    engagementTitle?: string;
    projectId: string;
  }): Promise<void> {
    const payload = {
      data: {
        handle: params.handle,
        email: params.email,
        engagementId: params.engagementId ?? "",
        engagementTitle: params.engagementTitle ?? "",
      },
      recipients: [params.email],
      sendgrid_template_id: params.templateId,
      version: "v3",
    };

    try {
      await this.eventBusService.postEvent("external.action.email", payload);
      this.logger.log(
        `Published 'external.action.email' (assignment offer ${params.decisionLabel}) for project ${params.projectId} to ${params.email}.`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      this.logger.error(
        `Failed to publish assignment offer ${params.decisionLabel} email for project ${params.projectId} to ${params.email}: ${message}`,
      );
    }
  }
}
