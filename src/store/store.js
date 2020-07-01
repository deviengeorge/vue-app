import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tokenKey: "",
  },
  mutations: {
    edit(state, payload) {
      state.tokenKey = payload.amount;
    },
  },
});

export default store;
