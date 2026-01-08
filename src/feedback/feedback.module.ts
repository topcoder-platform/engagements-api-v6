import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { EngagementsModule } from "../engagements/engagements.module";
import { FeedbackController } from "./feedback.controller";
import { FeedbackService } from "./feedback.service";

@Module({
  imports: [DbModule, EngagementsModule],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
