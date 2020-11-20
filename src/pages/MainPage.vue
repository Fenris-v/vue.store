<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts | itemDeclination }}
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :filter.sync="filter" @firstPage="firstPage()" />

      <section class="catalog">
        <div v-if="loading">Загрузка товаров...</div>
        <div v-if="failed">
          Произошла ошибка
        </div>
        <ProductList :products="products" />

        <BasePagination
          v-model="page" :count-items="countProducts" :per-page="perPage"></BasePagination>
      </section>
    </div>
  </main>
</template>

<script>
import ProductFilter from '@/components/Product/ProductFilter.vue';
import BasePagination from '@/components/Base/BasePagination.vue';
import ProductList from '@/components/Product/ProductList.vue';
import itemDeclination from '@/helpers/itemDeclination';

export default {
  name: 'MainPage',
  components: {
    ProductFilter,
    BasePagination,
    ProductList,
  },
  data() {
    return {
      page: 1,
      perPage: 6,

      productsData: null,

      filter: {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterColorId: 0,
      },
    };
  },
  computed: {
    products() {
      return this.$store.state.productsData
        ? this.$store.state.productsData.items
        : [];
    },
    countProducts() {
      return this.$store.state.productsData ? this.$store.state.productsData.pagination.total : 0;
    },
    loading() {
      return this.$store.state.productLoading;
    },
    failed() {
      return this.$store.state.productLoadingFailed;
    },
  },
  methods: {
    firstPage() {
      this.page = 1;
    },
    getParams() {
      return {
        page: this.page,
        limit: this.perPage,
        categoryId: this.filter.filterCategoryId,
        minPrice: this.filter.filterPriceFrom,
        maxPrice: this.filter.filterPriceTo,
        colorId: this.filter.filterColorId,
      };
    },
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        this.$store.dispatch('loadProducts', this.getParams());
      },
    },
    page() {
      this.$store.dispatch('loadProducts', this.getParams());
    },
  },
  created() {
    this.$store.dispatch('loadProducts', this.getParams());
  },
  filters: {
    itemDeclination,
  },
};
</script>
