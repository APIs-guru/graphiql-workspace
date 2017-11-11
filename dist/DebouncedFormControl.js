'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebouncedFormControl = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebouncedFormControl = exports.DebouncedFormControl = function (_React$Component) {
  _inherits(DebouncedFormControl, _React$Component);

  function DebouncedFormControl(_ref) {
    var value = _ref.value,
        onChange = _ref.onChange;

    _classCallCheck(this, DebouncedFormControl);

    var _this = _possibleConstructorReturn(this, (DebouncedFormControl.__proto__ || Object.getPrototypeOf(DebouncedFormControl)).call(this));

    _initialiseProps.call(_this);

    _this.state = {
      value: value
    };

    _this.onChange = _lodash2.default.debounce(onChange, 200);
    return _this;
  }

  return DebouncedFormControl;
}(_react2.default.Component);

DebouncedFormControl.propTypes = _extends({}, _FormControl2.default.propTypes);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleChange = function (e) {
    e.persist();
    var val = e.target.value;
    _this2.setState({ value: val }, function () {
      _this2.onChange(e);
    });
  };

  this.render = function () {
    var _props = _this2.props,
        value = _props.value,
        onChange = _props.onChange,
        other = _objectWithoutProperties(_props, ['value', 'onChange']);

    return _react2.default.createElement(_FormControl2.default, _extends({ value: _this2.state.value, onChange: _this2.handleChange }, other));
  };
};