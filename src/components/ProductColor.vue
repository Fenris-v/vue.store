<template>
  <ul class="colors" :class="{'colors--black': productId}">
    <li class="colors__item">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio"
               v-model="localColor" value="0">
      </label>
    </li>
    <li class="colors__item" v-for="color in getColors" :key="productId + '-' + color.id">
      <label class="colors__label" :title="color.name">
        <input class="colors__radio sr-only" type="radio"
               :value="color.id" v-model="localColor">
        <span class="colors__value" :style="{'background-color': color.value}"></span>
      </label>
    </li>
  </ul>
</template>

<script>
import colors from '@/data/colors';

export default {
  name: 'ProductColor',
  props: ['colorIds', 'currentColor', 'productId'],
  data() {
    return {
      localColor: null,
    };
  },
  watch: {
    localColor() {
      this.$emit('update:currentColor', this.localColor);
    },
  },
  mounted() {
    this.localColor = this.currentColor;
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

<style  lang="sass">
.colors__item:first-child
  display: none
</style>
