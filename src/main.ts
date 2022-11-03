import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
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

createApp(App).use(router).use(store).use(vuetify).mount("#app");
