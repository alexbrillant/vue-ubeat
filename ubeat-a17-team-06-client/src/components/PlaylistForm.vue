<template>
  <div>
    <v-container>
      <div class="playlit-title">{{ action }} playlist</div>
    </v-container>

    <v-container>
      <spinner v-if="hasStatus('fetch', 'fetching')"></spinner>

      <template v-if="hasStatus('fetch', 'succeeded') || action === 'Create'">
        <v-form @submit.prevent="handleSubmit" v-model="valid" ref="form">
          <v-text-field
            autofocus
            label="Name"
            v-model="name"
            :rules="nameRules"
            required>
        </v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          class="ml-0"
          :disabled="hasStatus('save', 'saving')"
          :loading="hasStatus('save', 'saving')"
          @click="handleSubmit">
          {{ action }}
        </v-btn>
      </v-form>
      </template>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import { isEmpty } from 'lodash'
import Spinner from '@/components/Spinner'

export default {
  name: 'playlist-form',
  components: {
    Spinner
  },
  props: {
    playlistId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      valid: false,
      name: '',
      nameRules: [
        (value) => isEmpty(value) ? 'Name is required' : true
      ]
    }
  },
  computed: {
    ...mapState('playlist', [
      'error'
    ]),
    ...mapGetters('playlist', [
      'hasStatus'
    ]),
    hasId () {
      return !isEmpty(this.playlistId)
    },
    action () {
      return this.hasId ? 'Update' : 'Create'
    }
  },
  methods: {
    ...mapMutations('playlist', [
      'reset'
    ]),
    ...mapActions('playlist', [
      'savePlaylist',
      'fetchPlaylistIfNeeded'
    ]),
    handleSubmit () {
      if (!this.$refs.form.validate()) return
      this.savePlaylist({ name: this.name })
        .then((playlist) => {
          if (isEmpty(playlist)) return
          this.$router.push({
            name: 'Playlist',
            params: { id: playlist.id }
          })
        })
    },
    initialize () {
      if (isEmpty(this.playlistId)) {
        this.reset()
      } else {
        this.fetchPlaylistIfNeeded(this.playlistId)
          .then(playlist => {
            if (isEmpty(playlist)) return
            this.name = playlist.name
          })
      }
    }
  },
  created () {
    this.initialize()
  },
  watch: {
    '$route': 'initialize'
  }
}
</script>

<style>
</style>
