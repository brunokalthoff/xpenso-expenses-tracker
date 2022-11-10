import { getTasksByUserAndStatus } from "@/helpers/db.helpers";
import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { isUserLoggedIn } from "@/helpers/fb.helpers";
import { User } from "@/types/types";

export const useUserDataStore = defineStore("userData", () => {
  const isLoggedIn = ref(false);
  const userObject: Ref<User | undefined> = ref(undefined);
  const checkIsUserLoggedIn = () => isUserLoggedIn(isLoggedIn, userObject);

  const toBook = ref();
  const toHandIn = ref();
  const handedIn = ref();
  const reimbursed = ref();

  const getTasks = async () => {
    try {
      toBook.value = await getTasksByUserAndStatus(
        "tobook",
        userObject.value?.uid
      );
      toHandIn.value = await getTasksByUserAndStatus(
        "tohandin",
        userObject.value?.uid
      );
      handedIn.value = await getTasksByUserAndStatus(
        "handedin",
        userObject.value?.uid
      );
      reimbursed.value = await getTasksByUserAndStatus(
        "reimbursed",
        userObject.value?.uid
      );
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
    userObject,
    checkIsUserLoggedIn,
  };
});
