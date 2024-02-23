import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        success: "#62C370",
        warning: "#FF6700",
        error: "#AD343E",
        primary: "#FF6700",
        white: "#EEE5E9",
        black: "#242331",
      },
    },
  },
});
