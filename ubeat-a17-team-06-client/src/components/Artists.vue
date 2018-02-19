<template>
  <div class="">
    <v-list-tile v-if="artists.length == 0 && $slots.empty">
      <v-list-tile-content>
        <slot name="empty"></slot>
      </v-list-tile-content>
    </v-list-tile>
    <v-list v-else two-line>
        <template v-for="(artist, index) in artists">
            <v-subheader v-bind:key="index" v-if="artist.header" v-text="artist.header"></v-subheader>
            <v-divider v-else-if="artist.divider" v-bind:key="index-artist.divider"></v-divider>
            <v-list-tile :to="{ name: 'Artist', params: { id: artist.artistId }}" avatar v-else v-bind:key="artist.artistId" download>
                <v-list-tile-content>
                    <v-list-tile-title v-html="artist.artistName"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="artist.primaryGenreName"></v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'artists',
  props: {
    artists: {
      type: Array
    }
  }
}
</script>
