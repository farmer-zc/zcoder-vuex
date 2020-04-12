## vue-router 路由相关（常规用法，更多见官网）
## 模块化机制编程
```
// ------------路由表中----------------
    1. 定义路由组件，引入vue和VueRouter（import 进来）
        import Vue from "vue";
        import VueRouter from "vue-router";
        import Foo from "./view/foo.vue";
        import Bar from "./view/Bar.vue";

    2. 定义路由表
        const routes = [
            { path: '/foo', component: Foo },
            { path: '/bar', component: Bar }
        ]

    3. 创建路由实例
        const router = new VueRouter({
            reoutes
        })

    4.  调用Vue.use(router)
        Vue.use(router);
// -------------入口文件中--------------------
    5.  挂载根实例
    new Vue({
        router, // 挂载和床架
        render: h => h(App)
    }).$mount("#app");
```
---
## 路由的使用方式
### 1. 声明式（HTML 中使用）
* 使用 router-link 组件来导航, 通过传入的to属性指定连接，
* `<router-link>` 会被渲染成一个 `<a>` 标签 
```
    <!-- 下面是跳转到 /page1 页面 -->
    <router-link to="/page1">Go to page1</router-link>
    <!-- 命名路由 -->
    <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

### 2. 编程式路由 `router.push(location, onComplete?, onAbort?)`
<font color=red>在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push</font><br>

 ### $route 和 $router 的区别

<font color=red>$route   指向当前跳转的路由对象,是一个包含当前的路由信息的对象</font>
* path            ;当前路由的路劲,总是解析为绝对路劲        ;例如:/foo/bar
* params        ;对象类型,包含了动态片段和全匹配片段，如果没有路由参数就是一个空对象
* query            ;对象类型，表示URL查询参数，对于/foo/user=1来说，$route.query.user等于1，如果没有查询参数，则是个空对象
* hash            ;当前路由的hash值(带#),如果没有hash值，则为空字符串
* fullPath        ;解析完成后的URL,包含查询参数和hash的完整路劲
* matched        ;一个数组，包含当前路由的所有嵌套路劲片段的路由记录，也就是所有父路由对象都在这个数组里面，<router-view/>组件会用到这个属性
* name            ;当前路由的名称            ;和命名别名有关
* redirectedFrom    ;重定向来源的路由的名字        ;和重定向及别名有关。
* meta            ;meta值


<font color=red>$router  指向当前的VueRouter实例</font>
* 该方法的多种形式
```
    // 字符串 
    router.push('home')

    // 对象
    router.push({ path: 'home' })

    // 带查询参数，变成 /register?plan=private
    // 可通过 this.$route.query.plan 获取
    router.push({ path: 'register', query: { plan: 'private' }})

    // 命名的路由  对应路由： /user/:userId
    // 可通过 this.$route.params.userId 获取
    router.push({ name: 'user', params: { userId: '123' }})
```

### 3. 路由出口
```
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
    <!-- 命名视图 -->
    <router-view  name="user"></router-view>
```
---

## 路由表的定义方式

const router = new VueRouter({
    // 路由的样式 默认是 hash 模式 有#号
    // hash： http://ip：port/#/index
    // history: http://ip：port/index
    mode: 'history', 
    
    //路由表
    routes：[
        {
            path: "/login", 
            name: "login", 
            component: () => import("../views/login/index.vue")  // 这是按需引入的加载方式
            beforeEnter: (to, from, next) => {
                // 路由跳转前做处理
            }
        },
        // 命名路由
        {
            path: '/user/:userId',
            components: {
                default: index,
                user: Bar,
            }
        }
        // 嵌套路由
        {
            path: "/home", 
            name: "home", 
            redirect: '/home/index',  // 路由重定向
            children： [{       // 子路由    
                path: 'index', //  此处要么不加 / 要么就是全路径  /home/index
                component: () => import("../views/home/index.vue"),
                meta: { title: '首页'} // 给页面添加 meta 标签属性
            }, {
                path: '/home/page'
                component: () => import("../views/home/page.vue")
            }]
        },
        // 动态路由
        {
            path: "/detail/:id", 
            name: "detail", 
            component: () => import("../views/detail/index.vue")  // 这是按需引入的加载方式
        }，
        { 
            path: '*',   // 匹配所有的路由，当路由页面不存在时跳转
            component: () => import("../views/notfound/index.vue"),
            name:'404页面' 
        }
    ]
})
---
## 路由守卫

###  全局前置守卫 beforeEach(to, from, next)
* to: [Route]: 即将要进入的目标  to.path 就是即将要进入的页面的路由
* from： [Route]: 当前正要离开的路由  from.path 就是即将要离开的页面的路由
* next： [function]: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
+ next()：不带参数直接进入下一步
+ next('/index'): 中断原有的导航，进入index
+ next({path: '/index'}): 效果同上，可以传入任意 router.push 的参数值
+ next(false): 终端当前导航
+ next(error): 传入error的实例，导航会被终止且该错误会被传递给 router.onError() 注册过的回调
```
    router.beforeEach(to, from, next) {
        if (to.path !== '/login') {
            next('/login')
        } else {
            next();
        }
    }
```

###  前全局后置守卫 afterEach(to, from)
```
    router.afterEach(to, from) {
        // ....
    }
```

### 组件内守卫
```
    const Comp = {
        template: `...`,
        beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
        },
        beforeRouteUpdate (to, from, next) {
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
        },
        beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
        }
    }
```

## 完整的导航解析流程
1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。