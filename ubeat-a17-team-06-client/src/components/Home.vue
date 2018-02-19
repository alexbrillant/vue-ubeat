<template>
  <div class="home">
    <v-container>
      <v-layout row wrap>
        <v-flex class="center-left-align">
          <div class="playlit-title">Discover new artists</div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <spinner v-if="hasStatus('fetching')"></spinner>
      <artists v-if="artists" :artists="artists"></artists>
    </v-container>
  </div>
</template>

<style>
</style>

<script>
import Artists from '../components/Artists'
import Spinner from '@/components/Spinner'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    Artists,
    Spinner
  },
  computed: {
    ...mapState('artists', [
      'artists'
    ]),
    ...mapGetters('artists', [
      'hasStatus'
    ])
  },
  methods: {
    ...mapActions('artists', [
      'fetchArtistsIfNeeded'
    ])
  },
  created () {
    this.fetchArtistsIfNeeded()
  },
  watch: {
    '$route': 'fetchArtistsIfNeeded'
  }
}
</script>
