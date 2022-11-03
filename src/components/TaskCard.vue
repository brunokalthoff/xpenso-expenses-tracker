<template>
  <div
    class="card rounded-sm flex items-center justify-between w-full h-full bg-stone-100"
  >
    <div>{{ task?.name }}</div>
    <div class="flex items-center gap-4 options">
      <select
        class="justify-self-end rounded-sm border-none outline-none"
        :value="task"
      >
        <option v-for="(option, key) in options" :key="key" :value="option">
          {{ optionsIcons[key] }}
        </option>
      </select>
      <button @click="() => deleteTask(task?.id)" class="delete-btn">x</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { options, optionsIcons } from "@/helpers/helpers";
import { defineProps } from "vue";
import { deleteTask } from "../helpers/db.helpers";

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

.delete-btn {
}
</style>
