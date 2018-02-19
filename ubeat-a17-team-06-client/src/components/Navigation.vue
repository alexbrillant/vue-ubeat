<template>
  <div>
    <v-list>
      <v-list-tile v-for="page in pages" :key="page.text" :to="{ name: page.target }">
        <v-list-tile-action>
          <v-icon>{{ page.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ page.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-tile :to="{ name: 'Settings' }">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Settings
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    pages: [
      {
        icon: 'home', text: 'Home', target: 'Home'
      },
      {
        icon: 'face', text: 'Artists', target: 'Artists'
      },
      {
        icon: 'album', text: 'Albums', target: 'Albums'
      },
      {
        icon: 'audiotrack', text: 'Tracks', target: 'Tracks'
      },
      {
        icon: 'playlist_play', text: 'Playlists', target: 'Playlists'
      },
      {
        icon: 'face', text: 'Users', target: 'Users'
      }
    ]
  })
}
</script>
