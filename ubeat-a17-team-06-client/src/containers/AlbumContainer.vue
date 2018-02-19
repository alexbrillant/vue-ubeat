<template>
  <div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="album" class="content">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4>
          <v-layout column align-center>
            <spinner v-if="albumLoading"></spinner>
            <template v-if="album">
              <img class="album__artwork" :src="artworkUrl(album, 200)" width="200" />
              <h5 class="album__title">{{album.collectionName}}</h5>
              <p>By <router-link :to="{ name: 'Artist', params: { id: album.artistId }}">{{album.artistName}}</router-link></p>
              <template v-if="tracks">
                <p>{{formatReleaseDate(album.releaseDate)}} &bull; {{album.trackCount}} songs &bull; {{album.primaryGenreName}}</p>
              </template>
              <itunes-link :href="album.collectionViewUrl"></itunes-link>
              <v-btn @click.stop="openAddAlbumToPlaylistDialog()">Add to Playlist</v-btn>
              <router-link :to="{ name: 'AlbumItems', params: { id: id } }">
                Best price online
              </router-link>
            </template>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6 md8>
          <v-layout v-if="tracksLoading" align-center class="text-xs-center">
            <spinner></spinner>
          </v-layout>
          <tracks v-if="tracks" :tracks="tracks">
            <template slot="empty">
              The album has no track.
            </template>
          </tracks>
        </v-flex>
      </v-layout>
      <add-album-to-playlist-dialog
        v-if="addingAlbum"
        @close="addingAlbum = false"
        :albumId="id">
      </add-album-to-playlist-dialog>
    </div>
  </div>
</template>

<style lang="scss">
.album {
  &__artwork {
    margin: 30px;
  }
  &__title {
    text-align: center;
  }
}
</style>

<script>
import ItunesLink from '@/components/ItunesLink'
import Tracks from '@/components/Tracks'
import Spinner from '@/components/Spinner'
import AddAlbumToPlaylistDialog from '@/components/AddAlbumToPlaylistDialog'
import AlbumService from '@/services/AlbumService'
import TrackService from '@/services/TrackService'
import moment from 'moment'

export default {
  name: 'album-container',
  props: {
    id: {
      type: String
    }
  },
  components: {
    Spinner,
    AddAlbumToPlaylistDialog,
    ItunesLink,
    Tracks
  },
  data () {
    return {
      albumLoading: false,
      tracksLoading: false,
      album: null,
      tracks: null,
      error: null,
      selectedPlaylist: null,
      addingAlbum: false
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    openAddAlbumToPlaylistDialog () {
      this.addingAlbum = true
    },
    async fetchData () {
      this.fetchAlbum()
      this.fetchTracks()
    },
    async fetchAlbum () {
      this.error = null
      this.album = null
      this.albumLoading = true
      try {
        this.album = await AlbumService.getById(this.id)
      } catch (err) {
        this.error = err.message
      }
      this.albumLoading = false
    },
    async fetchTracks () {
      this.error = null
      this.tracks = null
      this.tracksLoading = true
      try {
        this.tracks = await TrackService.getByAlbum(this.id)
      } catch (err) {
        this.error = err.message
      }
      this.tracksLoading = false
    },
    artworkUrl (album, size) {
      return album.artworkUrl100.replace('100x100bb', `${size}x${size}bb`)
    },
    formatReleaseDate (date) {
      return moment(date).format('MMM YYYY')
    }
  }
}
</script>
