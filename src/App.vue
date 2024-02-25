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
h1 {
  font-size: clamp(2em, 5vw, 4em);
  line-height: clamp(1.2, 3vw, 2);
  font-weight: 300;
}

h2 {
  font-weight: 400;
}

h3 {
  font-style: italic;
  font-weight: 400;
}

p {
  font-weight: 300;
  font-style: italic;
}
</style>
