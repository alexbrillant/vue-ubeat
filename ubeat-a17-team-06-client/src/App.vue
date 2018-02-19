<template>
  <v-app dark toolbar>
    <template v-if="isLoggedIn">
      <v-navigation-drawer class="pb-0" persistent height="100%" clipped floating enable-resize-watcher v-model="drawer">
        <nav-menu></nav-menu>
      </v-navigation-drawer>
      <v-toolbar fixed>
        <v-toolbar-title>
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        </v-toolbar-title>
        <v-toolbar-title>
          <search-bar></search-bar>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right offset-y>
          <v-btn icon slot="activator" dark>
            <avatar :size="40" :email="user.email"></avatar>
          </v-btn>
          <v-list>
            <v-list-tile :to="{ name: 'User', params: { id: user.id }}" >
              <avatar :size="40" :email="user.email"></avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ user.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-tile v-for="item in pages" :key="item.text" :to="item.target">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
    </template>
    <main>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <flash v-if="hasFlash" :level="level" :message="message"></flash>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </v-app>
</template>

<style src="./assets/main.styl" lang="stylus"></style>

<script>
import { mapState, mapGetters } from 'vuex'
import Navigation from '@/components/Navigation'
import SearchBar from '@/components/SearchBar'
import Flash from '@/components/Flash'
import Avatar from '@/components/Avatar'

export default {
  name: 'app',
  components: {
    'nav-menu': Navigation,
    SearchBar,
    Flash,
    Avatar
  },
  data: () => ({
    drawer: true,
    pages: [{
      icon: 'exit_to_app', text: 'Logout', target: '/logout'
    }]
  }),
  computed: {
    ...mapState('flash', [
      'level',
      'message'
    ]),
    ...mapGetters([
      'isLoggedIn',
      'user'
    ]),
    ...mapGetters('flash', [
      'hasFlash'
    ])
  }
}
</script>
