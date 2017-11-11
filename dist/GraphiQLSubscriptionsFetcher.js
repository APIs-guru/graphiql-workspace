'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graphQLFetcher = undefined;

var _graphql = require('graphql');

var hasSubscriptionOperation = function hasSubscriptionOperation(graphQlParams) {
  var queryDoc = (0, _graphql.parse)(graphQlParams.query);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = queryDoc.definitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var definition = _step.value;

      if (definition.kind === 'OperationDefinition') {
        var operation = definition.operation;
        if (operation === 'subscription') {
          return true;
        }
      }
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

  return false;
};

var graphQLFetcher = exports.graphQLFetcher = function graphQLFetcher(subscriptionsClient, fallbackFetcher) {
  var activeSubscriptionId = null;

  return function (graphQLParams) {
    if (subscriptionsClient && activeSubscriptionId !== null) {
      subscriptionsClient.unsubscribe(activeSubscriptionId);
    }

    if (subscriptionsClient && hasSubscriptionOperation(graphQLParams)) {
      return {
        subscribe: function subscribe() {
          observer.next('Your subscription data will appear here after server publication!');

          activeSubscriptionId = subscriptionsClient.subscribe({
            query: graphQLParams.query,
            variables: graphQLParams.variables
          }, function (error, result) {
            if (error) {
              observer.error(error);
            } else {
              observer.next(result);
            }
          });
        }
      };
    } else {
      return fallbackFetcher(graphQLParams);
    }
  };
};