<template lang="html">
  <div class="login">
    <h2>Login</h2>
    <v-form @submit.prevent="handleSubmit" v-model="valid" ref="form">
      <v-text-field
        type="email"
        label="Email"
        v-model="email"
        :rules="rules.email"
        required>
      </v-text-field>
      <v-text-field
        type="password"
        label="Password"
        v-model="password"
        :rules="rules.password"
        required>
      </v-text-field>
      <v-btn
        type="submit"
        @click="handleSubmit">
        Login
      </v-btn>
    </v-form>
    <form-note>
      Don't have an account yet? <router-link :to="{ name: 'SignUp' }">Signup</router-link>.
    </form-note>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { isEmpty } from 'lodash'
import FormNote from '@/components/FormNote'

export default {
  name: 'login',
  components: {
    FormNote
  },
  data () {
    return {
      email: '',
      password: '',
      error: null,
      valid: false,
      rules: {
        email: [
          (value) => isEmpty(value) ? 'Email is required' : true
        ],
        password: [
          (value) => isEmpty(value) ? 'Password is required' : true
        ]
      }
    }
  },
  created () {
    if (this.isLoggedIn()) {
      this.$router.push({
        name: 'Home'
      })
    }
  },
  computed: {
    ...mapGetters('user', [
      'hasStatus'
    ])
  },
  methods: {
    ...mapGetters([
      'isLoggedIn'
    ]),
    ...mapActions('user', [
      'login'
    ]),
    async handleSubmit () {
      if (!this.$refs.form.validate()) return
      await this.login({ email: this.email, password: this.password })
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>

<style lang="scss">
.login {
}
</style>
