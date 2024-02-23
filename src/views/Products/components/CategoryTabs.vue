<template>
  <div class="main-tabs-layout">
    <h3>Categories</h3>
    <v-tabs v-model="tab" :show-arrows="$vuetify.breakpoint.width < 860">
      <v-tab
        v-for="(category, index) in getAvailableCategories"
        :key="index"
        @click="navigateToCategoryPage(category)"
      >
        {{ category }}
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CategoryTabs",

  data() {
    return {
      tab: null,
    };
  },

  computed: {
    ...mapGetters("Products", ["getNumberOfItems", "getAvailableCategories"]),
  },

  methods: {
    navigateToCategoryPage(category) {
      this.$router.push({
        name: "products",
        params: { category: category.replaceAll(" ", "-") },
      });
    },
  },
};
</script>

<style scoped>
.main-tabs-layout {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}
</style>
