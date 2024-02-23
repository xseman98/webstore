<template>
  <v-app>
    <app-loader v-if="$apollo.loading" />
    <v-main v-else>
      <app-navbar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { PRODUCTS_QUERY } from "./graphql";
import AppLoader from "./components/AppLoader.vue";
import AppNavbar from "./components/AppNavbar.vue";

export default {
  name: "App",

  components: {
    AppLoader,
    AppNavbar,
  },

  data() {
    return {
      products: {},
    };
  },

  apollo: {
    products: {
      query: PRODUCTS_QUERY,
      variables() {
        return {
          search: "",
        };
      },
      update: (data) => data.products,
    },
  },
};
</script>
