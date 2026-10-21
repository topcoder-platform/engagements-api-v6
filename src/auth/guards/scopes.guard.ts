import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { auth } from "tc-core-library-js";
import { SCOPES_KEY } from "../decorators/scopes.decorator";

/** Enforces this API's explicit OR scope policy using the shared verified principal. */
@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /** Return whether the verified service has any declared scope; public metadata is unchanged. */
  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.reflector.getAllAndOverride<string[]>(
      SCOPES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredScopes) {
      return true; // No scopes are required, access is granted.
    }
    const { authUser } = context.switchToHttp().getRequest();
    return requiredScopes.length > 0 && auth.hasScopes(authUser, requiredScopes, "any");
  }
}
