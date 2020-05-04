angular.module("mock.wsApi", []).service("WsApi", function ($q) {
  var service = mockService($q);
  var mapping = apiMapping;
  var fetchResponse;

  service.mockFetchResponse = function (data) {
    if (data === null || data === undefined) {
      fetchResponse = undefined;
    } else {
      // using hasOwnProperty() to support special test cases (such as checks to see if payload is undefined).
      fetchResponse = {
        type: data.hasOwnProperty("type") ? data.type : null,
        payload: data.hasOwnProperty("payload") ? data.payload : {},
        messageStatus: data.hasOwnProperty("messageStatus") ? data.messageStatus : null,
        httpStatus: data.hasOwnProperty("httpStatus") ? data.httpStatus : null,
        valueType: data.hasOwnProperty("valueType") ? data.valueType : null
      };
    }
  };

  service.mockMapping = function (toMock) {
    mapping = {};
    for (var key in toMock) {
      mapping[key] = toMock[key];
    }
  };

  service.fetch = function (apiReq, parameters) {
    var payload = {};

    if (fetchResponse) {
      switch (fetchResponse.type) {
        case "message":
          return messagePromise($q.defer(), fetchResponse.payload, fetchResponse.messageStatus, fetchResponse.httpStatus);
        case "value":
          return valuePromise($q.defer(), fetchResponse.payload, fetchResponse.valueType);
        case "payload":
          return payloadPromise($q.defer(), fetchResponse.payload, fetchResponse.messageStatus, fetchResponse.httpStatus);
        case "data":
          return dataPromise($q.defer(), fetchResponse.payload, fetchResponse.messageStatus, fetchResponse.httpStatus);
        case "reject":
          return rejectPromise($q.defer(), fetchResponse.payload, fetchResponse.messageStatus, fetchResponse.httpStatus);
        case "failure":
          return failurePromise($q.defer(), fetchResponse.payload, fetchResponse.messageStatus, fetchResponse.httpStatus);
      }
    } else {
      if (apiReq === mapping.ActiveSprints.all) {
        payload = {
          "ArrayList<Sprint>": mockActiveSprints
        };
      }

      if (apiReq === mapping.ProductsStats.all) {
        payload = {
          "ArrayList<ProductStats>": dataProductsStats
        };
      }

      if (apiReq === mapping.RemoteProducts.all) {
        payload = {
          "HashMap": dataRemoteProducts
        };
      }

      if (apiReq.controller === mapping.FeatureRequest.push.controller) {
        if (apiReq.method === 'push/1') {
          payload = {
            "InternalRequest": dataInternalRequest1
          };
        } else if (apiReq.method === 'push/0') {
          return rejectPromise($q.defer());
        }
      }
    }

    return payloadPromise($q.defer(), payload);
  };

  service.getMapping = function () {
    return mapping;
  };

  service.listen = function (apiReq) {
    return payloadPromise($q.defer());
  };

  return service;
});
