var mockProductsService = function ($q, $timeout) {
  var service = mockService($q);

  var products = {};
  var remoteProducts = {};

  service.getById = function (id) {
    return $q(function (resolve, reject) {
      for (var i in dataProductRepo1) {
        if (dataProductRepo1[i].id === scopeId) {
          resolve(dataProductRepo1[i]);
        }
      }
      reject(undefined);
    });
  }

  service.getProducts = function () {
    return products;
  };

  service.getRemoteProductInfo = function (productId) {
    for (var i in products) {
      if (products[i].id == productId) {
        return products[i];
      }
    }
  };

  service.getRemoteProducts = function () {
    return remoteProducts;
  };

  service.refreshProducts = function () {
    return messagePromise();
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
