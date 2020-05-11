var mockProductsService = function ($q, $timeout) {
  var service = mockService($q);

  var products = {};
  var remoteProducts = {};

  service.getProducts = function () {
    return products;
  };

  service.getRemoteProductInfo = function (productId) {
    for (var i in products) {
      if (products[i].id == productId) {
        return products[i].remoteProductInfo;
      }
    }
  };

  service.getRemoteProducts = function () {
    return remoteProducts;
  };

  service.refreshProducts = function () {
    return messagePromise($q.defer());
  };

  service.refreshRemoteProducts = function (productId) {
    if (dataFeatureRequest1.id == productId) {
      return notifyPromise($timeout, $q.defer(), dataFeatureRequest1);
    }

    return rejectPromise($q.defer());
  };

  service.ready = $q.defer().promise;

  return service;
};

angular.module("mock.productsService", []).service("ProductsService", mockProductsService);
