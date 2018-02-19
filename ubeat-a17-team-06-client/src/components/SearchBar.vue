<template>
  <v-text-field label="Search..." v-model="query" single-line append-icon="search" dark hide-details></v-text-field>
</template>

<style scoped>
#search {
  width: 200px;
}
</style>

<script>
import SearchService from '@/services/SearchService'
import { debounce } from 'lodash'
import { mapActions } from 'vuex'

export default {
  name: 'search-bar',
  data () {
    return {
      loading: false,
      select: null,
      results: [],
      query: ''
    }
  },
  created () {
    this.debounceSearchQuery = debounce(this.searchQuery, 100)
  },
  watch: {
    query (val) {
      this.debounceSearchQuery(val)
    }
  },
  methods: {
    ...mapActions('search', [
      'setResults'
    ]),
    async searchQuery (query) {
      this.loading = true
      try {
        const results = await SearchService.globalSearch(query)
        this.setResults(results)
        this.$router.push({ name: 'SearchResults', query: { q: query } })
      } catch (error) {
      }
    }
  }
}
</script>
