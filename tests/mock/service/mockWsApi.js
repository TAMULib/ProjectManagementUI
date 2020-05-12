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

  service.fetch = function (apiReq, options) {
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
      } else if (apiReq === mapping.ProductsStats.all) {
        payload = {
          "ArrayList<ProductStats>": dataProductsStats
        };
      } else if (apiReq === mapping.RemoteProducts.byProduct) {
        payload = {
          "HashMap": dataRemoteProducts
        };
      } else if (apiReq === mapping.RemoteProducts.all) {
        payload = {
          "HashMap": dataRemoteProducts
        };
      } else if (apiReq === mapping.Product.all) {
        payload = {
          "ArrayList<Product>": dataProductRepo1
        };
      }

      if (apiReq.controller === mapping.FeatureRequest.push.controller) {
        if (apiReq.method === 'push/:requestId/:productId/:rpmId') {
          var requestId = Number(options.pathValues.requestId);
          var productId = Number(options.pathValues.productId);
          var rpmId = Number(options.pathValues.rpmId);
          var scopeId = typeof options.data === "string" ? options.data : "";

          if (requestId > 0 && productId > 0 && rpmId > 0 && scopeId !== "") {
            for (var key in dataInternalRequestRepo1) {
              if (dataInternalRequestRepo1[key].id == requestId)  {
                payload = {
                  "FeatureRequest": {
                    id: requestId,
                    projectId: productId,
                    rpmId: rpmId,
                    scopeId: options.data
                  }
                };

                return payloadPromise($q.defer(), payload);
              }
            }
          }
        }

        return rejectPromise($q.defer());
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
