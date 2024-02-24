<template>
  <v-card max-width="400" elevation="6">
    <v-img height="200px" :alt="product.image.label" :src="product.image.url">
    </v-img>

    <v-card-title>
      <h3>{{ product.name }}</h3>
    </v-card-title>
    <v-card-subtitle>
      <p style="font-size: 18px">{{ priceString }}</p>
    </v-card-subtitle>

    <v-card-actions>
      <v-chip :color="getStockColor" dark>{{ getStockStatus }}</v-chip>
      <v-spacer></v-spacer>
      <product-detail-dialog :product="product" />
    </v-card-actions>
  </v-card>
</template>

<script>
import ProductDetailDialog from "./ProductDetailDialog.vue";

export default {
  name: "ProductCard",

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  components: {
    ProductDetailDialog,
  },

  computed: {
    priceString() {
      return `${this.product.price_range.maximum_price.final_price.value} ${this.product.price_range.maximum_price.final_price.currency}`;
    },

    getStockStatus() {
      return this.product.stock_status === "IN_STOCK"
        ? "In stock"
        : "Out of stock";
    },

    getStockColor() {
      return this.product.stock_status === "IN_STOCK" ? "success" : "error";
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 8px;
  transition: transform 0.3s;
}

.v-card:hover {
  transform: scale(1.05);
}
</style>
