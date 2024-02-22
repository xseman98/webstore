<template>
  <v-toolbar>
    <div class="navbar">
      <img alt="Webstore logo" src="../assets/logo.svg" width="24" />
      <v-toolbar-title>Webstore</v-toolbar-title>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: "AppNavbar",
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
</style>
