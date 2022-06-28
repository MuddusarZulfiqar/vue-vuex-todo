import Vuex from "vuex";
import todos from "./modules/todos.js";
export default new Vuex.Store({
  modules: {
    todos,
  },
});
