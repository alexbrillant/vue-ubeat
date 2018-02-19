<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="artist" class="content" :key="artist.artistId">
      <artist :artist="artist"></artist>
    </div>
    <spinner v-if="loading"></spinner>
    <template v-if="albums">
      <albums :albums="albums">
        <template slot="empty">
          The artist has no album.
        </template>
      </albums>
    </template>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}

h1 {
  margin-bottom: 0;
}
</style>

<script>
import Artist from '@/components/Artist'
import ArtistService from '@/services/ArtistService'
import AlbumService from '@/services/AlbumService'
import Albums from '@/components/Albums'
import Spinner from '@/components/Spinner'

export default {
  name: 'artist-container',
  components: {
    Spinner,
    Artist,
    Albums
  },
  data () {
    return {
      artistLoading: false,
      albumsLoading: false,
      artist: null,
      albums: null,
      error: null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  computed: {
    loading () {
      return this.albumsLoading || this.artistLoading
    }
  },
  methods: {
    fetchData () {
      this.fetchArtist()
      this.fetchAlbums()
    },
    async fetchArtist () {
      this.error = null
      this.artist = null
      this.artistLoading = true

      try {
        this.artist = await ArtistService.getById(this.$route.params.id)
      } catch (err) {
        this.error = err.message
      }

      this.artistLoading = false
    },
    async fetchAlbums () {
      this.error = null
      this.artist = null
      this.albumsLoading = true

      try {
        this.albums = await AlbumService.getByArtistId(this.$route.params.id)
      } catch (err) {
        this.error = err.message
      }

      this.albumsLoading = false
    }
  }
}
</script>
