const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    port: process.env.VUE_APP_PORT,
    proxy: {
      "/graphql": {
        target: process.env.VUE_APP_VENIA_URL,
        changeOrigin: true,
        pathRewrite: {
          "^/graphql": "/graphql",
        },
      },
    },
  },
});
