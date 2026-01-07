import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { DbModule } from "../db/db.module";
import { IntegrationsModule } from "../integrations/integrations.module";
import { EngagementsController } from "./engagements.controller";
import { EngagementsService } from "./engagements.service";

@Module({
  imports: [DbModule, HttpModule, IntegrationsModule],
  controllers: [EngagementsController],
  providers: [EngagementsService],
  exports: [EngagementsService],
})
export class EngagementsModule {}
