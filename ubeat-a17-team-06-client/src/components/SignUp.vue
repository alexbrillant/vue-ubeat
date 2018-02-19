<template lang="html">
  <div class="signup">
    <div class="content">
      <v-layout row>
        <v-flex xs12 sm6 md4>
          <v-layout column>
            <h2>Sign up</h2>
            <v-form @submit.prevent="handleSubmit" v-model="valid" ref="form">
              <v-text-field
                autofocus
                type="text"
                label="Name"
                v-model="name"
                :rules="rules.name"
                required>
              </v-text-field>
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
              <v-text-field
                type="password"
                label="Password confirmation"
                v-model="passwordConfirmation"
                :rules="rules.passwordConfirmation"
                required>
              </v-text-field>
            <v-btn
              type="submit"
              :disabled="hasStatus('create', 'creating')"
              :loading="hasStatus('create', 'creating')"
              @click="handleSubmit">
              Create account
            </v-btn>
          </v-form>
          <form-note>
            Already have an account? <router-link :to="{ name: 'Login' }">Login</router-link>.
          </form-note>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { isEmpty, pick } from 'lodash'
import Spinner from '@/components/Spinner'
import FormNote from '@/components/FormNote'
import { isEmail } from '@/utils/EmailUtil'

export default {
  name: 'signup',
  components: {
    Spinner,
    FormNote
  },
  data () {
    return {
      error: null,
      loading: false,
      valid: false,
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      rules: {
        name: [
          (value) => isEmpty(value) ? 'Name is required' : true
        ],
        email: [
          (value) => isEmpty(value) ? 'Email is required' : true,
          (value) => !isEmail(value) ? 'Email is invalid' : true
        ],
        password: [
          (value) => isEmpty(value) ? 'Password is required' : true,
          (value) => value.length <= 7 ? 'Password length must be greater than 7' : true
        ],
        passwordConfirmation: [
          (value) => isEmpty(value) ? 'Password confirmation is required' : true,
          (value) => value !== this.password ? 'Password confirmation does not match' : true
        ]
      }
    }
  },
  computed: {
    ...mapGetters('user', [
      'hasStatus'
    ])
  },
  methods: {
    ...mapActions('user', [
      'createUser'
    ]),
    async handleSubmit () {
      if (!this.$refs.form.validate()) return
      const attributes = pick(this, ['name', 'email', 'password'])
      this.createUser(attributes)
        .then(() => {
          this.$router.push({
            name: 'Login'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.signup {

}
</style>
