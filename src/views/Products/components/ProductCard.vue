<template>
  <v-card max-width="400" elevation="8">
    <v-img height="200px" :alt="image.label" :src="image.url"> </v-img>

    <v-card-title>
      <h3>{{ title }}</h3>
    </v-card-title>
    <v-card-subtitle>
      <p style="font-size: 18px">{{ priceString }}</p>
    </v-card-subtitle>

    <v-card-actions>
      <v-chip :color="getStockColor" dark>{{ getStockStatus }}</v-chip>
      <v-spacer></v-spacer>
      <v-btn color="primary" outlined disabled> Detail </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProductCard",

  props: {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Object,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    stockStatus: {
      type: String,
      required: true,
    },
  },

  computed: {
    priceString() {
      return `${this.price.value} ${this.price.currency}`;
    },

    getStockStatus() {
      return this.stockStatus === "IN_STOCK" ? "In stock" : "Out of stock";
    },

    getStockColor() {
      return this.stockStatus === "IN_STOCK" ? "success" : "error";
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
