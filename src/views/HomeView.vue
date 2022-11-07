<template>
  <div class="mx-auto tw-flex tw-flex-col tw-w-60">
    <a href="/login"> <img class="tw-my-1 tw-w-60" :src="monkey" alt="" /></a>
    <h1 class="tw-text-3xl tw-w-fit tw-mt-4 lg:tw-whitespace-nowrap">
      XPENSO. <span class="text-secondary"> Eazily track your expenses.</span>
    </h1>
  </div>
</template>

<script setup lang="ts">
import monkey from "@/assets/cyberkong.png";
</script>
