import { defineStore } from "pinia";
import { ref } from "vue";
import { updateTaskStatus, getDocIdbyTaskId } from "@/helpers/db.helpers";
import { TaskStatus } from "@/types/types";

export const useSortTasksStore = defineStore("sortTask", () => {
  const taskID = ref("");

  const onDrag = async (taskId: string) => {
    const docId = await getDocIdbyTaskId(taskId);
    taskID.value = docId;
  };

  const onDrop = async (newStatus: TaskStatus) => {
    await updateTaskStatus(taskID.value, newStatus);
  };

  return {
    onDrag,
    onDrop,
  };
});
