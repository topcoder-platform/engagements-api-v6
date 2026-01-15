import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { MemberService } from "./member.service";
import { EventBusMessage } from "./types/event-bus.types";

@Injectable()
export class EventBusService {
  private readonly logger = new Logger(EventBusService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly memberService: MemberService,
  ) {}

  private getBusApiUrl(): string {
    return (
      this.configService.get<string>("BUS_API_URL") ||
      this.configService.get<string>("BUSAPI_URL") ||
      "http://localhost:4000/eventBus"
    );
  }

  private async getM2MToken(): Promise<string> {
    return this.memberService.getM2MToken();
  }

  async postEvent<T>(topic: string, payload: T): Promise<void> {
    const token = await this.getM2MToken();
    const message: EventBusMessage<T> = {
      topic,
      originator: "engagements-api-v6",
      timestamp: new Date().toISOString(),
      "mime-type": "application/json",
      payload,
    };
    const url = this.getBusApiUrl();

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, message, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      const status = response.status as HttpStatus;
      if (
        status !== HttpStatus.OK &&
        status !== HttpStatus.NO_CONTENT &&
        status !== HttpStatus.ACCEPTED
      ) {
        throw new Error(`Event bus status code: ${response.status}`);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "unknown error";
      this.logger.error(`Event bus failed with error: ${message}`);
      throw new InternalServerErrorException(
        "Sending message to event bus failed.",
      );
    }
  }
}
