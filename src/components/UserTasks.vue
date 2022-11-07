<template>
  <v-container>
    <v-card class="pa-5">
      <AddTask />
    </v-card>

    <v-container dark class="my-12 pa-5">
      <v-card-title large>📘 To book</v-card-title>
      <v-card-subtitle>Some good booking is required here.</v-card-subtitle>
      <TaskCard v-for="(a, key) in toBook" :key="key" :task="a" />
    </v-container>

    <v-container variant="outlined" class="my-12 pa-5">
      <v-card-title large>🫲 To hand in</v-card-title>
      <v-card-subtitle>Some good booking is required here.</v-card-subtitle>
      <TaskCard v-for="(a, key) in toHandIn" :key="key" :task="a" />
    </v-container>

    <v-container class="my-12 pa-5">
      <v-card-title large>💤 Handed in</v-card-title>
      <v-card-subtitle>Some good booking is required here.</v-card-subtitle>
      <TaskCard v-for="(a, key) in handedIn" :key="key" :task="a" />
    </v-container>

    <v-container class="my-12 pa-5">
      <v-card-title large>💰 Reimbursed</v-card-title>
      <v-card-subtitle>Some good booking is required here.</v-card-subtitle>
      <TaskCard v-for="(a, key) in reimbursed" :key="key" :task="a" />
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import AddTask from "./AddTask.vue";
import TaskCard from "./TaskCard.vue";
import firebase from "firebase/compat/app";
import { useRouter } from "vue-router";
import { onBeforeUnmount } from "vue";
import { useUserDataStore } from "@/store/userData";
import { storeToRefs } from "pinia";

const store = useUserDataStore();
const { toBook, toHandIn, handedIn, reimbursed } = storeToRefs(store);
const { getTasks } = store;

const router = useRouter();
const authListener = firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    // not logged in
    router.push("/login");
  } else {
    getTasks();
  }
});

onBeforeUnmount(() => {
  // clear up listener
  authListener();
});
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
