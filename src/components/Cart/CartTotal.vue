<template>
  <div class="cart__total">
    <p>Итого: <b>{{ amount | itemDeclination }}</b>
      товара на сумму <b>{{ total | numberFormatter }} ₽</b></p>
  </div>
</template>

<script>
import itemDeclination from '@/helpers/itemDeclination';
import numberFormatter from '@/helpers/numberFormatter';

export default {
  name: 'CartTotal',
  props: ['amount', 'total'],
  filters: {
    itemDeclination,
    numberFormatter,
  },
};
</script>
