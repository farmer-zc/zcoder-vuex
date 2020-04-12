## 1. filter 过滤器
### 定义方式：
#### 组件内部定义
```
new Vue({
    // 首字母大写过滤器
    capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
})
```
#### 全局定义过滤器
```
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

### 使用方式
1. 在双花括号中：`{{ message | capitalize }}`
2. 在v-bind中: `<div v-bind:id="rawId | formatId"></div>`
3. 过滤器串联：`{{ message | filterA | filterB }}`
4. 接收参数：`{{ message | filterA(arg1, arg2) }}`

## 2. 计算属性
#### 当你想要在模板中多次引用需要经过复杂逻辑计算的属性，你都应当使用计算属性。
* 我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。
```
<div>{{reversedMessage}}</div>   // olleH

new Vue({
    data {
        return {
            message: 'Hello'
        }
    },
    computed: {
        reversedMessage: function() {
            return this.message.split('').reverse().join('')
        }
    }
})
```
## 3. 侦听器 watch
* 不能使用箭头函数。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例
```
new Vue({
    data () {
        return {
            val: 1,
            obj: {
                name: 'vue'
            }
        }
    },
    watch: {
        // 当 val 发生改变，这个函数就会运行
        val: function(newVal, oldVal) {
            // 逻辑
            alert('val 变化了')
        },
        // 深层监听
        obj: {
            handler: function (val, oldVal) { /* ... */ },
            deep: true
        },
        // 你可以传入回调数组，它们会被逐一调用
        val: [
            'handle1',
            function handle2 (val, oldVal) { /* ... */ },
            {
                handler: function handle3 (val, oldVal) { /* ... */ },
            }
        ],
        // 监听obj.name
        'obj.name': function (val, oldVal) { /* ... */ }
    }
})
```
