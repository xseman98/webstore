<template>
  <div class="main-product-layout">
    <h1>Products</h1>
    <category-tabs />
    <v-progress-circular
      v-if="$apollo.loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <div v-else class="section-layout">
      <category-filters />
      <product-card
        v-for="product in getItems"
        :key="product.uid"
        :product="product"
      />
    </div>
    <view-pagination
      v-if="!$apollo.loading"
      :page-info="getPageInfo"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { PRODUCTS_QUERY } from "@/graphql";
import CategoryTabs from "./components/CategoryTabs.vue";
import CategoryFilters from "./components/CategoryFilters.vue";
import ProductCard from "./components/ProductCard.vue";
import ViewPagination from "./components/ViewPagination.vue";

export default {
  name: "ProductsView",

  components: {
    CategoryTabs,
    CategoryFilters,
    ProductCard,
    ViewPagination,
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
          currentPage: 1,
          filter: {},
        };
      },
      update: (data) => data.products,
      error(error) {
        console.error(error);
      },
    },
  },

  computed: {
    ...mapGetters("Products", ["getItems", "getPageInfo"]),
  },

  methods: {
    ...mapMutations("Products", ["setProducts"]),

    getActiveTab() {
      return this.$route.params.category?.replaceAll("-", " ");
    },

    handlePageChange(page) {
      this.$apollo.queries.products.fetchMore({
        variables: {
          currentPage: page,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return fetchMoreResult;
        },
      });
    },

    handleCategoryChange(uid) {
      this.$apollo.queries.products.fetchMore({
        variables: {
          filter: uid === "*" ? {} : { category_uid: { eq: uid } },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return fetchMoreResult;
        },
      });
    },
  },

  watch: {
    products: {
      handler: function () {
        this.setProducts(this.products);
      },
      deep: true,
    },
    "$route.params.uid": {
      handler: function () {
        this.handleCategoryChange(decodeURIComponent(this.$route.params.uid));
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.main-product-layout {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
}

.section-layout {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  width: 100%;
}

.v-progress-circular {
  width: 10vh !important;
  height: 10vh !important;
  padding-top: 50vh;
}
</style>
