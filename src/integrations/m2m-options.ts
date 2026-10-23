import { ConfigService } from "@nestjs/config";

/** Default Auth0 token endpoint used before the Keycloak migration. */
const DEFAULT_AUTH0_URL = "https://topcoder-dev.auth0.com/oauth/token";
/** Default Auth0 audience used before the Keycloak migration. */
const DEFAULT_AUTH0_AUDIENCE = "https://api.topcoder-dev.com";

/**
 * Build the Auth0 options passed to `core.auth.m2m` by the Finance, Member, Project
 * and Skills integrations.
 *
 * `tc-core-library-js` uses these only when `USE_KEYCLOAK` is unset or `false`; with
 * `USE_KEYCLOAK=true` it ignores them and uses `KEYCLOAK_TOKEN_URL`,
 * `KEYCLOAK_AUDIENCE`, `KEYCLOAK_CLIENT_ID` and `KEYCLOAK_CLIENT_SECRET`. The values
 * are the ones these services used before the migration: `AUTH0_URL` and
 * `AUTH0_AUDIENCE` with their DEV defaults, and the `M2M_CLIENT_ID`/`M2M_CLIENT_SECRET`
 * credentials. Token requests went straight to `AUTH0_URL`, so `AUTH0_PROXY_SERVER_URL`
 * is set to the same URL rather than read from the environment (only the Bus client
 * uses the proxy).
 *
 * @param configService Nest configuration used to read the settings.
 * @returns Options for `core.auth.m2m`; missing credentials stay undefined so a token
 * request rejects instead of the service failing to start.
 */
export function auth0M2mOptions(
  configService: ConfigService,
): Record<string, string | undefined> {
  const authUrl = configService.get<string>("AUTH0_URL", DEFAULT_AUTH0_URL);
  return {
    AUTH0_URL: authUrl,
    AUTH0_AUDIENCE: configService.get<string>(
      "AUTH0_AUDIENCE",
      DEFAULT_AUTH0_AUDIENCE,
    ),
    AUTH0_PROXY_SERVER_URL: authUrl,
    AUTH0_CLIENT_ID: configService.get<string>("M2M_CLIENT_ID"),
    AUTH0_CLIENT_SECRET: configService.get<string>("M2M_CLIENT_SECRET"),
  };
}
