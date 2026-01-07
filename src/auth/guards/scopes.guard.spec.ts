import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ScopesGuard } from "./scopes.guard";

describe("ScopesGuard", () => {
  const makeContext = (authUser?: { scopes?: string[] }): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ authUser }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    }) as ExecutionContext;

  it("allows access when required scope is present on authUser", () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(["read:engagements"]),
    } as unknown as Reflector;
    const guard = new ScopesGuard(reflector);
    const context = makeContext({ scopes: ["READ:ENGAGEMENTS"] });

    expect(guard.canActivate(context)).toBe(true);
  });

  it("denies access when required scope is missing", () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(["read:engagements"]),
    } as unknown as Reflector;
    const guard = new ScopesGuard(reflector);
    const context = makeContext({ scopes: ["write:engagements"] });

    expect(guard.canActivate(context)).toBe(false);
  });
});
