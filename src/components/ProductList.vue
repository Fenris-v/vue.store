<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id" :product="product"
                 :color-list="colorList"/>
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  name: 'ProductList',
  components: { ProductItem },
  props: ['products', 'colorList'],
};
</script>

<style lang="sass">
.catalog__list
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  grid-gap: unset

  .catalog__item
    width: 32%
    margin-bottom: 40px
    box-shadow: 5px 5px 15px 0 rgba(194, 194, 194, 0.8)
    padding: 20px

    a
      display: flex

    img
      height: 275px
      margin: 0 auto 30px
</style>
