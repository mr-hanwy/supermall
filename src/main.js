import Vue from 'vue';
import App from './App.vue';
import router from "@/router";
import store from "@/store";
import Toast from "@/components/commons/toast";

Vue.use(Toast);

Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
