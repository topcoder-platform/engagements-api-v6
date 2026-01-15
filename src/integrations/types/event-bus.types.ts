export interface EngagementMemberAssignedPayload {
  engagementId: string;
  memberId: string;
  memberHandle: string | null;
  skills: string[];
  assignedAt: string;
}

export interface EventBusMessage<T> {
  topic: string;
  originator: string;
  timestamp: string;
  "mime-type": string;
  payload: T;
}
