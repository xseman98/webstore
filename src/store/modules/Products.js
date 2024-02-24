const state = {
  products: {},
};

const getters = {
  getItems: (state) => state.products.items,
  getNumberOfItems: (state) => state.products.total_count,
};

const actions = {};

const mutations = {
  setProducts: (state, products) => (state.products = products),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
