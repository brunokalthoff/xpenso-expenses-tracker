import db from "@/main";
import { Task, TaskStatus } from "@/types/types";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  documentId,
} from "firebase/firestore";

export const getTasksByUserAndStatus = async (
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

export const addTask = async (dataObj: Task) => {
  const colRef = collection(db, "tasks");
  const docRef = await addDoc(colRef, dataObj);
  return docRef.id;
};

export const getDocIdbyTaskId = async (taskId: string) => {
  const q = query(collection(db, "tasks"), where("id", "==", taskId));
  const querySnapshot = await getDocs(q);
  const docArr: string[] = [];
  querySnapshot.forEach((doc) => {
    docArr.push(doc.id);
  });
  return docArr[0];
};

export const updateTask = async (docId: string, newStatus: TaskStatus) => {
  const cityRef = doc(db, "tasks", docId);
  await setDoc(cityRef, { status: newStatus }, { merge: true });
};
