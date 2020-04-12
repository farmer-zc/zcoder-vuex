## 指令相关
**1. v-show：** 控制元素的显示隐藏，（实质是切换元素的diplay css属性） **示例：v-show="boolen"**  

**2. v-if：** 根据表达式的值来有条件的渲染元素，控制元素的销毁和重建    **示例：v-if="boolen"**  
>**2.1 v-else-if** 同上，但是前面兄弟元素需要 v-if 或者 v-else-if     **示例：v-else-if="boolen"**  
>**2.2 v-else** 同上，但是不需要表达式                                **示例：v-else**  

**3. v-model** 在表单控件或者组件上创建双向绑定    **示例：v-model = "val"**  
* .lazy - 取代 input 监听 change 事件    **示例：v-model.lazy = "val"**  
* .number - 输入字符串转为有效的数字    **示例：v-model.number = "val"**  
* .trim - 输入首尾空格过滤    **示例：v-model.trim = "val"**  

**4. v-for** 基于数据，循环渲染元素  
* item: 当前遍历到的对象；  
* index：当前对象的索引；  
* key：给每个item添加标识，为了vue精准的追踪到每一个元素，高效的更新虚拟DOM，
```
<div v-for="(item,index) in items" :key='index'>
  {{ item.text }}
</div>
```

**5. v-bind** 动态地绑定一个或多个特性，或一个组件 prop 到表达式。 **可以缩写为 :(冒号) :class=" "**

**6. v-on** 绑定事件 **缩写为@ 示例 @click=" "**

**7. v-text** 更新元素的 textContent 或者用{{ }}也是一样

**8. v-html** 更新元素的 innerHTML

**9. v-clock** 这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时不会显示，直到编译结束。

**10. v-once** 只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能

**11. v-pre** 跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译

**12. v-slot** 提供具名插槽或需要接收 prop 的插槽。


