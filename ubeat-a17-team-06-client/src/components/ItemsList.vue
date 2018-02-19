<template lang="html">
  <v-layout row wrap>
    <items-list-item
      v-for="item in sortedItems"
      :key="item.id"
      :item="item">
    </items-list-item>
    <v-flex class="items-list-item" v-if="items.length == 0">
      Nothing found.
    </v-flex>
  </v-layout>
</template>

<script>
import ItemsListItem from '@/components/ItemsListItem'

export default {
  name: 'items-list',
  components: {
    ItemsListItem
  },
  props: {
    items: {
      type: Array
    }
  },
  computed: {
    sortedItems () {
      return this.items.sort((a, b) => {
        if (a.priceInCents < b.priceInCents) return -1
        if (a.priceInCents > b.priceInCents) return 1
        if (a.title < b.title) return -1
        if (a.title > b.title) return 1
        return 0
      })
    }
  }
}
</script>

<style lang="scss">
</style>
