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
  billingAccountId?: unknown;
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

  /**
   * Checks whether a project currently has a billing account assigned.
   *
   * This is used by engagement updates to block reassignment to a different
   * project when the existing project is already linked to billing.
   *
   * @param projectId Project id being inspected.
   * @returns `true` when a non-empty `billingAccountId` exists, otherwise `false`.
   * @throws Error Propagates token lookup and project lookup errors (except 404).
   */
  async hasBillingAccountAssigned(projectId: string): Promise<boolean> {
    const token = await this.getM2MToken();
    const project = await this.fetchProjectById(projectId, token, [
      "id",
      "billingAccountId",
    ]);

    if (!project) {
      return false;
    }

    return this.normalizeBillingAccountId(project.billingAccountId) !== null;
  }

  /**
   * Resolves the trusted billing account assigned to a project.
   *
   * Assignment payment callers use this server-side project metadata instead of
   * request-supplied billing account ids when validating engagement payouts.
   *
   * @param projectId Project id being inspected.
   * @returns Positive billing account id, or `null` when the project exists and
   * has no configured billing account.
   * @throws Error Propagates token lookup and project lookup failures.
   * @throws Error when the project is missing or returns a malformed billing
   * account id.
   */
  async getProjectBillingAccountId(projectId: string): Promise<number | null> {
    const token = await this.getM2MToken();
    const project = await this.fetchProjectById(projectId, token, [
      "id",
      "billingAccountId",
    ]);

    if (!project) {
      throw new Error(
        `Project ${projectId} was not found while resolving billingAccountId.`,
      );
    }

    return this.resolveConfiguredBillingAccountId(
      project.billingAccountId,
      projectId,
    );
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

  /**
   * Resolves project IDs where the authenticated user is a member.
   *
   * Uses the caller's JWT bearer token against the projects API with
   * `memberOnly=true` and paginates through all pages.
   *
   * Returns an empty list when the authorization header is missing/invalid or
   * when project lookup fails, to fail closed for permission-sensitive callers.
   */
  async getMemberProjectIdsForUser(
    authorizationHeader?: string | string[],
  ): Promise<string[]> {
    const normalizedAuthorizationHeader =
      this.normalizeAuthorizationHeader(authorizationHeader);
    if (!normalizedAuthorizationHeader) {
      return [];
    }

    const projectIds = new Set<string>();
    const perPage = 100;
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const url = this.getMemberProjectsUrl(page, perPage);

      try {
        const response = await firstValueFrom(
          this.httpService.get(url, {
            headers: { Authorization: normalizedAuthorizationHeader },
          }),
        );

        const projects = Array.isArray(response.data) ? response.data : [];
        projects.forEach((project) => {
          const projectId = this.normalizeProjectId(
            (project as ProjectResponse).id,
          );
          if (projectId) {
            projectIds.add(projectId);
          }
        });

        const totalPages = this.parseNumericHeader(
          response.headers?.["x-total-pages"],
        );
        if (totalPages && totalPages > 0) {
          hasMore = page < totalPages;
        } else {
          hasMore = projects.length === perPage;
        }
        page += 1;
      } catch (error) {
        if (isAxiosError(error)) {
          this.logger.warn(
            `Failed to fetch member projects for user-scoped engagement filtering (status=${error.response?.status ?? "unknown"}).`,
          );
          return [];
        }

        this.logger.warn(
          "Failed to fetch member projects for user-scoped engagement filtering.",
        );
        return [];
      }
    }

    return Array.from(projectIds);
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

  private normalizeProjectId(projectId: unknown): string | undefined {
    if (projectId === undefined || projectId === null) {
      return undefined;
    }

    if (typeof projectId !== "string" && typeof projectId !== "number") {
      return undefined;
    }

    const normalizedProjectId = String(projectId).trim();
    return normalizedProjectId || undefined;
  }

  /**
   * Converts a raw project billing account value into a positive integer id.
   *
   * @param billingAccountId Raw value from the projects API.
   * @returns Positive billing account id, or `null` when the value is missing
   * or cannot be normalized.
   */
  private normalizeBillingAccountId(billingAccountId: unknown): number | null {
    if (billingAccountId === undefined || billingAccountId === null) {
      return null;
    }

    if (
      typeof billingAccountId !== "string" &&
      typeof billingAccountId !== "number"
    ) {
      return null;
    }

    const normalizedBillingAccountId = String(billingAccountId).trim();

    if (!/^\d+$/.test(normalizedBillingAccountId)) {
      return null;
    }

    const parsedBillingAccountId = Number(normalizedBillingAccountId);

    return Number.isSafeInteger(parsedBillingAccountId) &&
      parsedBillingAccountId > 0
      ? parsedBillingAccountId
      : null;
  }

  /**
   * Normalizes a billing account id when `null` must only mean "not configured".
   *
   * @param billingAccountId Raw project billing-account value.
   * @param projectId Project id used for diagnostic errors.
   * @returns Positive billing account id, or `null` when the project has no
   * configured billing account.
   * @throws Error when the project returns a non-empty value that cannot be
   * normalized into a positive integer billing account id.
   */
  private resolveConfiguredBillingAccountId(
    billingAccountId: unknown,
    projectId: string,
  ): number | null {
    if (billingAccountId === undefined || billingAccountId === null) {
      return null;
    }

    if (typeof billingAccountId === "string" && !billingAccountId.trim()) {
      return null;
    }

    const normalizedBillingAccountId =
      this.normalizeBillingAccountId(billingAccountId);

    if (normalizedBillingAccountId === null) {
      throw new Error(
        `Project ${projectId} returned an invalid billingAccountId.`,
      );
    }

    return normalizedBillingAccountId;
  }

  private normalizeAuthorizationHeader(
    authorizationHeader?: string | string[],
  ): string | undefined {
    const rawValue = Array.isArray(authorizationHeader)
      ? authorizationHeader.find(
          (value) => typeof value === "string" && value.trim().length > 0,
        )
      : authorizationHeader;

    if (!rawValue || typeof rawValue !== "string") {
      return undefined;
    }

    const normalized = rawValue.trim();
    if (!normalized) {
      return undefined;
    }

    return /^Bearer\s+/i.test(normalized) ? normalized : `Bearer ${normalized}`;
  }

  private parseNumericHeader(headerValue: unknown): number | undefined {
    const rawValue = Array.isArray(headerValue) ? headerValue[0] : headerValue;
    const numericValue =
      typeof rawValue === "number" ? rawValue : Number(rawValue);
    return Number.isFinite(numericValue) ? numericValue : undefined;
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

    return `${normalizedBaseUrl}/v6/projects/${projectId}${query}`;
  }

  private getMemberProjectsUrl(page: number, perPage: number): string {
    const apiBaseUrl = this.configService.get<string>(
      "TOPCODER_API_URL_BASE",
      "https://api.topcoder-dev.com",
    );
    const normalizedBaseUrl = apiBaseUrl.replace(/\/$/, "");
    const query = new URLSearchParams({
      memberOnly: "true",
      fields: "id",
      page: String(page),
      perPage: String(perPage),
    });

    return `${normalizedBaseUrl}/v6/projects?${query.toString()}`;
  }
}
