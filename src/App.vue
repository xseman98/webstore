<template>
  <v-app>
    <v-main>
      <app-navbar />
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
};
</script>

<style>
h1,
h2,
h3 {
  font-weight: 400;
}

h3 {
  font-style: italic;
}

p {
  font-weight: 300;
  font-style: italic;
}
</style>
