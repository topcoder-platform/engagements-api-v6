import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { isAxiosError } from "axios";
import * as core from "tc-core-library-js";

type SkillResponse = {
  id?: string | number | null;
  skillId?: string | number | null;
  name?: string | null;
};

@Injectable()
export class SkillsService {
  private readonly logger = new Logger(SkillsService.name);
  private readonly m2m;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const authUrl = this.configService.get<string>(
      "AUTH0_URL",
      "https://topcoder-dev.auth0.com/oauth/token",
    );
    const audience = this.configService.get<string>(
      "AUTH0_AUDIENCE",
      "https://api.topcoder-dev.com",
    );

    this.m2m = core.auth.m2m({
      AUTH0_URL: authUrl,
      AUTH0_AUDIENCE: audience,
    });
  }

  async validateSkillsExist(skillIds: string[]): Promise<{
    valid: string[];
    invalid: string[];
  }> {
    if (!skillIds?.length) {
      return { valid: [], invalid: [] };
    }

    const apiBaseUrl = this.configService.get<string>(
      "TOPCODER_API_URL_BASE",
      "https://api.topcoder-dev.com",
    );
    const token = await this.getM2MToken();
    const normalizedBaseUrl = apiBaseUrl.replace(/\/$/, "");
    const skillsBaseUrl = `${normalizedBaseUrl}/v5/standardized-skills`;

    const results = await Promise.all(
      skillIds.map(async (skillId) => {
        const url = `${skillsBaseUrl}/skills/${skillId}`;

        try {
          const response = await firstValueFrom(
            this.httpService.get(url, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          );
          return response.status === 200;
        } catch (error) {
          if (isAxiosError(error)) {
            if (error.response?.status === 404) {
              return false;
            }

            this.logger.error("Skills validation failed.", {
              status: error.response?.status,
              data: error.response?.data,
              skillId,
            });
            throw error;
          }

          this.logger.error("Skills validation failed.", error);
          throw error;
        }
      }),
    );

    const valid: string[] = [];
    const invalid: string[] = [];
    results.forEach((exists, index) => {
      if (exists) {
        valid.push(skillIds[index]);
      } else {
        invalid.push(skillIds[index]);
      }
    });

    return { valid, invalid };
  }

  /**
   * Resolves standardized skill ids to display names for Flexi read models.
   *
   * The helper deduplicates ids, uses the standardized-skills list/by-id seam,
   * and treats hydration as non-fatal. Missing or failed lookups fall back to
   * the raw skill id so detail and history payloads can still be rendered.
   *
   * @param skillIds Raw skill ids from engagement.requiredSkills.
   * @returns Map keyed by skill id with hydrated names or raw-id fallbacks.
   */
  async getSkillNamesByIds(skillIds: string[]): Promise<Map<string, string>> {
    const normalizedSkillIds = Array.from(
      new Set(
        (skillIds ?? [])
          .map((skillId) => (typeof skillId === "string" ? skillId.trim() : ""))
          .filter((skillId) => skillId.length > 0),
      ),
    );

    const skillNamesById = new Map<string, string>();
    normalizedSkillIds.forEach((skillId) =>
      skillNamesById.set(skillId, skillId),
    );

    if (!normalizedSkillIds.length) {
      return skillNamesById;
    }

    const apiBaseUrl = this.configService.get<string>(
      "TOPCODER_API_URL_BASE",
      "https://api.topcoder-dev.com",
    );
    const token = await this.getM2MToken();
    const normalizedBaseUrl = apiBaseUrl.replace(/\/$/, "");
    const skillsBaseUrl = `${normalizedBaseUrl}/v5/standardized-skills`;

    try {
      const query = new URLSearchParams({
        disablePagination: "true",
        page: "1",
        perPage: String(normalizedSkillIds.length),
      });
      normalizedSkillIds.forEach((skillId) => query.append("skillId", skillId));

      const response = await firstValueFrom(
        this.httpService.get(`${skillsBaseUrl}/skills?${query.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      const skills = this.extractSkillList(response.data);

      skills.forEach((skill) => {
        const skillId = this.normalizeSkillId(skill.id ?? skill.skillId);
        const skillName = this.normalizeSkillName(skill.name);

        if (skillId && skillName) {
          skillNamesById.set(skillId, skillName);
        }
      });

      return skillNamesById;
    } catch (error) {
      if (isAxiosError(error)) {
        this.logger.warn("Bulk skill-name hydration failed.", {
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        this.logger.warn("Bulk skill-name hydration failed.", {
          error: error instanceof Error ? error.message : error,
        });
      }
    }

    const fallbackResults = await Promise.allSettled(
      normalizedSkillIds.map((skillId) =>
        this.fetchSkillNameById(skillId, token, skillsBaseUrl),
      ),
    );

    fallbackResults.forEach((result, index) => {
      if (result.status !== "fulfilled" || !result.value) {
        return;
      }

      skillNamesById.set(normalizedSkillIds[index], result.value);
    });

    return skillNamesById;
  }

  private async getM2MToken(): Promise<string> {
    const clientId = this.configService.get<string>("M2M_CLIENT_ID");
    const clientSecret = this.configService.get<string>("M2M_CLIENT_SECRET");

    if (!clientId || !clientSecret) {
      this.logger.error(
        "M2M credentials are not configured. Set M2M_CLIENT_ID and M2M_CLIENT_SECRET.",
      );
      throw new Error("M2M credentials are not configured.");
    }

    return (await this.m2m.getMachineToken(clientId, clientSecret)) as string;
  }

  private extractSkillList(data: unknown): SkillResponse[] {
    if (Array.isArray(data)) {
      return data as SkillResponse[];
    }

    if (
      data &&
      typeof data === "object" &&
      Array.isArray((data as { skills?: unknown }).skills)
    ) {
      return (data as { skills: SkillResponse[] }).skills;
    }

    if (
      data &&
      typeof data === "object" &&
      Array.isArray((data as { data?: unknown }).data)
    ) {
      return (data as { data: SkillResponse[] }).data;
    }

    return [];
  }

  private normalizeSkillId(value: unknown): string | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }

    if (typeof value !== "string" && typeof value !== "number") {
      return undefined;
    }

    const normalizedSkillId = String(value).trim();
    return normalizedSkillId || undefined;
  }

  private normalizeSkillName(value: unknown): string | undefined {
    if (typeof value !== "string") {
      return undefined;
    }

    const normalizedSkillName = value.trim();
    return normalizedSkillName || undefined;
  }

  private async fetchSkillNameById(
    skillId: string,
    token: string,
    skillsBaseUrl: string,
  ): Promise<string | undefined> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${skillsBaseUrl}/skills/${skillId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      const skill = response.data as SkillResponse;

      return this.normalizeSkillName(skill.name);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status !== 404) {
        this.logger.warn("Skill-name lookup failed.", {
          skillId,
          status: error.response?.status,
        });
      }

      return undefined;
    }
  }
}
