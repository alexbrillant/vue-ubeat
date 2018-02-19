<template>
  <div>
    <v-list class="tracks" >
      <v-list-tile v-if="tracks.length == 0 && $slots.empty">
        <v-list-tile-content>
          <slot name="empty"></slot>
        </v-list-tile-content>
      </v-list-tile>
      <template v-else v-for="(track, index) in trackElements">
        <v-divider v-if="track.divider" v-bind:key="index-track.divider"></v-divider>
        <album-track v-else v-bind:key="track.trackId" :track="track" :playing-track="playingTrack" :paused="paused" :from-playlist="fromPlaylist"
          @play="playTrack" @pause="pauseTrack" @add-to-playlist="openAddTrackToPlaylistDialog" @delete="deleteTrack" @click="handleClick(track)"></album-track>
      </template>
    </v-list>
    <player ref="player"></player>
    <add-track-to-playlist-dialog
      v-if="addingTrack"
      @close="addingTrack = false"
      :selectedTrack="selectedTrack">
    </add-track-to-playlist-dialog>
  </div>
</template>

<style lang="scss">
.tracks {
  width: 100%;
}
</style>

<script>
import Player from '@/components/Player'
import AddTrackToPlaylistDialog from '@/components/AddTrackToPlaylistDialog'
import AlbumTrack from '@/components/Track'
import { createListViewArray } from '@/utils/ListViewUtil'

export default {
  name: 'tracks',
  components: {
    Player,
    AlbumTrack,
    AddTrackToPlaylistDialog
  },
  data () {
    return {
      playingTrack: null,
      paused: false,
      addingTrack: false,
      selectedPlaylist: null,
      selectedTrack: null
    }
  },
  props: {
    tracks: Array,
    deleteTrack: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    fromPlaylist: Boolean
  },
  computed: {
    trackElements: function () {
      return createListViewArray(this.tracks, {
        withDivider: true
      })
    }
  },
  methods: {
    openAddTrackToPlaylistDialog (track) {
      this.selectedTrack = track
      this.addingTrack = true
    },
    handleClick (track) {
      this.$emit('selectTrack', track)
    },
    playTrack (track) {
      this.playingTrack = track
      this.paused = false
      this.$refs.player.play(track)
    },
    pauseTrack () {
      this.paused = true
      this.$refs.player.pause()
    }
  },
  watch: {
    '$route': 'fetchData'
  }
}
</script>
