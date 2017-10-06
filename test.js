const persistentState = require('./')
const Vue = require('vue')
const assert = require('assert')
global.localStorage = require('localStorage')
const store = require('store')

let initialState = {
  store: {
    str: '',
    number: 1,
    arr: [],
    obj: {
      a: '1',
      b: 2
    }
  }
}

Vue.use(persistentState, initialState)

let vm = new Vue({})

let tests = [
  {
    test: function () {
      assert.deepEqual(initialState.store, vm.store, 'state in vm should reflect the initial state given')
    }
  }, {
    before: function () {
      vm.store.str = 'asdf'
    },
    test: function () {
      assert.equal(store.get('store').str, 'asdf', 'state should persist')
    }
  }, {
    before: function () {
      vm.store.obj.a = 33
    },
    test: function () {
      assert.equal(store.get('store').obj.a, 33, 'state should persist deeply')
    }
  }
]

async function runTests () {
  for (let test of tests) {
    if (typeof test.before === 'function') {
      test.before()
    }
    await vm.$nextTick(test.test)
  }
}

runTests()
