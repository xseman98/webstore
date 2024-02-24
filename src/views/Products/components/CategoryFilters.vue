<template>
  <div class="main-filters-layout">
    <v-range-slider
      v-model="priceRange"
      label="Price range"
      max="1000 USD"
      min="0 USD"
      :hint="`$${priceRange[0]} - $${priceRange[1]}`"
      persistent-hint
    ></v-range-slider>
    <v-btn-toggle v-model="availability" borderless>
      <v-btn color="primary" :outlined="availability === 1"> In stock </v-btn>
      <v-btn color="primary" :outlined="availability === 0">
        Out of stock
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "CategoryFilters",

  data() {
    return {
      priceRange: [0, 1000],
      availability: undefined,
    };
  },

  methods: {
    ...mapMutations("Products", ["setFilters"]),

    applyFilters() {
      this.setFilters({
        apply: true,
        data: {
          priceRange: this.priceRange,
          availability:
            this.availability === 0
              ? "IN_STOCK"
              : this.availability === 1
              ? "OUT_OF_STOCK"
              : undefined,
        },
      });
    },
  },

  watch: {
    priceRange: {
      handler: function () {
        this.applyFilters();
      },
      deep: true,
    },
    availability: {
      handler: function () {
        this.applyFilters();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.main-filters-layout {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
}
</style>
