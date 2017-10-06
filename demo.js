import persistentState from './'
import Vue from 'vue/dist/vue.esm.js'

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
<div>
  <input v-model="str"><br>
  <input v-model="obj.a"><br>
  {{ number }} <button @click="number++">Inc</button><br>
  State is persisted, try refreshing the page!
</div>
`

new Vue({
  el: '#app',
  template
})
