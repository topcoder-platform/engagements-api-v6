/* Proves that the outbound M2M paths follow USE_KEYCLOAK. Synthetic values only. */
import { createServer, IncomingMessage, Server } from "node:http";
import { AddressInfo } from "node:net";
import { auth0M2mOptions } from "./m2m-options";

const saved = { ...process.env };

/** Build a ConfigService stand-in that reads the given map, honouring fallbacks. */
function configOf(values: Record<string, string | undefined>) {
  return {
    get: jest.fn((key: string, fallback?: string) => values[key] ?? fallback),
  };
}

const auth0Config = {
  AUTH0_URL: "https://tenant.example/oauth/token",
  AUTH0_AUDIENCE: "https://api.example/",
  AUTH0_PROXY_SERVER_URL: "https://proxy.example/token",
  M2M_CLIENT_ID: "auth0-engagements",
  M2M_CLIENT_SECRET: "auth0-secret",
  BUSAPI_URL: "https://bus.example/v5",
};
const keycloakEnv = {
  KEYCLOAK_CLIENT_ID: "m2m-engagements",
  KEYCLOAK_CLIENT_SECRET: "keycloak-secret",
};

/**
 * Load the integration modules fresh with the given environment overrides.
 * @param env Values merged over the saved environment; `undefined` deletes a key.
 * @returns The core module, the Bus wrapper factory mock and the service classes.
 */
function load(env: Record<string, string | undefined>) {
  process.env = { ...saved, ...keycloakEnv } as NodeJS.ProcessEnv;
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  let loaded: any;
  jest.isolateModules(() => {
    const factory = jest.fn(() => ({ postEvent: jest.fn() }));
    jest.doMock("tc-bus-api-wrapper", () => factory);
    loaded = {
      factory,
      core: require("tc-core-library-js"),
      EventBusService: require("./event-bus.service").EventBusService,
      MemberService: require("./member.service").MemberService,
    };
  });
  return loaded;
}

describe("auth0M2mOptions", () => {
  it("maps the pre-migration Auth0 settings and sends requests straight to AUTH0_URL", () => {
    expect(auth0M2mOptions(configOf(auth0Config) as never)).toEqual({
      AUTH0_URL: auth0Config.AUTH0_URL,
      AUTH0_AUDIENCE: auth0Config.AUTH0_AUDIENCE,
      AUTH0_PROXY_SERVER_URL: auth0Config.AUTH0_URL,
      AUTH0_CLIENT_ID: "auth0-engagements",
      AUTH0_CLIENT_SECRET: "auth0-secret",
    });
  });

  it("keeps the pre-migration defaults", () => {
    expect(auth0M2mOptions(configOf({}) as never)).toEqual({
      AUTH0_URL: "https://topcoder-dev.auth0.com/oauth/token",
      AUTH0_AUDIENCE: "https://api.topcoder-dev.com",
      AUTH0_PROXY_SERVER_URL: "https://topcoder-dev.auth0.com/oauth/token",
      AUTH0_CLIENT_ID: undefined,
      AUTH0_CLIENT_SECRET: undefined,
    });
  });
});

