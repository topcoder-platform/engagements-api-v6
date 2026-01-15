import { Global, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { ProjectService } from "./project.service";
import { SkillsService } from "./skills.service";
import { MemberService } from "./member.service";
import { EventBusService } from "./event-bus.service";

@Global()
@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ProjectService, SkillsService, MemberService, EventBusService],
  exports: [ProjectService, SkillsService, MemberService, EventBusService],
})
export class IntegrationsModule {}
