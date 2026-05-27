import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { PaymentCycle } from "@prisma/client";

import { AssignmentDetailsDto } from "./create-engagement.dto";

describe("AssignmentDetailsDto validation", () => {
  it("accepts valid paymentCycle and standardHoursPerDay", async () => {
    const dto = plainToInstance(AssignmentDetailsDto, {
      memberHandle: "copilot",
      paymentCycle: PaymentCycle.FORTNIGHTLY,
      ratePerHour: "10.5",
      standardHoursPerDay: 7.5,
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it("rejects invalid paymentCycle", async () => {
    const dto = plainToInstance(AssignmentDetailsDto, {
      memberHandle: "copilot",
      paymentCycle: "YEARLY",
      ratePerHour: "10.5",
      standardHoursPerDay: 7.5,
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe("paymentCycle");
  });

  it("rejects standardHoursPerDay with more than two decimals", async () => {
    const dto = plainToInstance(AssignmentDetailsDto, {
      memberHandle: "copilot",
      paymentCycle: PaymentCycle.WEEKLY,
      ratePerHour: "10.5",
      standardHoursPerDay: 7.555,
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe("standardHoursPerDay");
    expect(errors[0].constraints).toMatchObject({
      isNumber:
        "standardHoursPerDay must be a positive number with up to 2 decimal places",
    });
  });

});
