<template>
  <main class="content container" v-if="productLoading">Загрузка</main>
  <main class="content container" v-else-if="!productData">Ошибка</main>
  <main class="content container" v-else>
    <div class="content__top">
      <BaseBreadcrumbs :product="product.title" :category="category.name"/>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="image.url"
               :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart()">
            <b class="item__price">
              {{ product.price | priceFormatter }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>

              <ProductColor :color-ids="colors" />
            </fieldset>

            <div class="item__row">

              <ChangeAmount :product-amount.sync="productAmount"/>

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>

            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="productAddSending">Добавляется...</div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import BaseBreadcrumbs from '@/components/Base/BaseBreadcrumbs.vue';
import priceFormatter from '@/helpers/priceFormatter';
import ChangeAmount from '@/components/ChangeAmount.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import ProductColor from '@/components/Product/ProductColor.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ProductPage',
  data() {
    return {
      productAmount: 1,

      productData: null,
      productLoading: false,
      productLoadingFailed: false,

      colorsData: null,

      productAdded: false,
      productAddSending: false,
    };
  },
  components: {
    ChangeAmount,
    BaseBreadcrumbs,
    ProductColor,
  },
  computed: {
    category() {
      return this.productData.category;
    },
    product() {
      return this.productData;
    },
    image() {
      return this.productData.image.file;
    },
    colors() {
      return this.productData.colors.map((color) => color.id);
    },
  },
  methods: {
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;

      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => {
          this.productData = response.data;
        })
        .catch(() => {
          this.productLoadingFailed = true;
        })
        .then(() => {
          this.productLoading = false;
        });
    },
    ...mapActions(['addProductToCart']),
  },
  filters: {
    priceFormatter,
  },
  created() {
    this.loadProduct();
  },
};
</script>

<style lang="sass">
.pics__wrapper
  img
    max-width: 570px
    max-height: 570px
</style>
