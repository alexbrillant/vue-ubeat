import { isEmpty, pick, get } from 'lodash'
import {
  createPlaylist, fetchPlaylist, updatePlaylist, deletePlaylist, addTrack, deleteTrack
} from '@/services/PlaylistService'
import Status from '@/utils/Status'

const initialState = {
  playlist: {
    id: null,
    name: null,
    tracks: []
  },
  loading: false,
  error: null,
  status: {
    fetch: Status.IDLE,
    save: Status.IDLE,
    delete: Status.IDLE
  }
}

export default {
  namespaced: true,
  state: { ...initialState },
  mutations: {
    setPlaylist (state, playlist) {
      state.playlist = { ...state.playlist, ...playlist }
    },
    setStatusFetch (state, status) {
      state.status.fetch = status
    },
    setStatusSave (state, status) {
      state.status.save = status
    },
    setStatusDelete (state, status) {
      state.status.delete = status
    },
    reset (state) {
      // This doens't work: `state = { ...state, ...initialState }`
      state = Object.assign(state, initialState)
    }
  },
  actions: {
    savePlaylist ({ dispatch, commit, state }, attributes) {
      const action = isEmpty(state.playlist.id) ? 'createPlaylist' : 'updatePlaylist'
      return dispatch(action, attributes)
    },
    createPlaylist: async ({ commit, rootState, dispatch }, attributes) => {
      // Because we use the 'unsecure' endpoint.
      // TODO: Remove this for next release.
      attributes.owner = pick(rootState.user, ['name', 'email'])
      try {
        commit('setStatusSave', Status.SAVING)
        const playlist = await createPlaylist(attributes)
        dispatch('flash/flashSuccess', 'Playlist created!', { root: true })
        commit('setStatusSave', Status.SUCCEEDED)
        commit('setPlaylist', playlist)
        return playlist
      } catch (error) {
        dispatch('flash/flashError', error, { root: true })
        commit('setStatusDelete', Status.FAILED)
      }
    },
    updatePlaylist: async ({ commit, state, rootState, dispatch }, attributes) => {
      // Because we use the 'unsecure' endpoint.
      // TODO: Remove this for next release.
      attributes.owner = pick(rootState.user, ['name', 'email'])
      try {
        commit('setStatusSave', Status.SAVING)
        const playlist = await updatePlaylist(state.playlist.id, attributes)
        dispatch('flash/flashSuccess', 'Playlist updated!', { root: true })
        commit('setStatusSave', Status.SUCCEEDED)
        commit('setPlaylist', playlist)
        return playlist
      } catch (error) {
        dispatch('flash/flashError', error, { root: true })
        commit('setStatusDelete', Status.FAILED)
      }
    },
    deleteTrack: async ({ commit, state, dispatch }, trackId) => {
      try {
        const playlist = await deleteTrack({ playlistId: state.playlist.id, trackId })
        commit('setPlaylist', playlist)
        return playlist
      } catch (error) {
        dispatch('flash/flashError', error, { root: true })
      }
    },
    addTrack: async ({ commit, state, dispatch }, { playlistId, track }) => {
      try {
        const playlist = await addTrack(playlistId, track)
        dispatch('flash/flashSuccess', 'Song added to playlist!', { root: true })
        // Only update current playlist.
        if (get(state.playlist, 'id') === playlistId) {
          commit('setPlaylist', playlist)
        }
        return playlist
      } catch (error) {
        dispatch('flash/flashError', error, { root: true })
      }
    },
    addTracks: async ({ commit, state, dispatch }, { playlistId, tracks }) => {
      try {
        const playlists = await Promise.all(
          tracks.map(track => addTrack(playlistId, track))
        )
        dispatch('flash/flashSuccess', 'Album added to playlist!', { root: true })
        // Only refecth current playlist.
        if (get(state.playlist, 'id') === playlistId) {
          await dispatch('fetchPlaylist', playlistId)
        }
        return playlists
      } catch (error) {
        dispatch('flash/flashError', error, { root: true })
      }
    },
    deletePlaylist: async ({ commit, state, dispatch }) => {
      try {
        commit('setStatusDelete', Status.DELETING)
        await deletePlaylist(state.playlist.id)
        dispatch('flash/flashSuccess', 'Playlist deleted!', { root: true })
        commit('setStatusDelete', Status.SUCCEEDED)
        // commit('reset')
      } catch (error) {
        dispatch('flash/flashError', error, { root: true })
        commit('setStatusDelete', Status.FAILED)
      }
    },
    fetchPlaylist: async ({ commit, dispatch }, playlistId) => {
      try {
        commit('reset')
        commit('setStatusFetch', Status.FETCHING)
        const playlist = await fetchPlaylist(playlistId)
        commit('setStatusFetch', Status.SUCCEEDED)
        commit('setPlaylist', playlist)
        return playlist
      } catch (error) {
        await dispatch('flash/flashError', error, { root: true })
        commit('setStatusFetch', Status.FAILED)
      }
    },
    fetchPlaylistIfNeeded: async ({ state, dispatch }, playlistId) => {
      if (state.playlist.id === playlistId) {
        return state.playlist
      } else {
        return dispatch('fetchPlaylist', playlistId)
      }
    }
  },
  getters: {
    hasStatus: (state) => (name, status) => {
      return state.status[name] === status
    },
    hasPlaylist (state) {
      return !isEmpty(state.playlist.id)
    }
  }
}
