"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabConfig = exports.AppConfig = exports.State = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = exports.State = function () {
  function State(key, initial) {
    _classCallCheck(this, State);

    this.key = key;
    this.state = {};

    var restored = this.restoreState();

    this.setState(initial);
    this.setState(restored);
  }

  _createClass(State, [{
    key: "setState",
    value: function setState(s) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(s)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          this.state[key] = s[key];
          this[key] = s[key];

          this.setItem(key, s[key]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this;
    }
  }, {
    key: "restoreState",
    value: function restoreState() {
      var res = {};

      for (var key in localStorage) {
        if (key.startsWith(this.prefix())) {
          var name = key.substring(this.prefix().length);

          res[name] = this.getItem(name);
        }
      }

      return res;
    }
  }, {
    key: "cleanupState",
    value: function cleanupState() {
      for (var key in localStorage) {
        if (key.startsWith(this.prefix())) {
          localStorage.removeItem(key);
        }
      }

      this.freeze = true;
    }
  }, {
    key: "prefix",
    value: function prefix() {
      return this.key + "-";
    }
  }, {
    key: "setItem",
    value: function setItem(key, val) {
      if (!this.freeze) {
        this.state[key] = val;
        this[key] = val;

        return localStorage.setItem(this.prefix() + key, JSON.stringify({ data: val }));
      }
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      var value = localStorage.getItem(this.prefix() + key);

      if (value) return JSON.parse(value).data;else return undefined;
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      localStorage.removeItem(this.prefix() + key);
    }
  }]);

  return State;
}();

function sameQuery(q1, q2) {
  return q1.query == q2.query && q1.variables == q2.variables;
}

