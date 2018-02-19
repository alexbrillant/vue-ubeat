<template>
  <div>
    <v-list id="following">
      <template name="following" v-for="(user, index) in followingElements">
        <v-subheader v-bind:key="index" v-if="user.header" v-text="user.header"></v-subheader>
        <v-divider v-else-if="user.divider" v-bind:key="index-user.divider"></v-divider>
        <v-list-tile v-else :to="{ name: 'User', params: { id: user.id} }" avatar v-bind:key="user.id">
          <v-list-tile-content>
            <v-list-tile-title v-html="user.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <v-list-tile v-if="following.length == 0 && $slots.empty">
        <v-list-tile-content>
          <slot name="empty"></slot>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { createListViewArray } from '../utils/ListViewUtil'

export default {
  name: 'following',
  props: ['following'],
  computed: {
    followingElements () {
      return createListViewArray(this.following, {
        header: 'Following',
        withDivider: true
      })
    }
  }
}
</script>
