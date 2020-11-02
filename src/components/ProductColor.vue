<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="color in getColors" :key="productId + '-' + color.id">
      <label class="colors__label" :title="color.name">
        <input class="colors__radio sr-only" type="radio"
               :name="'product-color-' + productId" :key="productId + '-' + color.id"
               :value="color.id" v-model="color.value">
        <span class="colors__value" :style="{'background-color': color.value}">
                  </span>
      </label>
    </li>
  </ul>
</template>

<script>
import colors from '@/data/colors';

export default {
  name: 'ProductColor',
  props: ['colorIds', 'productId'],
  data() {
    return {
      colors,
    };
  },
  computed: {
    getColors() {
      if (this.colorIds === undefined) {
        return [];
      }

      const colorsArr = [];
      this.colorIds.forEach((colorId) => {
        const colorItem = colors.filter((color) => color.id === colorId);
        colorsArr.push(colorItem[0]);
      });

      return colorsArr;
    },
  },
};
</script>
