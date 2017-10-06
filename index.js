const store = require('store')
const copy = require('deep-copy')

exports.install = function (Vue, initialState) {
  // get state from localStorage
  let state = {}
  for (let key in initialState) {
    let val = store.get(key) || initialState[key]
    // initial population to localStorage
    store.set(key, val)
    state[key] = val
  }

  Vue.mixin({
    data: function () {
      // make sure nested objects in initialState are not mutated
      return copy(state)
    },
    watch: createWatchers(state)
  })
}

function createWatchers (state) {
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
