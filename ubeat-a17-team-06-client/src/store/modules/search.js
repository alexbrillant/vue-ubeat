import { assembleResults } from '@/services/ResultAssembler'

export default {
  namespaced: true,
  state: {
    results: []
  },
  mutations: {
    setResults (state, { results, following }) {
      let assembledResults = assembleResults({ results, following })
      let sortedResults = assembledResults.sort((a, b) => {
        if (a.value > b.value) return -1
        else if (a.value < b.value) return 1
        return 0
      })
      state.results = sortedResults
    }
  },
  actions: {
    async setResults ({ rootState, rootGetters, commit, dispatch }, results) {
      let following = rootGetters['user/followers']
      commit('setResults', {results, following})
    }
  }
}
