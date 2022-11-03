import db from "@/main";
import { Task, TaskStatus } from "@/types/types";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

export const getAllTasksFromUser = async (userId: string) => {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const data: Task[] = [];
  querySnapshot.forEach((doc) => {
    const d: Task = doc.data() as Task;
    data.push(d);
  });
  return data;
};

export const getTasksFromUserWithStatus = async (
  userId: string,
  status: TaskStatus
) => {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId),
    where("status", "==", status)
  );
  const querySnapshot = await getDocs(q);
  const data: Task[] = [];
  querySnapshot.forEach((doc) => {
    const d: Task = doc.data() as Task;
    data.push(d);
  });
  return data;
};

export const deleteTask = async (taskId: string) => {
  const q = query(collection(db, "tasks"), where("id", "==", taskId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
};
