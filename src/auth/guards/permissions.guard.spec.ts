import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionsGuard } from "./permissions.guard";
import { UserRoles } from "../../app-constants";

describe("PermissionsGuard", () => {
  let guard: PermissionsGuard;
  let reflector: Reflector;

  const makeContext = (authUser?: Record<string, unknown>): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ authUser }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    }) as ExecutionContext;

  const setRequiredScopes = (scopes?: string[] | null) => {
    jest
      .spyOn(reflector, "getAllAndOverride")
      .mockReturnValue(scopes as string[] | undefined);
  };

  beforeEach(() => {
    reflector = new Reflector();
    guard = new PermissionsGuard(reflector);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("M2M Authentication", () => {
    it("allows access when M2M token has required scope", () => {
      setRequiredScopes(["read:engagements"]);
      const context = makeContext({
        isMachine: true,
        scopes: ["read:engagements"],
      });

      expect(guard.canActivate(context)).toBe(true);
    });

    it("denies access when M2M token lacks required scope", () => {
      setRequiredScopes(["read:engagements"]);
      const context = makeContext({
        isMachine: true,
        scopes: ["write:engagements"],
      });

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it("handles case-insensitive scope matching for M2M tokens", () => {
      setRequiredScopes(["read:engagements"]);
      const context = makeContext({
        isMachine: true,
        scopes: ["READ:ENGAGEMENTS"],
      });

      expect(guard.canActivate(context)).toBe(true);
    });

    it("allows access with multiple scopes when any matches", () => {
      setRequiredScopes(["write:engagements", "read:applications"]);
      const context = makeContext({
        isMachine: true,
        scopes: ["read:applications"],
      });

      expect(guard.canActivate(context)).toBe(true);
    });
  });

  describe("User Authentication", () => {
    it("allows access when user has admin role", () => {
      setRequiredScopes(["write:engagements"]);
      const context = makeContext({
        isMachine: false,
        roles: [UserRoles.Admin],
      });

      expect(guard.canActivate(context)).toBe(true);
    });

    it("allows access when user has PM role", () => {
      setRequiredScopes(["write:engagements"]);
      const context = makeContext({
        isMachine: false,
        roles: [UserRoles.ProjectManager],
      });

      expect(guard.canActivate(context)).toBe(true);
    });

    it("allows access when user has Task Manager role", () => {
      setRequiredScopes(["write:engagements"]);
      const context = makeContext({
        isMachine: false,
        role: UserRoles.TaskManager,
      });

      expect(guard.canActivate(context)).toBe(true);
    });

    it("allows access when user has required scope", () => {
      setRequiredScopes(["read:engagements"]);
      const context = makeContext({
        isMachine: false,
        scopes: ["read:engagements"],
      });

      expect(guard.canActivate(context)).toBe(true);
    });

    it("denies access when user lacks both role and scope", () => {
      setRequiredScopes(["write:engagements"]);
      const context = makeContext({
        isMachine: false,
        roles: ["Member"],
        scopes: ["read:engagements"],
      });

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it("handles case-insensitive role matching", () => {
      setRequiredScopes(["write:engagements"]);
      const context = makeContext({
        isMachine: false,
        roles: [UserRoles.Admin.toLowerCase()],
      });

      expect(guard.canActivate(context)).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("throws UnauthorizedException when authUser is missing", () => {
      setRequiredScopes(["read:engagements"]);
      const context = makeContext();

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    });

    it("throws UnauthorizedException when no scopes are required but authUser is missing", () => {
      setRequiredScopes(undefined);
      const context = makeContext();

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    });

    it("throws UnauthorizedException when required scopes array is empty but authUser is missing", () => {
      setRequiredScopes([]);
      const context = makeContext();

      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    });

    it("allows access when authenticated and no scopes are required", () => {
      setRequiredScopes([]);
      const context = makeContext({ isMachine: false, userId: "123" });

      expect(guard.canActivate(context)).toBe(true);
    });

    it("throws ForbiddenException when authenticated but unauthorized", () => {
      setRequiredScopes(["read:applications"]);
      const context = makeContext({
        isMachine: false,
        roles: [],
        scopes: [],
      });

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it("handles null or undefined scopes", () => {
      setRequiredScopes(["read:engagements"]);
      const nullContext = makeContext({
        isMachine: true,
        scopes: null,
      });

      expect(() => guard.canActivate(nullContext)).toThrow(ForbiddenException);

      const undefinedContext = makeContext({
        isMachine: true,
      });

      expect(() => guard.canActivate(undefinedContext)).toThrow(
        ForbiddenException,
      );
    });
  });
});
