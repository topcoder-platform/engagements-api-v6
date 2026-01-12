import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { isAxiosError } from "axios";
import * as core from "tc-core-library-js";

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

  private async getM2MToken(): Promise<string> {
    const clientId = this.configService.get<string>("M2M_CLIENT_ID");
    const clientSecret = this.configService.get<string>(
      "M2M_CLIENT_SECRET",
    );

    if (!clientId || !clientSecret) {
      this.logger.error(
        "M2M credentials are not configured. Set M2M_CLIENT_ID and M2M_CLIENT_SECRET.",
      );
      throw new Error("M2M credentials are not configured.");
    }

    return (await this.m2m.getMachineToken(clientId, clientSecret)) as string;
  }
}
