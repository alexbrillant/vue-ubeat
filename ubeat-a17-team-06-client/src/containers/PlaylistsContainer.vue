<template>
  <div>
    <v-container>
      <v-layout row wrap>

        <v-flex class="center-left-align" xs5>
          <div class="playlit-title">Playlists</div>
        </v-flex>
        <v-flex xs2></v-flex>
        <v-flex class="center-right-align" xs5>
          <v-btn class="mr-0" dark :to="{ name: 'NewPlaylist' }">New playlist</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <spinner v-if="hasStatus('fetching')"></spinner>

      <playlists
        v-if="hasStatus('succeeded')"
        :playlists="userPlaylists()">
        <template slot="empty">
          You have no playlist
        </template>
      </playlists>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Spinner from '@/components/Spinner'
import Playlists from '@/components/Playlists'

export default {
  name: 'playlists-container',
  components: {
    Spinner,
    Playlists
  },
  computed: {
    ...mapGetters('playlists', [
      'userPlaylists',
      'hasStatus'
    ])
  },
  methods: {
    ...mapActions('playlists', [
      'fetchPlaylists'
    ]),
    fetchData () {
      this.fetchPlaylists()
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  }
}
</script>
