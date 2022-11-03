<!-- <template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",

  data() {
    return {
      //
    };
  },
});
</script> -->

<template>
  <nav>
    <span v-if="!isLoggedIn">
      <router-link to="/">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </span>
    <span v-else>
      <router-link to="/tasks">Tasks</router-link> |
      <button @click="logout">Logout</button>
    </span>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { ref } from "vue"; // used for conditional rendering
import firebase from "firebase/compat/app";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(true);
// runs after firebase is initialized
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    isLoggedIn.value = true; // if we have a user
  } else {
    isLoggedIn.value = false; // if we do not
  }
});
const logout = () => {
  firebase.auth().signOut();
  router.push("/");
};
</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: rgb(0, 34, 34);
}

nav a.router-link-exact-active {
  color: teal;
}
</style>
