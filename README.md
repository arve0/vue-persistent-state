# Vue persistent state
This plugin lets you persist state in Vue through `localStorage`. Nice for prototyping and small projects, when vuex is too much.

## Install

```
npm install vue-persistent-state
```

## Usage
```js
import Vue from 'vue'
import persistentState from 'vue-persistent-state'

let initialState = {
  str: 'persist me',
  obj: {
    a: 'nested object'
  },
  number: 42,
  arr: ['item 0']
}

Vue.use(persistentState, initialState)
// initialState is injected as data in all vue instances
// any changes to state will be stored in localStorage
```

This gives you a global mutable state, available in all Vue instances. Any changes to state will be stored in `localStorage`. If the page is refreshed, `initialState` is merged with state from `localStorage`.

You can mix this with local state in components, `data` will be merged and local state takes preference if there are any name crashes. To avoid name crashes you might want to use a namespace:

```js
let initialState = {
  persisted: {
    str: 'persisted state under namespace `persisted`'
  }
}

Vue.use(persistentState, initialState)
```

If you need access to `localStorage`, `$store` is available. Example:

```js
new Vue({
  methods: {
    reset: function () {
      // remove all state from localStorage
      // NOTE: does not alter state
      this.$store.clearAll()
      // if you need to alter state too, this might be better:
      this.persistedProperty = []
    }
  }
})
```

[store](https://www.npmjs.com/package/store) has the methods `set`, `get`, `remove`, `clearAll` and `each`. For more, see [store API](https://www.npmjs.com/package/store#api).

## Full example and demo
[Demo](https://arve0.github.io/vue-persistent-state)

```js
import Vue from 'vue/dist/vue.esm.js'
import persistentState from 'vue-persistent-state'

let initialState = {
  str: 'persist me',
  obj: {
    a: 'nested object'
  },
  number: 42,
  arr: ['item 0']
}

// inject initialState as data
Vue.use(persistentState, initialState)

// works with components too
Vue.component('a-component', {
  template: `<span>Array contents: {{arr.join(', ')}}</span>`
})

new Vue({
  el: '#app',
  template: `
    <div>
      <input v-model="str">
      <button @click="arr.push(str)">Add to array</button><br>
      <input v-model="obj.a"><br>
      {{ number }} <button @click="number++">Inc</button><br>
      <a-component/><br>
      <button @click="reload">Reset</button><br><br>
      State is persisted, try refreshing the page!<br>
    </div>`,
  methods: {
    reload: function () {
      // remove all persisted state
      this.$store.clearAll()
      // reload page
      window.location.reload()
    }
  }
})
```

## License
ISC
