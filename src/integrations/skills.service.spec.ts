import { of, throwError } from "rxjs";
import { SkillsService } from "./skills.service";

const mockGetMachineToken = jest.fn();

jest.mock("tc-core-library-js", () => ({
  auth: {
    m2m: jest.fn(() => ({ getMachineToken: mockGetMachineToken })),
  },
}));

describe("SkillsService engagement filter resolution", () => {
  let httpGet: jest.Mock;
  let service: SkillsService;

  beforeEach(() => {
    mockGetMachineToken.mockReset().mockResolvedValue("m2m-token");
    httpGet = jest.fn();
    const configValues: Record<string, string> = {
      TOPCODER_API_URL_BASE: "https://api.example.test/",
      M2M_CLIENT_ID: "client-id",
      M2M_CLIENT_SECRET: "client-secret",
    };

    service = new SkillsService(
      { get: httpGet } as any,
      {
        get: jest.fn(
          (key: string, fallback?: string) =>
            configValues[key] ?? fallback,
        ),
      } as any,
    );
  });

  it("resolves canonical names in one repeated-name request", async () => {
    httpGet.mockReturnValue(
      of({
        status: 200,
        data: [
          {
            id: "11111111-1111-4111-8111-111111111111",
            name: "React",
          },
          {
            id: "22222222-2222-4222-8222-222222222222",
            name: "Vue.js",
          },
        ],
      }),
    );

    const result = await service.resolveSkillFilterValues([
      "React",
      "Vue.js",
    ]);

    expect(httpGet).toHaveBeenCalledTimes(1);
    const [url, options] = httpGet.mock.calls[0];
    const parsedUrl = new URL(url);
    expect(parsedUrl.pathname).toBe("/v5/standardized-skills/skills");
    expect(parsedUrl.searchParams.getAll("name")).toEqual([
      "React",
      "Vue.js",
    ]);
    expect(parsedUrl.searchParams.get("disablePagination")).toBe("true");
    expect(options).toEqual({
      headers: { Authorization: "Bearer m2m-token" },
    });
    expect(result.skillIds).toEqual([
      "11111111-1111-4111-8111-111111111111",
      "22222222-2222-4222-8222-222222222222",
    ]);
    expect(result.unresolvedNames).toEqual([]);
  });

  it("uses bounded fuzzy lookup for case-insensitive exact matches only", async () => {
    httpGet.mockImplementation((url: string) => {
      const parsedUrl = new URL(url);
      if (parsedUrl.pathname.endsWith("/skills")) {
        return of({ status: 200, data: [] });
      }

      const term = parsedUrl.searchParams.get("term");
      if (term === "react") {
        return of({
          status: 200,
          data: [
            {
              id: "11111111-1111-4111-8111-111111111111",
              name: "React",
            },
            {
              id: "33333333-3333-4333-8333-333333333333",
              name: "React Native",
            },
          ],
        });
      }

      return of({
        status: 200,
        data: [
          {
            id: "44444444-4444-4444-8444-444444444444",
            name: "JavaScript",
          },
        ],
      });
    });

    const result = await service.resolveSkillFilterValues([
      "AAAAAAAA-AAAA-4AAA-8AAA-AAAAAAAAAAAA",
      "react",
      "script",
    ]);

    expect(httpGet).toHaveBeenCalledTimes(3);
    expect(
      httpGet.mock.calls
        .slice(1)
        .map(([url]) => new URL(url).searchParams.get("size")),
    ).toEqual(["20", "20"]);
    expect(result.skillIds).toEqual([
      "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
      "11111111-1111-4111-8111-111111111111",
    ]);
    expect(result.skillNamesById).toEqual(
      new Map([
        ["11111111-1111-4111-8111-111111111111", "React"],
      ]),
    );
    expect(result.unresolvedNames).toEqual(["script"]);
  });

  it("fails closed for names when standardized-skills is unavailable", async () => {
    httpGet.mockReturnValue(
      throwError(() => new Error("standardized-skills unavailable")),
    );

    const result = await service.resolveSkillFilterValues([
      "11111111-1111-4111-8111-111111111111",
      "React",
    ]);

    expect(result).toEqual({
      skillIds: ["11111111-1111-4111-8111-111111111111"],
      skillNamesById: new Map(),
      unresolvedNames: ["React"],
    });
  });
});
