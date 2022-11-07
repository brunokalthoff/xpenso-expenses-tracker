<template>
  <v-card elevation="8" max-width="fit-content" class="mx-auto mb-10">
    <div class="tw-container tw-w-80 tw-mb-10 tw-mx-auto tw-px-6 tw-pt-6">
      <v-form elevation="8">
        <h1
          class="headline tw-font-bold tw-font-sans tw-text-4xl tw-text-center"
        >
          {{ formType }}
        </h1>
        <br /><br />
        <v-row align="center">
          <v-col cols="12">
            <v-text-field
              v-model.trim="email"
              type="email"
              label="Email"
              hide-details="auto"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              password
              type="password"
              v-model="password"
              label="Password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col
            class="text-left tw-text-sm hover:tw-underline tw-cursor-pointer"
            cols="7"
            align-self="end"
            >Reset password?</v-col
          >
          <v-col cols="5">
            <v-btn
              color="primary"
              type="submit"
              v-if="formType === 'Login'"
              @click.prevent="login"
              >{{ formType }}</v-btn
            >
            <v-btn
              color="primary"
              type="submit"
              v-if="formType === 'Register'"
              @click.prevent="register"
              >{{ formType }}</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
      {{ errorMsg }}
    </div>
  </v-card>

  <div class="log-reg-btn">
    <v-btn class="oauth-btn" v-if="formType === 'Login'" @click="googleSignIn">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20210618182605%21Google_%22G%22_Logo.svg"
        alt=""
      />&nbsp;
      {{ formType }}
      with Google
    </v-btn>
    <v-btn class="oauth-btn" v-else @click="googleSignIn">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20210618182605%21Google_%22G%22_Logo.svg"
        alt=""
      />&nbsp; {{ formType }} with Google
    </v-btn>
  </div>

  <div class="log-reg-btn">
    <v-btn class="oauth-btn" v-if="formType === 'Login'" @click="gitHubSignIn">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/95/Font_Awesome_5_brands_github.svg"
        alt=""
      />&nbsp; {{ formType }} with GitHub
    </v-btn>
    <v-btn class="oauth-btn" v-else @click="gitHubSignIn">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/95/Font_Awesome_5_brands_github.svg"
        alt=""
      />&nbsp; {{ formType }} with GitHub
    </v-btn>
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

<style scoped>
.headline {
  color: hsl(285, 13%, 19%);
}
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
