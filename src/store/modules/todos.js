import axios from "axios";
const state = {
  todos: [],
};
const getters = {
  allTodos: (state) => state.todos,
};
const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    commit("SET_TODOS", response.data);
  },
  async addTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, completed: false }
    );
    commit("ADD_TODOS", response.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit("DELETE_TODOS", id);
    console.log(id);
  },
  async filterTodos({ commit }, number) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${number}`
    );
    commit("FILTER_TODOS", response.data);
  },
  async updateTodo({ commit }, todo) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      todo
    );
    commit("UPDATE_TODOS", response.data);
  },
};
const mutations = {
  SET_TODOS: (state, todos) => (state.todos = todos),
  ADD_TODOS: (state, todos) => state.todos.unshift(todos),
  DELETE_TODOS: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  FILTER_TODOS: (state, todo) => (state.todos = todo),
  UPDATE_TODOS: (state, todos) => {
    const index = state.todos.findIndex((todo) => todo.id === todos.id);
    if (index !== -1) {
      state.todos.splice(index, 1, todos);
      console.log(todos);
    }
  },
};

export default { state, getters, actions, mutations };
