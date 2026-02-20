import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { isAxiosError } from "axios";
import * as core from "tc-core-library-js";

type ProjectUser = {
  userId?: string | number | null;
  email?: string | null;
};

type ProjectUsers = {
  members: ProjectUser[];
  invites: ProjectUser[];
};

type ProjectSummary = {
  id: string;
  name: string;
};

type CachedProjectName = {
  expiresAt: number;
  name: string;
};

type ProjectResponse = {
  id?: string | number | null;
  invites?: ProjectUser[] | null;
  members?: ProjectUser[] | null;
  name?: string | null;
};

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);
  private readonly m2m;
  private readonly projectNameCache = new Map<string, CachedProjectName>();
  private readonly projectNameCacheTtlMs = 5 * 60 * 1000;
  private readonly projectLookupBatchSize = 10;

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

  async validateProjectExists(projectId: string): Promise<boolean> {
    const token = await this.getM2MToken();
    const project = await this.fetchProjectById(projectId, token);
    return Boolean(project);
  }

  async getProjectUsers(projectId: string): Promise<ProjectUsers | null> {
    const token = await this.getM2MToken();
    const project = await this.fetchProjectById(projectId, token);

    if (!project) {
      return null;
    }

    return {
      members: Array.isArray(project.members) ? project.members : [],
      invites: Array.isArray(project.invites) ? project.invites : [],
    };
  }

  async getProjectNamesByIds(
    projectIds: string[],
  ): Promise<Map<string, string>> {
    const normalizedProjectIds = Array.from(
      new Set(
        projectIds
          .map((value) => this.normalizeProjectId(value))
          .filter((value): value is string => Boolean(value)),
      ),
    );

    if (!normalizedProjectIds.length) {
      return new Map<string, string>();
    }

    const projectNamesById = new Map<string, string>();
    const uncachedProjectIds: string[] = [];

    normalizedProjectIds.forEach((projectId) => {
      const cachedProjectName = this.getCachedProjectName(projectId);

      if (cachedProjectName) {
        projectNamesById.set(projectId, cachedProjectName);
        return;
      }

      uncachedProjectIds.push(projectId);
    });

    if (!uncachedProjectIds.length) {
      return projectNamesById;
    }

    const token = await this.getM2MToken();

    for (
      let batchStartIndex = 0;
      batchStartIndex < uncachedProjectIds.length;
      batchStartIndex += this.projectLookupBatchSize
    ) {
      const batchProjectIds = uncachedProjectIds.slice(
        batchStartIndex,
        batchStartIndex + this.projectLookupBatchSize,
      );

      const batchProjectSummaries = await Promise.all(
        batchProjectIds.map((projectId) =>
          this.fetchProjectSummary(projectId, token).catch(() => null),
        ),
      );

      batchProjectSummaries.forEach((projectSummary) => {
        if (!projectSummary) {
          return;
        }

        projectNamesById.set(projectSummary.id, projectSummary.name);
        this.setCachedProjectName(projectSummary.id, projectSummary.name);
      });
    }

    return projectNamesById;
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

  private normalizeProjectId(projectId: string): string | undefined {
    const normalizedProjectId = String(projectId || "").trim();
    return normalizedProjectId || undefined;
  }

  private normalizeProjectName(projectName: unknown): string | undefined {
    if (typeof projectName !== "string") {
      return undefined;
    }

    const normalizedProjectName = projectName.trim();
    return normalizedProjectName || undefined;
  }

  private getCachedProjectName(projectId: string): string | undefined {
    const cacheEntry = this.projectNameCache.get(projectId);
    if (!cacheEntry) {
      return undefined;
    }

    if (cacheEntry.expiresAt <= Date.now()) {
      this.projectNameCache.delete(projectId);
      return undefined;
    }

    return cacheEntry.name;
  }

  private setCachedProjectName(projectId: string, projectName: string): void {
    this.projectNameCache.set(projectId, {
      expiresAt: Date.now() + this.projectNameCacheTtlMs,
      name: projectName,
    });
  }

  private async fetchProjectSummary(
    projectId: string,
    token: string,
  ): Promise<ProjectSummary | null> {
    const project = await this.fetchProjectById(projectId, token, [
      "id",
      "name",
    ]);
    if (!project) {
      return null;
    }

    const normalizedProjectName = this.normalizeProjectName(project.name);
    if (!normalizedProjectName) {
      return null;
    }

    return {
      id: projectId,
      name: normalizedProjectName,
    };
  }

  private async fetchProjectById(
    projectId: string,
    token: string,
    fields?: string[],
  ): Promise<ProjectResponse | null> {
    const normalizedProjectId = this.normalizeProjectId(projectId);
    if (!normalizedProjectId) {
      return null;
    }

    const url = this.getProjectUrl(normalizedProjectId, fields);

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );

      return response.data as ProjectResponse;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          return null;
        }

        this.logger.error("Project lookup failed.", {
          projectId: normalizedProjectId,
          status: error.response?.status,
          data: error.response?.data,
        });
        throw error;
      }

      this.logger.error("Project lookup failed.", {
        projectId: normalizedProjectId,
        error,
      });
      throw error;
    }
  }

  private getProjectUrl(projectId: string, fields?: string[]): string {
    const apiBaseUrl = this.configService.get<string>(
      "TOPCODER_API_URL_BASE",
      "https://api.topcoder-dev.com",
    );
    const normalizedBaseUrl = apiBaseUrl.replace(/\/$/, "");
    const query = fields?.length
      ? `?fields=${encodeURIComponent(fields.join(","))}`
      : "";

    return `${normalizedBaseUrl}/v5/projects/${projectId}${query}`;
  }
}
