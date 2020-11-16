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
      <ProductFilter :price-from.sync="filterPriceFrom"
                     :price-to.sync="filterPriceTo"
                     :category-id.sync="filterCategoryId"
                     :color-id.sync="filterColorId"
                     @firstPage="firstPage()" />

      <section class="catalog">
        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">
          Произошла ошибка
          <button @click.prevent="loadProducts()">Попробовать еще раз</button>
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
import axios from 'axios';
import { API_BASE_URL } from '@/config';
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
      return this.colorsData || [];
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
  },
  filters: {
    itemDeclination,
  },
};
</script>
