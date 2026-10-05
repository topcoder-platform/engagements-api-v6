import { Injectable, Logger } from "@nestjs/common";
import { EventBusService } from "../integrations/event-bus.service";

export interface TimesheetEventPayload {
  engagementId: string;
  assignmentId: string;
  memberId: string;
  memberHandle: string;
  actorUserId: string;
  actorHandle?: string | null;
  actorRole: string;
  entryIds: string[];
  workDates: string[];
  totalHours: string;
  comment?: string | null;
}

@Injectable()
export class TimesheetEventsService {
  private readonly logger = new Logger(TimesheetEventsService.name);

  constructor(private readonly eventBusService: EventBusService) {}

  /**
   * Emits a timesheet lifecycle event.
   *
   * Never throws: a bus failure is logged and swallowed. The workflow mutation has already committed
   * by the time this runs, and losing a notification is not a reason to fail a member's submission or
   * a manager's approval.
   */
  async emit(topic: string, payload: TimesheetEventPayload): Promise<void> {
    try {
      await this.eventBusService.postEvent(topic, payload);
      this.logger.log(
        `Emitted ${topic} for assignment ${payload.assignmentId} (${payload.entryIds.length} entries)`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to emit ${topic} for assignment ${payload.assignmentId}: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
    }
  }
}
