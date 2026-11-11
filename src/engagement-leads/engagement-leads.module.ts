import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { IntegrationsModule } from "../integrations/integrations.module";
import { EngagementLeadCalculationsService } from "./engagement-lead-calculations.service";
import { EngagementLeadsController } from "./engagement-leads.controller";
import { EngagementLeadsService } from "./engagement-leads.service";

@Module({
  imports: [DbModule, IntegrationsModule],
  controllers: [EngagementLeadsController],
  providers: [EngagementLeadsService, EngagementLeadCalculationsService],
  exports: [EngagementLeadsService],
})
export class EngagementLeadsModule {}
