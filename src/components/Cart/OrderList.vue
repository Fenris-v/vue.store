<template>
  <ul class="cart__orders">
    <li class="cart__order" v-for="item in products" :key="item.productId">
      <h3>{{ item.product.title }}</h3>
      <b>{{ item.product.price * getAmount(item) | numberFormatter }} ₽</b>
      <span>Артикул: {{ item.product.id }}</span>
    </li>
  </ul>
</template>

<script>
import numberFormatter from '@/helpers/numberFormatter';

export default {
  name: 'OrderList',
  props: ['products'],
  filters: {
    numberFormatter,
  },
  methods: {
    getAmount(item) {
      return item.quantity || item.amount || 1;
    },
  },
};
</script>
