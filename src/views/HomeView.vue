<template>
  <div class="mx-auto tw-flex tw-flex-col tw-w-60 text-left">
    <img class="tw-my-1 tw-w-60" :src="monkey" alt="" />
    <h1 class="tw-text-3xl tw-w-fit tw-my-4 text-primary">XPENSO.</h1>
    <h2>Eazyli keep track of expenses</h2>
  </div>
  <div class="mx-auto tw-flex tw-flex-col tw-w-60 tw-mt-10 tw-h-16">
    <v-btn href="/user/tasks" color="secondary" height="100%" block
      >Get started<v-icon>mdi-chevron-right</v-icon></v-btn
    >
  </div>
</template>

<script setup lang="ts">
import monkey from "@/assets/cyberkong.png";
</script>

<style scoped>
h1 {
  font-family: "Press Start 2P", cursive;
}
h1 {
  text-shadow: 2px 2px #1500ff;
}
</style>
