<template>
  <main class="content container" v-if="productLoading">Загрузка</main>
  <main class="content container" v-else-if="!productData">Ошибка</main>
  <main class="content container" v-else>
    <div class="content__top">
      <BaseBreadcrumbs :product="product.title" :category="category.name"/>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="image.url"
               :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart()">
            <b class="item__price">
              {{ product.price | priceFormatter }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>

              <ProductColor :color-ids="colors" :color-list="allColors"/>
            </fieldset>

            <div class="item__row">

              <ChangeAmount :product-amount.sync="productAmount"/>

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>

            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="productAddSending">Добавляется...</div>
          </form>
        </div>
      </div>

<!--      <div class="item__desc">-->
<!--        <ul class="tabs">-->
<!--          <li class="tabs__item">-->
<!--            <a class="tabs__link tabs__link&#45;&#45;current">-->
<!--              Описание-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="tabs__item">-->
<!--            <a class="tabs__link" href="#">-->
<!--              Характеристики-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="tabs__item">-->
<!--            <a class="tabs__link" href="#">-->
<!--              Гарантия-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="tabs__item">-->
<!--            <a class="tabs__link" href="#">-->
<!--              Оплата и доставка-->
<!--            </a>-->
<!--          </li>-->
<!--        </ul>-->

<!--        <div class="item__content">-->
<!--          <p>-->
<!--            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>-->
<!--            Синхронизация со смартфоном<br>-->
<!--            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>-->
<!--            Поддержка сторонних приложений<br>-->
<!--          </p>-->

<!--          <a href="#">-->
<!--            Все характеристики-->
<!--          </a>-->

<!--          <h3>Что это?</h3>-->

<!--          <p>Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать-->
<!--            свои велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS-->
<!--            синхронизируется с датчиками по ANT+, объединяя полученную с них информацию.-->
<!--            Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на-->
<!--            мобильное устройство можно установить как фирменное приложение, так и различные-->
<!--            приложения сторонних разработчиков. Велокомпьютер
точно отслеживает местоположение,-->
<!--            принимая сигнал с целого комплекса спутников. Эта
информация позволяет смотреть уже-->
<!--            преодоленные маршруты и планировать новые велопрогулки.-->
<!--          </p>-->

<!--          <h3>Дизайн</h3>-->

<!--          <p>Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют-->
<!--            всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета-->
<!--            выполнен из черного пластика. На обращенной к пользователю стороне расположен-->
<!--            дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а также-->
<!--            полученная со смартфона и синхронизированных датчиков информация: интенсивность,-->
<!--            скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки).-->
<!--            Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что-->
<!--            устройство не боится пыли, а также выдерживает кратковременное (до 30 минут)-->
<!--            погружение в воду на глубину не более 1 метра.</p>-->
<!--        </div>-->
<!--      </div>-->
    </section>
  </main>
</template>

<script>
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs.vue';
import priceFormatter from '@/helpers/priceFormatter';
import ChangeAmount from '@/components/ChangeAmount.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import ProductColor from '@/components/ProductColor.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ProductPage',
  data() {
    return {
      productAmount: 1,

      productData: null,
      productLoading: false,
      productLoadingFailed: false,

      colorsData: null,

      productAdded: false,
      productAddSending: false,
    };
  },
  components: {
    ChangeAmount,
    BaseBreadcrumbs,
    ProductColor,
  },
  computed: {
    category() {
      return this.productData.category;
    },
    product() {
      return this.productData;
    },
    image() {
      return this.productData.image.file;
    },
    colors() {
      return this.productData.colors.map((color) => color.id);
    },
    allColors() {
      return this.colorsData ? this.colorsData : [];
    },
  },
  methods: {
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;

      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => {
          this.productData = response.data;
        })
        .catch(() => {
          this.productLoadingFailed = true;
        })
        .then(() => {
          this.productLoading = false;
        });
    },
    loadColors() {
      axios.get(`${API_BASE_URL}/api/colors`)
        .then((response) => {
          this.colorsData = response.data.items;
        });
    },
    ...mapActions(['addProductToCart']),
  },
  filters: {
    priceFormatter,
  },
  created() {
    this.loadProduct();
    this.loadColors();
  },
};
</script>

<style lang="sass">
.pics__wrapper
  img
    max-width: 570px
    max-height: 570px
</style>
