var mockProductsService = function ($q, $timeout) {
  var service = mockService($q);

  var defer = $q.defer();
  var products = [];
  var productsLoading = false;
  var remoteProducts = {};
  var remoteProductsLoading = [];

  service.mockProductsLoading = function (loading) {
    productsLoading = loading ? true : false;
  };

  service.remoteProductsLoading = function (productId, loading) {
    remoteProductsLoading[productId] = loading ? true : false;
  };

  service.refreshProducts = function () {
    productsLoading = false;
    return messagePromise($q.defer());
  };

  service.refreshRemoteProducts = function (productId) {
    remoteProductsLoading[productId] = false;

    if (dataFeatureRequest1.id == productId) {
      return notifyPromise($timeout, $q.defer(), dataFeatureRequest1);
    }

    return rejectPromise($q.defer());
  };

  service.getProductsLoading = function () {
    return productsLoading;
  };

  service.getRemoteProducts = function () {
    return remoteProducts;
  };

  service.getRemoteProductsLoading = function () {
    return remoteProductsLoading;
  };

  service.getRemoteProductInfo = function (productId) {
    for (var i in products) {
      if (products[i].id == productId) {
        return products[i].remoteProductInfo;
      }
    }
  };

  service.ready = defer.promise;
  defer.notify();

  return service;
};

angular.module("mock.productsService", []).service("ProductsService", mockProductsService);
