## ES6 常用新特性
## 1变量申明相关
### 1.1 let const 声明变量
ES6 引入了块级作用域 { }  （es5 只有函数作用域和全局作用域）
var声明的变量是全局变量（或者在函数内部）
let声明的变量只能在其所在的代码块内才能访问即{}内， 不允许重复申明且不存在变量名提升，会有暂时性死区
const 用来定义常量，定义后不可改变，一旦声明必须初始化（引用类型保存的是指针）其余同上

### 1.2 赋值解构（浅拷贝只第一层）
```
// 声明变量
let [a, b, c] = [1, 2, 3]; // a=1 b=2 c=3
// 提取 JSON 数据
let obj = {a:1, b:2, c:3}
let {a, b, c} = obj;  // a=1 b=2 c=3
// 用于参数(还可赋予默认值)
function fn ({a, b, c}) { } 
fn({a:1, b:2, c:3})
```

## 2. 字符串相关
### 2.1 模板字符串
```
// 模板字符串采用反引号（`）标识，并且模板字符串中的空格、换行将在输出时有所保留, 变量放在${}中。
let str1 = 'world';
let str = `hello ${str1}`;  // hello world
```
## 2.2 字符串扩展方法
1. repeat(n): 返回将源字符串重复N次并返回一个新的字符串
2. includes(): 字符串中是否憨厚参数字符串
3. startsWith(): 字符串是否是以参数字符串开头 
4. endsWith(): 字符串是否是以参数字符串结尾 

## 3. 函数相关
### 3.1 rest参数（...变量名）
**注意： rest参数后不能再有别的参数，即rest参数必须是最后一个参数**
**注意： 函数的length，不包括rest参数**
```
let arr = [1, 2, 3]
function fn(...arr) { // 方法体 }
```
### 3.2 name属性: 返回该函数的函数名
```
function foo() {}
foo.name // "foo"
```

### 3.3 箭头函数  let 函数名 = (参数1, 参数2...) => { 代码块 }
1. **函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。**
2. 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
3. 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
4. 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
5. 参数只有一个的时候，可以省略括号，其余不可省略，
6. 方法体只有返回体的时候可以省略{}, 返回一个对象，必须在对象外面加上括号
```
var fn = (num1, num2) => { return num1 + num2; }
// 等同于
var fn = function(num1, num2) {
  return num1 + num2;
};
```
### 3.4 函数参数默认值
```
function fn (a='1', b='2') {

}
```

### 4. 扩展运算符 （...）
```
1. 合并(拷贝)数组
[...arr1,...arr2,...arr3] // 合并arr1, arr2, arr3
2. 拷贝对象 (浅拷贝)
let obj = { a:1, b:2}
let obj1 = {...obj1, c:3}  //等同于 obj1 = Object.assign({},...obj, {c: 1})
```
## 5. Promise 对象
Promise 是一个对象，从它可以获取异步操作的消息,参数是回调函数包含两个参数 resolved 状态和 rejected 状态
```
const promise = new Promise((resolve, reject) => {
    setTimeout(()=> {
        if ( 异步成功 ) {
            resolve(val);
        } else {
            reject(error)
        }
    })
})
// 作用是为 Promise 实例添加状态改变时的回调函数，第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。
promise.then(function(value) {
  // success
}, function(error) {
  // failure
}); 
promise.catch() // 发生错误时候的回调函数
promise.finally() // 执行then/catch后执行的回调函数
promise.all() // 将多个 Promise 实例，包装成一个新的 Promise 实例, 有一个失败就失败
```

## 6. Generator 函数（可暂停的函数）
Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数会返回一个Iterator(可迭代)对象。
* 函数明与关键字之间有个星号
* 函数体内用yield表达式定义不同状态
* Generator 返回遍历器对象，只有个调用next方法才会到下一个状态
* next() 返回{value，done}  done 为true表示遍历结束
```

// 1.调用next()
function *f()
{
    yield 1;
    yield 2;
    yield 3;
}
var g = f();
console.log(g.next()); //{value: 1, done: false}
console.log(g.next()); //{value: 2, done: false}
console.log(g.next()); //{value: 3, done: false}
console.log(g.next()); //{value: undefined, done: true}
// for  of 遍历

for(let v of f()){
    console.log(v); // 1  2  3
}
```
## 7. async await
**async函数对 Generator 函数的改进，是 Generator 的语法糖，返回值是Promise**
async 会将其后的函数的返回值封装成一个 Promise 对象，而 await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来
```
function loadingFn() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

async function test() {
    const v = await loadingFn();
    console.log(v);
}

test();
```

## 8. Set/Map数据结构
### Set 成员不重复的类数组结构
**8.1 类似于数组，但是成员的值都是唯一的，没有重复的值。所以可以用来数组去重**
```
// 去除数组的重复成员
[...new Set(array)]
//去除字符串里面的重复字符
[...new Set('ababbc')].join('');// "abc"
```
**8.2 Array.from方法可以将 Set 结构转为数组。**
```
//这就提供了去除数组重复成员的另一种方法。
function dedupe(array) {
  return Array.from(new Set(array));
}
```
**8.3 操作方法**
1. add(val)   添加值 返回set
2. delete(val) 删除值 返回布尔
3. has(val) 是否包含值  返回布尔
4. clear() 清空 无返回值
**8.4 遍历方法**
1. keys()---返回键（索引）的遍历器
2. values()---返回值的遍历器
3. entries---返回键值对的遍历器
4. forEach(callback())---遍历每个成员，并通过回调函数基于数据做点什么
### Map 键值对集合
**操作方法**
1. set(key,value)---设置成员
2. get(key)---读取指定键的值，若无返回undefined

## 9. class  定义类的语法糖，class之间可以通过extend关键字继承
```
// 传统方式
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);

// class 方式
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
```
