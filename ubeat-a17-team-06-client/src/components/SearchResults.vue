<template>
  <div>
    <h1>Search results</h1>
    <v-list>
      <v-list-tile v-if="results.length == 0">
        <v-list-tile-content>
          No results
        </v-list-tile-content>
      </v-list-tile>
      <template v-else v-for="(result, index) in results">
        <v-list-tile :to="{ name: result.route.name, params: { id: result.route.id }}" v-bind:key="result.value + '-' + index" avatar>
          <v-list-tile-avatar v-if="result.avatar">
            <avatar class="user__avatar" :size="200" :email="result.result.email"></avatar>
          </v-list-tile-avatar>
          <v-list-tile-avatar v-if="result.icon">
            <v-icon class="grey--text text--lighten-1">{{ result.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title v-html="result.value"></v-list-tile-title>
          <div v-if="result.button">
            <v-list-tile-action class="result__button" @click.prevent="resultButtonClick(result)">
              <v-btn icon ripple>
                <v-icon class="grey--text text--lighten-1">{{ result.button }}</v-icon>
              </v-btn>
            </v-list-tile-action>
          </div>
        </v-list-tile>
      </template>
    </v-list>
    <add-album-to-playlist-dialog
      v-if="addingAlbum"
      @close="addingAlbum = false"
      :albumId="albumId">
    </add-album-to-playlist-dialog>
    <add-track-to-playlist-dialog
      v-if="addingTrack"
      @close="addingTrack = false"
      :selectedTrack="selectedTrack">
    </add-track-to-playlist-dialog>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
import AddAlbumToPlaylistDialog from '@/components/AddAlbumToPlaylistDialog'
import Avatar from '@/components/Avatar'
import AddTrackToPlaylistDialog from '@/components/AddTrackToPlaylistDialog'

export default {
  name: 'search-results',
  components: {
    AddTrackToPlaylistDialog,
    AddAlbumToPlaylistDialog,
    Avatar
  },
  data () {
    return {
      addingTrack: false,
      addingAlbum: false,
      selectedTrack: null,
      albumId: null
    }
  },
  computed: {
    ...mapState('search', ['results']),
    ...mapGetters('user', ['followers'])
  },
  methods: {
    ...mapActions('user', [
      'follow',
      'unfollow'
    ]),

    ...mapActions('search', [
      'setResults'
    ]),
    async resultButtonClick (result) {
      if (!result.result.wrapperType) {
        await this.toggleUserFollow(result.result)
      }

      switch (result.result.wrapperType) {
        case 'track':
          this.openAddTrackToPlaylistDialog(result.result)
          break
        case 'collection':
          this.openAddAlbumToPlaylistDialog(result.result)
          break
      }

      this.setResults(this.results.map(result => result.result))
    },
    async toggleUserFollow (user) {
      let following = this.isFollowing(this.followers, user.email)
      if (following) {
        await this.unfollow(user.id)
      } else {
        await this.follow(user.id)
      }
    },
    isFollowing (followers, email) {
      if (followers && followers.length > 0) {
        return followers.find(u => u.email === email)
      }
    },
    openAddAlbumToPlaylistDialog (album) {
      this.albumId = album.collectionId
      this.addingAlbum = true
    },
    openAddTrackToPlaylistDialog (track) {
      this.selectedTrack = track
      this.addingTrack = true
    }
  }
}
</script>
