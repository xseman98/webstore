<template>
  <div class="main-product-layout">
    <h1>Products</h1>
    <v-text-field
      v-model="search"
      type="text"
      outlined
      placeholder="Looking for something particular?"
      clearable
      style="width: 50%; min-width: 320px"
      @keydown="handleSearch"
      @click:clear="handleResetSearch"
      :readonly="$apollo.loading"
    >
      <template v-slot:append-outer>
        <v-btn
          :disabled="$apollo.loading && search === ''"
          :loading="$apollo.loading && search !== ''"
          color="primary"
          @click="handleSearch"
        >
          <v-icon left>mdi-magnify</v-icon>
          Search
        </v-btn>
      </template>
    </v-text-field>
    <category-tabs />
    <app-loader v-if="$apollo.loading" />
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
import AppLoader from "@/components/AppLoader.vue";
import CategoryTabs from "./components/CategoryTabs.vue";
import CategoryFilters from "./components/CategoryFilters.vue";
import ProductCard from "./components/ProductCard.vue";
import ViewPagination from "./components/ViewPagination.vue";

export default {
  name: "ProductsView",

  components: {
    AppLoader,
    CategoryTabs,
    CategoryFilters,
    ProductCard,
    ViewPagination,
  },

  data() {
    return {
      search: "",
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

    handleSearch(e) {
      if (e.type === "click" || e.key === "Enter") {
        const uid = decodeURIComponent(this.$route.params.uid);
        this.$apollo.queries.products.fetchMore({
          variables: {
            search: this.search,
            currentPage: 1,
            filter: uid === "*" ? {} : { category_uid: { eq: uid } },
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;

            return fetchMoreResult;
          },
        });
      }
    },

    handleResetSearch() {
      const uid = decodeURIComponent(this.$route.params.uid);
      this.$apollo.queries.products.fetchMore({
        variables: {
          search: "",
          currentPage: 1,
          filter: uid === "*" ? {} : { category_uid: { eq: uid } },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return fetchMoreResult;
        },
      });
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
          search: this.search,
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
