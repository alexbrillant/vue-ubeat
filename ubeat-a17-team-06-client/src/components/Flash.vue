<script>
const levels = ['info', 'warning', 'error', 'success']

export default {
  name: 'Flash',
  props: {
    level: {
      type: String,
      required: true,
      validator: value => levels.includes(value)
    },
    message: {
      type: String,
      required: true
    }
  },
  render (createElement) {
    return createElement('div', { attrs: { class: 'flash' } }, [
      levels.map(level => {
        return createElement('v-alert', {
          props: {
            value: this.level === level,
            [level]: true
          }
        }, this.message)
      })
    ])
  }
}
</script>

<style>
  .flash {
    position: fixed;
    bottom: 32px;
    min-width: 300px;
    z-index: 1;
  }
</style>