describe("USE_KEYCLOAK provider selection", () => {
  let server: Server | undefined;

  afterEach(async () => {
    process.env = { ...saved };
    jest.restoreAllMocks();
    if (server) await new Promise((resolve) => server!.close(resolve));
    server = undefined;
  });

  it("gives the Bus wrapper the Auth0 settings when USE_KEYCLOAK=false", async () => {
    const { EventBusService, factory } = load({ USE_KEYCLOAK: "false" });
    await new EventBusService(configOf(auth0Config)).postEvent("topic", {});
    expect(factory).toHaveBeenCalledWith(
      expect.objectContaining({
        AUTH0_URL: auth0Config.AUTH0_URL,
        AUTH0_AUDIENCE: auth0Config.AUTH0_AUDIENCE,
        AUTH0_PROXY_SERVER_URL: auth0Config.AUTH0_PROXY_SERVER_URL,
        AUTH0_CLIENT_ID: "auth0-engagements",
        AUTH0_CLIENT_SECRET: "auth0-secret",
        BUSAPI_URL: auth0Config.BUSAPI_URL,
      }),
    );
  });

  it("gives the Bus wrapper the Keycloak settings when USE_KEYCLOAK=true", async () => {
    const { EventBusService, factory } = load({ USE_KEYCLOAK: "true" });
    await new EventBusService(configOf(auth0Config)).postEvent("topic", {});
    expect(factory).toHaveBeenCalledWith(
      expect.objectContaining({
        AUTH0_URL: "https://issuer.example/m2m/token",
        AUTH0_AUDIENCE: "https://api.example",
        AUTH0_PROXY_SERVER_URL: "https://issuer.example/m2m/token",
        AUTH0_CLIENT_ID: "m2m-engagements",
        AUTH0_CLIENT_SECRET: "keycloak-secret",
      }),
    );
  });

  it("defaults the Bus wrapper to Auth0 when USE_KEYCLOAK is unset", async () => {
    const { EventBusService, factory } = load({ USE_KEYCLOAK: undefined });
    await new EventBusService(configOf(auth0Config)).postEvent("topic", {});
    expect(factory).toHaveBeenCalledWith(
      expect.objectContaining({ AUTH0_CLIENT_ID: "auth0-engagements" }),
    );
  });

  it("passes the Auth0 options to auth.m2m and requests the default credentials", async () => {
    const { core, MemberService } = load({ USE_KEYCLOAK: "false" });
    const provider = { getMachineToken: jest.fn().mockResolvedValue("token") };
    const m2m = jest.spyOn(core.auth, "m2m").mockReturnValue(provider);
    const service = new MemberService({} as never, configOf(auth0Config));
    expect(m2m).toHaveBeenCalledWith(
      auth0M2mOptions(configOf(auth0Config) as never),
    );
    await expect(service.getM2MToken()).resolves.toBe("token");
    expect(provider.getMachineToken).toHaveBeenCalledWith();
  });

  it("requests Auth0 tokens from AUTH0_URL with M2M_CLIENT_ID when USE_KEYCLOAK=false", async () => {
    const requests: { url?: string; body: Record<string, string> }[] = [];
    server = createServer((req: IncomingMessage, res) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        requests.push({ url: req.url, body: JSON.parse(body) });
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify({ access_token: "auth0-token" }));
      });
    });
    await new Promise<void>((resolve) => server!.listen(0, "127.0.0.1", resolve));
    const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    const { MemberService } = load({
      USE_KEYCLOAK: "false",
      // The environment proxy is for the Bus client only and must not be used here.
      AUTH0_PROXY_SERVER_URL: `${base}/proxy`,
    });
    const service = new MemberService(
      {} as never,
      configOf({ ...auth0Config, AUTH0_URL: `${base}/oauth/token` }),
    );
    await expect(service.getM2MToken()).resolves.toBe("auth0-token");
    expect(requests).toEqual([
      {
        url: "/oauth/token",
        body: {
          grant_type: "client_credentials",
          client_id: "auth0-engagements",
          client_secret: "auth0-secret",
          auth0_url: `${base}/oauth/token`,
          audience: auth0Config.AUTH0_AUDIENCE,
        },
      },
    ]);
  });

  it("uses only the active provider's credentials", async () => {
    let { MemberService } = load({ USE_KEYCLOAK: "false" });
    await expect(
      new MemberService({} as never, configOf({})).getM2MToken(),
    ).rejects.toThrow("AUTH0_CLIENT_ID and AUTH0_CLIENT_SECRET are required");
    ({ MemberService } = load({
      USE_KEYCLOAK: "true",
      KEYCLOAK_CLIENT_ID: undefined,
    }));
    await expect(
      new MemberService({} as never, configOf(auth0Config)).getM2MToken(),
    ).rejects.toThrow("KEYCLOAK_CLIENT_ID and KEYCLOAK_CLIENT_SECRET are required");
  });
});
