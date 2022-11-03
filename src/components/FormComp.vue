<template>
  <div class="container w-80 mx-auto my-20 px-6 py-6 shadow">
    <h1 class="text-teal-600 font-bold font-sans text-4xl text-center">
      {{ formType }}
    </h1>
    <div class="h-0.5 bg-gray-200 w-36 mx-auto mt-2.5"></div>
    <form>
      <div class="flex flex-col my-5">
        <label class="my-2" for="email">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          name="email"
          class="mt-1 mb-3 shadow-md border-none focus:ring-transparent rounded-sm bg-gray-100 text-teal-500"
        />
        <label class="my-2" for="psw">Password</label>
        <input
          v-model="password"
          type="password"
          id="psw"
          name="psw"
          class="mt-1 mb-3 shadow-md border-none focus:ring-transparent rounded-sm bg-gray-100 text-teal-500"
        />
      </div>
      <div class="text-center mt-3">
        <button
          type="reset"
          class="px-7 py-2 mx-2 font-semibold text-gray-800 bg-gray-100 rounded"
        >
          Reset
        </button>
        <button
          v-if="formType === 'Login'"
          @click.prevent="login"
          class="px-7 py-2 mx-2 font-semibold text-white bg-teal-600 rounded"
        >
          {{ formType }}
        </button>
        <button
          v-else
          @click.prevent="register"
          class="px-7 py-2 mx-2 font-semibold text-white bg-teal-600 rounded"
        >
          {{ formType }}
        </button>
      </div>
      {{ errorMsg }}
    </form>
  </div>

  <div class="log-reg-btn">
    <button class="oauth-btn" v-if="formType === 'Login'" @click="googleSignIn">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20210618182605%21Google_%22G%22_Logo.svg"
        alt=""
      />
      Login with Google
    </button>
    <button class="oauth-btn" v-else @click="googleSignIn">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20210618182605%21Google_%22G%22_Logo.svg"
        alt=""
      />
      Register with Google
    </button>
  </div>

  <div class="log-reg-btn">
    <button class="oauth-btn" v-if="formType === 'Login'" @click="gitHubSignIn">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/95/Font_Awesome_5_brands_github.svg"
        alt=""
      />
      Login with GitHub
    </button>
    <button class="oauth-btn" v-else @click="gitHubSignIn">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/95/Font_Awesome_5_brands_github.svg"
        alt=""
      />
      Register with GitHub
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import { ErrorData } from "@firebase/util";
import { getErrorMessage } from "../helpers/helpers";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

defineProps({
  formType: String,
});

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const router = useRouter();

const register = () => {
  firebase
    .auth() // get the auth api
    .createUserWithEmailAndPassword(email.value, password.value) // need .value because ref()
    .then((data) => {
      console.log("Successfully registered!", data);
      router.push("/tasks"); // redirect to the feed
    })
    .catch((error: ErrorData) => {
      console.log(error.code);
      errorMsg.value = getErrorMessage(error.code as string);
    });
};
const login = () => {
  firebase
    .auth() // get the auth api
    .signInWithEmailAndPassword(email.value, password.value) // need .value because ref()
    .then((data) => {
      console.log("Successfully logged in!", data);
      router.push("/tasks"); // redirect to the feed
    })
    .catch((error: ErrorData) => {
      errorMsg.value = getErrorMessage(error.code as string);
    });
};

let googleProvider = new firebase.auth.GoogleAuthProvider();

const googleSignIn = () => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(() => {
      // let token = result.credential?.accessToken;
      // let user = result.user;
      router.push("/tasks");
    })
    .catch((err) => {
      console.log(err);
      errorMsg.value = err as string;
    });
};
let gitHubProvider = new firebase.auth.GithubAuthProvider();

const gitHubSignIn = () => {
  firebase
    .auth()
    .signInWithPopup(gitHubProvider)
    .then(() => {
      router.push("/tasks");
    })
    .catch((err) => {
      console.log(err);
      errorMsg.value = err as string;
    });
};
</script>

<style>
.log-reg-btn button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: 1px solid rgb(200, 200, 200);
  padding: 0.5rem 2rem;
  border-radius: 5px;
  margin: 0 auto;
  min-width: 18rem;
  margin-top: 0.5rem;
}

button:hover {
  transform: translate(0.8px, 0.8px);
}

button:active {
  filter: brightness(0.9);
}

.oauth-btn {
  background: white;
}

img {
  width: 20px;
  height: 20px;
  display: inline;
}
</style>
