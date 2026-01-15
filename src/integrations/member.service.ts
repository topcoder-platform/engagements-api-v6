import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { isAxiosError } from "axios";
import * as core from "tc-core-library-js";

type MemberRecord = {
  userId?: string | number;
  handle?: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  addresses?: Array<{
    streetAddr1?: string | null;
    streetAddr2?: string | null;
    city?: string | null;
    stateCode?: string | null;
    zip?: string | null;
  }>;
};

type MemberAddress = {
  streetAddr1?: string | null;
  city?: string | null;
  stateCode?: string | null;
  zip?: string | null;
};

@Injectable()
export class MemberService {
  private readonly logger = new Logger(MemberService.name);
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

  async getMemberByUserId(userId: string): Promise<{
    email: string | null;
    firstName: string | null;
    lastName: string | null;
  } | null> {
    const members = await this.fetchMembers(
      userId,
      "email,firstName,lastName",
    );
    const member = members[0];
    if (!member) {
      return null;
    }

    return {
      email: member.email ?? null,
      firstName: member.firstName ?? null,
      lastName: member.lastName ?? null,
    };
  }

  async getMemberHandleByUserId(userId: string): Promise<string | null> {
    const members = await this.fetchMembers(userId, "handle");
    const member = members[0];
    if (!member?.handle) {
      return null;
    }

    return member.handle;
  }

  async getMemberUserIdByHandle(handle: string): Promise<string | null> {
    const token = await this.getM2MToken();
    const baseUrl = this.getMemberApiBaseUrl();
    const url = `${baseUrl}/${encodeURIComponent(handle)}?fields=userId`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      const userId = response.data?.userId;
      if (userId === undefined || userId === null) {
        return null;
      }

      return String(userId);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          return null;
        }

        this.logger.error("Member lookup failed.", {
          status: error.response?.status,
          data: error.response?.data,
          handle,
        });
        throw error;
      }

      this.logger.error("Member lookup failed.", error);
      throw error;
    }
  }

  async getMemberAddress(userId: string): Promise<MemberAddress | null> {
    const token = await this.getM2MToken();
    const members = await this.fetchMembers(
      userId,
      "addresses,handle",
      token,
    );
    const member = members[0];
    if (!member) {
      return null;
    }

    const address = this.extractAddressFromMember(member);
    if (address) {
      return address;
    }

    if (!member.handle) {
      return null;
    }

    const traits = await this.fetchMemberTraits(member.handle, token);
    return this.extractAddressFromTraits(traits);
  }

  private extractAddressFromMember(member: MemberRecord): MemberAddress | null {
    if (!member.addresses?.length) {
      return null;
    }

    return this.normalizeAddress(member.addresses[0]);
  }

  private extractAddressFromTraits(traits: unknown): MemberAddress | null {
    if (!Array.isArray(traits)) {
      return null;
    }

    for (const trait of traits) {
      if (!trait || typeof trait !== "object") {
        continue;
      }

      const data = (trait as { traits?: { data?: unknown } }).traits?.data;
      if (!Array.isArray(data)) {
        continue;
      }

      for (const item of data) {
        if (!item || typeof item !== "object") {
          continue;
        }

        const candidate = this.normalizeAddress(item as MemberAddress);
        if (
          candidate?.streetAddr1 ||
          candidate?.city ||
          candidate?.stateCode ||
          candidate?.zip
        ) {
          return candidate;
        }
      }
    }

    return null;
  }

  private normalizeAddress(address?: MemberAddress): MemberAddress | null {
    if (!address) {
      return null;
    }

    return {
      streetAddr1: address.streetAddr1 ?? null,
      city: address.city ?? null,
      stateCode: address.stateCode ?? null,
      zip: address.zip ?? null,
    };
  }

  private async fetchMembers(
    userId: string,
    fields?: string,
    token?: string,
  ): Promise<MemberRecord[]> {
    const baseUrl = this.getMemberApiBaseUrl();
    const authToken = token ?? (await this.getM2MToken());
    const encodedUserId = encodeURIComponent(userId);
    const query = fields
      ? `userId=${encodedUserId}&fields=${encodeURIComponent(fields)}`
      : `userId=${encodedUserId}`;
    const url = `${baseUrl}?${query}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
      );
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          return [];
        }

        this.logger.error("Member lookup failed.", {
          status: error.response?.status,
          data: error.response?.data,
          userId,
        });
        throw error;
      }

      this.logger.error("Member lookup failed.", error);
      throw error;
    }
  }

  private async fetchMemberTraits(
    handle: string,
    token: string,
  ): Promise<unknown> {
    const baseUrl = this.getMemberApiBaseUrl();
    const url = `${baseUrl}/${encodeURIComponent(handle)}/traits`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 404) {
          return null;
        }

        this.logger.error("Member trait lookup failed.", {
          status: error.response?.status,
          data: error.response?.data,
          handle,
        });
        throw error;
      }

      this.logger.error("Member trait lookup failed.", error);
      throw error;
    }
  }

  async getM2MToken(): Promise<string> {
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

  private getMemberApiBaseUrl(): string {
    const apiBaseUrl = this.configService.get<string>(
      "TOPCODER_API_URL_BASE",
      "https://api.topcoder-dev.com",
    );
    const normalizedBaseUrl = apiBaseUrl.replace(/\/$/, "");
    return `${normalizedBaseUrl}/v6/members`;
  }
}
