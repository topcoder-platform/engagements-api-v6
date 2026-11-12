import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { IntegrationsModule } from "../integrations/integrations.module";
import { EngagementLeadEmailService } from "./engagement-lead-email.service";
import { EngagementLeadCalculationsService } from "./engagement-lead-calculations.service";
import { EngagementLeadsController } from "./engagement-leads.controller";
import { EngagementLeadsService } from "./engagement-leads.service";

@Module({
  imports: [DbModule, IntegrationsModule],
  controllers: [EngagementLeadsController],
  providers: [
    EngagementLeadsService,
    EngagementLeadCalculationsService,
    EngagementLeadEmailService,
  ],
  exports: [EngagementLeadsService],
})
export class EngagementLeadsModule {}
