<template>
  <div class="content__catalog">

    <ProductFilter :price-from.sync="filterPriceFrom"
                   :price-to.sync="filterPriceTo"
                   :category-id.sync="filterCategoryId"
                   :color-id.sync="filterColorId"
                   @firstPage="firstPage()"></ProductFilter>

    <section class="catalog">
      <ProductList :products="products"></ProductList>

      <BasePagination
        v-model="page" :count-items="countProducts" :per-page="perPage"></BasePagination>
    </section>
  </div>
</template>

<script>
import ProductFilter from '@/components/ProductFilter.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductList from '@/components/ProductList.vue';
import products from '@/data/products';

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
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.price >= this.filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.price <= this.filterPriceTo);
      }

      if (this.filterCategoryId !== 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.categoryId === this.filterCategoryId);
      }

      if (this.filterColorId !== 0) {
        filteredProducts = filteredProducts
          .filter((product) => {
            if (product.colors === undefined) {
              return false;
            }

            return product.colors.includes(this.filterColorId);
          });
      }

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.perPage;
      return this.filteredProducts.slice(offset, offset + this.perPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
  methods: {
    firstPage() {
      this.page = 1;
    },
  },
};
</script>
