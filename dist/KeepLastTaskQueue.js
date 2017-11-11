"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeepLastTaskQueue = exports.KeepLastTaskQueue = function () {
  function KeepLastTaskQueue() {
    _classCallCheck(this, KeepLastTaskQueue);

    this.next = null;
    this.curr = null;
  }

  _createClass(KeepLastTaskQueue, [{
    key: "add",
    value: function add(taskFn) {
      this.next = taskFn;

      this.run();
    }
  }, {
    key: "run",
    value: function run() {
      var _this = this;

      if (!this.curr && this.next) {
        this.curr = this.next;

        this.curr().then(function (v) {
          _this.curr = null;
          _this.run();
          v;
        }, function (error) {
          _this.curr = null;
          _this.run();
        });
        this.next = null;
      }
    }
  }]);

  return KeepLastTaskQueue;
}();