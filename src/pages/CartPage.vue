<template>
  <main class="content container">
    <div class="content__top">
      <BaseBreadcrumbs :list="breadcrumbs" />

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ amount | itemDeclination }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <CartList :products="products"/>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ total | numberFormatter }} ₽</span>
          </p>

          <router-link tag="button" :to="{ name: 'order' }"
                       class="cart__button button button--primery" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartList from '@/components/Cart/CartList.vue';
import cartProductsMixin from '@/mixins/cartProductsMixin';
import BaseBreadcrumbs from '@/components/Base/BaseBreadcrumbs.vue';

export default {
  name: 'CartPage',
  components: { BaseBreadcrumbs, CartList },
  mixins: [cartProductsMixin],
  computed: {
    breadcrumbs() {
      return {
        0: {
          title: 'Корзина',
        },
      };
    },
  },
};
</script>

<style lang="sass">
.product__pic img
  max-height: 120px
  max-width: 120px
</style>
