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
  },
  falsey: true,
  both: 0,
}

// `falsey` should not be overridden by initialState
store.set('falsey', false)

Vue.use(persistentState, initialState)

let vm = new Vue({})
let vm2 = new Vue({})

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
  }, {
    before: function () {
      vm.store.arr.push(42)
    },
    test: function () {
      assert.equal(store.get('store').arr[0], 42, 'should work with array.push')
    }
  }, {
    test: function () {
      assert.equal(store.get('falsey'), false, 'should store falsey values')
    }
  }, {
    test: function () {
      vm.both = 1234
      assert.equal(vm2.both, 1234, 'should update state in all Vue instances')
    }
  },
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