var AppConfig = exports.AppConfig = function () {
  function AppConfig(key) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, AppConfig);

    if (typeof key === "string") {
      var _options$defaultUrl = options.defaultUrl,
          defaultUrl = _options$defaultUrl === undefined ? 'http://try.sangria-graphql.org/graphql' : _options$defaultUrl,
          _options$defaultWebso = options.defaultWebsocketUrl,
          defaultWebsocketUrl = _options$defaultWebso === undefined ? '' : _options$defaultWebso,
          _options$defaultQuery = options.defaultQuery,
          defaultQuery = _options$defaultQuery === undefined ? '{\n  hero {\n    id\n    name\n    \n    friends {\n      name\n    }\n  }\n}' : _options$defaultQuery,
          _options$defaultVaria = options.defaultVariables,
          defaultVariables = _options$defaultVaria === undefined ? '' : _options$defaultVaria,
          _options$defaultHeade = options.defaultHeaders,
          defaultHeaders = _options$defaultHeade === undefined ? [] : _options$defaultHeade,
          _options$defaultSaved = options.defaultSavedQueries,
          defaultSavedQueries = _options$defaultSaved === undefined ? [] : _options$defaultSaved;


      this.bootstrapOptions = options;

      this.state = new State(key, {
        key: key,
        lastId: 0,
        tabIds: [],
        closedTabs: [],
        defaultUrl: defaultUrl,
        defaultWebsocketUrl: defaultWebsocketUrl,
        defaultQuery: defaultQuery,
        defaultVariables: defaultVariables,
        defaultProxy: false,
        defaultHeaders: defaultHeaders,
        usedUrls: [],
        recentHeaders: [],
        maxTabHistory: 20,
        maxUrlHistory: 20,
        maxHistory: 20,
        savedQueries: defaultSavedQueries
      });

      this.tabInfo = this.state.tabIds.map(function (id) {
        return new TabConfig(id, { defaultQuery: defaultQuery, defaultVariables: defaultVariables });
      });

      if (this.getTabs().length == 0) {
        this.addTab();
      }
    } else {
      var tabs = key.tabs;
      var doc = _lodash2.default.omit(key, ["tabs"]);

      this.state = new State(doc.key, doc);

      this.tabInfo = tabs.map(function (t) {
        return new TabConfig(t);
      });
    }
  }

  _createClass(AppConfig, [{
    key: "getBootstrapOptions",
    value: function getBootstrapOptions() {
      return this.bootstrapOptions;
    }
  }, {
    key: "getSavedQueries",
    value: function getSavedQueries() {
      return this.state.savedQueries || [];
    }
  }, {
    key: "addSavedQuery",
    value: function addSavedQuery(query) {
      this.state.setState({ savedQueries: [query].concat(_toConsumableArray(this.getSavedQueries())) });
    }
  }, {
    key: "hasSavedQuery",
    value: function hasSavedQuery(query) {
      return !!_lodash2.default.find(this.getSavedQueries(), function (q) {
        return sameQuery(q, query);
      });
    }
  }, {
    key: "removeSavedQuery",
    value: function removeSavedQuery(query) {
      this.state.setState({ savedQueries: this.getSavedQueries().filter(function (q) {
          return !sameQuery(q, query);
        }) });
    }
  }, {
    key: "export",
    value: function _export() {
      var ownState = this.state.state;

      ownState.tabs = this.tabInfo.map(function (t) {
        return t.state.state;
      });

      return ownState;
    }
  }, {
    key: "rememberUrl",
    value: function rememberUrl(url) {
      if (this.state.usedUrls.indexOf(url) < 0) {
        if (this.state.usedUrls.length >= this.state.maxUrlHistory) this.state.setState({ usedUrls: _lodash2.default.dropRight(this.state.usedUrls) });

        this.state.setState({
          usedUrls: [url].concat(_toConsumableArray(this.state.usedUrls))
        });

        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "rememberHeader",
    value: function rememberHeader(header) {
      var simplified = this.state.recentHeaders.map(function (h) {
        return h.name + h.value;
      });

      if (simplified.indexOf(header.name + header.value) < 0) {
        if (this.state.recentHeaders.length >= 20) this.state.setState({ recentHeaders: _lodash2.default.dropRight(this.state.recentHeaders) });

        this.state.setState({
          recentHeaders: [header].concat(_toConsumableArray(this.state.recentHeaders))
        });

        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "addTab",
    value: function addTab() {
      var id = this.genId();
      var key = "tab" + id;

      var _state = this.state,
          tabIds = _state.tabIds,
          defaultUrl = _state.defaultUrl,
          defaultWebsocketUrl = _state.defaultWebsocketUrl,
          defaultProxy = _state.defaultProxy,
          defaultHeaders = _state.defaultHeaders,
          maxHistory = _state.maxHistory,
          defaultQuery = _state.defaultQuery,
          defaultVariables = _state.defaultVariables;


      var tab = new TabConfig(key, {
        name: "Query " + (tabIds.length + 1),
        url: defaultUrl,
        websocketUrl: defaultWebsocketUrl,
        proxy: defaultProxy,
        headers: defaultHeaders,
        maxHistory: maxHistory || 20,
        query: defaultQuery,
        variables: defaultVariables
      });

      this.tabInfo.push(tab);
      this.state.setState({
        tabIds: [].concat(_toConsumableArray(tabIds), [key]),
        activeId: key
      });

      return tab;
    }
  }, {
    key: "getActiveId",
    value: function getActiveId() {
      return this.state.activeId;
    }
  }, {
    key: "removeTab",
    value: function removeTab(id) {
      var _this = this;

      var idx = -1;

      this.tabInfo.forEach(function (e, i) {
        if (e.getId() === id) {
          _this.rememberTab(e);
          e.cleanup();
          idx = i;
        }
      });

      this.tabInfo.splice(idx, 1);
      this.state.tabIds.splice(idx, 1);

      this.state.setState({ tabIds: this.state.tabIds });

      var newTab = null;

      if (this.tabInfo.length == 0) {
        newTab = this.addTab();
      } else {
        if (this.getActiveId() == id) {
          var activeIdx = idx == this.tabInfo.length ? idx - 1 : idx;
          this.state.setState({ activeId: this.tabInfo[activeIdx].getId() });
        }
      }

      return newTab;
    }
  }, {
    key: "rememberTab",
    value: function rememberTab(tab) {
      if (this.state.closedTabs.length >= this.state.maxTabHistory) this.state.setState({ closedTabs: _lodash2.default.dropRight(this.state.closedTabs) });

      this.state.setState({ closedTabs: [tab.state.state].concat(_toConsumableArray(this.state.closedTabs)) });
    }
  }, {
    key: "reopenTab",
    value: function reopenTab() {
      if (this.state.closedTabs.length > 0) {
        var tabConf = this.state.closedTabs.shift();
        var tab = new TabConfig(tabConf);

        this.tabInfo.push(tab);
        this.state.setState({
          tabIds: [].concat(_toConsumableArray(this.state.tabIds), [tab.getId()]),
          activeId: tab.getId()
        });

        this.state.setState({ closedTabs: this.state.closedTabs });

        return tab;
      }
    }
  }, {
    key: "getTabs",
    value: function getTabs() {
      return this.tabInfo;
    }
  }, {
    key: "genId",
    value: function genId() {
      this.state.setState({ lastId: this.state.lastId + 1 });

      return "" + this.state.lastId;
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      this.tabInfo.forEach(function (t) {
        return t.cleanup();
      });
      this.state.cleanupState();
    }
  }]);

  return AppConfig;
}();

var TabConfig = exports.TabConfig = function () {
  function TabConfig(key) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TabConfig);

    if (typeof key === "string") {
      var name = options.name,
          url = options.url,
          websocketUrl = options.websocketUrl,
          proxy = options.proxy,
          headers = options.headers,
          maxHistory = options.maxHistory,
          query = options.query,
          variables = options.variables;


      this.state = new State(key, {
        id: key,
        name: name,
        url: url,
        websocketUrl: websocketUrl,
        proxy: proxy,
        headers: headers,
        collapsed: false,
        maxHistory: maxHistory,
        history: [],
        "graphiql:query": query,
        "graphiql:variables": variables
      });
    } else {
      // restoring
      this.state = new State(key.id, key);
    }
  }

  _createClass(TabConfig, [{
    key: "getMaxHistory",
    value: function getMaxHistory() {
      return this.state.maxHistory || 20;
    }
  }, {
    key: "getHistory",
    value: function getHistory() {
      return this.state.history || [];
    }
  }, {
    key: "getQuery",
    value: function getQuery() {
      return this.state["graphiql:query"] || "";
    }
  }, {
    key: "getVariables",
    value: function getVariables() {
      return this.state["graphiql:variables"] || "";
    }
  }, {
    key: "rememberQuery",
    value: function rememberQuery(query) {
      var same = this.getHistory().length > 0 ? sameQuery(this.getHistory()[0], query) : false;
      var introspection = query.query.indexOf("query IntrospectionQuery") >= 0;

      if (!same && !introspection) {
        if (this.getHistory().length >= this.getMaxHistory()) this.state.setState({ history: _lodash2.default.dropRight(this.getHistory()) });

        this.state.setState({
          history: [query].concat(_toConsumableArray(this.getHistory()))
        });

        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.state.id;
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      this.state.cleanupState();
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }]);

  return TabConfig;
}();