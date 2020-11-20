<template>
  <div>
    <BaseHeader/>

    <router-view/>

    <BaseFooter/>
  </div>
</template>

<script>
import BaseHeader from '@/components/Base/BaseHeader.vue';
import BaseFooter from '@/components/Base/BaseFooter.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    BaseFooter,
    BaseHeader,
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }

    this.$store.dispatch('loadCart');
  },
  methods: {
    ...mapMutations(['updateUserAccessKey']),
  },
};
</script>
