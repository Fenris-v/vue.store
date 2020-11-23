<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <router-link class="breadcrumbs__link" :to="{name: 'main'}">
        Каталог
      </router-link>
    </li>

    <li class="breadcrumbs__item" v-for="crumb in list" :key="crumb.title">
      <router-link class="breadcrumbs__link" :to="{name: crumb.link}" v-if="crumb.link">
        {{ crumb.title }}
      </router-link>
      <a class="breadcrumbs__link" v-else>
        {{ crumb.title }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BaseBreadcrumbs',
  props: ['list'],
};
</script>
