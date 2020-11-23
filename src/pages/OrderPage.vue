<template>
  <main class="content container">
    <div class="content__top">
      <BaseBreadcrumbs :list="breadcrumbs" />

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" @submit.prevent="order()">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title="ФИО" placeholder="Введите ваше полное имя"
                          v-model="formData.name" :error="formError.name"/>

            <BaseFormText title="Адрес доставки" placeholder="Введите ваш адрес"
                          v-model="formData.address" :error="formError.address"/>

            <BaseFormText title="Телефон" placeholder="Введите ваш телефон" type="tel"
                          v-model="formData.phone" :error="formError.phone"/>

            <BaseFormText title="Email" placeholder="Введите ваш Email" type="email"
                          v-model="formData.email" :error="formError.email"/>

            <BaseFormTextarea title="Комментарий к заказу" placeholder="Ваши пожелания"
                              v-model="formData.comment" :error="formError.comment"/>
          </div>
        </div>

        <div class="cart__block">

          <OrderList :products="products"/>

          <CartTotal :amount="amount" :total="total" />

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>

        <div class="cart__error form__error-block" v-if="this.errorMsg">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ this.errorMsg }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/Base/BaseFormText.vue';
import BaseFormTextarea from '@/components/Base/BaseFormTextarea.vue';
import cartProductsMixin from '@/mixins/cartProductsMixin';
import OrderList from '@/components/Cart/OrderList.vue';
import BaseBreadcrumbs from '@/components/Base/BaseBreadcrumbs.vue';
import CartTotal from '@/components/Cart/CartTotal.vue';

export default {
  name: 'OrderPage',
  components: {
    CartTotal,
    BaseBreadcrumbs,
    OrderList,
    BaseFormTextarea,
    BaseFormText,
  },
  data() {
    return {
      formData: {},
    };
  },
  computed: {
    breadcrumbs() {
      return {
        0: {
          title: 'Корзина',
          link: 'cart',
        },
        1: {
          title: 'Оформить заказ',
        },
      };
    },
    errorMsg() {
      return this.$store.state.errorMsg;
    },
    formError() {
      return this.$store.state.formError;
    },
  },
  mixins: [cartProductsMixin],
  methods: {
    order() {
      if (!this.formData.comment) {
        this.formData.comment = ' ';
      }

      return this.$store.dispatch('order', this.formData);
    },
  },
};
</script>
