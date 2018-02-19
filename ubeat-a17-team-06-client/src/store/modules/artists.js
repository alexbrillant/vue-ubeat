import { isEmpty } from 'lodash'
import ArtistService from '@/services/ArtistService'
import Status from '@/utils/Status'

export default {
  namespaced: true,
  state: {
    artists: [],
    status: Status.IDLE
  },
  mutations: {
    setArtists (state, artists) {
      state.artists = artists
    },
    setStatus (state, status) {
      state.status = status
    }
  },
  actions: {
    async fetchArtistsIfNeeded ({ state, dispatch }) {
      if (isEmpty(state.artists)) {
        await dispatch('fetchArtists')
      }
    },
    async fetchArtists ({ commit, dispatch }) {
      try {
        commit('setArtists', [])
        commit('setStatus', Status.FETCHING)
        const artists = await ArtistService.discoverArtists()
        commit('setStatus', Status.SUCCEEDED)
        commit('setArtists', artists)
        return artists
      } catch (error) {
        await dispatch('flash/flashError', error, { root: true })
        commit('setStatus', Status.FAILED)
      }
    }
  },
  getters: {
    hasStatus: (state) => (status) => {
      return state.status === status
    }
  }
}
