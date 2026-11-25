import { BadRequestException } from "@nestjs/common";
import {
  addWorkDays,
  countWorkDays,
  isFutureWorkDate,
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

  describe("isFutureWorkDate", () => {
    const day = (value: string) => new Date(`${value}T00:00:00.000Z`);

    it("treats today and earlier days as started", () => {
      const now = new Date("2026-11-24T10:00:00.000Z");

      expect(isFutureWorkDate(day("2026-11-23"), now)).toBe(false);
      expect(isFutureWorkDate(day("2026-11-24"), now)).toBe(false);
    });

    it("treats a day as started once it has begun anywhere, up to UTC+14", () => {
      // 11:00 UTC on the 24th is already the 25th from UTC+13 eastwards.
      expect(
        isFutureWorkDate(
          day("2026-11-25"),
          new Date("2026-11-24T11:00:00.000Z"),
        ),
      ).toBe(false);
      // At 09:00 UTC it is not yet the 25th anywhere.
      expect(
        isFutureWorkDate(
          day("2026-11-25"),
          new Date("2026-11-24T09:00:00.000Z"),
        ),
      ).toBe(true);
    });

    it("treats days after that as future", () => {
      expect(
        isFutureWorkDate(
          day("2026-11-26"),
          new Date("2026-11-24T23:59:00.000Z"),
        ),
      ).toBe(true);
    });
  });
});
