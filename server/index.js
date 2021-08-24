var http = require('http');
var database = require('./database');


Code500 = (response) => {
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('unkown error\n');
}

Code200 = (response, result) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end(result);
}

http.createServer(function (request, response) {
    var action = ''
    var clientUrl = new URL(request.url, 'http://localhost/');
    clientUrl.searchParams.forEach((value, key) => {
        if (key === 'action') {
            action = value;
        }
    })

    switch (action) {
        case 'getAllGroupList':
            handleGetAllGroupList(request, response);
            break;
        case 'addNewGroup':
            handleAddNewGroup(request, response);
            break;
        case 'addOrUpdateItem':
            handleAddOrUpdateItem(request, response);
            break;
        case 'save':
            handleSave(request, response);
            break;
        default:
            break;
    }
}).listen(3001);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:3001/');


handleGetAllGroupList = (request, response) => {
    database.getAllGroupList().then((res) => {
        Code200(response, JSON.stringify(res));
    }).catch((err) => {
        Code500(response, err);
    });
}


/**
  body {
   groupName: '',
   list: []
  }
 */
handleAddNewGroup = (request, response) => {
    if (request.method !== "POST") {
        response.end('unsupport get method\n');
        return;
    }
    var postData = ''
    request.on('data', (chunk) => {
        postData += chunk;
    })
    request.on('end', () => {
        postData = postData.toString('utf-8');
        database.addNewGroup(JSON.parse(postData)).then((res) => {
            Code200(response, 'ok');
        }).catch((err) => {
            Code500(response, err);
        });
    })
}

/**
  body {
      groupName: '',
      item: {}
  }
 */
handleAddOrUpdateItem = (request, response) => {
    if (request.method !== "POST") {
        response.end('unsupport get method\n');
        return;
    }
    var postData = ''
    request.on('data', (chunk) => {
        postData += chunk;
    })
    request.on('end', () => {
        postData = postData.toString('utf-8');
        postData = JSON.parse(postData);
        console.log(postData);
        database.addOrUpdateItem(postData.groupName, postData.item).then((res) => {
            Code200(response, 'ok');
        }).catch((err) => {
            Code500(response, err);
        });
    })
}

handleSave = (request, response) => {
    database.save().then((res) => {
        Code200(response, 'ok');
    }).catch((err) => {
        Code500(response, err);
    });
}
