import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
  },
  mutations: {
    addToCart(state, { productId, amount }) {
      const item = state.cartProducts.find((product) => product.productId === productId);

      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((i) => i.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteProduct(state, id) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== id);
    },
  },
  getters: {
    getProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
    },
    totalPrice(state, getters) {
      return getters.getProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    totalAmount(state, getters) {
      return getters.getProducts.length;
    },
  },
});
