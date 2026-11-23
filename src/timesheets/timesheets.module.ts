import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { IntegrationsModule } from "../integrations/integrations.module";
import { ApprovedTimesheetsController } from "./approved-timesheets.controller";
import { ApprovedTimesheetsService } from "./approved-timesheets.service";
import { PendingApprovalTimesheetsController } from "./pending-approval-timesheets.controller";
import { PendingApprovalTimesheetsService } from "./pending-approval-timesheets.service";
import { PendingSubmissionTimesheetsController } from "./pending-submission-timesheets.controller";
import { PendingSubmissionTimesheetsService } from "./pending-submission-timesheets.service";
import { TimesheetAccessService } from "./timesheet-access.service";
import { TimesheetAuditService } from "./timesheet-audit.service";
import { TimesheetAutoApprovalService } from "./timesheet-auto-approval.service";
import { TimesheetEmailService } from "./timesheet-email.service";
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
  controllers: [
    TimesheetsController,
    TimesheetEngagementsController,
    ApprovedTimesheetsController,
    PendingApprovalTimesheetsController,
    PendingSubmissionTimesheetsController,
  ],
  providers: [
    ApprovedTimesheetsService,
    PendingApprovalTimesheetsService,
    PendingSubmissionTimesheetsService,
    TimesheetAccessService,
    TimesheetAuditService,
    TimesheetAutoApprovalService,
    TimesheetEmailService,
    TimesheetEventsService,
    TimesheetsService,
  ],
  exports: [
    TimesheetAccessService,
    TimesheetAuditService,
    TimesheetEmailService,
    TimesheetsService,
  ],
})
export class TimesheetsModule {}
