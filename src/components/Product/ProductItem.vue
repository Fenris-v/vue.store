<template>
  <li class="catalog__item">
    <router-link :to="{name: 'product', params: {id: product.id}}">
      <img :src="image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: product.id}}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormatter }} ₽
    </span>

    <ProductColor :color-ids="product.colors" :product-id="product.id" />
  </li>
</template>

<script>
import ProductColor from '@/components/Product/ProductColor.vue';
import numberFormatter from '@/helpers/numberFormatter';

export default {
  name: 'ProductItem',
  components: { ProductColor },
  props: ['product', 'colorList'],
  data() {
    return {
      color: '#73B6EA',
    };
  },
  computed: {
    image() {
      return this.product.image.file.url;
    },
  },
  filters: {
    numberFormatter,
  },
};
</script>
