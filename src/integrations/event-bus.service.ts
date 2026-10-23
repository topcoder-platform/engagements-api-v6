import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as busApi from "tc-bus-api-wrapper";
import * as core from "tc-core-library-js";
import { EventBusMessage } from "./types/event-bus.types";

type BusApiClient = {
  postEvent: <T>(message: EventBusMessage<T>) => Promise<void>;
};

@Injectable()
export class EventBusService {
  private readonly logger = new Logger(EventBusService.name);
  private busApiClient?: BusApiClient;

  constructor(private readonly configService: ConfigService) {}

  /**
   * Return the cached Bus client, creating it on first use.
   *
   * The wrapper's `AUTH0_*` options come from `core.auth.wrapperSettings`, which follows
   * `USE_KEYCLOAK`: `true` fills them from `KEYCLOAK_TOKEN_URL`, `KEYCLOAK_AUDIENCE`,
   * `KEYCLOAK_CLIENT_ID` and `KEYCLOAK_CLIENT_SECRET`; unset or `false` keeps the
   * pre-migration Auth0 settings `AUTH0_URL`, `AUTH0_AUDIENCE`, `M2M_CLIENT_ID`,
   * `M2M_CLIENT_SECRET` and `AUTH0_PROXY_SERVER_URL`. Used by `postEvent`.
   * Takes no parameters.
   *
   * @returns The initialized Bus client.
   * @throws Error when the wrapper rejects the configuration (including a
   * `USE_KEYCLOAK` value other than `true`/`false`), or
   * InternalServerErrorException when no client is returned.
   */
  private getBusApiClient(): BusApiClient {
    if (this.busApiClient) {
      return this.busApiClient;
    }

    const busApiUrl =
      this.configService.get<string>("BUSAPI_URL") ||
      this.configService.get<string>("BUS_API_URL") ||
      "http://localhost:4000/eventBus";
    const tokenCacheTimeRaw =
      this.configService.get<string>("TOKEN_CACHE_TIME");
    const tokenCacheTime = Number(tokenCacheTimeRaw);

    try {
      // The wrapper uses AUTH0_* option names; USE_KEYCLOAK picks Keycloak or Auth0 values.
      this.busApiClient = busApi({
        ...core.auth.wrapperSettings({
          AUTH0_URL: this.configService.get<string>("AUTH0_URL"),
          AUTH0_AUDIENCE: this.configService.get<string>("AUTH0_AUDIENCE"),
          AUTH0_CLIENT_ID: this.configService.get<string>("M2M_CLIENT_ID"),
          AUTH0_CLIENT_SECRET:
            this.configService.get<string>("M2M_CLIENT_SECRET"),
          AUTH0_PROXY_SERVER_URL: this.configService.get<string>(
            "AUTH0_PROXY_SERVER_URL",
          ),
        }),
        TOKEN_CACHE_TIME: Number.isFinite(tokenCacheTime)
          ? tokenCacheTime
          : undefined,
        BUSAPI_URL: busApiUrl,
        KAFKA_ERROR_TOPIC:
          this.configService.get<string>("KAFKA_ERROR_TOPIC") ||
          "common.error.reporting",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      this.logger.error(`Event bus client initialization failed: ${message}`);
      throw error;
    }

    if (!this.busApiClient) {
      throw new InternalServerErrorException(
        "Event bus client initialization failed.",
      );
    }

    return this.busApiClient;
  }

  async postEvent<T>(topic: string, payload: T): Promise<void> {
    const message: EventBusMessage<T> = {
      topic,
      originator: "engagements-api-v6",
      timestamp: new Date().toISOString(),
      "mime-type": "application/json",
      payload,
    };

    try {
      await this.getBusApiClient().postEvent(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      this.logger.error(`Event bus failed with error: ${message}`);
      throw new InternalServerErrorException(
        "Sending message to event bus failed.",
      );
    }
  }
}
