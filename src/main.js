import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store/auth";

axios.defaults.baseURL = "https://127.0.0.1:6443"; //"http://devstack.local"; //Mudar para ip do servidor do openstack! ex: "http://192.168.x.x"

Vue.use(BootstrapVue, IconsPlugin);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
