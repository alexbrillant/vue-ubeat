<template lang="html">
  <div class="albums-container">
    <v-container>
      <v-layout row wrap>
        <v-flex class="center-left-align">
          <div class="playlit-title">Albums</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs4>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field placeholder="Search an album" v-model="query"></v-text-field>
          </v-form>
        </v-flex>
      </v-layout>
      <spinner v-if="isFetching"></spinner>
      <albums v-if="displayCollection" :albums="collection">
        <template slot="empty">
          No album found for '{{ query }}'
        </template>
      </albums>
    </v-container>
  </div>
</template>

<script>
import AlbumService from '@/services/AlbumService'
import { mapActions, mapMutations } from 'vuex'
import { isEmpty } from 'lodash'
import Albums from '../components/Albums'
import Spinner from '../components/Spinner'
import Status from '@/utils/Status'

export default {
  name: 'albums-container',
  components: {
    Albums,
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
    handleSubmit: async function (event) {
      try {
        this.collection = []
        this.status = Status.FETCHING
        this.resetFlash()
        this.collection = await AlbumService.search(this.query)
        this.status = Status.SUCCEEDED
      } catch (error) {
        this.flashError({ message: error.message })
        this.status = Status.FAILED
      }
    }
  }
}
</script>

<style lang="scss">
</style>
