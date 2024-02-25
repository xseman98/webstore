<template>
  <v-toolbar>
    <div class="navbar">
      <img
        alt="Webstore logo"
        src="../assets/logo.svg"
        width="24"
        @click="navigateTo('home', {})"
      />
      <v-toolbar-title @click="navigateTo('home', {})">
        Webstore
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        v-for="(link, index) in links"
        :key="index"
        :text="!isCurrent(link.name)"
        :outlined="isCurrent(link.name)"
        color="primary"
        @click="link.click"
      >
        {{ link.name }}
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: "AppNavbar",

  data() {
    return {
      links: [
        {
          name: "home",
          click: () => this.navigateTo("home", {}),
        },
        {
          name: "products",
          click: () =>
            this.navigateTo("products", { category: "All", uid: "*" }),
        },
      ],
    };
  },

  methods: {
    navigateTo(name, params) {
      if (this.isCurrent(name)) return;
      this.$router.push({
        name,
        params,
      });
    },

    isCurrent(name) {
      return this.$route.name === name;
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
