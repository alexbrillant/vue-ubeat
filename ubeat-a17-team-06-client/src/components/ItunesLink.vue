<template>
    <div>
        <a v-bind:href="href" class="itunes" style=""></a>
    </div>
</template>

<style scoped>
.itunes {
    display: inline-block;
    overflow: hidden;
    background: url(//linkmaker.itunes.apple.com/assets/shared/badges/fr-fr/itunes-lrg.svg) no-repeat;
    width: 110px;
    height: 40px;
    background-size: contain;
}

div {
    margin-bottom: 16px;
}

</style>

<script>
export default {
  name: 'itunes-link',
  props: {
    href: {
      type: String
    }
  }
}
</script>
