import firebase from "firebase/compat/app";
import { useRouter } from "vue-router";
import { Ref } from "vue";
import { User } from "@/types/types";

const router = useRouter();

export const logout = () => {
  firebase.auth().signOut();
  router.push("/");
};

export const isUserLoggedIn = (
  loginStatus: Ref<boolean>,
  userObj: Ref<User | undefined>
) => {
  firebase.auth().onAuthStateChanged(function (user) {
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
