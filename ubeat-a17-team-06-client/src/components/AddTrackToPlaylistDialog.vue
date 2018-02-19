<template>
  <v-dialog v-model="display">
    <v-card>
      <v-card-actions @click.stop="display = false">
        <v-spacer></v-spacer>
        <v-btn icon ripple>
          <v-icon class="grey--text text--lighten-1">clear</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-title>
        Add to playlist
      </v-card-title>
      <v-card-text>
        <v-select @change="onPlaylistChanged" @blur="onPlaylistBlurred" v-bind:items="userPlaylists()" v-model="selectedPlaylist" label="Select playlist" item-text="name"></v-select>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'add-track-to-playlist-dialog',
  props: [
    'selectedTrack',
    'addingTrack'
  ],
  data: function () {
    return {
      display: true,
      playlists: [],
      selectedPlaylist: null
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    ...mapGetters('playlists', [
      'userPlaylists'
    ])
  },
  methods: {
    ...mapActions('playlists', [
      'fetchPlaylists'
    ]),
    ...mapActions('playlist', [
      'addTrack'
    ]),
    async fetchData () {
      this.playlists = await this.fetchPlaylists()
    },
    onPlaylistChanged (playlist) {
      if (playlist && playlist.id) {
        this.addTrack({ playlistId: playlist.id, track: this.selectedTrack })
        this.display = false
      }
    },
    onPlaylistBlurred () {
      this.selectedPlaylist = null
    }
  },
  watch: {
    display (value) {
      if (value === false) {
        console.log('close')
        this.$emit('close')
      }
    }
  }
}
</script>
