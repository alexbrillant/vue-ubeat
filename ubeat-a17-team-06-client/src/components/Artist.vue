<template>
  <div>
      <h1>{{artist.artistName}}</h1>
      <h5>{{artist.primaryGenreName}}</h5>
      <itunes-link :href="artist.artistLinkUrl"></itunes-link>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}

h1 {
  margin-bottom: 0;
}
</style>

<script>
import ItunesLink from '@/components/ItunesLink'

export default {
  name: 'artist',
  components: {
    ItunesLink
  },
  props: {
    artist: Object
  }
}
</script>
