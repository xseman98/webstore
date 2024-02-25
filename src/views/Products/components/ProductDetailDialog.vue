<template>
  <div class="text-center">
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" outlined v-bind="attrs" v-on="on">
          Show Detail
        </v-btn>
      </template>

      <v-card>
        <div class="column-layout">
          <v-img
            :alt="product.image.label"
            :src="product.image.url"
            class="custom-size"
          >
          </v-img>
          <div class="info-div">
            <v-card-title>
              <h1>{{ product.name }}</h1>
              <v-chip :color="getStockColor" dark>{{ getStockStatus }}</v-chip>
            </v-card-title>

            <v-card-text>
              <p>{{ getProductCategories }}</p>
              <p v-html="product.description.html" style="font-size: 24px"></p>
            </v-card-text>

            <v-spacer></v-spacer>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <h1>{{ priceString }}</h1>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ProductDetailDialog",

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      dialog: false,
    };
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

    getProductCategories() {
      return this.product.categories
        .map((category) => category.name)
        .join(" > ");
    },
  },
};
</script>

<style scoped>
.column-layout {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: stretch;
  align-items: flex-end;
  height: 100%;
}

.column-layout > * {
  flex: 1 auto;
}

.v-card__title {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
}
.custom-size {
  max-width: 600px;
  height: auto;
}

.v-dialog {
  background: white !important;
}

.v-chip {
  margin-bottom: 1rem;
}

.info-div {
  display: flex;
  flex-direction: column;
  width: min-content;
}
</style>
