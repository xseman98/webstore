<template>
  <div class="main-tabs-layout">
    <h3>Available Categories</h3>
    <v-progress-linear
      v-if="availableCategories.length === 0"
      indeterminate
      color="primary"
    ></v-progress-linear>
    <v-tabs
      v-else
      fixed-tabs
      v-model="tab"
      :show-arrows="$vuetify.breakpoint.width < 860"
    >
      <v-tab
        v-for="category in availableCategories"
        :key="category.uid"
        @click="navigateToCategoryPage(category)"
      >
        {{ category.name }}
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
import { CATEGORIES_QUERY } from "@/graphql";

export default {
  name: "CategoryTabs",

  data() {
    return {
      tab: null,
      categories: {},
      availableCategories: [],
      skip: false,
    };
  },

  apollo: {
    categories: {
      query: CATEGORIES_QUERY,
      variables() {
        return {
          search: "",
        };
      },
      update: (data) => data.products.items,
      skip() {
        return this.skip;
      },
    },
  },

  methods: {
    navigateToCategoryPage(category) {
      this.$router.push({
        name: "products",
        params: {
          category: encodeURIComponent(category.name),
          uid: encodeURIComponent(category.uid),
        },
      });
    },
  },

  watch: {
    categories: {
      handler: function () {
        if (!this.categories) return categoriesSet;

        const categoriesSet = new Set(["All#*"]);

        this.categories.forEach((item) => {
          item.categories.forEach((category) => {
            categoriesSet.add(`${category.name}#${category.uid}`);
          });
        });

        this.availableCategories = Array.from(categoriesSet).map(
          (categoryString) => {
            return {
              name: categoryString.split("#")[0],
              uid: categoryString.split("#")[1],
            };
          }
        );
        this.skip = true;
      },
      deep: true,
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
  width: 100%;
}
</style>
