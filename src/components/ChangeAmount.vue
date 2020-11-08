<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="decrement()">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="productAmount" @blur="checkAmount()">

    <button type="button" aria-label="Добавить один товар" @click="increment()">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ChangeAmount',
  props: ['productAmount'],
  methods: {
    increment() {
      this.productAmount += 1;
      this.changeAmount();
    },
    decrement() {
      if (this.productAmount <= 1) {
        this.productAmount = 1;
      } else {
        this.productAmount -= 1;
      }

      this.changeAmount();
    },
    checkAmount() {
      if (this.productAmount < 1) {
        this.productAmount = 1;
        this.changeAmount();
      }
    },
    changeAmount() {
      this.$emit('update:productAmount', this.productAmount);
    },
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
