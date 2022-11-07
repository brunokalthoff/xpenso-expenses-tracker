import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "./index.css";
import { firebaseConfig } from "./firebaseConfig";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
const pinia = createPinia();
firebase.initializeApp(firebaseConfig);
const db = getFirestore();
export default db;
loadFonts();

createApp(App).use(router).use(pinia).use(vuetify).mount("#app");
