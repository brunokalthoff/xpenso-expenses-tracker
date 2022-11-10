<template>
  <v-app>
    <v-app-bar app>
      <nav
        class="tw-flex tw-items-center tw-justify-between tw-px-5 tw-min-w-full"
      >
        <div class="tw-flex-1 tw-flex tw-justify-start">
          <router-link class="expensifyness text-primary" to="/"
            >XPENSO</router-link
          >
        </div>
        <div>
          <router-link v-if="isLoggedIn" to="/user/tasks">Tasks</router-link>
        </div>
        <div class="tw-flex tw-gap-5 tw-flex-1 tw-justify-end">
          <router-link v-if="!isLoggedIn" to="/login">LOGIN</router-link>
          <router-link v-if="!isLoggedIn" to="/register">REGISTER</router-link>
          <button v-if="isLoggedIn" @click="logOutUser">Logout</button>
          <router-link to="/user/profile">
            <v-avatar v-if="isLoggedIn" color="#d3d9da" size="36">{{
              userObject?.name?.replace(/(\w)\w*\W*/g, (_, i) =>
                i.toUpperCase()
              ) || "UA"
            }}</v-avatar></router-link
          >
        </div>
      </nav>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main class="tw-py-28">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view />
      </v-container>
    </v-main>

    <v-footer app class="tw-flex tw-items-center tw-justify-center">
      Copyright 2022 by XPENSO
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { logout } from "./helpers/fb.helpers";
import { useUserDataStore } from "@/store/userData";
import { storeToRefs } from "pinia";

const store = useUserDataStore();
const { isLoggedIn, userObject } = storeToRefs(store);
const { checkIsUserLoggedIn } = store;

const logOutUser = () => {
  userObject.value = undefined;
  isLoggedIn.value = false;
  logout();
};

checkIsUserLoggedIn();
</script>

<style>
.expensifyness {
  font-family: "Press Start 2P", cursive;
  text-shadow: 2px 2px #1500ff;
}

nav a {
  font-weight: bold;
  color: hsl(288, 100%, 7%);
}

nav a.router-link-exact-active {
  color: #6ac0cb;
}
</style>
