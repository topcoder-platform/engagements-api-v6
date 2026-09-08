import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { EngagementLeadsController } from "./engagement-leads.controller";
import { EngagementLeadsService } from "./engagement-leads.service";

@Module({
  imports: [DbModule],
  controllers: [EngagementLeadsController],
  providers: [EngagementLeadsService],
  exports: [EngagementLeadsService],
})
export class EngagementLeadsModule {}
