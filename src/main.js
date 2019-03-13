import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'normalize.css'
import 'flex.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/styles/reset.css'
import './assets/styles/public.scss'
import './assets/styles/skin.scss'

import api from './common/api';
Vue.prototype.$api = api;

import utils from './common/utils';
Vue.prototype.$utils = utils;

Vue.use(MintUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
