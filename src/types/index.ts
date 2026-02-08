export type ProcessStatus =
  | "APPLIED"
  | "IN_PROGRESS"
  | "APPROVED"
  | "REJECTED"
  | "CLOSED";

export type Stage = {
  id: string;
  name: string;
  description?: string;
  date: string;
  completed: boolean;
};

export type Process = {
  id: string;
  company: string;
  position: string;
  description?: string;
  status: ProcessStatus;
  startDate: string;
  currentStageIndex: number;
  stages: Stage[];
  closedReason?: string;
  closedDate?: string;
};
