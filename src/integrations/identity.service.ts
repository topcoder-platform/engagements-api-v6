import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { isAxiosError } from "axios";
import { firstValueFrom } from "rxjs";
import { MemberService } from "./member.service";

type IdentityRoleRecord = {
  id?: string | number;
  roleName?: string;
};

type IdentityRoleSubjectRecord = {
  subjectID?: string | number;
  subjectId?: string | number;
  userId?: string | number;
  handle?: string | null;
  email?: string | null;
};

export type RoleMember = {
  userId: string;
  handle: string | null;
  email: string | null;
};

/**
 * Reads platform role membership from the Identity API (`/v6/roles`).
 */
@Injectable()
export class IdentityService {
  private readonly logger = new Logger(IdentityService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly memberService: MemberService,
  ) {}

  /**
   * Lists the users holding the named role, matched case-insensitively. Returns an empty list when
   * the role does not exist, has no members, or the lookup fails, so callers can treat role
   * membership as best effort.
   */
  async getRoleMembers(roleName: string): Promise<RoleMember[]> {
    const normalizedRoleName = roleName?.trim() ?? "";
    if (!normalizedRoleName) {
      return [];
    }

    try {
      const token = await this.memberService.getM2MToken();
      const headers = { Authorization: `Bearer ${token}` };
      const rolesUrl = this.getRolesApiBaseUrl();

      const rolesResponse = await firstValueFrom(
        this.httpService.get(rolesUrl, {
          headers,
          params: { filter: `roleName=${normalizedRoleName}` },
        }),
      );

      const roleIds = extractArray<IdentityRoleRecord>(rolesResponse.data)
        .filter(
          (role) =>
            String(role.roleName ?? "").toLowerCase() ===
            normalizedRoleName.toLowerCase(),
        )
        .map((role) => String(role.id ?? "").trim())
        .filter(Boolean);

      if (!roleIds.length) {
        this.logger.warn(`Role '${normalizedRoleName}' was not found.`);
        return [];
      }

      const membersByUserId = new Map<string, RoleMember>();

      for (const roleId of roleIds) {
        const subjects = await this.fetchRoleSubjects(
          `${rolesUrl}/${encodeURIComponent(roleId)}`,
          headers,
        );

        subjects.forEach((subject) => {
          const userId = String(
            subject.subjectID ?? subject.subjectId ?? subject.userId ?? "",
          ).trim();
          if (!userId || membersByUserId.has(userId)) {
            return;
          }

          membersByUserId.set(userId, {
            userId,
            handle: subject.handle?.trim() || null,
            email: subject.email?.trim() || null,
          });
        });
      }

      return Array.from(membersByUserId.values());
    } catch (error) {
      this.logger.error(
        `Failed to fetch members of role '${normalizedRoleName}': ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      return [];
    }
  }

  private async fetchRoleSubjects(
    roleUrl: string,
    headers: Record<string, string>,
  ): Promise<IdentityRoleSubjectRecord[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(roleUrl, {
          headers,
          params: { fields: "subjects" },
        }),
      );
      const payload = unwrapContent(response.data) as {
        subjects?: unknown;
      } | null;
      return Array.isArray(payload?.subjects)
        ? (payload.subjects as IdentityRoleSubjectRecord[])
        : [];
    } catch (error) {
      // The Identity API answers 404 when subjects are requested for a role nobody holds.
      if (isAxiosError(error) && error.response?.status === 404) {
        return [];
      }
      throw error;
    }
  }

  private getRolesApiBaseUrl(): string {
    const apiBaseUrl = this.configService.get<string>(
      "TOPCODER_API_URL_BASE",
      "https://api.topcoder-dev.com",
    );
    return `${apiBaseUrl.replace(/\/$/, "")}/v6/roles`;
  }
}

/** Identity responses come back either bare or wrapped in the legacy `result.content` envelope. */
function unwrapContent(payload: unknown): unknown {
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    const wrapped = payload as {
      result?: { content?: unknown };
      content?: unknown;
    };
    if (wrapped.result?.content !== undefined) {
      return wrapped.result.content;
    }
    if (wrapped.content !== undefined) {
      return wrapped.content;
    }
  }
  return payload;
}

function extractArray<T>(payload: unknown): T[] {
  const content = unwrapContent(payload);
  return Array.isArray(content) ? (content as T[]) : [];
}
