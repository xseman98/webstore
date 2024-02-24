const state = {
  products: {},
  filters: {
    apply: false,
    data: {},
  },
};

const getters = {
  getItems: (state) => {
    if (!state.filters.apply) return state.products.items;

    const stockStatus = state.filters.data.availability;
    const priceFrom = state.filters.data.priceRange[0];
    const priceTo = state.filters.data.priceRange[1];

    return state.products.items.filter((item) => {
      return !stockStatus
        ? item.price_range.maximum_price.final_price.value >= priceFrom &&
            item.price_range.maximum_price.final_price.value <= priceTo
        : item.stock_status === stockStatus &&
            item.price_range.maximum_price.final_price.value >= priceFrom &&
            item.price_range.maximum_price.final_price.value <= priceTo;
    });
  },
};

const actions = {};

const mutations = {
  setProducts: (state, products) => (state.products = products),
  setFilters: (state, filters) => (state.filters = filters),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
