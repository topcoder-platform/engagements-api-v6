import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { TimesheetAccessService } from "./timesheet-access.service";
import { TimesheetAuditService } from "./timesheet-audit.service";

/**
 * Timesheet domain. This module currently exposes no controller: it provides the authorization core
 * and the audit writer that the workflow endpoints are built on.
 */
@Module({
  imports: [DbModule],
  providers: [TimesheetAccessService, TimesheetAuditService],
  exports: [TimesheetAccessService, TimesheetAuditService],
})
export class TimesheetsModule {}
