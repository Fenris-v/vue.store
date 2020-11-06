<template>
  <li class="catalog__item">
    <router-link :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: product.id}}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | priceFormatter }} ₽
    </span>

    <ProductColor :color-ids="product.colors" :product-id="product.id"></ProductColor>
  </li>
</template>

<script>
import colors from '@/data/colors';
import ProductColor from '@/components/ProductColor.vue';
import priceFormatter from '@/helpers/priceFormatter';

export default {
  name: 'ProductItem',
  components: { ProductColor },
  props: ['product'],
  data() {
    return {
      color: '#73B6EA',
    };
  },
  methods: {
    colors(product) {
      const colorsArr = [];
      product.colors.map((productColor) => {
        const colorItem = colors.filter((color) => color.id === productColor);
        colorsArr.push(colorItem[0]);
        return true;
      });
      return colorsArr;
    },
  },
  filters: {
    priceFormatter,
  },
};
</script>
