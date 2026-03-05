import { Global, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { ProjectService } from "./project.service";
import { SkillsService } from "./skills.service";
import { MemberService } from "./member.service";
import { EventBusService } from "./event-bus.service";
import { AssignmentOfferEmailService } from "./assignment-offer-email.service";
import { AssignmentOfferResponseEmailService } from "./assignment-offer-response-email.service";
import { ApplicationStatusEmailService } from "./application-status-email.service";

@Global()
@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    ProjectService,
    SkillsService,
    MemberService,
    EventBusService,
    AssignmentOfferEmailService,
    AssignmentOfferResponseEmailService,
    ApplicationStatusEmailService,
  ],
  exports: [
    ProjectService,
    SkillsService,
    MemberService,
    EventBusService,
    AssignmentOfferEmailService,
    AssignmentOfferResponseEmailService,
    ApplicationStatusEmailService,
  ],
})
export class IntegrationsModule {}
