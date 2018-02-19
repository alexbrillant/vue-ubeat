<template>
  <div class="playlist">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="playlit-title overflow-ellipsis">{{ playlist.name }}</div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <v-btn class="ml-0" dark :to="editRoute">Edit</v-btn>
      <v-dialog v-model="dialog" lazy absolute>
        <v-btn dark slot="activator">Delete</v-btn>
        <v-card>
          <v-card-title>
            <div class="headline overflow-ellipsis">Delete {{ playlist.name }}</div>
          </v-card-title>
          <v-card-text>Are you sure you want to delete your playlist?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Cancel</v-btn>
            <v-btn class="green--text darken-1" flat="flat" @click.native="handleDelete">Delete playlist</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog class="right" v-model="dialog2" lazy absolute>
        <v-btn class="mr-0" dark slot="activator">Remove {{ numberOfSelectedTracks }} Tracks</v-btn>
        <v-card>
          <v-card-title>
            <div class="headline">Delete Tracks</div>
          </v-card-title>
          <v-card-text>Are you sure you want to delete {{ numberOfSelectedTracks }} tracks from your playlist?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog2 = false">Cancel</v-btn>
            <v-btn class="green--text darken-1" flat="flat" @click.native="handleTrackDelete">Delete tracks</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

    <v-container>
      <tracks @selectTrack="selectTrack" v-bind="{ deleteTrack, fromPlaylist: true,  tracks: playlist.tracks }">
        <template slot="empty">
          Your playlist has no track yet.
        </template>
      </tracks>
    </v-container>
  </div>
</template>

<script>
import Tracks from '@/components/Tracks'
import { mapActions } from 'vuex'

export default {
  name: 'playlist',
  components: {
    Tracks
  },
  data () {
    return {
      dialog: false,
      dialog2: false,
      selectedTracks: []
    }
  },
  props: {
    playlist: {
      type: Object,
      required: true
    }
  },
  computed: {
    editRoute () {
      return {
        name: 'EditPlaylist',
        params: { id: this.playlist.id }
      }
    },
    numberOfSelectedTracks: function () {
      return this.selectedTracks.length
    }
  },
  methods: {
    handleDelete () {
      this.dialog = false
      this.$emit('delete')
    },
    handleTrackDelete () {
      this.dialog2 = false
      this.selectedTracks.forEach((track) =>
        this.deleteTrack(track.trackId)
      )
      this.selectedTracks = []
    },
    ...mapActions('playlist', [
      'deleteTrack'
    ]),
    selectTrack (track) {
      if (this.selectedTracks.includes(track)) {
        track.isSelected = false
        var index = this.selectedTracks.indexOf(track)
        this.selectedTracks.splice(index, 1)
      } else {
        track.isSelected = true
        this.selectedTracks.push(track)
      }
    }
  }
}
</script>

<style>
</style>
