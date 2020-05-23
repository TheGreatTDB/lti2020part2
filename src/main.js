import Vue from 'vue'
import App from './App.vue'

// Importing the Nova Light PrimeVue theme styles
import 'primevue/resources/themes/rhea/theme.css';
// Importing the base PrimeVue component styles
import 'primevue/resources/primevue.min.css';
// Importing the base PrimeIcon styles
import 'primeicons/primeicons.css';
import Button from 'primevue/button';
import PanelMenu from 'primevue/panelmenu';
import Menubar from 'primevue/menubar';

//Toast
import Toasted from 'vue-toasted';

//Axios etc
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSlideoutPanel from 'vue2-slideout-panel';
import Multiselect from "vue-multiselect";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store/auth";
import vuetify from './plugins/vuetify';

axios.defaults.baseURL = "http://192.168.199.150:8443"; 

Vue.use(BootstrapVue, IconsPlugin);
Vue.use(VueAxios, axios);
Vue.component("multiselect", Multiselect);
Vue.use(VueSlideoutPanel);
Vue.config.productionTip = false

//prime vue
Vue.component('Button', Button);
Vue.component('PanelMenu', PanelMenu);
Vue.component('Menubar', Menubar);

//Toast
Vue.use(Toasted);

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
