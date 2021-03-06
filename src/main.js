import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import VueSlideoutPanel from 'vue2-slideout-panel';

import Multiselect from "vue-multiselect";

import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store/auth";

axios.defaults.baseURL = "http://192.168.199.150:8443"; //"http://devstack.local"; //Mudar para ip do servidor do openstack! ex: "http://192.168.x.x"

Vue.use(BootstrapVue, IconsPlugin);
Vue.use(VueAxios, axios);
Vue.component("multiselect", Multiselect);
Vue.use(VueSlideoutPanel);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
