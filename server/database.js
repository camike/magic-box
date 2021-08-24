var fs = require('fs');
var pageItemList = [];

fs.readFile('data.json', function (err, data) {
  if (err) {
    return console.error(err);
  }
  pageItemList = JSON.parse(data.toString());
});

getItemIndexByUrl = (list, url) => {
  for (var i = 0; i < list.length; i++) {
    if (list[i].url === url) {
      return i;
    }
  }
  return null;
}
getGroupIndexByName = (groupName) => {
  for (var i = 0; i < pageItemList.length; i++) {
    if (pageItemList[i].groupName === groupName) {
      return i;
    }
  }
  return null;
}

getAllGroupList = () => {
  return new Promise((resolve, reject) => {
    resolve(pageItemList);
  })
}

/**
 {
   groupName: '',
   list: []
 } 
 */

addNewGroup = (group) => {
  return new Promise((resolve, reject) => {
    if (getGroupIndexByName(group.groupName) !== null) {
      reject('exists');
      return;
    }
    pageItemList.push(group);
    resolve(group);
  })
}

addOrUpdateItem = (groupName, item) => {
  return new Promise((resolve, reject) => {
    const groupIndex = getGroupIndexByName(groupName);
    if (groupIndex === null) {
      reject('error'); return;
    }
    const list = pageItemList[groupIndex].list;
    const idx = getItemIndexByUrl(list, item.url);
    if (idx === null) {
      list.push(item);
    } else {
      list[idx] = item;
    }
    resolve();
  });
}

save = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile('data.json', JSON.stringify(pageItemList), function (err) {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve('{}');
    });
  })
}

exports.getAllGroupList = getAllGroupList;
exports.addNewGroup = addNewGroup;
exports.addOrUpdateItem = addOrUpdateItem;
exports.save = save;