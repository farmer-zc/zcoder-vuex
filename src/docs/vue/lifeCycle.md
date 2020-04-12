## 生命周期
* **beforeCreated**: （实例化创建之前）数据（data）和dom都没有
    >data: undefined | $el: undefined
* **created**: （实例化创建之后）数据（data）有了，但是dom没有
    >data: 可获取 | $el: undefined  
    ><font color='red'>可以做一些不需要依赖dom的ajax请求</font>
* **beforeMount**: （实例在挂载之前）数据（data）有了，但是dom是虚拟dom
    >data: 可获取 | $el: 虚拟的（不可获取）
* **mounted**: （实例在挂载之后）数据（data）有了，真实dom也有了
    >data: xxx | $el: 真实的（可获取）  
    ><font color='red'>可以做ajax请求，dom能获取到（请求到数据后可能会被二次渲染）</font>
* **beforeUpdate**： (组件更新之前)
* **updated** ： (组件更新之后)
* **beforeDestory** ：（组件销毁之前）
* **destroyed** ：（组件销毁之后）

```
new Vue({
    data () {
        return {
            count: 1
        }
    },
    beforeCreated () {
        // 实例创建之前，data没有，dom也没有
        console.log(this.$data); // undefined
        console.log(this.$el); // undefined
    },
    created () {
        // 实例创建之后，data有了，dom没有
        console.log(this.$data); // [object,object]
        console.log(this.$el); // undefined
    },
    beforeMount() {
        // 实例在挂载之前，data有了，dom有了但是是虚拟的
        console.log(this.$data); // {count:1}
        console.log(this.$el); // [object, HTMLDivElement]
    },
    mounted() {
        // 实例在挂载之后，data有了，真实dom也有了
        console.log(this.$data); // [object,object]
        console.log(this.$el); // [object,HTMLDivElement]
    },
    beforeUpdate () {
        // 组件更新之前
    },
    updated () {
        //组件更新之后
    },
    beforeDestroy () {
        //组件卸载之前
    },
    destroy () {
        //组件卸载之后
    }
})
```
