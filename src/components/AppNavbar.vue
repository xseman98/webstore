<template>
  <v-toolbar>
    <div class="navbar">
      <img
        alt="Webstore logo"
        src="../assets/logo.svg"
        width="24"
        @click="navigateToHomePage"
      />
      <v-toolbar-title @click="navigateToHomePage">Webstore</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text color="primary" @click="navigateToProductsPage">
        Products
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: "AppNavbar",

  methods: {
    navigateToHomePage() {
      this.$router.push({ name: "home" });
    },

    navigateToProductsPage() {
      this.$router.push({ name: "products", params: { category: "All" } });
    },
  },
};
</script>

<style scoped>
.navbar {
  height: 65px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
}

img:hover,
.v-toolbar__title {
  cursor: pointer;
}
</style>
