import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from "@nestjs/common";
import { auth } from "tc-core-library-js";
import { Reflector } from "@nestjs/core";
import { SCOPES_KEY } from "../decorators/scopes.decorator";
import { PrivilegedUserRoles } from "../../app-constants";
import { getUserRoles } from "../../common/user.util";

/** Authorizes verified services by shared exact scopes and members by existing privileged roles. */
@Injectable()
export class PermissionsGuard implements CanActivate {
  private static readonly adminRoles = new Set(
    PrivilegedUserRoles.map((role) => role.toLowerCase()),
  );

  constructor(private reflector: Reflector) {}

  /** Evaluate route metadata and verified identity; returns true or throws Unauthorized/ForbiddenException. */
  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.reflector.getAllAndOverride<string[]>(
      SCOPES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const { authUser } = context.switchToHttp().getRequest();

    if (!authUser) {
      throw new UnauthorizedException("You are not authenticated.");
    }

    if (!requiredScopes?.length) {
      return true;
    }

    if (authUser.kind === "service" && auth.hasScopes(authUser, requiredScopes, "any")) {
      return true;
    }
    if (authUser.kind === "user" && !authUser.isMachine && this.isAdmin(getUserRoles(authUser))) {
      return true;
    }

    throw new ForbiddenException(
      "You do not have the required permissions to access this resource.",
    );
  }

  /** Return whether the verified member roles include an existing privileged role; no I/O or exceptions. */
  private isAdmin(roles: string[]): boolean {
    return roles.some((role) =>
      PermissionsGuard.adminRoles.has(role?.toLowerCase()),
    );
  }
}
