<template>
  <v-list-tile :class="{ track_selected: isSelected }" avatar @click="handleClick">
    <v-list-tile-content>
      <v-list-tile-title>{{ formatTrackNumber(track.trackNumber) }}{{ track.trackName }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ formatDuration(track.trackTimeMillis) }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action v-if="fromPlaylist" @click.stop="deleteTrack(track.trackId)">
      <v-btn icon ripple>
        <v-icon class="grey--text text--lighten-1">clear</v-icon>
      </v-btn>
    </v-list-tile-action>
    <v-list-tile-action @click.stop="openAddTrackToPlaylistDialog(track)">
      <v-btn icon ripple>
        <v-icon class="grey--text text--lighten-1">add</v-icon>
      </v-btn>
    </v-list-tile-action>
    <template v-if="track.previewUrl">
      <v-list-tile-action v-if="!paused && track === playingTrack" @click.stop="pauseTrack()">
        <v-btn icon ripple>
          <v-icon class="grey--text text--lighten-1">pause</v-icon>
        </v-btn>
      </v-list-tile-action>
      <v-list-tile-action v-else @click.stop="playTrack(track)">
        <v-btn icon ripple>
          <v-icon class="grey--text text--lighten-1">play_arrow</v-icon>
        </v-btn>
      </v-list-tile-action>
    </template>
  </v-list-tile>
</template>

<style>
.track:hover .track__play {
  visibility: visible;
}

.track__inner>div {
  padding: 0 8px;
}

.track__play {
  visibility: hidden;
}

.track__play * {
  transition: none;
}

.track__duration {
  margin-left: auto;
}

@media only screen and (max-width: 1024px) {
  .list__tile__title {
    font-size: 13px;
  }
  .list__tile__sub-title {
    font-size: 10px;
  }
}
</style>

<script>
import numeral from 'numeral'

export default {
  name: 'album-track',
  data () {
    return {
      'isSelected': false
    }
  },
  props: [
    'track',
    'playingTrack',
    'paused',
    'fromPlaylist'
  ],
  methods: {
    handleClick () {
      if (this.fromPlaylist) {
        this.isSelected = !this.isSelected
      }

      this.$emit('click', this.track)
    },
    playTrack (track) {
      this.$emit('play', track)
    },
    pauseTrack () {
      this.$emit('pause')
    },
    deleteTrack (track) {
      this.$emit('delete', track)
    },
    formatDuration (duration) {
      return numeral(duration / 1000).format('00:00:00')
    },
    openAddTrackToPlaylistDialog (track) {
      this.$emit('add-to-playlist', track)
    },
    formatTrackNumber (trackNumber) {
      return this.fromPlaylist ? '' : `${trackNumber}. `
    }
  }
}
</script>
<style>
  .track_selected {
    background-color: #0d5061;
  }
</style>
