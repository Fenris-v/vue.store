import Vue from 'vue';
import App from './App.vue';
import { test, world } from './modules/data';
import notify from './modules/alert';

notify(world);
notify(test);

Vue.config.productionTip = true;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
