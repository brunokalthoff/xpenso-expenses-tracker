<template>
  <div>
    <TaskComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskComponent from "@/components/TaskComponent.vue"; // @ is an alias to /src

export default defineComponent({
  name: "TaskView",
  components: {
    TaskComponent,
  },
});
</script>
