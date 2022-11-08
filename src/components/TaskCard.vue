<template>
  <v-card
    variant="tonal"
    draggable="true"
    @dragstart="onDrag(task?.id)"
    class="text-left tw-flex tw-items-center hover:tw-cursor-grab tw-px-5 tw-my-2"
  >
    <v-card-text>{{ task?.name }}</v-card-text>

    <v-icon @click="() => deleteCard(task?.id)">mdi-delete</v-icon>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { deleteTask } from "../helpers/db.helpers";
import { useUserDataStore } from "@/store/userData";
import { useSortTasksStore } from "@/store/sortTasks";

defineProps({
  task: Object,
});

const userData = useUserDataStore();
const { getTasks } = userData;
const sortTasks = useSortTasksStore();
const { onDrag } = sortTasks;

const deleteCard = async (taskId: string) => {
  await deleteTask(taskId);
  getTasks();
};
</script>
