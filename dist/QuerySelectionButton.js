'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuerySelectionButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MenuItem = require('react-bootstrap/lib/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

var _OverlayTrigger2 = _interopRequireDefault(_OverlayTrigger);

var _DropdownButton = require('react-bootstrap/lib/DropdownButton');

var _DropdownButton2 = _interopRequireDefault(_DropdownButton);

var _Popover = require('react-bootstrap/lib/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuerySelectionButton = exports.QuerySelectionButton = function (_React$Component) {
  _inherits(QuerySelectionButton, _React$Component);

  function QuerySelectionButton() {
    _classCallCheck(this, QuerySelectionButton);

    return _possibleConstructorReturn(this, (QuerySelectionButton.__proto__ || Object.getPrototypeOf(QuerySelectionButton)).apply(this, arguments));
  }

  _createClass(QuerySelectionButton, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.getList().length > 0) {
        var items = this.getList().map(function (item, idx) {
          var popover = _react2.default.createElement(
            _Popover2.default,
            { id: 'popover-trigger-hover-focus', className: 'code-pop' },
            _react2.default.createElement(
              'pre',
              null,
              item.query
            ),
            item.variables && item.variables != "" && _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                'strong',
                null,
                'Variables'
              ),
              _react2.default.createElement(
                'pre',
                null,
                _this2.renderVars(item.variables)
              )
            )
          );

          return _react2.default.createElement(
            _MenuItem2.default,
            { eventKey: idx, onClick: _this2.itemClick.bind(_this2, item), key: idx },
            _react2.default.createElement(
              _OverlayTrigger2.default,
              { trigger: ['focus', 'hover'], placement: 'right', overlay: popover, onClick: _this2.itemClick.bind(_this2, item) },
              _react2.default.createElement(
                'span',
                null,
                _this2.renderQueryLabel(item)
              )
            )
          );
        });

        return _react2.default.createElement(
          _DropdownButton2.default,
          { id: this.props.name + "Button", bsSize: 'small', title: this.props.name, className: 'toolbar-button bs-toolbar-button' },
          items
        );
      } else {
        return _react2.default.createElement('span', null);
      }
    }
  }, {
    key: 'getList',
    value: function getList() {
      return this.props.list;
    }
  }, {
    key: 'itemClick',
    value: function itemClick(item) {
      if (this.props.onQuery) {
        this.props.onQuery(item);
      }
    }
  }, {
    key: 'renderVars',
    value: function renderVars(vars) {
      return vars;
    }
  }, {
    key: 'renderQueryLabel',
    value: function renderQueryLabel(query) {
      return _lodash2.default.truncate(_lodash2.default.replace(query.query, /\n/, " "), { length: 50 });
    }
  }]);

  return QuerySelectionButton;
}(_react2.default.Component);

QuerySelectionButton.propTypes = {
  name: _propTypes2.default.string.isRequired,
  list: _propTypes2.default.array.isRequired,
  onQuery: _propTypes2.default.func
};