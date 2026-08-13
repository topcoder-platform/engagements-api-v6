import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import { EngagementQueryDto } from "./engagement-query.dto";

describe("EngagementQueryDto validation", () => {
  it.each([
    ["true", true],
    ["TRUE", true],
    ["false", false],
    ["FALSE", false],
  ])("transforms appliedByMe=%s to %s", async (rawValue, expected) => {
    const dto = plainToInstance(EngagementQueryDto, {
      appliedByMe: rawValue,
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
    expect(dto.appliedByMe).toBe(expected);
  });

  it("rejects unsupported appliedByMe values", async () => {
    const dto = plainToInstance(EngagementQueryDto, {
      appliedByMe: "yes",
    });

    const errors = await validate(dto);

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ property: "appliedByMe" }),
      ]),
    );
  });

  it("preserves the existing includePrivate boolean transform", async () => {
    const dto = plainToInstance(EngagementQueryDto, {
      includePrivate: "false",
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
    expect(dto.includePrivate).toBe(false);
  });
});
