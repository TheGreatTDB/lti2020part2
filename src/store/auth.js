/*jshint esversion: 6 */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem("token") || null,
    currentTab: sessionStorage.getItem("tab") || "listNodes"
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
    changeTab: (state, tab) => {
      sessionStorage.setItem("tab", tab);
      state.currentTab = tab;
    },
    clearTab: (state) => {
      sessionStorage.removeItem("tab");
      state.currentTab = "statusEndpoints";
    },
  },
});
