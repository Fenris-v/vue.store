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

    <div class="form__counter">
      <button type="button" aria-label="Убрать один товар" @click="decrement()">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" @blur="checkAmount()">

      <button type="button" aria-label="Добавить один товар" @click="increment()">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

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
import { mapMutations } from 'vuex';

export default {
  name: 'CartItem',
  props: ['item'],
  filters: {
    priceFormatter,
  },
  methods: {
    increment() {
      this.amount += 1;
      this.changeAmount();
    },
    decrement() {
      if (this.amount <= 1) {
        this.amount = 1;
      } else {
        this.amount -= 1;
      }

      this.changeAmount();
    },
    checkAmount() {
      if (this.amount < 1) {
        this.amount = 1;
        this.changeAmount();
      }
    },
    ...mapMutations(['deleteProduct']),
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.commit('updateCartProductAmount', {
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
};
</script>
