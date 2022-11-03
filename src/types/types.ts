export type TaskStatus = "tobook" | "tohandin" | "handedin" | "reimbursed";
export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  userId: string;
}
