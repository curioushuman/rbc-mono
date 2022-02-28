export interface Member {
  id: string;
  title: string;
  description: string;
  status: MemberStatus;
}

export enum MemberStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
