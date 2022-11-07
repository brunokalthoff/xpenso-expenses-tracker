import { getTasksFromUserWithStatus } from "@/helpers/db.helpers";
import { defineStore } from "pinia";
import { ref } from "vue";
import { isUserLoggedIn } from "@/helpers/fb.helpers";

export const useUserDataStore = defineStore("counter", () => {
  const toBook = ref();
  const toHandIn = ref();
  const handedIn = ref();
  const reimbursed = ref();

  const getTasks = async () => {
    try {
      toBook.value = await getTasksFromUserWithStatus("123", "tobook");
      toHandIn.value = await getTasksFromUserWithStatus("123", "tohandin");
      handedIn.value = await getTasksFromUserWithStatus("123", "handedin");
      reimbursed.value = await getTasksFromUserWithStatus("123", "reimbursed");
    } catch (err) {
      console.log(err);
    }
  };

  const isLoggedIn = ref(false);
  const checkIsUserLoggedIn = () => isUserLoggedIn(isLoggedIn);

  return {
    toBook,
    toHandIn,
    handedIn,
    reimbursed,
    getTasks,
    isLoggedIn,
    checkIsUserLoggedIn,
  };
});
