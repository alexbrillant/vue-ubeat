<template lang="html">
  <p class="form-note">
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'form-note'
}
</script>

<style lang="scss">
$spacing: 16px;

.form-note {
  padding: $spacing ($spacing / 2);
}
</style>
