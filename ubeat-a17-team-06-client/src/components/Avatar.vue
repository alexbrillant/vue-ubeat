<template lang="html">
  <v-avatar :size="size">
    <img :src="src" alt="User avatar">
  </v-avatar>
</template>

<script>
import md5 from 'md5'

export default {
  name: 'avatar',
  props: {
    email: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 200
    },
    defaultImage: {
      type: String,
      default: 'identicon'
    }
  },
  computed: {
    src () {
      const { email, size, defaultImage } = this
      const hash = md5(email)
      return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultImage}`
    }
  }
}
</script>
