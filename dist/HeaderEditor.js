'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderEditor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Form = require('react-bootstrap/lib/Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormGroup = require('react-bootstrap/lib/FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Col = require('react-bootstrap/lib/Col');

var _Col2 = _interopRequireDefault(_Col);

var _ControlLabel = require('react-bootstrap/lib/ControlLabel');

var _ControlLabel2 = _interopRequireDefault(_ControlLabel);

var _Modal = require('react-bootstrap/lib/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderEditor = exports.HeaderEditor = function (_React$Component) {
  _inherits(HeaderEditor, _React$Component);

  function HeaderEditor(props) {
    _classCallCheck(this, HeaderEditor);

    var _this = _possibleConstructorReturn(this, (HeaderEditor.__proto__ || Object.getPrototypeOf(HeaderEditor)).call(this));

    _this.state = { header: props.header ? _this.copy(props.header) : null };
    return _this;
  }

  _createClass(HeaderEditor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({ header: props.header ? this.copy(props.header) : null });
    }
  }, {
    key: 'copy',
    value: function copy(h) {
      return { name: h.name, value: h.value };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Modal2.default,
        { show: !!this.state.header, onHide: this.hide.bind(this), bsSize: 'large', 'aria-labelledby': 'contained-modal-title-base' },
        _react2.default.createElement(
          _Modal2.default.Header,
          { closeButton: true },
          _react2.default.createElement(
            _Modal2.default.Title,
            { id: 'contained-modal-title-base' },
            this.props.headerIdx == null ? 'Add' : 'Edit',
            ' Header'
          )
        ),
        _react2.default.createElement(
          _Modal2.default.Body,
          null,
          _react2.default.createElement(
            _Form2.default,
            { horizontal: true },
            _react2.default.createElement(
              _FormGroup2.default,
              { controlId: 'name-input' },
              _react2.default.createElement(
                _Col2.default,
                { componentClass: _ControlLabel2.default, sm: 2 },
                'Name'
              ),
              _react2.default.createElement(
                _Col2.default,
                { sm: 10 },
                _react2.default.createElement(_FormControl2.default, { placeholder: 'Header name', bsSize: 'small', value: this.state.header ? this.state.header.name : '', onChange: this.nameChange.bind(this) })
              )
            ),
            _react2.default.createElement(
              _FormGroup2.default,
              { controlId: 'value-input' },
              _react2.default.createElement(
                _Col2.default,
                { componentClass: _ControlLabel2.default, sm: 2 },
                'Value'
              ),
              _react2.default.createElement(
                _Col2.default,
                { sm: 10 },
                _react2.default.createElement(_FormControl2.default, { placeholder: 'Header value', bsSize: 'small', value: this.state.header ? this.state.header.value : '', onChange: this.valueChange.bind(this) })
              )
            )
          )
        ),
        _react2.default.createElement(
          _Modal2.default.Footer,
          null,
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.ok.bind(this), bsStyle: 'primary' },
            'Ok'
          ),
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.hide.bind(this) },
            'Close'
          )
        )
      );
    }
  }, {
    key: 'nameChange',
    value: function nameChange(e) {
      this.state.header.name = e.target.value;
      this.setState({ header: this.state.header });
    }
  }, {
    key: 'valueChange',
    value: function valueChange(e) {
      this.state.header.value = e.target.value;
      this.setState({ header: this.state.header });
    }
  }, {
    key: 'hide',
    value: function hide() {
      if (this.props.onFinish) this.props.onFinish();
    }
  }, {
    key: 'ok',
    value: function ok() {
      if (this.props.onFinish) this.props.onFinish(this.state.header, this.props.headerIdx);
    }
  }]);

  return HeaderEditor;
}(_react2.default.Component);

HeaderEditor.propTypes = {
  headerIdx: _propTypes2.default.number,
  header: _propTypes2.default.object,
  onFinish: _propTypes2.default.func
};