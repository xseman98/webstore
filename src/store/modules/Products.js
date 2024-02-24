const state = {
  didLoadedProducts: false,
  products: {},
};

const getters = {
  didLoadedProducts: (state) => state.didLoadedProducts,

  getItems: (state) => state.products.items,

  getItemsByCategory: (state) => (categoryName) => {
    if (categoryName === "All") return state.products.items;
    const filteredProducts = [];
    const items = state.products.items;

    items.forEach((item) => {
      const categories = item.categories.map((category) => category.name);
      if (categories.includes(categoryName)) {
        filteredProducts.push(item);
      }
    });

    return filteredProducts;
  },

  getNumberOfItems: (state) => state.products.total_count,

  getAvailableCategories: (state) => {
    const categoriesSet = new Set(["All"]);
    const items = state.products.items;

    items.forEach((item) => {
      item.categories.forEach((category) => {
        categoriesSet.add(category.name);
      });
    });

    return Array.from(categoriesSet);
  },
};

const actions = {};

const mutations = {
  setDidLoadedProducts: (state, value) => (state.didLoadedProducts = value),
  setProducts: (state, products) => (state.products = products),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
