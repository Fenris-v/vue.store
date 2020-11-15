<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts }}
        <span v-if="countProducts % 10 === 0 ||
            countProducts % 10 >= 5 && countProducts % 10 <= 9 ||
            countProducts % 100 >= 11 && countProducts % 100 <= 19">товаров</span>
        <span v-else-if="countProducts % 10 === 1">товар</span>
        <span v-else>товара</span>
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom"
                     :price-to.sync="filterPriceTo"
                     :category-id.sync="filterCategoryId"
                     :color-id.sync="filterColorId"
                     @firstPage="firstPage()"
                     :color-list="colors"></ProductFilter>

      <section class="catalog">
        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">
          Произошла ошибка
          <button @click.prevent="loadProducts()">Попробовать еще раз</button>
        </div>
        <ProductList :products="products" :color-list="colors"></ProductList>

        <BasePagination
          v-model="page" :count-items="countProducts" :per-page="perPage"></BasePagination>
      </section>
    </div>
  </main>
</template>

<script>
import ProductFilter from '@/components/ProductFilter.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductList from '@/components/ProductList.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  name: 'MainPage',
  components: {
    ProductFilter,
    BasePagination,
    ProductList,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      page: 1,
      perPage: 6,

      productsData: null,
      colorsData: null,

      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
          colors: product.colors.map((color) => color.id),
        }))
        : [];
    },
    colors() {
      return this.colorsData ? this.colorsData : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    firstPage() {
      this.page = 1;
    },
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`,
          {
            params: {
              page: this.page,
              limit: this.perPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColorId,
            },
          })
          .then((response) => {
            this.productsData = response.data;
          })
          .catch(() => {
            this.productsLoadingFailed = true;
          })
          .then(() => {
            this.productsLoading = false;
          });
      }, 0);
    },
    loadColors() {
      axios.get(`${API_BASE_URL}/api/colors`)
        .then((response) => {
          this.colorsData = response.data.items;
        });
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
    this.loadColors();
  },
};
</script>
