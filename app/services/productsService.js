app.service('ProductsService', function ($q, ProductRepo, WsApi) {
  var productsService = this;

  var products = {};

  var defer = $q.defer();

  var process = function (response) {
    var apiRes = angular.fromJson(response.body);
    if (apiRes.meta.status === 'SUCCESS') {
      angular.extend(products, apiRes.payload['ArrayList<Product>']);
      defer.resolve();
      ProductRepo.reset();
    } else {
      console.error(apiRes.meta);
      throw "Unable to retrieve products";
    }
  };

  WsApi.listen(apiMapping.Product.listen).then(null, null, function (response) {
    process(response);
  });

  productsService.refreshProducts = function () {
    WsApi.fetch(apiMapping.Product.all).then(function (response) {
      process(response);
    });
  };

  productsService.getProducts = function () {
    return products;
  };

  productsService.getProductRemoteProducts = function (productId) {
    var remoteProducts = {};

    for (var i in products) {
      if (products[i].id == productId) {
        return products[i].remoteProducts;
      }
    }
  };

  productsService.getById = function (id) {
    return $q(function (resolve, reject) {
      productsService.ready.then(function () {
        for (var i in products) {
          if (products[i].id == id) {
            resolve(products[i]);
          }
        }
      });
    }.bind(productsService));
  };

  productsService.refreshProducts();

  productsService.ready = defer.promise;

});
