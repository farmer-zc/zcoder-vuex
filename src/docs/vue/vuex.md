## vuex 状态管理相关 （具体看登录模块）


### 核心概念
## 1. state:  数据源 与 Vue实例中的 data 遵循相同的规则
* 并不需要吧所有的状态都放入Vuex（state），有些状态属于单个组件，最好还是作为组件局部的状态（data）
```
    // 组件中的获取方式 this.$store.state.message
    const store = new Vuex.Store({
        state: {
            message: '数据',
            todos: [
                { id: 1, text: '...', done: true },
                { id: 2, text: '...', done: false }
            ]
        },
    })
```
## 2. getter: store的计算属性， 与Vue实例中的computed 相似
* 返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
```
    // 组件中的获取方式 this.$store.state.doneTodos
    const store = new Vuex.Store({
        state: {
            todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
            ]
        },
        getters: {
            doneTodos: state => {
                return state.todos.filter(todo => todo.done)
            }
        }
    })
```
## 3. mutation： 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
* 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
* 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
```
    // 提交方式  store.commit('increment', 10)
    const store = new Vuex.Store({
        state: {
            count: 1
        },
        mutations: {
            increment (state, payload) {  // payload 传参最好是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：
                // 变更状态
                state.count += payload
            }
        }
    })
```
## 4. action: 接受一个与 store 实例具有相同方法和属性的 context 对象: { commit, state, getter}
* Action 提交的是 mutation，而不是直接变更状态。
* Action 可以包含任意异步操作。
```
    const store = new Vuex.Store({
        state: {
            count: 0
        },
        mutations: {
            increment (state) {
            state.count++
            }
        },
        actions: {
            increment (context) {
                context.commit('increment')
            },
            // 调用异步函数
            asyncIncrement ({commit, state, getter}) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        commit(commit)
                        resolve()
                    }, 1000)
                })
            }
        }
    })
```
## 5. module： store的模块分割，就是命名空间
* 可以modules中具名
* 也可以在模块中添加namespaced
```
const moduleA = {
  state: {
      count： 1
  },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a.count // -> moduleA 的状态 count
store.state.b // -> moduleB 的状态
```