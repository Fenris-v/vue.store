<template>
  <ul class="colors" :class="{'colors--black': productId}">
    <li class="colors__item">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio"
               v-model="localColor" value="0">
      </label>
    </li>

    <li class="colors__item" v-for="color in getColors" :key="productId + '-' + color.id">
      <label class="colors__label" :title="color.title">
        <input class="colors__radio sr-only" type="radio"
               :value="color.id" v-model="localColor">
        <span class="colors__value" :style="{'background-color': color.code}"></span>
      </label>
    </li>
  </ul>
</template>

<script>
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
    colors() {
      return this.$store.state.colorsData || [];
    },
    getColors() {
      if (this.colorIds === undefined || this.colors === undefined) {
        return [];
      }

      if (this.colorIds === false) {
        return this.colors;
      }

      const colorsArr = [];
      this.colorIds.forEach((colorId) => {
        const colorItem = this.colors.filter((color) => color.id === colorId);
        if (colorItem.length > 0) {
          colorsArr.push(colorItem[0]);
        }
      });

      return colorsArr;
    },
  },
  created() {
    this.$store.dispatch('loadColors');
  },
};
</script>

<style lang="sass">
.colors__item:first-child
  display: none
</style>
