import { createUser, login, getCurrentUser, logoutUser, follow, unfollow } from '@/services/UserService'
import Status from '@/utils/Status'
import Cookie from 'js-cookie'

const initialUser = {
  token: null,
  email: null,
  name: null,
  following: [],
  id: null
}

const initialState = {
  user: Object.assign({}, initialUser),
  status: {
    create: Status.IDLE,
    login: Status.IDLE,
    logout: Status.IDLE,
    following: Status.IDLE
  }
}

export default {
  namespaced: true,
  state: { ...initialState },
  mutations: {
    setUser (state, user) {
      state.user = Object.assign({}, state.user, user)
    },
    setStatusCreate (state, status) {
      state.status.create = status
    },
    setStatusLogin (state, status) {
      state.status.login = status
    },
    setStatusLogout (state, status) {
      state.status.logout = status
    },
    setStatusFollowing (state, status) {
      state.status.following = status
    },
    reset (state) {
      state = Object.assign(state, initialState)
    }
  },
  actions: {
    async createUser ({ commit, rootState, dispatch }, attributes) {
      commit('setStatusCreate', Status.CREATING)
      try {
        const user = await createUser(attributes)
        dispatch('flash/flashSuccess', 'Account created!', { root: true })
        commit('setStatusCreate', Status.SUCCEEDED)
        commit('setUser', user)
      } catch (error) {
        commit('setStatusCreate', Status.FAILED)
        dispatch('flash/flashError', error, { root: true })
      }
    },
    async login ({ commit, rootState, dispatch }, attributes) {
      try {
        const user = await login(attributes.email, attributes.password)
        Cookie.set('token', user.token)
        commit('setUser', user)
        commit('setStatusLogin', Status.SUCCEEDED)
      } catch (error) {
        commit('setStatusLogin', Status.FAILED)
        error.message = 'Invalid credentials'
        dispatch('flash/flashError', error, { root: true })
      }
    },
    async tryToSetUserWithToken ({ commit, rootState, dispatch }) {
      if (Cookie.get('token')) {
        try {
          const user = await getCurrentUser()
          commit('setUser', user)
        } catch (error) {
          dispatch('flash/flashError', error, { root: true })
        }
      }
    },
    async logout ({ commit, rootState, dispatch }) {
      try {
        await logoutUser()
        commit('setUser', initialUser)
        commit('setStatusLogout', Status.SUCCEEDED)
        Cookie.remove('token')
      } catch (error) {
        commit('setStatusLogout', Status.FAILED)
      }
    },
    async follow ({ commit, rootState, dispatch }, id) {
      try {
        const user = await follow(id)
        commit('setUser', user)
        commit('setStatusFollowing', Status.SUCCEEDED)
      } catch (error) {
        commit('setStatusFollowing', Status.FAILED)
        error.message = 'Unable to follow user'
        dispatch('flash/flashError', error, { root: true })
      }
    },
    async unfollow ({ commit, rootState, dispatch }, id) {
      try {
        const user = await unfollow(id)
        commit('setUser', user)
        commit('setStatusFollowing', Status.SUCCEEDED)
      } catch (error) {
        commit('setStatusFollowing', Status.FAILED)
        error.message = 'Unable to unfollow user'
        dispatch('flash/flashError', error, { root: true })
      }
    }
  },
  getters: {
    hasStatus: (state) => (name, status) => {
      return state.status[name] === status
    },
    followers: (state) => {
      return state.user && state.user.following && state.user.following
    },
    loggedInUserId: (state) => state.user && state.user.id
  }
}
