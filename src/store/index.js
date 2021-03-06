import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,

    cartProductsData: [],

    colorsData: null,

    productData: null,

    productLoading: false,

    productsData: null,

    orderInfo: null,

    formError: {},
    errorMsg: '',
  },
  mutations: {
    updateFormError(state, formError) {
      state.formError = formError;
    },
    updateErrorMsg(state, msg) {
      state.errorMsg = msg;
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((i) => i.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
    updateColorsData(state, colors) {
      state.colorsData = colors;
    },
    updateProductData(state, item) {
      state.productData = item;
    },
    updateProductLoading(state, status) {
      state.productLoading = status;
    },
    updateProductLoadingFailed(state, status) {
      state.productLoadingFailed = status;
    },
    updateProductsData(state, items) {
      state.productsData = items;
    },
  },
  getters: {
    getProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);

        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    totalPrice(state, getters) {
      return getters.getProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    totalAmount(state, getters) {
      return getters.getProducts.length;
    },
  },
  actions: {
    order(context, formData) {
      context.commit('updateErrorMsg', '');
      context.commit('updateFormError', {});

      return axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...formData,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('resetCart');
          context.commit('updateOrderInfo', response.data);
          router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          context.commit('updateErrorMsg', error.response.data.error.message);
          context.commit('updateFormError', error.response.data.error.request || {});
        });
    },
    loadOrderInfo(context, orderId) {
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        })
        .catch(() => {
          router.push({ name: 'notFound' });
        });
    },
    loadCart(context) {
      return axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }

          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    loadColors(context) {
      return axios.get(`${API_BASE_URL}/api/colors`)
        .then((response) => {
          context.commit('updateColorsData', response.data.items);
        });
    },
    addProductToCart(context, { productId, amount }) {
      return axios.post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', {
        productId,
        amount,
      });

      if (amount < 1) {
        return false;
      }

      return axios.put(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteProductFromCart(context, { productId }) {
      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`,
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
            data: {
              productId,
            },
          })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .catch(() => {
          console.error('Произошла ошибка');
        });
    },
    loadProduct(context, productId) {
      context.commit('updateProductLoading', true);
      context.commit('updateProductLoadingFailed', false);

      return axios.get(`${API_BASE_URL}/api/products/${productId}`)
        .then((response) => {
          context.commit('updateProductData', response.data);
        })
        .catch(() => {
          context.commit('updateProductLoadingFailed', true);
        })
        .then(() => {
          context.commit('updateProductLoading', false);
        });
    },
    loadProducts(context, params) {
      context.commit('updateProductLoading', true);
      context.commit('updateProductLoadingFailed', false);

      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`,
          {
            params,
          })
          .then((response) => {
            context.commit('updateProductsData', response.data);
          })
          .catch(() => {
            context.commit('updateProductLoadingFailed', true);
          })
          .then(() => {
            context.commit('updateProductLoading', false);
          });
      }, 0);
    },
  },
});
