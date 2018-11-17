const store = require('store')
const copy = require('deep-copy')

let globalState  // avoid garbage collection

exports.install = function (Vue, initialState) {
  // get state from localStorage
  let state = {}
  for (let key in initialState) {
    let val = store.get(key, initialState[key])
    // initial population to localStorage
    store.set(key, val)
    state[key] = val
  }
  // make sure nested objects in initialState are not mutated
  state = copy(state)

  // watch for changes
  globalState = new Vue({
    data: state,
    watch: createWatchConfig(state),
  })

  Vue.mixin({
    data: function () {
      return state
    },
  })
  // make store API available through $store
  Vue.prototype.$store = store
}

function createWatchConfig (state) {
  let watch = {}
  for (let key in state) {
    watch[key] = {
      deep: true,
      handler: function (newValue, oldValue) {
        store.set(key, newValue)
      }
    }
  }
  return watch
}
