import { Injectable } from "@nestjs/common";
import { DbService } from "../db/db.service";

@Injectable()
export class HealthService {
  constructor(private readonly db: DbService) {}

  async check() {
    await this.db.$queryRaw`SELECT 1`;
    return {
      status: "ok",
      info: {
        database: {
          status: "up",
        },
      },
      error: {},
      details: {
        database: {
          status: "up",
        },
      },
    };
  }
}
