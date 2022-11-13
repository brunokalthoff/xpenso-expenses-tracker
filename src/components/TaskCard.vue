<template>
  <v-card
    variant="tonal"
    :draggable="edit ? 'false' : 'true'"
    @dragstart="onDrag(task?.id)"
    class="card d-flex text-left hover:tw-cursor-grab tw-px-5 tw-my-2"
  >
    <v-card-text v-if="!edit" ref="getInnerText">{{ task?.name }}</v-card-text>
    <v-card-text v-if="edit">
      <v-text-field
        variant="outlined"
        hide-details
        v-model="editInput"
      ></v-text-field>
    </v-card-text>
    <v-card-item>
      <v-icon v-if="!edit" @click="editCard" color="#AAAAAA" class="edit-icon"
        >mdi-pencil</v-icon
      >
      <v-icon
        v-if="!edit"
        @click="() => deleteCard(task?.id)"
        color="#AAAAAA"
        class="delete-icon mx-1"
        >mdi-delete</v-icon
      >
      <v-icon
        v-if="edit"
        @click="saveCard(task?.id)"
        color="#AAAAAA"
        class="edit-icon"
        >mdi-check</v-icon
      >
      <v-icon
        v-if="edit"
        @click="discardChanges"
        color="#AAAAAA"
        class="edit-icon"
        >mdi-close</v-icon
      >
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { deleteTask, updateTaskName } from "@/helpers/db.helpers";
import { useUserDataStore } from "@/store/userData";
import { useSortTasksStore } from "@/store/sortTasks";
const props = defineProps({
  task: Object,
});

const initialTaskValue = ref(props.task?.name);
const edit = ref(false);
const editInput = ref(props.task?.name);

const editCard = () => {
  edit.value = true;
};

const saveCard = async (taskId: string) => {
  await updateTaskName(taskId, editInput.value);
  await getTasks();
  edit.value = false;
};

const discardChanges = () => {
  editInput.value = initialTaskValue.value;
  edit.value = false;
};

const userData = useUserDataStore();
const { getTasks } = userData;
const sortTasks = useSortTasksStore();
const { onDrag } = sortTasks;

const deleteCard = async (taskId: string) => {
  await deleteTask(taskId);
  getTasks();
};
</script>

<style scoped>
.delete-icon,
.edit-icon {
  visibility: hidden;
}
.card:hover .delete-icon,
.card:hover .edit-icon {
  visibility: visible;
}
</style>
