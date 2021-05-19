import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "payment-widget",
});

export default new Vuex.Store({
  state: {
    paymentMethodList: {},
    countryCode: "GB",
    currency: { code: "", name: "", symbol: "" },
    paymentMethod: {
      id: "",
      img_class: "",
      img_url: "",
      name: "",
    },
    paymentStatus: "",
  },
  mutations: {
    setCountryCode(state, data) {
      state.countryCode = data;
    },
    setPaymentMethodList(state, data) {
      state.paymentMethodList = data;
    },
    setCurrency(state, data) {
      state.currency = data;
    },
    resetPaymentMethod(state) {
      state.paymentMethod = {
        id: "",
        img_class: "",
        img_url: "",
        name: "",
      };
    },
    setPaymentMethod(state, data) {
      state.paymentMethod = data;
    },
    resetPaymentStatus(state) {
      state.paymentStatus = "";
    },
    setPaymentStatus(state, data) {
      state.paymentStatus = data;
    },
  },
  actions: {
    setCountryCode({ commit }, data) {
      commit("setCountryCode", data);
    },
    setPaymentMethodList({ commit }, data) {
      commit("setPaymentMethodList", data);
    },
    setCurrency({ commit }, data) {
      commit("setCurrency", data);
    },
    resetPaymentMethod({ commit }) {
      commit("resetPaymentMethod");
    },
    setSelectedPaymentMethod({ commit }, data) {
      commit("setPaymentMethod", data);
    },
    resetPaymentStatus({ commit }) {
      commit("resetPaymentStatus");
    },
    setPaymentStatus({ commit }, data) {
      commit("setPaymentStatus", data);
    },
  },
  getters: {
    countryCode(state) {
      return state.countryCode;
    },
    paymentMethodList(state) {
      return state.paymentMethodList;
    },
    getCurrency(state) {
      return state.currency.code;
    },
    paymentMethod(state) {
      return state.paymentMethod;
    },
    paymentStatus(state) {
      return state.paymentStatus;
    },
  },
  plugins: [vuexLocal.plugin],
});
