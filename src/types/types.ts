export type TaskStatus = "tobook" | "tohandin" | "handedin" | "reimbursed";
export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  userId: string;
}

interface UserMetaData {
  createdAt?: string;
  lastLoginAt?: string;
  lastSignInTime?: string;
  creationTime?: string;
}

export interface User {
  name: string | null;
  email: string | null;
  uid: string;
  metaData: UserMetaData;
}
