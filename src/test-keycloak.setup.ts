// Isolated transport configuration for tests that construct the real Nest module.
// Each e2e suite still injects its own verified-principal fixture middleware.
// USE_KEYCLOAK=true runs the suites in Keycloak mode; m2m-options.spec.ts covers Auth0 mode.
process.env.USE_KEYCLOAK = "true";
process.env.KEYCLOAK_ISSUER = "https://issuer.example/realms/test";
process.env.KEYCLOAK_AUDIENCE = "https://api.example";
process.env.KEYCLOAK_TOKEN_URL = "https://issuer.example/m2m/token";
process.env.ALLOW_LEGACY_USER_AUDIENCE = "true";
