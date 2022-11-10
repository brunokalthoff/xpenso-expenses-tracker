<template>
  <v-card class="mx-auto" width="500" elevation="8" outlined shaped>
    <v-card-title>{{ userObject?.name }}</v-card-title>
    <v-></v->
    <v-card-text> {{ userObject?.email }} </v-card-text>
    <v-card-text
      >Account created:
      {{ accountCreated }}
    </v-card-text>
    <v-card-text
      >Last login:
      {{ lastLogin }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import firebase from "firebase/compat/app";
import { useRouter } from "vue-router";
import { onBeforeUnmount, computed } from "vue";
import { useUserDataStore } from "@/store/userData";
import { storeToRefs } from "pinia";

const userDataStore = useUserDataStore();
const { userObject } = storeToRefs(userDataStore);

const router = useRouter();
const authListener = firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    // not logged in
    router.push("/login");
  }
});

onBeforeUnmount(() => {
  // clear up listener
  authListener();
});

const accountCreated = computed(() => {
  if (userObject.value?.metaData.createdAt) {
    const date = new Date(parseInt(userObject.value.metaData?.createdAt));
    return date.toLocaleDateString();
  } else {
    return 0;
  }
});

const lastLogin = computed(() => {
  if (userObject.value?.metaData.lastLoginAt) {
    const date = new Date(parseInt(userObject.value.metaData?.lastLoginAt));
    return date.toLocaleDateString();
  } else {
    return 0;
  }
});
</script>
