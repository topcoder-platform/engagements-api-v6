import { getUserIdentifier, getUserRoles } from "./user.util";

describe("getUserIdentifier", () => {
  it("returns system for M2M tokens", () => {
    expect(getUserIdentifier({ isMachine: true })).toBe("system");
  });

  it("returns normalized userId for user tokens", () => {
    expect(
      getUserIdentifier({ isMachine: false, userId: 123456 }),
    ).toBe("123456");
  });

  it("returns system when authUser is missing", () => {
    expect(getUserIdentifier()).toBe("system");
  });

  it("returns system when userId is missing", () => {
    expect(getUserIdentifier({ isMachine: false })).toBe("system");
  });

  it("returns system when userId is NaN", () => {
    expect(
      getUserIdentifier({ isMachine: false, userId: Number.NaN }),
    ).toBe("system");
  });
});

describe("getUserRoles", () => {
  it("returns empty array when authUser is missing", () => {
    expect(getUserRoles()).toEqual([]);
  });

  it("returns roles from roles array", () => {
    expect(
      getUserRoles({
        roles: ["Administrator", "  Task Manager  ", 123],
      }),
    ).toEqual(["Administrator", "Task Manager"]);
  });

  it("returns roles from role string", () => {
    expect(
      getUserRoles({ role: "Administrator, Task Manager" }),
    ).toEqual(["Administrator", "Task Manager"]);
  });

  it("merges roles from roles and role fields", () => {
    expect(
      getUserRoles({
        roles: ["Administrator"],
        role: "Task Manager",
      }),
    ).toEqual(["Administrator", "Task Manager"]);
  });
});
