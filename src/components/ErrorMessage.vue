<template>
  <div class="text-center">
    <v-snackbar centered v-model="snackbar" :timeout="timeout">
      {{ errorMsg }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { useErrorMessageStore } from "@/store/errorMessage";
import { storeToRefs } from "pinia";

const errorMessageStore = useErrorMessageStore();
const { errorMsg, snackbar, timeout } = storeToRefs(errorMessageStore);
</script>
