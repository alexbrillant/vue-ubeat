<template lang="html">
  <v-flex xs6 class="items-list-item">
    <v-card color="blue-grey darken-2" class="white--text" @click.prevent="handleClick">
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs5>
            <v-card-media
            :src="item.imageUrl"
            height="125px"
            contain>
          </v-card-media>
          </v-flex>
          <v-flex xs7>
            <div>
              <b>{{ item.title }}</b>
              <div>{{ item.artist }}</div>
              <div>{{ format }}</div>
              <div class="items-list-item__price">
                <div class="items-list-item__price__amount">
                  {{ price }}
                </div>
                <div class="items-list-item__price__store">
                  {{item.store}}
                </div>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import { round, padEnd } from 'lodash'

export default {
  name: 'items-list-item',
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    price: function () {
      let price = round(this.item.priceInCents / 100, 2).toString()
      let matches = price.match(/(\d*)\.?(\d*)?/)
      if (matches) {
        return `$${matches[1]}.${padEnd(matches[2], 2, '0')} ${this.item.currencyCode}`
      }
    },
    format: function () {
      return this.item.format.join(', ')
    }
  },
  methods: {
    handleClick () {
      window.open(this.item.url)
    }
  }
}
</script>

<style lang="scss">
.items-list-item {
  cursor: pointer;
  &__price {

  }
  &__price__amount {

  }
  &__price__store {

  }
}
</style>
