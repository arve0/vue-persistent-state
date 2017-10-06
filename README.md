# Vue persistent state
This plugin lets you persist state in Vue through localStorage. Nice for
small projects and prototyping, when you do not need vuex.

## Install

```
npm install vue-persistent-state
```

## Usage
```js
import persistentState from 'vue-persistent-state'
import Vue from 'vue'

let initialState = {
  str: 'persist me',
  number: 42,
  arr: [],
  obj: {
    a: 'nested object',
    b: 2
  }
}

Vue.use(persistentState, initialState)

let template = `
<input v-model="str"><br>
<input v-model="obj.a">
{{ number }} <button @click="number++">Inc</button>
State is persisted when refreshing page.
`

let vm = new Vue({
  el: '#app',
  template
})
```

[Demo](https://arve0.github.io/vue-persistent-state)

## License
ISC
