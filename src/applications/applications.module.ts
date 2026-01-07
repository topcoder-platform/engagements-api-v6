import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { IntegrationsModule } from "../integrations/integrations.module";
import { EngagementsModule } from "../engagements/engagements.module";
import { ApplicationsController } from "./applications.controller";
import { ApplicationsService } from "./applications.service";

@Module({
  imports: [DbModule, IntegrationsModule, EngagementsModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
