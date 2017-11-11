'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphiQLTab = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GraphiQL = require('graphiql/dist/components/GraphiQL');

var _GraphiQLToolbar = require('./GraphiQLToolbar');

var _HeaderEditor = require('./HeaderEditor');

var _QuerySelectionButton = require('./QuerySelectionButton');

var _DebouncedFormControl = require('./DebouncedFormControl');

var _Form = require('react-bootstrap/lib/Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormGroup = require('react-bootstrap/lib/FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _InputGroup = require('react-bootstrap/lib/InputGroup');

var _InputGroup2 = _interopRequireDefault(_InputGroup);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _Glyphicon = require('react-bootstrap/lib/Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _ButtonGroup = require('react-bootstrap/lib/ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _DropdownButton = require('react-bootstrap/lib/DropdownButton');

var _DropdownButton2 = _interopRequireDefault(_DropdownButton);

var _MenuItem = require('react-bootstrap/lib/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Col = require('react-bootstrap/lib/Col');

var _Col2 = _interopRequireDefault(_Col);

var _ControlLabel = require('react-bootstrap/lib/ControlLabel');

var _ControlLabel2 = _interopRequireDefault(_ControlLabel);

var _Checkbox = require('react-bootstrap/lib/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Table = require('react-bootstrap/lib/Table');

var _Table2 = _interopRequireDefault(_Table);

var _introspectionQueries = require('./utility/introspectionQueries');

var _graphql = require('graphql');

var _GraphiQLSubscriptionsFetcher = require('./GraphiQLSubscriptionsFetcher');

var _subscriptionsTransportWs = require('subscriptions-transport-ws');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GraphiQLTab = exports.GraphiQLTab = function (_React$Component) {
  _inherits(GraphiQLTab, _React$Component);

  function GraphiQLTab(props) {
    _classCallCheck(this, GraphiQLTab);

    var _this = _possibleConstructorReturn(this, (GraphiQLTab.__proto__ || Object.getPrototypeOf(GraphiQLTab)).call(this));

    _this.graphiql = null;
    _this.subscriptionsClient = null;

    _this.state = {
      config: props.tab,
      appConfig: props.app,
      header: null,
      headerIdx: null,
      editedQuery: { query: props.tab.getQuery(), variables: props.tab.getVariables() }
    };
    return _this;
  }

  _createClass(GraphiQLTab, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateSchema();
    }
  }, {
    key: 'runQueryAtCursor',
    value: function runQueryAtCursor() {
      if (this.graphiql) this.graphiql._runQueryAtCursor();
    }
  }, {
    key: 'persistState',
    value: function persistState() {
      if (this.graphiql) this.graphiql.componentWillUnmount();
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.config.state.collapsed) return this.renderCollapsed();else return this.renderExpanded();
    }
  }, {
    key: 'renderCollapsed',
    value: function renderCollapsed() {
      var _this2 = this;

      var tab = this.state.config;

      var headers = _react2.default.createElement('span', null);

      if (tab.state.headers.length > 0) {
        var headerList = tab.state.headers.map(function (h) {
          return h.name + ": " + _this2.headerValue(h);
        }).join(", ");
        headers = _react2.default.createElement(
          'span',
          null,
          '\xA0\xA0\xA0',
          _react2.default.createElement(
            'strong',
            null,
            'Headers:'
          ),
          ' ',
          headerList
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'graphiql-tool-cont' },
        _react2.default.createElement(
          'div',
          { className: 'tab-top', style: { flexDirection: "row" } },
          _react2.default.createElement(
            'div',
            { className: 'graphiql-collapsed-tab', onClick: this.expand.bind(this) },
            _react2.default.createElement(
              'strong',
              null,
              'URL:'
            ),
            ' ',
            tab.state.url,
            tab.state.proxy ? " (proxied)" : "",
            ' ',
            headers,
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'strong',
              null,
              'WS:'
            ),
            ' ',
            tab.state.websocketUrl
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_GraphiQLToolbar.GraphiQLToolbar, { hirizontal: true, onToolbar: this.toolbar.bind(this), hasClosed: this.props.hasClosed })
          )
        ),
        this.renderGraphiql(tab)
      );
    }
  }, {
    key: 'renderExpanded',
    value: function renderExpanded() {
      var _this3 = this;

      var tab = this.state.config;

      var url = _react2.default.createElement(_DebouncedFormControl.DebouncedFormControl, {
        placeholder: 'GraphQL endpoint URL',
        value: tab.state.url,
        onChange: this.urlChange.bind(this) });

      var urlInput = url;

      if (this.state.appConfig.state.usedUrls.length > 0) {
        var items = this.state.appConfig.state.usedUrls.map(function (url) {
          return _react2.default.createElement(
            _MenuItem2.default,
            { key: url, onClick: _this3.setUrl.bind(_this3, url) },
            url
          );
        });

        urlInput = _react2.default.createElement(
          _InputGroup2.default,
          null,
          url,
          _react2.default.createElement(
            _DropdownButton2.default,
            { componentClass: _InputGroup2.default.Button, bsSize: 'small', id: 'used-url', title: 'Recent' },
            items
          )
        );
      }

      var websocketInput = _react2.default.createElement(_DebouncedFormControl.DebouncedFormControl, {
        placeholder: 'GraphQL WS URL',
        bsSize: 'small',
        value: tab.state.websocketUrl,
        onChange: this.websocketUrlChange.bind(this) });

      var recentHeaders = '';

      if (this.state.appConfig.state.recentHeaders.length > 0) {
        var _items = this.state.appConfig.state.recentHeaders.map(function (header) {
          var label = header.name + ": " + header.value;
          var labelo = header.name + ": " + _this3.headerValue(header, true);
          return _react2.default.createElement(
            _MenuItem2.default,
            { key: label, onClick: _this3.addHeader.bind(_this3, header, false) },
            labelo
          );
        });

        recentHeaders = _react2.default.createElement(
          _DropdownButton2.default,
          { id: 'recent-header', title: 'Recent' },
          _items
        );
      }

      var headers = _react2.default.createElement('div', null);

      if (this.state.config.state.headers.length > 0) {
        var values = this.state.config.state.headers.map(function (header, idx) {
          return _react2.default.createElement(
            'tr',
            { key: header.name + header.value },
            _react2.default.createElement(
              'td',
              null,
              _this3.truncateHeaderValue(header.name)
            ),
            _react2.default.createElement(
              'td',
              null,
              _this3.truncateHeaderValue(_this3.headerValue(header))
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                _Button2.default,
                { bsStyle: 'link', onClick: _this3.editHeader.bind(_this3, header, idx) },
                _react2.default.createElement(_Glyphicon2.default, { glyph: 'edit', bsSize: 'small' })
              ),
              _react2.default.createElement(
                _Button2.default,
                { bsStyle: 'link', onClick: _this3.removeHeader.bind(_this3, header, idx) },
                _react2.default.createElement(_Glyphicon2.default, { glyph: 'remove', bsSize: 'small' })
              )
            )
          );
        });

        headers = _react2.default.createElement(
          _Table2.default,
          null,
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                'Header Name'
              ),
              _react2.default.createElement(
                'th',
                null,
                'Header Value'
              ),
              _react2.default.createElement('th', { width: '100px' })
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            values
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'graphiql-tool-cont' },
        _react2.default.createElement(
          'div',
          { className: 'tab-top' },
          _react2.default.createElement(
            'div',
            { className: 'tab-form' },
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
                  _react2.default.createElement(_FormControl2.default, { placeholder: 'Query name', bsSize: 'small', value: tab.state.name, onChange: this.nameChange.bind(this) })
                )
              ),
              _react2.default.createElement(
                _FormGroup2.default,
                { controlId: 'url-input', validationState: this.state.schemaError ? "error" : null },
                _react2.default.createElement(
                  _Col2.default,
                  { componentClass: _ControlLabel2.default, sm: 2 },
                  'URL'
                ),
                _react2.default.createElement(
                  _Col2.default,
                  { sm: 10 },
                  urlInput
                )
              ),
              this.props.proxyUrl && _react2.default.createElement(
                _FormGroup2.default,
                null,
                _react2.default.createElement(
                  _Col2.default,
                  { smOffset: 2, sm: 10 },
                  _react2.default.createElement(
                    _Checkbox2.default,
                    { checked: this.state.config.state.proxy, onChange: this.proxyChange.bind(this) },
                    'Proxy requests'
                  )
                )
              ),
              _react2.default.createElement(
                _FormGroup2.default,
                { controlId: 'ws-input', validationState: this.state.wsError ? "error" : null },
                _react2.default.createElement(
                  _Col2.default,
                  { componentClass: _ControlLabel2.default, sm: 2 },
                  'WS URL'
                ),
                _react2.default.createElement(
                  _Col2.default,
                  { sm: 10 },
                  websocketInput
                )
              ),
              _react2.default.createElement(
                _FormGroup2.default,
                { controlId: 'headers-input' },
                _react2.default.createElement(
                  _Col2.default,
                  { componentClass: _ControlLabel2.default, sm: 2 },
                  'Headers'
                ),
                _react2.default.createElement(
                  _Col2.default,
                  { sm: 10 },
                  _react2.default.createElement(
                    _ButtonGroup2.default,
                    null,
                    _react2.default.createElement(
                      _Button2.default,
                      { bsSize: 'small', className: 'header-add', onClick: this.addHeader.bind(this, null) },
                      _react2.default.createElement(_Glyphicon2.default, { glyph: 'plus' }),
                      ' Add'
                    ),
                    _react2.default.createElement(
                      _DropdownButton2.default,
                      { id: 'std-header', title: 'Standard' },
                      _react2.default.createElement(
                        _MenuItem2.default,
                        { key: 'oauth-bearer', onClick: this.addHeader.bind(this, { name: "Authorization", value: "Bearer " }, true) },
                        'OAuth 2 Bearer Token'
                      )
                    ),
                    recentHeaders
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'headers' },
            headers,
            _react2.default.createElement(_HeaderEditor.HeaderEditor, { headerIdx: this.state.headerIdx, header: this.state.header, onFinish: this.headerFinish.bind(this) })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_GraphiQLToolbar.GraphiQLToolbar, { onToolbar: this.toolbar.bind(this), hasClosed: this.props.hasClosed })
          )
        ),
        this.renderGraphiql(tab)
      );
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.state.config.state.setState({ collapsed: true });

      this.setState({ config: this.state.config });
    }
  }, {
    key: 'expand',
    value: function expand() {
      this.state.config.state.setState({ collapsed: false });

      this.setState({ config: this.state.config });
    }
  }, {
    key: 'renderGraphiql',
    value: function renderGraphiql(tab) {
      var _this4 = this;

      var addButton = _react2.default.createElement(_GraphiQL.GraphiQL.ToolbarButton, { title: 'Save Query', label: 'Save', onClick: this.saveQuery.bind(this) });

      if (this.state.appConfig.hasSavedQuery(this.state.editedQuery)) {
        addButton = _react2.default.createElement(_GraphiQL.GraphiQL.ToolbarButton, { title: 'Remove Query', label: 'Remove', onClick: this.removeQuery.bind(this) });
      }

      return _react2.default.createElement(
        'div',
        { className: 'graphiql-tool-cont1' },
        _react2.default.createElement(
          _GraphiQL.GraphiQL,
          {
            ref: function ref(cmp) {
              return _this4.graphiql = cmp;
            },
            storage: tab.getState(),
            query: this.state.queryUpdate ? this.state.queryUpdate.query : undefined,
            variables: this.state.queryUpdate ? this.state.queryUpdate.variables : undefined,
            schema: this.props.schema || this.state.schema,
            fetcher: this.fetcher.bind(this),
            onEditQuery: this.queryEdited.bind(this),
            onEditVariables: this.variablesEdited.bind(this) },
          _react2.default.createElement(
            _GraphiQL.GraphiQL.Toolbar,
            null,
            _react2.default.createElement(_QuerySelectionButton.QuerySelectionButton, { name: 'History', list: tab.getHistory(), onQuery: this.onSelectedQuery.bind(this) }),
            _react2.default.createElement(_QuerySelectionButton.QuerySelectionButton, { name: 'Saved Queries', list: this.state.appConfig.getSavedQueries(), onQuery: this.onSelectedQuery.bind(this) }),
            addButton
          )
        )
      );
    }
  }, {
    key: 'saveQuery',
    value: function saveQuery() {
      this.state.appConfig.addSavedQuery(this.state.editedQuery);
      this.setState({ appConfig: this.state.appConfig });
    }
  }, {
    key: 'removeQuery',
    value: function removeQuery() {
      this.state.appConfig.removeSavedQuery(this.state.editedQuery);
      this.setState({ appConfig: this.state.appConfig });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.queryUpdate) {
        this.setState({ queryUpdate: undefined });
      }
    }
  }, {
    key: 'onSelectedQuery',
    value: function onSelectedQuery(item) {
      var query = { query: item.query, variables: item.variables ? item.variables : "" };

      this.setState({ editedQuery: query, queryUpdate: query });
    }
  }, {
    key: 'queryEdited',
    value: function queryEdited(query) {
      this.setState({ editedQuery: { query: query, variables: this.state.editedQuery.variables } });
    }
  }, {
    key: 'variablesEdited',
    value: function variablesEdited(variables) {
      this.setState({ editedQuery: { query: this.state.editedQuery.query, variables: variables } });
    }
  }, {
    key: 'headerValue',
    value: function headerValue(h, partial) {
      function replace(s) {
        if (partial) {
          var first = s.substring(0, s.length - 4);
          var last = s.substring(s.length - 4);
          return _lodash2.default.replace(first, /./g, '\u2022') + last;
        } else {
          return _lodash2.default.replace(s, /./g, '\u2022');
        }
      }

      if (_lodash2.default.toLower(h.name) == "authorization") {
        var prefix = "Bearer ";

        if (h.value.startsWith(prefix)) {
          var token = h.value.substring(prefix.length);

          return prefix + replace(token);
        } else {
          return replace(h.value);
        }
      } else {
        return h.value;
      }
    }
  }, {
    key: 'truncateHeaderValue',
    value: function truncateHeaderValue(s) {
      return _lodash2.default.truncate(s, { length: 70 });
    }
  }, {
    key: 'addHeader',
    value: function addHeader(h, edit) {
      if (h) {
        if (edit) {
          this.setState({ header: h, headerIdx: null });
        } else {
          this.headerFinish(h, null);
        }
      } else {
        this.setState({ header: { name: "", value: "" }, headerIdx: null });
      }
    }
  }, {
    key: 'editHeader',
    value: function editHeader(h, idx) {
      this.setState({ header: h, headerIdx: idx });
    }
  }, {
    key: 'removeHeader',
    value: function removeHeader(h, idx) {
      this.state.config.state.headers.splice(idx, 1);
      this.state.config.state.setState({ headers: this.state.config.state.headers });

      this.setState({ config: this.state.config, appConfig: this.state.appConfig });
      this.closeCurrentSubscriptionsClient();
    }
  }, {
    key: 'headerFinish',
    value: function headerFinish(h, idx) {
      if (h) {
        if (idx == null) {
          this.state.config.state.setState({ headers: [].concat(_toConsumableArray(this.state.config.state.headers), [h]) });
        } else {
          this.state.config.state.setState({ headers: this.state.config.state.headers.map(function (header, i) {
              if (i == idx) {
                return h;
              } else {
                return header;
              }
            }) });
        }

        this.state.appConfig.rememberHeader(h);
      }

      this.setState({ header: null, headerIdx: null });
      this.closeCurrentSubscriptionsClient();
    }
  }, {
    key: 'nameChange',
    value: function nameChange(e) {
      this.state.config.state.setState({
        name: e.target.value
      });

      this.setState({ config: this.state.config });

      if (this.props.onNameChange) this.props.onNameChange(e.target.value);
    }
  }, {
    key: 'proxyChange',
    value: function proxyChange(e) {
      this.state.config.state.setState({
        proxy: e.target.checked
      });

      this.setState({ config: this.state.config, schemaError: false });
      this.updateSchema();
    }
  }, {
    key: 'validateUrl',
    value: function validateUrl(url) {
      var re_url = new RegExp("^" +
      // protocol identifier
      "(?:(?:https?|wss?)://)" +
      // user:pass authentication
      "(?:\\S+(?::\\S*)?@)?" + "(?:" +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broacast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" +
      // localhost
      "(?:localhost)" + "|" +
      // host name
      '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
      // domain name
      '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
      // TLD identifier
      '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
      // TLD may end with dot
      "\\.?" + ")" +
      // port number
      "(?::\\d{2,5})?" +
      // resource path
      "(?:[/?#]\\S*)?" + "$", "i");

      return re_url.test(url);
    }
  }, {
    key: 'setUrl',
    value: function setUrl(url) {
      this.state.config.state.setState({
        url: url
      });

      if (this.validateUrl(url)) {
        this.setState({ config: this.state.config, schemaError: false });
        this.updateSchema();
      } else {
        this.setState({ config: this.state.config, schemaError: true });
      }
    }
  }, {
    key: 'urlChange',
    value: function urlChange(e) {
      this.setUrl(e.target.value);
    }
  }, {
    key: 'setWebsocketUrl',
    value: function setWebsocketUrl(url) {
      this.state.config.state.setState({
        websocketUrl: url
      });

      this.closeCurrentSubscriptionsClient();

      if (url === '' || this.validateUrl(url)) {
        this.setState({ config: this.state.config, wsError: false });
      } else {
        this.setState({ config: this.state.config, wsError: true });
      }
    }
  }, {
    key: 'websocketUrlChange',
    value: function websocketUrlChange(e) {
      this.setWebsocketUrl(e.target.value);
    }
  }, {
    key: 'updateSchema',
    value: function updateSchema() {
      var _this5 = this;

      var fetch = this.fetcher({ query: _introspectionQueries.introspectionQuery });

      return fetch.then(function (result) {
        if (result && result.data) {
          _this5.setState({ schema: (0, _graphql.buildClientSchema)(result.data), schemaError: false });
        } else {
          _this5.setState({ schemaError: true });
        }
      }).catch(function (error) {
        _this5.setState({ schemaError: true });
      });
    }
  }, {
    key: 'toolbar',
    value: function toolbar(action) {
      if (action == 'collapse') {
        this.collapse();
      } else if (action == 'expand') {
        this.expand();
      }

      if (this.props.onToolbar) {
        this.props.onToolbar.apply(this, arguments);
      }
    }
  }, {
    key: 'fetcher',
    value: function fetcher(params) {
      var wsUrl = this.state.config.state.websocketUrl;
      if (wsUrl && this.validateUrl(wsUrl)) {
        if (this.subscriptionsClient === null) {
          var subscriptionsClientBuilder = this.state.appConfig.bootstrapOptions.subscriptionsClientBuilder || this.defaultSubscriptionsClientBuilder;
          var connectionParams = {};
          this.state.config.state.headers.forEach(function (h) {
            return connectionParams[h.name] = h.value;
          });
          this.subscriptionsClient = subscriptionsClientBuilder(wsUrl, connectionParams);
        }

        return (0, _GraphiQLSubscriptionsFetcher.graphQLFetcher)(this.subscriptionsClient, this.fallbackFetcher.bind(this))(params);
      } else {
        return this.fallbackFetcher(params);
      }
    }
  }, {
    key: 'fallbackFetcher',
    value: function fallbackFetcher(params) {
      var _this6 = this;

      if (this.state.config.state.proxy) {
        params.url = this.state.config.state.url;
        params.headers = this.state.config.state.headers;
      }

      var url = this.state.config.state.proxy && this.props.proxyUrl ? this.props.proxyUrl : this.state.config.state.url;

      var headers = new Headers();

      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      if (!this.state.config.state.proxy) {
        this.state.config.state.headers.forEach(function (h) {
          return headers.append(h.name, h.value);
        });
      }

      var fetchPromise = this.props.fetcher ? this.props.fetcher(params, { url: url, headers: headers }) : fetch(url, {
        method: 'post',
        headers: headers,
        body: JSON.stringify(params),
        credentials: 'same-origin'
      }).then(function (response) {
        if (responce.ok) {
          return responce.json();
        }
        return response.text().then(function (errorText) {
          var errJson = void 0;
          try {
            errJson = JSON.parse(errorText);
          } catch (e) {
            throw errorText;
          }
          throw errJson;
        });
      });

      return fetchPromise.then(function (responseBody) {
        if (_this6.state.appConfig.rememberUrl(_this6.state.config.state.url)) _this6.setState({ appConfig: _this6.state.appConfig });

        if (_this6.state.config.rememberQuery({ query: params.query, variables: params.variables })) _this6.setState({ config: _this6.state.config });

        return responseBody;
      }).catch(function (err) {
        return err && err.message || err;
      });
    }
  }, {
    key: 'defaultSubscriptionsClientBuilder',
    value: function defaultSubscriptionsClientBuilder(url, connectionParams) {
      return new _subscriptionsTransportWs.SubscriptionClient(url, {
        reconnect: true,
        connectionParams: connectionParams
      });
    }
  }, {
    key: 'closeCurrentSubscriptionsClient',
    value: function closeCurrentSubscriptionsClient() {
      if (this.subscriptionsClient) {
        this.subscriptionsClient.close(true, true);
        this.subscriptionsClient = null;
      }
    }
  }]);

  return GraphiQLTab;
}(_react2.default.Component);

GraphiQLTab.propTypes = {
  tab: _propTypes2.default.object.isRequired,
  app: _propTypes2.default.object.isRequired,
  hasClosed: _propTypes2.default.bool.isRequired,
  onToolbar: _propTypes2.default.func,
  onNameChange: _propTypes2.default.func,
  proxyUrl: _propTypes2.default.string,
  schema: _propTypes2.default.object,
  fetcher: _propTypes2.default.func
};