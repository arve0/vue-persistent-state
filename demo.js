import persistentState from './'
import Vue from 'vue/dist/vue.esm.js'

let initialState = {
  str: 'persist me',
  obj: {
    a: 'nested object'
  },
  number: 42,
  arr: ['item 0']
}

Vue.use(persistentState, initialState)

// works with components too
Vue.component('a-component', {
  template: `<span>Array contents: {{arr.join(', ')}}</span>`
})

new Vue({
  // initialState is injected as data
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
      // reloads page
      window.location.reload()
    }
  }
})
