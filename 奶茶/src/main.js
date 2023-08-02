import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vant from 'vant';
import 'vant/lib/index.css';
import "./assets/icon/iconfont.css";

Vue.use(Vant);
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://zhiyun.l1.svipss.top'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
