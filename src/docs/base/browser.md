## 数据存储
### 1. cookie
1. 存储：`document.cookie = 'name=value';`
2. 周期： 默认情况下浏览器关闭时删除，还可以是设置时间 `; expires=`
3. 读取： var x = document.cookie;

### 2.Session
* Session与Cookie的区别在于Session是记录在服务端的，而Cookie是记录在客户端的。

### 2. localStorage
1. 存储：localStorage.setItem(key, val);
2. 周期：用户不清理的情况下默认时间为永久
3. 读取：localStorage.getIten(key)
4. 删除： localStorage.removeItem('name') 删除一个值 localStorage.clear() 删除所有数据

### 3. sessionStorage
1. 存储：sessionStorage.setItem(key, val);
2. 周期：页面关闭即消失
3. 读取：sessionStorage.getIten(key)

## 区别
### 1. 储存大小不同
> * localStorage的大小一般为5M
> * sessionStorage的大小一般为5M
> * cookies的大小一般为4K

### 1. 有效期不同
> * localStorage的有效期为永久有效，除非你进行手动删除。
> * sessionStorage在当前会话下有效，关闭页面或者浏览器时会被清空。
> * cookies在设置的有效之前有效，当超过有效期便会失效。(否则只在当前会话有效)

### 1. 与服务器端的通信
> * localStorage不参与服务器端的通信。
> * sessionStorage不参与服务器端的通信。
> * cookies参与服务器端通信，每次都会携带http的头信息中。（如果使用cookie保存过多数据会带来性能问题）

## indexDB
* IndexedDB 就是浏览器提供的本地数据库
[阮一峰indexDB教程](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)
