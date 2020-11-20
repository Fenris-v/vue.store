<template>
  <ul class="cart__list">
    <CartItem v-for="item in products" :key="item.productId" :item="item" />
  </ul>
</template>

<script>

import CartItem from '@/components/Cart/CartItem.vue';

export default {
  name: 'CartList',
  components: { CartItem },
  props: ['products'],
};
</script>
