<template>
  <v-app>
    <v-main>
      <app-navbar></app-navbar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppNavbar from "./components/AppNavbar.vue";

export default {
  name: "App",

  components: {
    AppNavbar,
  },

  data: () => ({
    //
  }),
};
</script>
