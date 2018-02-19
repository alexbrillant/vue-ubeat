<template>
  <div>
    <spinner v-if="isLoading"></spinner>
    <div v-else class="logout">
      <p>You have been correctly disconnected</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Spinner from '@/components/Spinner'
import Status from '@/utils/Status'

export default {
  name: 'logout',
  components: {
    Spinner
  },
  created () {
    this.logoutAndRedirectToLogin()
  },
  computed: {
    ...mapGetters('user', [
      'hasStatus'
    ]),
    isLoading () {
      return this.hasStatus('logout', Status.IDLE)
    }
  },
  methods: {
    ...mapActions('user', [
      'logout'
    ]),
    async logoutAndRedirectToLogin () {
      await this.logout()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
