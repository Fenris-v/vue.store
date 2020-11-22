<template>
  <main class="content container" v-if="order">
    <div class="content__top">
      <h1 class="content__title">
        Заказ оформлен <span>№ {{ order.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form">
        <div class="cart__field">
          <p class="cart__message">Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту
            придет письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение
            часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ order.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ order.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ order.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ order.email }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <OrderList :products="order.basket.items" />

          <CartTotal :amount="order.basket.items.length" :total="order.totalPrice" />
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import OrderList from '@/components/Cart/OrderList.vue';
import CartTotal from '@/components/Cart/CartTotal.vue';

export default {
  name: 'OrderInfoPage',
  components: { CartTotal, OrderList },
  computed: {
    order() {
      return this.$store.state.orderInfo;
    },
  },
  created() {
    const orderInfo = this.$store.state;
    if (orderInfo && orderInfo.id === this.$route.params.id) {
      return;
    }

    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },
};
</script>
