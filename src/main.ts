import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
const pinia = createPinia();
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "./index.css";
import { firebaseConfig } from "./firebaseConfig";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

firebase.initializeApp(firebaseConfig);
const db = getFirestore();
export default db;
loadFonts();
import router from "./router";
createApp(App).use(pinia).use(router).use(vuetify).mount("#app");
