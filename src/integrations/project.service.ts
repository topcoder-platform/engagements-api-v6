import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { isAxiosError } from "axios";
import * as core from "tc-core-library-js";

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);
  private readonly m2m;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const authUrl = this.configService.get<string>(
      "M2M_AUTH_URL",
      "https://topcoder-dev.auth0.com/oauth/token",
    );
    const audience = this.configService.get<string>(
      "M2M_AUDIENCE",
      "https://api.topcoder-dev.com",
    );

    this.m2m = core.auth.m2m({
      AUTH0_URL: authUrl,
      AUTH0_AUDIENCE: audience,
    });
  }

  async validateProjectExists(projectId: string): Promise<boolean> {
    const baseUrl = this.configService.get<string>(
      "TC_PROJECT_SERVICE_URL",
      "http://localhost:8001/v5",
    );
    const token = await this.getM2MToken();
    const url = `${baseUrl.replace(/\/$/, "")}/projects/${projectId}`;

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

        this.logger.error("Project validation failed.", {
          status: error.response?.status,
          data: error.response?.data,
        });
        throw error;
      }

      this.logger.error("Project validation failed.", error);
      throw error;
    }
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
