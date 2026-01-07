import { Global, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { ProjectService } from "./project.service";
import { SkillsService } from "./skills.service";
import { MemberService } from "./member.service";

@Global()
@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ProjectService, SkillsService, MemberService],
  exports: [ProjectService, SkillsService, MemberService],
})
export class IntegrationsModule {}
