<template>
  <li class="cart__item product" :key="item.productId">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" alt="Название товара">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <ChangeAmount :product-amount.sync="amount" />

    <b class="product__price">
      {{ item.product.price * item.amount | priceFormatter }} ₽
    </b>

    <button class="product__del button-del" type="button"
            aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import priceFormatter from '@/helpers/priceFormatter';
import { mapActions } from 'vuex';
import ChangeAmount from '@/components/ChangeAmount.vue';

export default {
  name: 'CartItem',
  components: { ChangeAmount },
  props: ['item'],
  filters: {
    priceFormatter,
  },
  methods: {
    ...mapActions(['deleteProductFromCart']),
    deleteProduct(id) {
      this.deleteProductFromCart({ productId: id });
    },
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', {
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
};
</script>
