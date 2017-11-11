'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphiQLWorkspace = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _GraphiQLTab = require('./GraphiQLTab');

var _config = require('./config');

var _Tabs = require('react-bootstrap/lib/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = require('react-bootstrap/lib/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Glyphicon = require('react-bootstrap/lib/Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GraphiQLWorkspace = exports.GraphiQLWorkspace = function (_React$Component) {
  _inherits(GraphiQLWorkspace, _React$Component);

  function GraphiQLWorkspace(props) {
    _classCallCheck(this, GraphiQLWorkspace);

    var _this = _possibleConstructorReturn(this, (GraphiQLWorkspace.__proto__ || Object.getPrototypeOf(GraphiQLWorkspace)).call(this));

    _this.graphiql = {};

    _this.state = {
      config: props.config,
      visited: [props.config.getActiveId()]
    };

    _this.bootstrapOptions = props.config.getBootstrapOptions();

    var orig = document.addEventListener;
    document.addEventListener = function (name, fn) {
      // please don't look here... it's terrible and very very fragile
      if (name === 'keydown' && fn.toString().indexOf('_runQueryAtCursor') != -1) {
        console.info("Ignoring GraphiQL keydown event handler!");
      } else {
        orig.apply(document, arguments);
      }
    };
    return _this;
  }

  _createClass(GraphiQLWorkspace, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('keydown', this.keyHandler.bind(this), true);
    }
  }, {
    key: 'keyHandler',
    value: function keyHandler(event) {
      if ((event.metaKey || event.ctrlKey) && event.keyCode === 13) {
        event.preventDefault();

        var comp = this.graphiql[this.state.config.getActiveId()];

        if (comp) {
          comp.runQueryAtCursor();
        }

        return false;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.aboutToPrepare) {

        this.setState({
          aboutToPrepare: undefined,
          visited: this.visited(this.state.aboutToPrepare) ? this.state.visited : [].concat(_toConsumableArray(this.state.visited), [this.state.aboutToPrepare])
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tabs = this.state.config.getTabs().map(function (tab) {
        var label = _react2.default.createElement(
          'div',
          null,
          _lodash2.default.truncate(tab.state.name),
          ' ',
          _react2.default.createElement(
            _Button2.default,
            { bsStyle: 'link', bsSize: 'xsmall', className: 'close-button', onClick: _this2.closeTab.bind(_this2, tab.getId()) },
            _react2.default.createElement(_Glyphicon2.default, { glyph: 'remove' })
          )
        );

        if (_this2.visited(tab.getId())) {
          return _react2.default.createElement(
            _Tab2.default,
            { key: tab.getId(), eventKey: tab.getId(), title: label },
            _react2.default.createElement(_GraphiQLTab.GraphiQLTab, {
              ref: function ref(cmp) {
                return _this2.graphiql[tab.getId()] = cmp;
              },
              onToolbar: _this2.toolbar.bind(_this2),
              hasClosed: _this2.state.config.state.closedTabs.length > 0,
              onNameChange: _this2.refresh.bind(_this2),
              proxyUrl: _this2.props.proxyUrl,
              tab: tab,
              app: _this2.state.config })
          );
        } else {
          return _react2.default.createElement(
            _Tab2.default,
            { key: tab.getId(), eventKey: tab.getId(), title: label },
            _react2.default.createElement('div', null)
          );
        }
      });

      return _react2.default.createElement(
        _Tabs2.default,
        { id: 'main-tabs', animation: false, className: 'tabs', activeKey: this.state.config.getActiveId(), onSelect: this.handleSelect.bind(this) },
        tabs,
        _react2.default.createElement(
          _Tab2.default,
          { key: 'new', eventKey: 'new', title: '+ New Query', className: 'new-tab' },
          _react2.default.createElement('a', { id: 'downloadAnchorElem', style: { display: "none" } })
        )
      );
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.setState({ config: this.state.config });
    }
  }, {
    key: 'formatDate',
    value: function formatDate(d) {
      return (0, _moment2.default)(d).format("YYYY-MM-DD-HH-mm-ss");
    }
  }, {
    key: 'toolbar',
    value: function toolbar(action, arg) {
      var _this3 = this;

      if (action === "reopen") {
        this.state.config.reopenTab();
        this.setState({ config: this.state.config, aboutToPrepare: this.state.config.getActiveId() });
      } else if (action === "export") {
        this.state.config.state.tabIds.forEach(function (id) {
          var comp = _this3.graphiql[id];

          if (comp) {
            comp.persistState();
          }
        });

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.config.export(), null, 2));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');

        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", 'graphiql-workspace-' + this.formatDate(new Date()) + '.json');
        dlAnchorElem.click();
      } else if (action == "restore") {
        this.state.config.cleanup();
        var newConfig = new _config.AppConfig(arg);

        this.setState({
          config: newConfig,
          visited: [],
          aboutToPrepare: newConfig.getActiveId()
        });
      } else if (action == "clean") {
        this.state.config.cleanup();
        var _newConfig = new _config.AppConfig("graphiql", this.bootstrapOptions);

        this.setState({
          config: _newConfig,
          visited: [],
          aboutToPrepare: _newConfig.getActiveId()
        });
      }

      if (this.props.onToolbar) this.props.onToolbar.apply(this, arguments);
    }
  }, {
    key: 'closeTab',
    value: function closeTab(id, e) {
      e.preventDefault();
      e.stopPropagation();

      var comp = this.graphiql[id];

      if (comp) {
        comp.persistState();
      }

      this.state.config.removeTab(id);
      var newVisited = this.state.visited.filter(function (v) {
        return v != id;
      });

      this.setState({ config: this.state.config, visited: newVisited, aboutToPrepare: this.state.config.getActiveId() });
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(key) {
      if (key == "new") {
        var tab = this.state.config.addTab();

        this.setState({ config: this.state.config, aboutToPrepare: tab.getId() });
      } else if (key) {
        this.state.config.state.setState({ activeId: key });
        this.setState({ config: this.state.config, aboutToPrepare: key });
      }
    }
  }, {
    key: 'visited',
    value: function visited(idx) {
      return this.state.visited.indexOf(idx) != -1;
    }
  }]);

  return GraphiQLWorkspace;
}(_react2.default.Component);

GraphiQLWorkspace.propTypes = {
  config: _propTypes2.default.object.isRequired,
  onToolbar: _propTypes2.default.func,
  proxyUrl: _propTypes2.default.string
};