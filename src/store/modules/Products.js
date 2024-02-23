const state = {
  products: {},
};

const getters = {
  getProducts: (state) => state.products,
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
