import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    tasks: [],
    lists: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, board) {
      state.activeBoard = board
    },
    removeBoard(state, _id) {
      state.boards = state.boards.filter(b => b._id != _id)
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setTasks(state, tasks) {
      state.tasks.push(tasks)
    }

  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    getBoardById({ commit, dispatch }, id) {
      api.get('boards/' + id)
        .then(res => {
          commit("setActiveBoard", res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    async deleteBoard({ commit, dispatch }, _id) {
      await api.delete('boards/' + _id)
      commit("removeBoard", _id);
      dispatch("getBoards");
    },

    async setActiveBoard({ commit, dispatch }, id) {
      let res = await api.get('boards/' + id);
      commit("setActiveBoard", res.data)
    },
    //#endregion


    //#region -- LISTS --
    async getListsByBoardId({ commit, dispatch }, id) {
      try {
        let res = await api.get('boards/' + id + '/lists')
        commit("setLists", res.data)
      } catch (e) {
        console.error(e)
      }
    },
    async getTasksByListId({ commit, dispatch }, id) {
      try {
        let res = await api.get('lists/' + id + "/tasks")
        commit("setTasks", res.data)
      } catch (error) {
        console.error(error)
      }
    },

    //#endregion
  }
})
