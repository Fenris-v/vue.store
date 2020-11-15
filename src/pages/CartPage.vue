<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ amount }}
        <span v-if="amount % 10 === 0 ||
            amount % 10 >= 5 && amount % 10 <= 9 ||
            amount % 100 >= 11 && amount % 100 <= 19">товаров</span>
        <span v-else-if="amount % 10 === 1">товар</span>
        <span v-else>товара</span>
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <CartList :products="products" />
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ total | priceFormatter }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartList from '@/components/CartList.vue';
import { mapGetters } from 'vuex';
import priceFormatter from '@/helpers/priceFormatter';

export default {
  name: 'CartPage',
  components: { CartList },
  filters: {
    priceFormatter,
  },
  computed: {
    ...mapGetters({ products: 'getProducts', total: 'totalPrice', amount: 'totalAmount' }),
  },
};
</script>

<style lang="sass">
.product__pic img
  max-height: 120px
  max-width: 120px
</style>
