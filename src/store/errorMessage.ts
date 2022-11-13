import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorMessageStore = defineStore("errorMessage", () => {
  const errorMsg = ref("");
  const snackbar = ref(false);
  const timeout = ref(5000);

  return {
    errorMsg,
    snackbar,
    timeout,
  };
});

// import { useErrorMessageStore } from "@/store/errorMessage";
// import { storeToRefs } from "pinia";

// const errorMessageStore = useErrorMessageStore();
// const { errorMsg, snackbar } = storeToRefs(errorMessageStore);
