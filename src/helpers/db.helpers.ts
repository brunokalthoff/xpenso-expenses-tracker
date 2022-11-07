import db from "@/main";
import { Task, TaskStatus } from "@/types/types";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { v4 } from "uuid";

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

export const getTasksByUserIdAndStatus = async (
  userId: string,
  status: TaskStatus
) => {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId),
    where("status", "==", status)
  );
  onSnapshot(q, (querySnapshot) => {
    const data: Task[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data().name);
    });
    return data;
  });
};

export const deleteTask = async (taskId: string) => {
  const q = query(collection(db, "tasks"), where("id", "==", taskId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
};

export const addTaskByUserId = async (dataObj: Task) => {
  dataObj.id = v4();
  dataObj.userId = "123";

  const colRef = collection(db, "tasks");
  const docRef = await addDoc(colRef, dataObj);
  return docRef.id;
};
