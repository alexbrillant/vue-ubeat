<template>
  <div>
    <spinner v-if="hasStatus('fetch', 'fetching')"></spinner>
    <playlist
      v-if="hasStatus('fetch', 'succeeded') || hasPlaylist"
      :playlist="playlist"
      :status="status"
      @delete="handleDelete">
    </playlist>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Spinner from '@/components/Spinner'
import Playlist from '@/components/Playlist'

export default {
  name: 'playlist-container',
  components: {
    Spinner,
    Playlist
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    ...mapState('playlist', [
      'playlist',
      'status'
    ]),
    ...mapGetters('playlist', [
      'hasStatus',
      'hasPlaylist'
    ])
  },
  methods: {
    ...mapActions('playlist', [
      'fetchPlaylistIfNeeded',
      'deletePlaylist'
    ]),
    fetchData () {
      this.fetchPlaylistIfNeeded(this.id)
    },
    handleDelete () {
      this.deletePlaylist(this.id)
        .then(() => {
          if (this.hasStatus('delete', 'succeeded')) {
            this.$router.push({ name: 'Playlists' })
          }
        })
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

<style>
</style>
