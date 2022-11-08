import { getTasksByUserAndStatus } from "@/helpers/db.helpers";
import { defineStore } from "pinia";
import { ref } from "vue";
import { isUserLoggedIn } from "@/helpers/fb.helpers";

export const useUserDataStore = defineStore("userData", () => {
  const isLoggedIn = ref(false);
  const userObject = ref();
  const checkIsUserLoggedIn = () => isUserLoggedIn(isLoggedIn);

  const toBook = ref();
  const toHandIn = ref();
  const handedIn = ref();
  const reimbursed = ref();

  const getTasks = async () => {
    try {
      toBook.value = await getTasksByUserAndStatus("123", "tobook");
      toHandIn.value = await getTasksByUserAndStatus("123", "tohandin");
      handedIn.value = await getTasksByUserAndStatus("123", "handedin");
      reimbursed.value = await getTasksByUserAndStatus("123", "reimbursed");
    } catch (err) {
      console.log(err);
    }
  };

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
