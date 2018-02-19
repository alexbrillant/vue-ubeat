<template lang="html">
  <v-container fluid style="min-height: 0;" grid-list-lg>
    <v-layout>
      <v-flex>
        <div v-if="album">
          <div class="playlit-title">Best price online</div>
          <br/>
          <h5 v-if="album">
            <router-link :to="{ name: 'Album', params: { id: album.collectionId } }">
              {{ album.collectionName }}
            </router-link>
          </h5>
          <p>
            By
            <router-link :to="{ name: 'Artist', params: { id: album.artistId }}">
              {{ album.artistName }}
            </router-link>
          </p>
        </div>
      </v-flex>
    </v-layout>
    <v-layout v-if="itemsLoading" align-center class="text-xs-center">
      <spinner></spinner>
    </v-layout>
    <items-list v-else :items="items"></items-list>
  </v-container>
</template>

<script>
import AlbumService from '@/services/AlbumService'
import ItemsService from '@/services/ItemsService'
import ItemsList from '@/components/ItemsList'
import Spinner from '@/components/Spinner'
import { mapActions } from 'vuex'

export default {
  name: 'album-items-container',
  components: {
    ItemsList,
    Spinner
  },
  props: {
    collectionId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      albumLoading: false,
      itemsLoading: false,
      album: null,
      items: []
    }
  },
  methods: {
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
    async fetchItems () {
      this.error = null
      this.items = []
      this.itemsLoading = true
      try {
        this.items = await ItemsService.searchItems(this.album.artistName, this.album.collectionName)
      } catch (err) {
        this.error = err.message
      }
      this.itemsLoading = false
    },
    async fetchData () {
      this.fetchAlbum()
        .then(() => this.fetchItems())
    },
    ...mapActions('playlists', [
      'fetchPlaylists'
    ])
  },
  watch: {
    '$route': 'fetchData'
  },
  created () {
    this.fetchData()
  }
}
</script>

<style lang="scss">
</style>
