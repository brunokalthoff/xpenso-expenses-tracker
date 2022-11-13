<template>
  <v-container>
    <v-form @submit.prevent="createTask">
      <v-row>
        <v-col cols="8" lg="8">
          <v-text-field
            hide-details
            label="New task..."
            required
            v-model.trim="newTitle"
          ></v-text-field>
        </v-col>

        <v-col cols="4" lg="2">
          <v-select
            hide-details
            :items="options"
            label="Status"
            v-model="newStatus"
          >
          </v-select>
        </v-col>

        <v-col cols="12" lg="2">
          <div class="tw-min-h-full">
            <v-btn min-height="55" block type="submit" color="primary"
              >Add</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
  {{ infoMessage }}
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { options } from "@/helpers/helpers";
import { addTask } from "@/helpers/db.helpers";
import { TaskStatus, Task } from "@/types/types";
import { useUserDataStore } from "@/store/userData";
import { v4 } from "uuid";
import { storeToRefs } from "pinia";

const userDataStore = useUserDataStore();
const { userObject } = storeToRefs(userDataStore);
const { getTasks } = userDataStore;

const newTitle: Ref<string> = ref("");
const newStatus: Ref<TaskStatus> = ref("tobook");
const infoMessage: Ref<string> = ref("");

const createTask = async () => {
  try {
    if (newTitle.value === "") throw "title required";
    const dataObj: Task = {
      id: v4(),
      name: newTitle.value,
      status: newStatus.value,
      userId: userObject.value?.uid || "",
    };
    await addTask(dataObj);
    getTasks();
    newTitle.value = "";
    newStatus.value = "tobook";
  } catch (err) {
    if (newTitle.value === "") {
      infoMessage.value = "Specify a title, please.";
    }
    console.log(err);
  }
};
</script>
