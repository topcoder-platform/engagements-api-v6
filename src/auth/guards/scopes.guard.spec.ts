import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ScopesGuard } from "./scopes.guard";

/** Create a request context for guard policy tests; accepts claims and returns a Nest context without I/O. */
const makeContext = (authUser?: Record<string, unknown>): ExecutionContext =>
  ({ switchToHttp: () => ({ getRequest: () => ({ authUser }) }),
    getHandler: () => ({}), getClass: () => ({}) }) as ExecutionContext;

describe("ScopesGuard", () => {
  const reflector = { getAllAndOverride: jest.fn().mockReturnValue(["read:engagements"]) } as unknown as Reflector;
  const guard = new ScopesGuard(reflector);
  it.each([
    [true, "service", true, ["read:engagements"]],
    [false, "service", true, ["READ:ENGAGEMENTS"]],
    [false, "service", true, ["write:engagements"]],
    [false, "user", false, ["read:engagements"]],
    [false, undefined, undefined, ["read:engagements"]],
  ])("returns %s for kind %s and machine status %s with scopes %j", (expected, kind, isMachine, scopes) => {
    expect(guard.canActivate(makeContext({ kind, isMachine, scopes }))).toBe(expected);
  });
  it("rejects a missing identity", () => expect(guard.canActivate(makeContext())).toBe(false));
});
