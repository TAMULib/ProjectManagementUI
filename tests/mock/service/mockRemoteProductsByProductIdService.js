var mockRemoteProductsByProductIdService = function ($q, WsApi) {
  var service = mockService($q);

  var productId;
  var remoteProducts = {};

  service.refreshRemoteProductsByProductId = function (id) {
    if (productId == id) {
      return;
    }

    if (remoteProducts) {
      for (var key in remoteProducts) {
        remoteProducts[key] = undefined;
      }
    }

    if (!id) {
      return;
    }

    productId = id;
  };

  service.productId = function () {
    return productId;
  };

  service.remoteProducts = function () {
    return remoteProducts;
  };

  return service;
};

angular.module("mock.remoteProductsByProductIdService", []).service("RemoteProductsByProductIdService", mockRemoteProductsByProductIdService);
