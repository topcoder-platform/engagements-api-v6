import { BadRequestException } from "@nestjs/common";
import {
  addWorkDays,
  countWorkDays,
  parseWorkDateFilter,
  toWorkDateString,
  toWorkDay,
} from "./timesheet-dates.util";

describe("timesheet date utils", () => {
  it("parses a YYYY-MM-DD filter to UTC midnight", () => {
    expect(parseWorkDateFilter(" 2026-11-09 ", "fromDate")).toEqual(
      new Date("2026-11-09T00:00:00.000Z"),
    );
  });

  it("rejects anything that is not a date", () => {
    expect(() => parseWorkDateFilter("09/11/2026", "fromDate")).toThrow(
      new BadRequestException("fromDate must be a YYYY-MM-DD date."),
    );
  });

  it("counts both ends of a range and steps whole days", () => {
    const from = parseWorkDateFilter("2026-10-01", "fromDate");
    const to = parseWorkDateFilter("2026-10-31", "toDate");

    expect(countWorkDays(from, to)).toBe(31);
    expect(countWorkDays(from, from)).toBe(1);
    expect(toWorkDateString(addWorkDays(to, 1))).toBe("2026-11-01");
  });

  it("drops the time of day from a timestamp", () => {
    expect(toWorkDay(new Date("2026-11-11T23:59:00.000Z"))).toEqual(
      new Date("2026-11-11T00:00:00.000Z"),
    );
  });
});
