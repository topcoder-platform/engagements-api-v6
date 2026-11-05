import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { IntegrationsModule } from "../integrations/integrations.module";
import { EngagementLeadsController } from "./engagement-leads.controller";
import { EngagementLeadsService } from "./engagement-leads.service";

@Module({
  imports: [DbModule, IntegrationsModule],
  controllers: [EngagementLeadsController],
  providers: [EngagementLeadsService],
  exports: [EngagementLeadsService],
})
export class EngagementLeadsModule {}
