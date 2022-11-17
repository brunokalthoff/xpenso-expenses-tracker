<template>
  <v-container class="text-left">
    <v-card class="pa-2 mb-4">
      <AddTask />
    </v-card>

    <v-card
      @drop="onDropCard('tobook')"
      @dragenter.prevent
      @dragover.prevent
      class="my-2 pa-2"
    >
      <v-card-title>📘 To book</v-card-title>
      <TaskCard v-for="(a, key) in toBook" :key="key" :task="a" />
    </v-card>

    <v-card
      @drop="onDropCard('tohandin')"
      @dragenter.prevent
      @dragover.prevent
      class="my-2 pa-2"
    >
      <v-card-title>🫲 To hand in</v-card-title>

      <TaskCard v-for="(a, key) in toHandIn" :key="key" :task="a" />
    </v-card>

    <v-card
      @drop="onDropCard('handedin')"
      @dragenter.prevent
      @dragover.prevent
      class="my-2 pa-2"
    >
      <v-card-title>💤 Handed in</v-card-title>

      <TaskCard v-for="(a, key) in handedIn" :key="key" :task="a" />
    </v-card>

    <v-card
      @drop="onDropCard('reimbursed')"
      @dragenter.prevent
      @dragover.prevent
      class="my-2 pa-2"
    >
      <v-card-title>💰 Reimbursed</v-card-title>
      <TaskCard v-for="(a, key) in reimbursed" :key="key" :task="a" />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import AddTask from "./AddTask.vue";
import TaskCard from "./TaskCard.vue";
import { useUserDataStore } from "@/store/userData";
import { useSortTasksStore } from "@/store/sortTasks";
import { storeToRefs } from "pinia";
import { TaskStatus } from "@/types/types";

const sortTasks = useSortTasksStore();
const { onDrop } = sortTasks;

const userData = useUserDataStore();
const { toBook, toHandIn, handedIn, reimbursed, userObject } =
  storeToRefs(userData);
const { getTasks, checkIsUserLoggedIn } = userData;

if (userObject.value !== undefined) {
  getTasks();
} else {
  setTimeout(() => {
    getTasks();
  }, 1000);
}

const onDropCard = async (newStatus: TaskStatus) => {
  await onDrop(newStatus);
  setTimeout(() => {
    getTasks();
  }, 100);
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin: 4rem 0 0;
}
.card-container {
  width: clamp(300px, 700px, 90%);
  height: 4rem;
}
</style>
