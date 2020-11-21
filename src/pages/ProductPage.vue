<template>
  <main class="content container" v-if="loading">Загрузка</main>
  <main class="content container" v-else-if="failed">Ошибка</main>
  <main class="content container" v-else>
    <div class="content__top">
      <BaseBreadcrumbs :list="breadcrumbs"/>
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
              {{ product.price | numberFormatter }} ₽
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
import numberFormatter from '@/helpers/numberFormatter';
import ChangeAmount from '@/components/ChangeAmount.vue';
import ProductColor from '@/components/Product/ProductColor.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ProductPage',
  data() {
    return {
      productAmount: 1,

      productData: null,

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
    product() {
      return this.$store.state.productData || null;
    },
    category() {
      return this.product.category;
    },
    image() {
      return this.product.image.file;
    },
    colors() {
      return this.product.colors.map((color) => color.id);
    },
    loading() {
      return this.$store.state.productLoading;
    },
    failed() {
      return this.$store.state.productLoadingFailed;
    },
    breadcrumbs() {
      return {
        0: {
          title: this.category.title,
          link: 'main',
        },
        1: {
          title: this.product.title,
        },
      };
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
    ...mapActions(['addProductToCart']),
  },
  filters: {
    numberFormatter,
  },
  created() {
    this.$store.dispatch('loadProduct', this.$route.params.id);
  },
};
</script>

<style lang="sass">
.pics__wrapper
  img
    max-width: 570px
    max-height: 570px
</style>
