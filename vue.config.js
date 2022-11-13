const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
      theme: {
        themes: {
          dark: {
            primary: "#B10DC9",
            secondary: "blue",
            accent: "#8c9eff",
            error: "#b71c1c",
          },
        },
      },
    },
  },
});
