
function getPath(obj, value, path) {
  try {
    if (typeof obj !== 'object') {
      return;
    }
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var t = path;
        var v = obj[key];
        if (!path) {
          newPath = key;
        } else {
          newPath = path + '.' + key;
        }
        if (v === value) {
          return newPath;
        } else if (typeof v !== 'object') {
          newPath = t;
        }
        var res = getPath(v, value, newPath);
        if (res) {
          return res;
        }
      }
    }
  } catch (e) {
    msg(e.message);
  }
}
function setToValue(obj, path) {
  path = path.split('.');
  for (var i of path) {
    obj = obj[i];
  }
  return obj
}