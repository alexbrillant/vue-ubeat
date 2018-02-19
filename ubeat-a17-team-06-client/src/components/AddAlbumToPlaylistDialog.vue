<template>
  <v-dialog v-model="display">
    <v-card>
      <v-card-actions @click.stop="display=false">
        <v-spacer></v-spacer>
        <v-btn icon ripple>
          <v-icon class="grey--text text--lighten-1">clear</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-title>
        Add album to playlist
      </v-card-title>
      <v-card-title>
        <v-select @change="onPlaylistChanged" @blur="onPlaylistBlurred" :items="userPlaylists()"
                  v-model="selectedPlaylist" label="Select playlist" item-text="name"></v-select>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import TrackService from '@/services/TrackService'

export default {
  name: 'add-album-to-playlist-dialog',
  props: [
    'albumId',
    'addingAlbum'
  ],
  data: function () {
    return {
      display: true,
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
      'addTracks'
    ]),
    async fetchData () {
      this.fetchPlaylists()
    },
    async onPlaylistChanged (playlist) {
      if (playlist && playlist.id) {
        const tracks = await TrackService.getByAlbum(this.albumId)
        await this.addTracks({
          playlistId: playlist.id,
          tracks: tracks
        })
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
