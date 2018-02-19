import Vue from 'vue'
import Vuex from 'vuex'
import { get, isEmpty } from 'lodash'
import flash from '@/store/modules/flash'
import playlist from '@/store/modules/playlist'
import playlists from '@/store/modules/playlists'
import user from '@/store/modules/user'
import search from '@/store/modules/search'
import artists from '@/store/modules/artists'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    user (state, getters, rootState) {
      return get(rootState, 'user.user')
    },
    token (state, getters) {
      return get(getters.user, 'token')
    },
    isLoggedIn (state, getters) {
      return !isEmpty(getters.token)
    }
  },
  modules: {
    flash,
    playlist,
    playlists,
    user,
    search,
    artists
  }
})
