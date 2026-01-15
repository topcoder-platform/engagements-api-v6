import { getUserIdentifier } from "./user.util";

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
});
