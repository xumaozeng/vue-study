import Vue from "vue";
import Vuex from "./xvuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    // 此处state如何获取
    add(state) {
      state.count++;
    }
  },
  actions: {
    // 此处上下文是什么
    add({ commit }) {
      setTimeout(() => {
        commit("add");
      }, 1000);
    }
  },
  getters: {
    doubleCounter(state) {
      return state.count * 2;
    }
  }
});
