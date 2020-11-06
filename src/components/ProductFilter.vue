<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit()">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" name="category"
                  v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories"
                    :key="category.id">{{ category.name }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>

        <ProductColor :key="computedKey" :color-ids="colorsIds"
                      :current-color.sync="currentColorId"/>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset()">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import colors from '@/data/colors';
import categories from '@/data/categories';
import ProductColor from '@/components/ProductColor.vue';

export default {
  name: 'ProductFilter',
  components: { ProductColor },
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorId'],
  data() {
    return {
      colors,
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,
      computedKey: 0,
    };
  },
  computed: {
    categories() {
      return categories;
    },
    colorsIds() {
      return colors.map((color) => color.id);
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColorId);
      this.$emit('firstPage');
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorId', 0);
      this.$emit('update:currentColorId', 0);
      this.computedKey += 1;
      this.$emit('firstPage');
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColorId = value;
    },
  },
};
</script>
