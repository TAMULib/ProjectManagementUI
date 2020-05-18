var mockProductsService = function ($q, $timeout) {
  var service = mockService($q);

  var defer = $q.defer();
  var products = [];
  var productsLoading = false;
  var remoteProjects = {};
  var remoteProjectsLoading = [];

  service.mockProductsLoading = function (loading) {
    productsLoading = loading ? true : false;
  };

  service.remoteProjectsLoading = function (productId, loading) {
    remoteProjectsLoading[productId] = loading ? true : false;
  };

  service.refreshProducts = function () {
    productsLoading = false;
    return messagePromise($q.defer());
  };

  service.refreshRemoteProjectsForProduct = function (productId) {
    remoteProjectsLoading[productId] = false;

    if (dataFeatureRequest1.id == productId) {
      return notifyPromise($timeout, $q.defer(), dataFeatureRequest1);
    }

    return rejectPromise($q.defer());
  };

  service.getProductsLoading = function () {
    return productsLoading;
  };

  service.getRemoteProjects = function () {
    return remoteProjects;
  };

  service.getRemoteProjectsLoading = function () {
    return remoteProjectsLoading;
  };

  service.getRemoteProjectInfo = function (productId) {
    for (var i in products) {
      if (products[i].id == productId) {
        return products[i].remoteProjectInfo;
      }
    }
  };

  service.ready = defer.promise;
  defer.notify();

  return service;
};

angular.module("mock.productsService", []).service("ProductsService", mockProductsService);
