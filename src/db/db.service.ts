import {
  Injectable,
  INestApplication,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DbService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    const databaseUrl = config.get<string>("DATABASE_URL", "");
    const schema = DbService.getSchemaFromUrl(databaseUrl);
    const adapter = new PrismaPg(
      { connectionString: databaseUrl },
      schema ? { schema } : undefined,
    );
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  enableShutdownHooks(app: INestApplication) {
    process.on("beforeExit", () => {
      app.close().catch(console.error);
    });
  }

  private static getSchemaFromUrl(url: string): string | undefined {
    if (!url) {
      return undefined;
    }

    try {
      return new URL(url).searchParams.get("schema") ?? undefined;
    } catch {
      return undefined;
    }
  }
}
