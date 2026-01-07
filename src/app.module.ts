import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DbModule } from "./db/db.module";
import { AuthMiddleware } from "./auth/auth.middleware";
import { HealthModule } from "./health/health.module";
import { EngagementsModule } from "./engagements/engagements.module";
import { ApplicationsModule } from "./applications/applications.module";
import { IntegrationsModule } from "./integrations/integrations.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    IntegrationsModule,
    EngagementsModule,
    ApplicationsModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the AuthMiddleware to all routes in the application.
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
