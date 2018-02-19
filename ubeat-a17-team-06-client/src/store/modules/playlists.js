import { isEmpty, get } from 'lodash'
import { fetchPlaylists } from '@/services/PlaylistService'
import Status from '@/utils/Status'

export default {
  namespaced: true,
  state: {
    playlists: [],
    status: Status.IDLE
  },
  mutations: {
    setPlaylists (state, playlists) {
      state.playlists = playlists
    },
    setStatus (state, status) {
      state.status = status
    }
  },
  actions: {
    fetchPlaylists: async ({ commit, dispatch }) => {
      try {
        commit('setPlaylists', [])
        commit('setStatus', Status.FETCHING)
        const playlists = await fetchPlaylists()
        commit('setStatus', Status.SUCCEEDED)
        commit('setPlaylists', playlists)
        return playlists
      } catch (error) {
        await dispatch('flash/flashError', error, { root: true })
        commit('setStatus', Status.FAILED)
      }
    }
  },
  getters: {
    hasStatus: (state) => (status) => {
      return state.status === status
    },
    userPlaylists: (state, _, rootState, rootGetters) => (user) => {
      if (isEmpty(user)) user = rootGetters.user
      return state.playlists.filter((playlist) => {
        return get(playlist.owner, 'email', '') === user.email
      })
    }
  }
}
