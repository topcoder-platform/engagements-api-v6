import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as busApi from "tc-bus-api-wrapper";
import { EventBusMessage } from "./types/event-bus.types";

type BusApiClient = {
  postEvent: <T>(message: EventBusMessage<T>) => Promise<void>;
};

@Injectable()
export class EventBusService {
  private readonly logger = new Logger(EventBusService.name);
  private busApiClient?: BusApiClient;

  constructor(private readonly configService: ConfigService) {}

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
      this.busApiClient = busApi({
        AUTH0_URL: this.configService.get<string>("AUTH0_URL"),
        AUTH0_AUDIENCE: this.configService.get<string>("AUTH0_AUDIENCE"),
        TOKEN_CACHE_TIME: Number.isFinite(tokenCacheTime)
          ? tokenCacheTime
          : undefined,
        AUTH0_CLIENT_ID: this.configService.get<string>("M2M_CLIENT_ID"),
        AUTH0_CLIENT_SECRET:
          this.configService.get<string>("M2M_CLIENT_SECRET"),
        BUSAPI_URL: busApiUrl,
        KAFKA_ERROR_TOPIC:
          this.configService.get<string>("KAFKA_ERROR_TOPIC") ||
          "common.error.reporting",
        AUTH0_PROXY_SERVER_URL: this.configService.get<string>(
          "AUTH0_PROXY_SERVER_URL",
        ),
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
