import firebase from "firebase/compat/app";
import { useRouter } from "vue-router";
import { Ref } from "vue";

const router = useRouter();

export const logout = () => {
  firebase.auth().signOut();
  router.push("/login");
};

export const isUserLoggedIn = (val: Ref<boolean>) => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      val.value = true;
    } else {
      val.value = false;
    }
  });
};

export const logoutUser = () => {
  firebase.auth().signOut();
  router.push("/login");
};
