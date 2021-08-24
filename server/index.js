var http = require('http');
var url = require('url');
var queryString = require('queryString');

http.createServer(function (request, response) {
    if (request.method == "POST") {
        var postData = ''
        request.on('data', (chunk)=>{
            postData += chunk;
        })
        request.on('end', ()=>{
            postData = queryString.parse(postData);
            console.log(postData);
        })
    }
    

    var clientUrl = new URL(request.url, 'http://localhost/');
    clientUrl.searchParams.forEach((value, key) => {
        console.log(key+'='+value);
    })
 
    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(3001);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:3001/');