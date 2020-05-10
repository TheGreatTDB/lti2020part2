/*jshint esversion: 6 */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem("token") || null,
    resources: null
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token;
      sessionStorage.setItem("token", token);
    },
    clearToken: (state) => {
      state.token = null;
      sessionStorage.removeItem("token");
    },
  },
});
