// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify, ThemeDefinition } from "vuetify";

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#B10DC9",
    secondary: "#39CCCC",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
