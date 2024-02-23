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
import { mapMutations, mapGetters } from "vuex";
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
      skip() {
        return this.didLoadedProducts;
      },
    },
  },

  computed: {
    ...mapGetters("Products", ["didLoadedProducts"]),
  },

  methods: {
    ...mapMutations("Products", ["setDidLoadedProducts", "setProducts"]),
  },

  watch: {
    products: {
      handler: function () {
        if (!this.didLoadedProducts) {
          this.setProducts(this.products);
          console.log(this.products);
          this.setDidLoadedProducts(true);
        }
      },
      deep: true,
    },
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
