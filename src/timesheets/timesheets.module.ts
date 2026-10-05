import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { IntegrationsModule } from "../integrations/integrations.module";
import { TimesheetAccessService } from "./timesheet-access.service";
import { TimesheetAuditService } from "./timesheet-audit.service";
import { TimesheetEventsService } from "./timesheet-events.service";
import { TimesheetEngagementsController } from "./timesheet-engagements.controller";
import { TimesheetsController } from "./timesheets.controller";
import { TimesheetsService } from "./timesheets.service";

/**
 * Timesheet domain: entry workflow, approval, administrator overrides, and the authorization core the
 * engagement-manager registry also depends on.
 */
@Module({
  imports: [DbModule, IntegrationsModule],
  controllers: [TimesheetsController, TimesheetEngagementsController],
  providers: [
    TimesheetAccessService,
    TimesheetAuditService,
    TimesheetEventsService,
    TimesheetsService,
  ],
  exports: [TimesheetAccessService, TimesheetAuditService, TimesheetsService],
})
export class TimesheetsModule {}
