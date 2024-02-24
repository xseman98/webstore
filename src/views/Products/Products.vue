<template>
  <div class="main-product-layout">
    <h1>Product page</h1>
    <!-- <category-tabs /> -->
    <v-progress-circular
      v-if="$apollo.loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <div v-else class="section-layout">
      <product-card
        v-for="product in availableProducts"
        :key="product.uid"
        :title="product.name"
        :price="product.price_range.maximum_price.final_price"
        :image="product.image"
        :stock-status="product.stock_status"
      />
    </div>
    <view-pagination @page-change="handlePageChange" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { PRODUCTS_QUERY } from "@/graphql";
// import CategoryTabs from "./components/CategoryTabs.vue";
import ProductCard from "./components/ProductCard.vue";
import ViewPagination from "./components/ViewPagination.vue";

export default {
  name: "ProductsView",

  components: {
    // CategoryTabs,
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
          page: 0,
        };
      },
      update: (data) => data.products,
    },
  },

  computed: {
    ...mapGetters("Products", ["didLoadedProducts", "getItemsByCategory"]),

    availableProducts() {
      return this.getItemsByCategory(this.getActiveTab());
    },
  },

  methods: {
    ...mapMutations("Products", ["setDidLoadedProducts", "setProducts"]),

    getActiveTab() {
      return this.$route.params.category?.replaceAll("-", " ");
    },

    handlePageChange(page) {
      this.setDidLoadedProducts(false);
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
  },

  watch: {
    products: {
      handler: function () {
        this.setProducts(this.products);
        this.setDidLoadedProducts(true);
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
  padding-top: 37vh;
  padding-bottom: 37vh;
}
</style>
