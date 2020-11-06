<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <a class="breadcrumbs__link" href="#" @click.prevent="gotoPage('main')">
        Каталог
      </a>
    </li>
    <li class="breadcrumbs__item">
      <a class="breadcrumbs__link" href="#" @click.prevent="gotoPage('main')">
        {{ category }}
      </a>
    </li>
    <li class="breadcrumbs__item">
      <a class="breadcrumbs__link">
        {{ product }}
      </a>
    </li>
  </ul>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';

export default {
  name: 'BaseBreadcrumbs',
  props: ['product', 'category'],
  methods: {
    gotoPage,
  },
};
</script>
