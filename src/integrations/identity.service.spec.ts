import { AxiosError, AxiosHeaders } from "axios";
import { of, throwError } from "rxjs";
import { IdentityService } from "./identity.service";

describe("IdentityService", () => {
  let service: IdentityService;
  let httpService: { get: jest.Mock };

  const rolesUrl = "https://api.topcoder-dev.com/v6/roles";

  beforeEach(() => {
    httpService = { get: jest.fn() };
    service = new IdentityService(
      httpService as any,
      {
        get: jest.fn((_key: string, fallback?: string) => fallback),
      } as any,
      { getM2MToken: jest.fn().mockResolvedValue("m2m-token") } as any,
    );
  });

  it("returns the subjects of the role with the matching name", async () => {
    httpService.get.mockImplementation((url: string) => {
      if (url === rolesUrl) {
        return of({
          data: [
            { id: 5, roleName: "flexi talent manager" },
            { id: 6, roleName: "Flexi Talent Manager Lead" },
          ],
        });
      }
      if (url === `${rolesUrl}/5`) {
        return of({
          data: {
            id: 5,
            subjects: [
              { userId: 1, handle: "tm-one", email: "one@example.com" },
              { subjectID: "2", handle: "tm-two" },
              { userId: 1, handle: "tm-one", email: "one@example.com" },
            ],
          },
        });
      }
      throw new Error(`unexpected ${url}`);
    });

    await expect(
      service.getRoleMembers("Flexi Talent Manager"),
    ).resolves.toEqual([
      { userId: "1", handle: "tm-one", email: "one@example.com" },
      { userId: "2", handle: "tm-two", email: null },
    ]);
    expect(httpService.get).toHaveBeenCalledWith(rolesUrl, {
      headers: { Authorization: "Bearer m2m-token" },
      params: { filter: "roleName=Flexi Talent Manager" },
    });
    expect(httpService.get).toHaveBeenCalledWith(`${rolesUrl}/5`, {
      headers: { Authorization: "Bearer m2m-token" },
      params: { fields: "subjects" },
    });
  });

  it("returns no members when the role has no subjects", async () => {
    httpService.get.mockImplementation((url: string) =>
      url === rolesUrl
        ? of({ data: [{ id: 5, roleName: "Flexi Talent Manager" }] })
        : throwError(
            () =>
              new AxiosError("Not Found", "404", undefined, undefined, {
                status: 404,
                statusText: "Not Found",
                headers: {},
                config: { headers: new AxiosHeaders() },
                data: {},
              }),
          ),
    );

    await expect(
      service.getRoleMembers("Flexi Talent Manager"),
    ).resolves.toEqual([]);
  });

  it("returns no members when the lookup fails", async () => {
    httpService.get.mockReturnValue(throwError(() => new Error("boom")));

    await expect(
      service.getRoleMembers("Flexi Talent Manager"),
    ).resolves.toEqual([]);
  });
});
