import { Role } from "@prisma/client";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import {
  EngagementQueryDto,
  MAX_ENGAGEMENT_SKILL_FILTER_VALUES,
} from "./engagement-query.dto";

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

  it("accepts comma-separated skill ids and names within the public lookup bound", async () => {
    const dto = plainToInstance(EngagementQueryDto, {
      requiredSkills: "React,11111111-1111-4111-8111-111111111111",
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
    expect(dto.requiredSkills).toEqual([
      "React",
      "11111111-1111-4111-8111-111111111111",
    ]);
  });

  it("rejects more than 20 required skill filter values", async () => {
    const dto = plainToInstance(EngagementQueryDto, {
      requiredSkills: Array.from(
        { length: MAX_ENGAGEMENT_SKILL_FILTER_VALUES + 1 },
        (_, index) => `Skill ${index}`,
      ),
    });

    const errors = await validate(dto);

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ property: "requiredSkills" }),
      ]),
    );
  });

  it("accepts a canonical engagement role and rejects unknown roles", async () => {
    const accepted = plainToInstance(EngagementQueryDto, {
      role: Role.SOFTWARE_DEVELOPER,
    });
    const rejected = plainToInstance(EngagementQueryDto, {
      role: "SOFTWARE_ENGINEER",
    });

    await expect(validate(accepted)).resolves.toHaveLength(0);
    await expect(validate(rejected)).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ property: "role" })]),
    );
  });
});
