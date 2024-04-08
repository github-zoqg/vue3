import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 0,
      user: JSON.parse(localStorage.getItem("user")) || null,
    };
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
      if (!data) {
        localStorage.removeItem("user");
        return;
      }
      localStorage.setItem("user", JSON.stringify(data));
    },
  },
});

export default store;
