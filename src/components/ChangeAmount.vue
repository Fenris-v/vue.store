<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="decrement()">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="amountLocal" @blur="checkAmount()">

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
  data() {
    return {
      amountLocal: this.productAmount,
    };
  },
  methods: {
    increment() {
      this.amountLocal += 1;
    },
    decrement() {
      if (this.amountLocal <= 1) {
        this.amountLocal = 1;
      } else {
        this.amountLocal -= 1;
      }
    },
    checkAmount() {
      if (this.amountLocal < 1) {
        this.amountLocal = 1;
      }
    },
  },
  watch: {
    amountLocal(value) {
      this.$emit('update:productAmount', value);
    },
  },
};
</script>
