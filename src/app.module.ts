import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DbModule } from "./db/db.module";
import { AuthMiddleware } from "./auth/auth.middleware";
import { HealthModule } from "./health/health.module";
import { EngagementsModule } from "./engagements/engagements.module";
import { ApplicationsModule } from "./applications/applications.module";
import { IntegrationsModule } from "./integrations/integrations.module";
import { FeedbackModule } from "./feedback/feedback.module";
import { MemberExperienceModule } from "./member-experience/member-experience.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          BUS_API_URL: process.env.BUS_API_URL ?? process.env.BUSAPI_URL,
          BUSAPI_URL: process.env.BUSAPI_URL ?? process.env.BUS_API_URL,
          KAFKA_ERROR_TOPIC:
            process.env.KAFKA_ERROR_TOPIC ?? "common.error.reporting",
        }),
      ],
    }),
    DbModule,
    IntegrationsModule,
    EngagementsModule,
    ApplicationsModule,
    FeedbackModule,
    MemberExperienceModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the AuthMiddleware to all routes in the application.
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
