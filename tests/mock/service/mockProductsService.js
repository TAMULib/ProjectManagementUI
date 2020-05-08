var mockProductsService = function ($q, ProductRepo, WsApi) {
  var service = mockService($q);

  var products = {};

  service.getById = function (id) {
    // @todo
    return {};
  }

  service.getProductRemoteProducts = function (id) {
    // @todo
    return {};
  };

  service.getProducts = function () {
    return products;
  };

  service.refreshProducts = function () {
    // @todo
  };

  return service;
};

angular.module("mock.productsService", []).service("ProductsService", mockProductsService);
