import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import {
  PENDING_APPROVAL_REMINDER_MAX_ASSIGNMENTS,
  SendPendingApprovalRemindersDto,
} from "./pending-approval-timesheet-list.dto";

describe("SendPendingApprovalRemindersDto validation", () => {
  const validateBody = (body: unknown) => {
    const dto = plainToInstance(SendPendingApprovalRemindersDto, body);
    return validate(dto).then((errors) => ({ dto, errors }));
  };

  it("trims assignment ids", async () => {
    const { dto, errors } = await validateBody({
      assignmentIds: [" asg1 ", "asg2"],
    });

    expect(errors).toHaveLength(0);
    expect(dto.assignmentIds).toEqual(["asg1", "asg2"]);
  });

  it.each([[[" "]], [["asg1", "  "]], [[""]]])(
    "rejects blank assignment ids in %p",
    async (assignmentIds) => {
      const { errors } = await validateBody({ assignmentIds });

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe("assignmentIds");
    },
  );

  it.each([
    [{}],
    [{ assignmentIds: [] }],
    [{ assignmentIds: "asg1" }],
    [{ assignmentIds: [1] }],
    [
      {
        assignmentIds: Array.from(
          { length: PENDING_APPROVAL_REMINDER_MAX_ASSIGNMENTS + 1 },
          (_, index) => `asg${index}`,
        ),
      },
    ],
  ])("rejects %p", async (body) => {
    const { errors } = await validateBody(body);

    expect(errors).toHaveLength(1);
  });
});
