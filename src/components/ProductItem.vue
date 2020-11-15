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

    <!-- TODO: Странно, что отсюда приходится через несколько компонентов
    TODO: передавать список цветов. -->
    <ProductColor :color-ids="product.colors" :product-id="product.id"
                  :color-list="colorList"/>
  </li>
</template>

<script>
import ProductColor from '@/components/ProductColor.vue';
import priceFormatter from '@/helpers/priceFormatter';

export default {
  name: 'ProductItem',
  components: { ProductColor },
  props: ['product', 'colorList'],
  data() {
    return {
      color: '#73B6EA',
    };
  },
  filters: {
    priceFormatter,
  },
};
</script>
