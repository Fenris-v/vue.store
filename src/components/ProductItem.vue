<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
          {{ product.price }} ₽
        </span>

    <ProductColor :color-ids="product.colors" :product-id="product.id"></ProductColor>
  </li>
</template>

<script>
import colors from '@/data/colors';
import ProductColor from '@/components/ProductColor.vue';

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
};
</script>
