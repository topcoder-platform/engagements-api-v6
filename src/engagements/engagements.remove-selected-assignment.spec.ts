import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ApplicationStatus, AssignmentStatus } from "@prisma/client";
import { EngagementsService } from "./engagements.service";

jest.mock("nanoid", () => ({ nanoid: () => "test-id" }));

describe("EngagementsService.removeSelectedAssignment", () => {
  let db: any;
  let applicationStatusEmailService: { sendApplicationStatusEmail: jest.Mock };
  let service: EngagementsService;

  const selectedAssignment = (overrides: Record<string, unknown> = {}) => ({
    id: "asg1",
    engagementId: "eng1",
    memberId: "1001",
    memberHandle: "johns",
    status: AssignmentStatus.SELECTED,
    _count: { timesheetEntries: 0 },
    ...overrides,
  });

  beforeEach(() => {
    db = {
      engagement: {
        findUnique: jest
          .fn()
          .mockResolvedValue({ id: "eng1", title: "Senior Frontend Engineer" }),
      },
      engagementAssignment: {
        findUnique: jest.fn().mockResolvedValue(selectedAssignment()),
        delete: jest.fn().mockResolvedValue(undefined),
      },
      engagementApplication: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      $transaction: jest.fn((callback: (tx: unknown) => unknown) =>
        Promise.resolve(callback(db)),
      ),
    };
    applicationStatusEmailService = {
      sendApplicationStatusEmail: jest.fn().mockResolvedValue(undefined),
    };

    service = new EngagementsService(
      db,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      applicationStatusEmailService as any,
    );
  });

  it("deletes the selected assignment, returns the application to submitted and emails the member", async () => {
    await service.removeSelectedAssignment("eng1", "asg1", "admin-1");

    expect(db.engagementAssignment.delete).toHaveBeenCalledWith({
      where: { id: "asg1" },
    });
    expect(db.engagementApplication.updateMany).toHaveBeenCalledWith({
      where: {
        engagementId: "eng1",
        userId: "1001",
        status: ApplicationStatus.SELECTED,
      },
      data: { status: ApplicationStatus.SUBMITTED, updatedBy: "admin-1" },
    });
    expect(
      applicationStatusEmailService.sendApplicationStatusEmail,
    ).toHaveBeenCalledWith({
      memberId: "1001",
      status: "REVOKED",
      engagementTitle: "Senior Frontend Engineer",
    });
  });

  it.each([
    AssignmentStatus.ASSIGNED,
    AssignmentStatus.OFFER_REJECTED,
    AssignmentStatus.COMPLETED,
    AssignmentStatus.TERMINATED,
  ])("refuses a %s assignment", async (status) => {
    db.engagementAssignment.findUnique.mockResolvedValue(
      selectedAssignment({ status }),
    );

    await expect(
      service.removeSelectedAssignment("eng1", "asg1"),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(db.engagementAssignment.delete).not.toHaveBeenCalled();
    expect(db.engagementApplication.updateMany).not.toHaveBeenCalled();
    expect(
      applicationStatusEmailService.sendApplicationStatusEmail,
    ).not.toHaveBeenCalled();
  });

  it("refuses an assignment that already has timesheet entries", async () => {
    db.engagementAssignment.findUnique.mockResolvedValue(
      selectedAssignment({ _count: { timesheetEntries: 2 } }),
    );

    await expect(
      service.removeSelectedAssignment("eng1", "asg1"),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(db.engagementAssignment.delete).not.toHaveBeenCalled();
  });

  it("refuses an assignment from another engagement", async () => {
    db.engagementAssignment.findUnique.mockResolvedValue(
      selectedAssignment({ engagementId: "eng2" }),
    );

    await expect(
      service.removeSelectedAssignment("eng1", "asg1"),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it("404s a missing engagement or assignment", async () => {
    db.engagementAssignment.findUnique.mockResolvedValue(null);
    await expect(
      service.removeSelectedAssignment("eng1", "asg1"),
    ).rejects.toBeInstanceOf(NotFoundException);

    db.engagement.findUnique.mockResolvedValue(null);
    await expect(
      service.removeSelectedAssignment("eng1", "asg1"),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
