<template>
  <div class="main-product-layout">
    <h1>Product page</h1>
    <category-tabs />
    <div class="section-layout">
      <product-card
        v-for="product in availableProducts"
        :key="product.uid"
        :title="product.name"
        :price="product.price_range.maximum_price.final_price"
        :image="product.image"
        :stock-status="product.stock_status"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CategoryTabs from "./components/CategoryTabs.vue";
import ProductCard from "./components/ProductCard.vue";

export default {
  name: "ProductsView",

  components: {
    CategoryTabs,
    ProductCard,
  },

  computed: {
    ...mapGetters("Products", ["getItemsByCategory"]),

    availableProducts() {
      return this.getItemsByCategory(this.getActiveTab());
    },
  },

  methods: {
    getActiveTab() {
      return this.$route.params.category?.replaceAll("-", " ");
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
</style>
