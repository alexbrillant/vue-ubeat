<template>
  <v-list two-line>
    <v-subheader>Playlists</v-subheader>
    <v-list-tile v-if="playlists.length == 0">
      <v-list-tile-content>
        <template v-if="$slots.empty">
          <slot name="empty"></slot>
        </template>
        <template v-else>
          No playlists found
        </template>
      </v-list-tile-content>
    </v-list-tile>
    <template v-for="playlist in playlists">
      <v-list-tile :key="playlist.id" :to="{ name: 'Playlist', params: { id: playlist.id} }">
        <v-list-tile-content>
          <v-list-tile-title>
            {{ playlist.name }}
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ playlist.tracks.length }} tracks
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'playlists',
  props: {
    playlists: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
</style>
