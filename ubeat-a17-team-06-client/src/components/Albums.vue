<template>
  <div>
    <v-list two-line>
        <v-list-tile v-if="albums.length == 0 && $slots.empty">
          <v-list-tile-content>
            <slot name="empty"></slot>
          </v-list-tile-content>
        </v-list-tile>
        <template v-else v-for="(album, index) in albumElements">
            <v-subheader v-bind:key="index" v-if="album.header" v-text="album.header"></v-subheader>
            <v-divider v-else-if="album.divider" v-bind:inset="album.inset" v-bind:key="index-album.divider"></v-divider>
            <v-list-tile :to="{ name: 'Album', params: { id: album.collectionId }}" avatar v-else v-bind:key="album.collectionId">
                <v-list-tile-avatar>
                    <img v-bind:src="album.artworkUrl60">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title v-html="album.collectionName"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="getFullYear(album.releaseDate)"></v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-list>
  </div>
</template>

<script>
import { getFullYear } from '../utils/DateUtil'
import { createListViewArray } from '../utils/ListViewUtil'

export default {
  name: 'albums',
  methods: {
    getFullYear
  },
  props: [
    'albums'
  ],
  computed: {
    albumElements () {
      return createListViewArray(this.albums, {
        header: 'Albums',
        withDivider: true
      })
    }
  }
}
</script>
