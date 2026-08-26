import {
  ForbiddenException,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";

import { EngagementsController } from "./engagements.controller";

jest.mock("nanoid", () => ({
  nanoid: () => "test-id",
}));

type AuthenticatedRequest = Request & {
  authUser?: Record<string, any>;
};

/**
 * Creates the minimal request context needed by controller authorization tests.
 *
 * @param authUser Optional authentication claims to attach to the request.
 * @returns An Express request-shaped object with the supplied claims.
 * @throws This helper does not throw.
 */
const buildRequest = (
  authUser?: Record<string, any>,
): AuthenticatedRequest => ({ authUser }) as AuthenticatedRequest;

describe("EngagementsController appliedByMe filter", () => {
  let findAll: jest.Mock;
  let controller: EngagementsController;

  beforeEach(() => {
    findAll = jest.fn().mockResolvedValue({
      data: [],
      meta: { page: 1, perPage: 20, totalCount: 0, totalPages: 0 },
    });
    controller = new EngagementsController({ findAll } as any);
  });

  it("keeps an anonymous public list unchanged when appliedByMe is omitted", async () => {
    const query = { page: 1, perPage: 20 } as any;

    await controller.findAll(query, buildRequest());

    expect(findAll).toHaveBeenCalledWith(query, undefined);
  });

  it("keeps an anonymous public list unchanged when appliedByMe is false", async () => {
    const query = { appliedByMe: false, page: 1, perPage: 20 } as any;

    await controller.findAll(query, buildRequest());

    expect(findAll).toHaveBeenCalledWith(query, undefined);
  });

  it("passes the authenticated current-user id for appliedByMe=true", async () => {
    const query = { appliedByMe: true, page: 1, perPage: 20 } as any;

    await controller.findAll(
      query,
      buildRequest({ isMachine: false, userId: " 654321 " }),
    );

    expect(findAll).toHaveBeenCalledWith(query, "654321");
  });

  it("rejects anonymous appliedByMe=true requests", async () => {
    await expect(
      controller.findAll(
        { appliedByMe: true, page: 1, perPage: 20 } as any,
        buildRequest(),
      ),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(findAll).not.toHaveBeenCalled();
  });

  it("rejects M2M appliedByMe=true requests", async () => {
    await expect(
      controller.findAll(
        { appliedByMe: true, page: 1, perPage: 20 } as any,
        buildRequest({ isMachine: true }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(findAll).not.toHaveBeenCalled();
  });

  it("rejects appliedByMe=true when the user token has no usable id", async () => {
    await expect(
      controller.findAll(
        { appliedByMe: true, page: 1, perPage: 20 } as any,
        buildRequest({ isMachine: false, userId: " " }),
      ),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(findAll).not.toHaveBeenCalled();
  });
});
