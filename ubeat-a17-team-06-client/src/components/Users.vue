<template>
  <div>
    <v-list two-line>
      <v-list-tile v-if="users.length == 0 && $slots.empty">
        <v-list-tile-content>
          <slot name="empty"></slot>
        </v-list-tile-content>
      </v-list-tile>
      <template v-else v-for="(user, index) in userElements">
        <v-subheader v-bind:key="index" v-if="user.header" v-text="user.header"></v-subheader>
        <v-divider v-else-if="user.divider" v-bind:inset="user.inset" v-bind:key="index-user.divider"></v-divider>
        <v-list-tile :to="{ name: 'User', params: { id: user.id }}" avatar v-else v-bind:key="user.id">
          <v-list-tile-avatar>
            <avatar :size="200" :email="user.email"></avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="user.name"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action class="result__button" @click.prevent="toggleUserFollow(user)">
            <v-btn icon ripple>
              <v-icon class="grey--text text--lighten-1">{{ user.button }}</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import { createListViewArray } from '@/utils/ListViewUtil'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'users',
  components: {
    Avatar
  },
  props: [
    'users'
  ],
  computed: {
    ...mapGetters('user', [
      'followers',
      'loggedInUserId'
    ]),
    userElements () {
      return createListViewArray(this.users, {
        header: 'Users',
        withDivider: true
      })
    }
  },
  methods: {
    ...mapActions('user', [
      'follow',
      'unfollow'
    ]),
    async toggleUserFollow (user) {
      let following = this.isFollowing(this.followers, user.email)
      if (following) {
        await this.unfollow(user.id)
      } else {
        await this.follow(user.id)
      }
      this.$emit('toggleUserFollow')
    },
    isFollowing (followers, email) {
      if (followers && followers.length > 0) {
        return followers.find(u => u.email === email)
      }
    }
  }
}
</script>
