<template>
  <v-card elevation="1">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="7">
            <v-text-field solo label="New task..." required></v-text-field>
          </v-col>

          <v-col cols="3">
            <v-select :items="optionsWords" label="Solo field" solo></v-select>
          </v-col>

          <v-col cols="2"> <v-btn elevation="2" color="teal">Add</v-btn></v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>

  <!-- <input
        placeholder="New task ..."
        class="h-full w-full shadow-md border-none focus:ring-transparent rounded-sm bg-gray-100"
        v-model.trim="newTitle"
        type="text"
      /> -->

  <!-- <select
        class="h-full shadow-md border-none focus:ring-transparent rounded-sm bg-gray-100"
        v-model="newStatus"
      > -->
  <!-- <option v-for="(option, key) in options" :key="key" :value="option">
          {{ option }} {{ optionsIcons[key] }}
        </option>
      </select> -->

  <!-- <button
        type="submit"
        class="bg-teal-400 h-full px-8 shadow-md border-none focus:ring-transparent rounded-sm"
      >
        ADD
      </button> -->
  <!-- </form>
  </div> -->

  {{ infoMessage }}
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import db from "../main";
import { options, optionsIcons, optionsWords } from "@/helpers/helpers";
import { collection, addDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { TaskStatus, Task } from "@/types/types";
const newTitle: Ref<string> = ref("");
const newStatus: Ref<TaskStatus> = ref("tobook");
const infoMessage: Ref<string> = ref("");

const addCard = async () => {
  try {
    if (newTitle.value === "") throw "title required";
    const colRef = collection(db, "tasks");
    const dataObj: Task = {
      id: v4(),
      name: newTitle.value,
      status: newStatus.value,
      userId: "123",
    };
    const docRef = await addDoc(colRef, dataObj);
    console.log("Document was created with ID:", docRef.id);
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
