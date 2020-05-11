app.service('ProductsService', function ($q, ProductRepo, WsApi) {
  var service = this;

  var products = [];
  var remoteProducts = {};

  var defer = $q.defer();

  var process = function (response) {
    var apiRes = angular.fromJson(response.body);

    if (apiRes.meta.status === 'SUCCESS') {
      products.length = 0;
      angular.extend(products, apiRes.payload['ArrayList<Product>']);
      defer.notify();
    } else {
      console.error(apiRes.meta);
      throw "Unable to retrieve products";
    }
  };

  var processRemoteProduct = function (response, productId, deferRefresh) {
    var apiRes = angular.fromJson(response.body);

    if (apiRes.meta.status === 'SUCCESS') {
      if (angular.isDefined(remoteProducts[productId])) {
        for (var key in remoteProducts[productId]) {
          remoteProducts[productId][key] = undefined;
        }
      } else {
        remoteProducts[productId] = {};
      }

      angular.extend(remoteProducts[productId], apiRes.payload.HashMap);
      deferRefresh.notify();
    } else {
      throw "Unable to retrieve remote products for product " + productId;
    }
  };

  WsApi.listen(apiMapping.Product.listen).then(null, null, function (response) {
    process(response);
  });

  service.refreshProducts = function () {
    WsApi.fetch(apiMapping.Product.all).then(function (response) {
      process(response);

      for (var productId in remoteProducts) {
        service.refreshRemoteProducts(productId);
      }
    });
  };

  service.refreshRemoteProducts = function (productId) {
    var deferRefresh = $q.defer();
    var options = {
      pathValues: {
        productId: productId
      }
    };

    WsApi.fetch(apiMapping.RemoteProducts.byProduct, options).then(function (response) {
      processRemoteProduct(response, productId, deferRefresh);
    });

    return deferRefresh.promise;
  };

  service.getRemoteProducts = function () {
    return remoteProducts;
  };

  service.getProducts = function () {
    return products;
  };

  service.getRemoteProductInfo = function (productId) {
    for (var i in products) {
      if (products[i].id == productId) {
        return products[i].remoteProducts;
      }
    }
  };

  service.getById = function (id) {
    return $q(function (resolve, reject) {
      service.ready.then(function () {
        for (var i in products) {
          if (products[i].id == id) {
            resolve(products[i]);
          }
        }
      });
    }.bind(service));
  };

  service.refreshProducts();

  service.ready = defer.promise;

});
