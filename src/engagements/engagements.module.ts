import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { DbModule } from "../db/db.module";
import { IntegrationsModule } from "../integrations/integrations.module";
import { TimesheetsModule } from "../timesheets/timesheets.module";
import { EngagementsController } from "./engagements.controller";
import { EngagementsService } from "./engagements.service";
import { EngagementManagersController } from "./managers/engagement-managers.controller";
import { EngagementManagersService } from "./managers/engagement-managers.service";

@Module({
  imports: [DbModule, HttpModule, IntegrationsModule, TimesheetsModule],
  controllers: [EngagementsController, EngagementManagersController],
  providers: [EngagementsService, EngagementManagersService],
  exports: [EngagementsService, EngagementManagersService],
})
export class EngagementsModule {}
