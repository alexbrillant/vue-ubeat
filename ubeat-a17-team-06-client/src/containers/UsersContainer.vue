<template lang="html">
  <div class="users-container">
    <v-container>
      <v-layout row wrap>
        <v-flex class="center-left-align">
          <div class="playlit-title">Users</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs4>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field placeholder="Search an user" v-model="query"></v-text-field>
          </v-form>
        </v-flex>
      </v-layout>
      <spinner v-if="isFetching"></spinner>
      <users v-if="displayCollection" :users="collection" @toggleUserFollow="refreshUsers">
        <template slot="empty">
          No alnum found for '{{ query }}'
        </template>
      </users>
    </v-container>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { isEmpty } from 'lodash'
import Users from '../components/Users'
import Spinner from '../components/Spinner'
import Status from '@/utils/Status'

export default {
  name: 'users-container',
  components: {
    Users,
    Spinner
  },
  data () {
    return {
      query: '',
      status: Status.IDLE,
      collection: []
    }
  },
  computed: {
    ...mapGetters('user', [
      'followers'
    ]),
    hasCollection () {
      return !isEmpty(this.collection)
    },
    hasQuery () {
      return !isEmpty(this.query.trim())
    },
    displayCollection () {
      return this.hasCollection && this.status === Status.SUCCEEDED
    },
    isFetching () {
      return this.status === Status.FETCHING
    }
  },
  methods: {
    ...mapMutations('flash', [
      'resetFlash'
    ]),
    ...mapActions('flash', [
      'flashError'
    ]),
    refreshUsers: async function () {
      try {
        let results = await UserService.search(this.query)
        this.collection = this.mapResults(results)
        this.status = Status.SUCCEEDED
      } catch (error) {
        this.flashError({ message: error.message })
        this.status = Status.FAILED
      }
    },
    handleSubmit: async function (event) {
      try {
        this.collection = []
        this.status = Status.FETCHING
        this.resetFlash()
        let results = await UserService.search(this.query)
        this.collection = this.mapResults(results)
        this.status = Status.SUCCEEDED
      } catch (error) {
        this.flashError({ message: error.message })
        this.status = Status.FAILED
      }
    },
    isFollowing (followers, email) {
      if (followers && followers.length > 0) {
        return followers.find(u => u.email === email)
      }
    },
    mapResults (userResults) {
      return userResults.map(user => ({
        ...user,
        button: this.isFollowing(this.followers, user.email) ? 'favorite' : 'favorite_border'
      }))
    }
  }
}
</script>

<style lang="scss">
</style>
