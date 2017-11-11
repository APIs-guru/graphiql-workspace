'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphiQLToolbar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Glyphicon = require('react-bootstrap/lib/Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var _OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

var _OverlayTrigger2 = _interopRequireDefault(_OverlayTrigger);

var _Tooltip = require('react-bootstrap/lib/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GraphiQLToolbar = function (_React$Component) {
  _inherits(GraphiQLToolbar, _React$Component);

  function GraphiQLToolbar() {
    _classCallCheck(this, GraphiQLToolbar);

    return _possibleConstructorReturn(this, (GraphiQLToolbar.__proto__ || Object.getPrototypeOf(GraphiQLToolbar)).apply(this, arguments));
  }

  _createClass(GraphiQLToolbar, [{
    key: 'render',
    value: function render() {
      var reopenTooltip = _react2.default.createElement(
        _Tooltip2.default,
        { id: 'tooltip' },
        _react2.default.createElement(
          'strong',
          null,
          'Reopen closed tab'
        )
      );
      var collapseTooltip = _react2.default.createElement(
        _Tooltip2.default,
        { id: 'tooltip' },
        _react2.default.createElement(
          'strong',
          null,
          'Collapse the tab config'
        )
      );
      var expandTooltip = _react2.default.createElement(
        _Tooltip2.default,
        { id: 'tooltip' },
        _react2.default.createElement(
          'strong',
          null,
          'Expand the tab config'
        )
      );
      var exportTooltip = _react2.default.createElement(
        _Tooltip2.default,
        { id: 'tooltip' },
        _react2.default.createElement(
          'strong',
          null,
          'Save workspace'
        )
      );
      var restoreTooltip = _react2.default.createElement(
        _Tooltip2.default,
        { id: 'tooltip' },
        _react2.default.createElement(
          'strong',
          null,
          'Open workspace'
        ),
        ' (drag&drop file here or just click the icon)'
      );
      var cleanTooltip = _react2.default.createElement(
        _Tooltip2.default,
        { id: 'tooltip' },
        _react2.default.createElement(
          'strong',
          null,
          'Cleanup the workspace and start from scratch'
        )
      );
      var placement = "left";
      var sep = !this.props.hirizontal ? _react2.default.createElement('br', null) : _react2.default.createElement('span', null);

      return _react2.default.createElement(
        'div',
        { className: 'graphiql-toolbar' },
        this.props.hasClosed && _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            _OverlayTrigger2.default,
            { placement: placement, overlay: reopenTooltip },
            _react2.default.createElement(
              _Button2.default,
              { bsStyle: 'link', bsSize: 'large', onClick: this.action.bind(this, "reopen") },
              _react2.default.createElement(_Glyphicon2.default, { glyph: 'share-alt' })
            )
          ),
          sep
        ),
        !this.props.hirizontal && _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            _OverlayTrigger2.default,
            { placement: placement, overlay: collapseTooltip },
            _react2.default.createElement(
              _Button2.default,
              { bsStyle: 'link', bsSize: 'large', onClick: this.action.bind(this, "collapse") },
              _react2.default.createElement(_Glyphicon2.default, { glyph: 'resize-small' })
            )
          ),
          sep
        ),
        this.props.hirizontal && _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            _OverlayTrigger2.default,
            { placement: placement, overlay: expandTooltip },
            _react2.default.createElement(
              _Button2.default,
              { bsStyle: 'link', bsSize: 'large', onClick: this.action.bind(this, "expand") },
              _react2.default.createElement(_Glyphicon2.default, { glyph: 'resize-full' })
            )
          ),
          sep
        ),
        _react2.default.createElement(
          _OverlayTrigger2.default,
          { placement: placement, overlay: exportTooltip },
          _react2.default.createElement(
            _Button2.default,
            { bsStyle: 'link', bsSize: 'large', onClick: this.action.bind(this, "export") },
            _react2.default.createElement(_Glyphicon2.default, { glyph: 'save' })
          )
        ),
        sep,
        _react2.default.createElement(
          _reactDropzone2.default,
          { onDrop: this.onDrop.bind(this), multiple: false, className: 'dropzone', activeClassName: 'dropzone-active' },
          _react2.default.createElement(
            _OverlayTrigger2.default,
            { placement: placement, overlay: restoreTooltip },
            _react2.default.createElement(
              _Button2.default,
              { bsStyle: 'link', bsSize: 'large' },
              _react2.default.createElement(_Glyphicon2.default, { glyph: 'open' })
            )
          )
        ),
        sep,
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            _OverlayTrigger2.default,
            { placement: placement, overlay: cleanTooltip },
            _react2.default.createElement(
              _Button2.default,
              { bsStyle: 'link', bsSize: 'large', onClick: this.action.bind(this, "clean") },
              _react2.default.createElement(_Glyphicon2.default, { glyph: 'trash' })
            )
          )
        )
      );
    }
  }, {
    key: 'onDrop',
    value: function onDrop(files) {
      var _this2 = this;

      var file = files[0];
      var reader = new FileReader();

      reader.onload = function (e) {
        _this2.action("restore", JSON.parse(e.target.result));
      };

      reader.readAsText(file);
    }
  }, {
    key: 'action',
    value: function action(_action, arg) {
      if (this.props.onToolbar) this.props.onToolbar(_action, arg);
    }
  }]);

  return GraphiQLToolbar;
}(_react2.default.Component);

exports.GraphiQLToolbar = GraphiQLToolbar;
GraphiQLToolbar.propTypes = {
  onToolbar: _propTypes2.default.func,
  hasClosed: _propTypes2.default.bool.isRequired,
  hirizontal: _propTypes2.default.bool
};