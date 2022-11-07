<template>
  <v-card variant="tonal">
    <v-row>
      <v-col cols="8">
        <v-card-text>{{ task?.name }}</v-card-text></v-col
      >
      <v-col cols="3">
        <button
          @click="
            () => {
              deleteTask(task?.id);
              getTasks();
            }
          "
          class="border"
        >
          x
        </button>
      </v-col>
      <v-col cols="1">
        <v-select
          :items="optionsIcons"
          :values="options"
          label="Edit"
          v-model="newStatus"
          hide-details="auto"
        ></v-select
      ></v-col>
    </v-row>
  </v-card>
  {{ newStatus }}
</template>

<script setup lang="ts">
import { options, optionsIcons } from "@/helpers/helpers";
import { defineProps, ref } from "vue";
import { deleteTask } from "../helpers/db.helpers";
import { useUserDataStore } from "@/store/userData";

const store = useUserDataStore();
const { getTasks } = store;

const newStatus = ref("");

defineProps({
  task: Object,
});
</script>

<style scoped>
.card {
  padding: 1rem;
  margin: 0.2rem;
}

.card:hover .options {
  visibility: visible;
}

input[type="radio"] {
  margin: 0 0.5rem 0 1rem;
}

select {
  width: 0.5rem;
  border: none;
  outline: none;
}

.options {
  visibility: hidden;
}
</style>
