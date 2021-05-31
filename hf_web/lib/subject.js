function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Subject() {
  this.list = {};
  this.cacheTrigger = {};
  this.listen = function (key, callback) {
    if (!this.list[key]) {
      this.list[key] = [];
    }
    if (this.cacheTrigger[key]) {
      callback.apply(undefined, _toConsumableArray(this.cacheTrigger[key]));
      this.cacheTrigger[key] = undefined;
    }
    this.list[key].push(callback);
  };
  this.trigger = function (key) {
    for (var _len = arguments.length, value = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      value[_key - 1] = arguments[_key];
    }

    if (!this.list[key]) {
      this.cacheTrigger[key] = [].concat(value);
      return;
    }
    this.run.apply(this, [key].concat(value));
  };
  this.run = function (key) {
    for (var _len2 = arguments.length, value = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      value[_key2 - 1] = arguments[_key2];
    }

    this.list[key].forEach(function (callback) {
      callback.apply(undefined, value);
    });
  };
  this.remove = function (key, fn) {
    var fns = this.list[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var i = fns.length - 1; i >= 0; i--) {
        var _fn = fns[i];
        if (_fn === fn) {
          fns.splice(i, 1);
        }
      }
    }
  };
  this.hasListen = function (key) {
    if (this.list[key]) {
      if (this.list[key].length > 0) {
        return true;
      }
    }
    return false;
  };
  this.getList = function () {
    return this.list;
  };
}

window.subject = new Subject();