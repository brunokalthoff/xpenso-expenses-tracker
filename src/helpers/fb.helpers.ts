import firebase from "firebase/compat/app";
import { Ref } from "vue";
import { User } from "@/types/types";

export const isUserLoggedIn = async (
  loginStatus: Ref<boolean>,
  userObj: Ref<User | undefined>
) => {
  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      loginStatus.value = true;
      const newUserObj: User = {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        metaData: user.metadata,
      };
      userObj.value = newUserObj;
    } else {
      loginStatus.value = false;
    }
  });
};
