import { isEmpty } from 'lodash'

const levels = ['info', 'warning', 'error', 'success']

export default {
  namespaced: true,
  state: {
    level: null,
    message: null,
    timeoutId: null
  },
  mutations: {
    setTimeoutId (state, timeoutId) {
      state.timeoutId = timeoutId
    },
    setFlash (state, { message, level }) {
      state.message = message
      state.level = level
    },
    resetFlash (state) {
      state.message = null
      state.level = null
    }
  },
  actions: {
    flashError ({ dispatch }, { message }) {
      dispatch('flash', {
        level: 'error',
        message,
        persistant: true
      })
    },
    flashSuccess ({ dispatch }, message) {
      dispatch('flash', { level: 'success', message })
    },
    flash ({ state, commit }, { message, level = 'info', persistant = false,
      timeout = 3000 }) {
      if (!levels.includes(level)) {
        throw new Error('Invalid level')
      }
      clearTimeout(state.timeoutId)
      commit('setFlash', { message, level })
      if (!persistant) {
        commit('setTimeoutId', setTimeout(() => commit('resetFlash'), timeout))
      }
    }
  },
  getters: {
    hasFlash (state) {
      return !isEmpty(state.level) && !isEmpty(state.message)
    }
  }
}
