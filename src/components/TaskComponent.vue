<template>
  <div class="card-container">
    <AddNewCard />
  </div>

  <div class="flex flex-col items-stretch p-8">
    <h1 style="margin-top: 0">To book 📘</h1>
    <div class="card-container" v-for="(a, key) in toBook" :key="key">
      <TaskCard :task="a" />
    </div>
    <h1>To hand in 🫲</h1>
    <div class="card-container" v-for="(a, key) in toHandIn" :key="key">
      <TaskCard :task="a" />
    </div>

    <h1>Handed in 💤</h1>
    <div class="card-container" v-for="(a, key) in handedIn" :key="key">
      <TaskCard :task="a" />
    </div>

    <h1>Reimbursed 💰</h1>
    <div class="card-container" v-for="(a, key) in reimbursed" :key="key">
      <TaskCard :task="a" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AddNewCard from "./AddNewCard.vue";
import { ref } from "vue";
import TaskCard from "./TaskCard.vue";
import firebase from "firebase/compat/app";
import { useRouter } from "vue-router";
import { onBeforeUnmount } from "vue";
import { getTasksFromUserWithStatus } from "../helpers/db.helpers";

const router = useRouter();
const authListener = firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    // not logged in
    router.push("/");
  }
});
onBeforeUnmount(() => {
  // clear up listener
  authListener();
});

const toBook = ref();
getTasksFromUserWithStatus("123", "tobook")
  .then((d) => {
    toBook.value = d;
  })
  .catch((err) => console.log(err));

const toHandIn = ref();
getTasksFromUserWithStatus("123", "tohandin")
  .then((d) => {
    toHandIn.value = d;
  })
  .catch((err) => console.log(err));

const handedIn = ref();
getTasksFromUserWithStatus("123", "handedin")
  .then((d) => {
    handedIn.value = d;
  })
  .catch((err) => console.log(err));

const reimbursed = ref();
getTasksFromUserWithStatus("123", "reimbursed")
  .then((d) => {
    reimbursed.value = d;
  })
  .catch((err) => console.log(err));
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin: 4rem 0 0;
}
.card-container {
  margin: 0 auto;
  width: clamp(300px, 700px, 90%);
  height: 4rem;
}
</style>
