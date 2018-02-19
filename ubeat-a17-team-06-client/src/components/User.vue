<template>
  <div>
    <spinner v-if="loading"></spinner>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div class="content" v-if="user">
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout column align-center>
            <avatar class="user__avatar" :size="200" :email="user.email"></avatar>
            <h4 class="user__name">{{ user.name }}</h4>
            <h5 class="user__email">{{ user.email }}</h5>
            <div v-if="loggedInUserId !== user.id">
              <v-btn v-if="isFollowing(followers, user.email)" type="submit" @click="unfollow(user.id)">
                Unfollow
              </v-btn>
              <v-btn v-else type="submit" @click="follow(user.id)">
                Follow
              </v-btn>
            </div>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <following :following="user.following">
            <template slot="empty">
              {{ emptyFollowingMessage }}
            </template>
          </following>
          <playlists :playlists="playlists">
            <template slot="empty">
              {{ emptyPlaylistMessage }}
            </template>
          </playlists>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import {getUser, getUserPlaylists} from '@/services/UserService'
import {capitalize} from 'lodash'
import Spinner from '@/components/Spinner'
import {mapGetters, mapActions} from 'vuex'
import Playlists from '@/components/Playlists'
import Following from '@/components/Following'
import Avatar from '@/components/Avatar'

export default {
  name: 'user',
  components: {
    Spinner,
    Playlists,
    Following,
    Avatar
  },
  data () {
    return {
      loading: false,
      error: null,
      user: null,
      playlists: []
    }
  },
  methods: {
    ...mapActions('user', [
      'follow',
      'unfollow'
    ]),
    async fetchData () {
      this.loading = true
      this.error = null
      this.user = null
      this.playlists = []

      try {
        this.user = await getUser(this.$route.params.id)
        this.playlists = await getUserPlaylists(this.$route.params.id)
      } catch (err) {
        this.error = err.message
      }

      this.loading = false
    },
    isFollowing (followers, email) {
      if (followers && followers.length > 0) {
        return followers.find(u => u.email === email)
      }
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    ...mapGetters('user', [
      'followers',
      'loggedInUserId'
    ]),
    emptyFollowingMessage () {
      if (this.loggedInUserId !== this.user.id) {
        return capitalize(this.user.name) + ' is not following anyone'
      } else {
        return 'You are not following anyone'
      }
    },
    emptyPlaylistMessage () {
      if (this.loggedInUserId !== this.user.id) {
        return capitalize(this.user.name) + ' has no playlist'
      } else {
        return 'You have no playlist'
      }
    }
  },
  watch: {
    '$route': 'fetchData'
  }
}
</script>

<style scoped lang="scss">
  #followers {
    margin-top: 20px;
  }
  .user {
    &__avatar {
      margin-bottom: 16px;
    }
  }
</style>
