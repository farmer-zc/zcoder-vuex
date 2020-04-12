## 属性绑定  v-bind:style  (简写 :style)
```
// 绑定class 当isActive 为true的时候，给元素添加class active 
<div v-bind:class={'active': isActive}></div>
<div :class={'active': isActive}></div>
// 可以绑定多个
<div :class={'active': isActive , 'last-child': isLastChild}></div>
// 可以绑定对象写法
<div :class=“classObject></div>

data: {
    isActive: true,
    error: null
}
// 数组写法，可以使用三元表达式
<div :class="[isActive ? "activeClass": '', "errorClass"]"></div>
```

## 样式绑定  v-bind:style  (简写 :style)
```
<div v-bind:style="{color: boxColor, fontSize: fontSize + 'px'}"></div>
data: {
    boxColor: 'red',
    fontSize: 30
}

// 直接绑定一个对象
<div :style="styleObj"></div>
data: {
    styleObj: {
        boxColor: 'red',
        fontSize: 30
    }
}

//数组语法可以将多个样式对象应用到同一个元素上：

<div v-bind:style="[baseStyles, overridingStyles]"></div>
data: {
    baseStyles: {
        boxColor: 'red',
        fontSize: 30
    },
    overridingStyles: {
        padding: 0
    }
}
```

## 事件监听 v-on:click （简写 @click）
```
// 直接写方法体
<button v-on:click="counter += 1">Add 1</button>
// 调用方法 括号可有可无
<button v-on:click="add">Add 1</button>
// 带参数
<button v-on:click="add(1)">Add 1</button>
```
### 事件修饰符 @click.stop = "xxx"
1. .stop        阻止事件冒泡
2. .prevent     取消默认行为
3. .capture     事件捕获
4. .self        当前元素自身触发
5. .once        只会触发一次
6. .passive     立即触发scroll行为
> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。