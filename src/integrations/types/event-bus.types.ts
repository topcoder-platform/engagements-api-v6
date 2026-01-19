export interface EngagementMemberAssignedPayload {
  engagementId: string;
  assignmentId?: string;
  memberId: number;
  memberHandle: string;
  skills: Array<{ id: string }>;
}

export interface EventBusMessage<T> {
  topic: string;
  originator: string;
  timestamp: string;
  "mime-type": string;
  payload: T;
}
