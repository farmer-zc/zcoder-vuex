## 跨域相关知识
### 1. 什么是跨域
* 跨域是指一个域下的文档或脚本试图去请求另一个域下的资源
### 2. 什么情况下会跨域
所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。
url|说明|是否允许
---|:--:|---:
http://www.domain.com/a.js <br> http://www.domain.com/b.js | 同一域名，不同文件路径 | 允许
http://www.domain.com/a.js <br> http://www.domain.com：8000/a.js | 同一域名，不同端口 | 不允许
https://www.domain.com/a.js <br> http://www.domain.com/b.js | 同一域名，不同协议 | 不允许
http://www.domain.com/a.js <br> http://192.168.4.12/b.js  | 域名和域名对应的ip | 不允许
http://www.domain.com/a.js <br> http://domain.com/a.js | 主域相同，子域不同 | 不允许
http://www.domain.com/a.js <br> http://www.domain1.com/a.js | 不同域名 | 不允许

### 3. 解决方案
### 3.1 通过jsonp跨域
jsonp的原理就是利用`<script>`标签没有跨域限制，通过`<script>`标签src属性，发送带有callback参数的GET请求，服务端将接口返回数据拼凑到callback函数中，返回给浏览器，浏览器解析执行，从而前端拿到callback函数返回的数。
```
 <script>
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
    document.head.appendChild(script);

    // 回调执行函数
    function handleCallback(res) {
        alert(JSON.stringify(res));
    }


    // 服务端返回如下（返回时即执行全局函数）
    handleCallback({"success": true, "user": "admin"})
 </script>
```
### 3.2 Nodejs中间件代理跨域
node中间件实现跨域代理，原理大致与nginx相同，都是通过启一个代理服务器，实现数据的转发，也可以通过设置cookieDomainRewrite参数修改响应头中cookie中域名，实现当前域的cookie写入，方便接口登录认证
```
// vue利用node + webpack + webpack-dev-server代理接口跨域
// 在开发环境下，由于vue渲染服务和接口代理服务都是webpack-dev-server同一个，所以页面与代理接口之间不再跨域，无须设置headers跨域信息了。
// vue.config.js 部分配置
module.exports = {
    ...
    devServer: {
        historyApiFallback: true,
        proxy: [{
            context: '/login',
            target: 'http://www.domain2.com:8080',  // 代理跨域目标接口
            changeOrigin: true,
            secure: false,  // 当代理某些https服务报错时用
            cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
        }],
        noInfo: true
    }
    ...
}
```
### 3.3 nginx代理跨域
实现思路： nginx反向代理接口跨域,通过nginx配置一个代理服务器（域名相同，端口不同）做跳板机，反向代理访问接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。
```
#proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;

    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
```

### 3.4 跨域资源共享（CORS）
普通跨域请求：只服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求：前后端都需要设置。
```
// 原生js
// 前端设置是否带cookie
xhr.withCredentials = true;

// vue  axios设置
axios.defaults.withCredentials = true
```


### 3.5 document.domain + iframe 跨域
**此方案仅限主域相同，子域不同的跨域应用场景**
**实现原理**：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。
```
// 父窗口
<iframe id="iframe" src="http://child.domain.com/b.html"></iframe>
<script>
    document.domain = 'domain.com';
    var user = 'admin';
</script>
// 子窗口
<script>
    document.domain = 'domain.com';
    // 获取父窗口中变量
    alert('get js data from parent ---> ' + window.parent.user);
</script>
```

### 3.6  location.hash + iframe跨域
**实现原理**： a域与b跨域相互通信，通过中间页c来实现。 三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信。

### 3.7 window.name + iframe跨域
**实现原理**：window.name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值

### 3.8 postMessage 跨域
### （1） 用于解决以下问题
* 页面和其打开的新窗口的数据传递
* 多窗口之间消息传递
* 页面与嵌套的iframe消息传递
* 上面三个场景的跨域数据传递
### 用法： `postMessage(data,origin)`
```
// data: html5规范支持任意基本类型或可复制的对象，但部分浏览器只支持字符串，所以传参时最好用JSON.stringify()序列化
// origin: 协议+主机+端口号，也可以设置为"*"，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。
postMessage(data,origin)

// demian1 域下
<iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"></iframe>
<script>       
    var iframe = document.getElementById('iframe');
    iframe.onload = function() {
        var data = {
            name: 'aym'
        };
        // 向domain2传送跨域数据
        iframe.contentWindow.postMessage(JSON.stringify(data), 'http://www.domain2.com');
    };

    // 接受domain2返回数据
    window.addEventListener('message', function(e) {
        alert('data from domain2 ---> ' + e.data);
    }, false);
</script>

// demian2 域下
<script>
    // 接收domain1的数据
    window.addEventListener('message', function(e) {
        alert('data from domain1 ---> ' + e.data);

        var data = JSON.parse(e.data);
        if (data) {
            data.number = 16;

            // 处理后再发回domain1
            window.parent.postMessage(JSON.stringify(data), 'http://www.domain1.com');
        }
    }, false);
</script>
```

### 3.9 WebSocket协议跨域
WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现
```
// 原生WebSocket API使用起来不太方便，我们使用Socket.io，它很好地封装了webSocket接口，提供了更简单、灵活的接口，也对不支持webSocket的浏览器提供了向下兼容。
<div>user input：<input type="text"></div>
<script src="https://cdn.bootcss.com/socket.io/2.2.0/socket.io.js"></script>
<script>
var socket = io('http://www.domain2.com:8080');

// 连接成功处理
socket.on('connect', function() {
    // 监听服务端消息
    socket.on('message', function(msg) {
        console.log('data from server: ---> ' + msg); 
    });

    // 监听服务端关闭
    socket.on('disconnect', function() { 
        console.log('Server socket has closed.'); 
    });
});

document.getElementsByTagName('input')[0].onblur = function() {
    socket.send(this.value);
};
</script>
```