import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import {
  PendingSubmissionTimesheetQueryDto,
  SendPendingSubmissionRemindersDto,
} from "./pending-submission-timesheet-list.dto";

describe("Pending submission DTO validation", () => {
  it("defaults the pagination of a query and keeps its work period", async () => {
    const dto = plainToInstance(PendingSubmissionTimesheetQueryDto, {
      fromDate: " 2026-11-09 ",
      toDate: "2026-11-13",
      excludeTestProjects: "true",
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
    expect(dto).toMatchObject({
      fromDate: "2026-11-09",
      toDate: "2026-11-13",
      excludeTestProjects: true,
      page: 1,
    });
    expect(dto.perPage).toBeGreaterThan(0);
  });

  it.each([
    [{ toDate: "2026-11-13" }, "fromDate"],
    [{ fromDate: "2026-11-09" }, "toDate"],
    [{ fromDate: "2026-11-09", toDate: "soon" }, "toDate"],
  ])("rejects the query %p", async (query, property) => {
    const errors = await validate(
      plainToInstance(PendingSubmissionTimesheetQueryDto, query),
    );

    expect(errors.map((error) => error.property)).toEqual([property]);
  });

  it("trims reminder assignment ids and requires the work period", async () => {
    const valid = plainToInstance(SendPendingSubmissionRemindersDto, {
      fromDate: "2026-11-09",
      toDate: "2026-11-13",
      assignmentIds: [" asg1 "],
    });
    const missingPeriod = plainToInstance(SendPendingSubmissionRemindersDto, {
      assignmentIds: ["asg1"],
    });
    const blankId = plainToInstance(SendPendingSubmissionRemindersDto, {
      fromDate: "2026-11-09",
      toDate: "2026-11-13",
      assignmentIds: [" "],
    });

    expect(await validate(valid)).toHaveLength(0);
    expect(valid.assignmentIds).toEqual(["asg1"]);
    expect(
      (await validate(missingPeriod)).map((error) => error.property),
    ).toEqual(["fromDate", "toDate"]);
    expect((await validate(blankId)).map((error) => error.property)).toEqual([
      "assignmentIds",
    ]);
  });
});
