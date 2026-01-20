import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { EngagementsModule } from "../engagements/engagements.module";
import { MemberExperienceController } from "./member-experience.controller";
import { MemberExperienceService } from "./member-experience.service";

@Module({
  imports: [DbModule, EngagementsModule],
  controllers: [MemberExperienceController],
  providers: [MemberExperienceService],
  exports: [MemberExperienceService],
})
export class MemberExperienceModule {}
