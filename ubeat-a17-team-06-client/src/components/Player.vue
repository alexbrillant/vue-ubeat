<template>
  <audio ref="audio" controls></audio>
</template>

<style scoped>
audio {
  display: none;
}
</style>

<script>
export default {
  name: 'player',
  methods: {
    play (track) {
      const audio = this.$refs.audio
      if (audio.src !== track.previewUrl) {
        audio.pause()
        audio.src = track.previewUrl
        audio.currentTime = 0
      }
      audio.play()
    },
    pause () {
      this.$refs.audio.pause()
    }
  }
}
</script>
