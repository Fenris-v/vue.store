<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <router-link class="breadcrumbs__link" :to="{name: 'main'}">
        Каталог
      </router-link>
    </li>
    <li class="breadcrumbs__item">
      <router-link class="breadcrumbs__link" :to="{name: 'main'}">
        {{ category }}
      </router-link>
    </li>
    <li class="breadcrumbs__item">
      <a class="breadcrumbs__link">
        {{ product }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BaseBreadcrumbs',
  props: ['product', 'category'],
};
</script>
