app.service('ProductsService', function ($q, ProductRepo, WsApi) {
  var service = this;

  var products = [];
  var productsLoading = false;
  var remoteProducts = {};
  var remoteProductsLoading = [];

  var defer = $q.defer();

  var process = function (res) {
    var apiRes = angular.fromJson(res.body);

    if (apiRes.meta.status === 'SUCCESS') {
      products.length = 0;

      angular.extend(products, apiRes.payload['ArrayList<Product>']);
      defer.notify();
      productsLoading = false;

      var toRemove = {};
      for (var productId in remoteProducts) {
        toRemove[productId] = productId;
      }

      for (var key in products) {
        toRemove[products[key].id] = undefined;

        if (!remoteProductsLoading[products[key].id]) {
          service.refreshRemoteProducts(products[key].id);
        }
      }

      for (var id in toRemove) {
        remoteProducts[id] = undefined;
      }
    } else {
      console.error(apiRes.meta);
      throw "Unable to retrieve products";
    }
  };

  var processRemoteProduct = function (res, productId) {
    var apiRes = angular.fromJson(res.body);

    if (apiRes.meta.status === 'SUCCESS') {
      if (angular.isDefined(remoteProducts[productId])) {
        for (var key in remoteProducts[productId]) {
          remoteProducts[productId][key] = undefined;
        }
      } else {
        remoteProducts[productId] = {};
      }

      angular.extend(remoteProducts[productId], apiRes.payload.HashMap);
      remoteProductsLoading[productId] = false;
    } else {
      throw "Unable to retrieve remote products for product " + productId;
    }
  };

  WsApi.listen(apiMapping.Product.listen).then(null, null, function (res) {
    service.refreshProducts();
  });

  service.refreshProducts = function () {
    if (productsLoading === false) {
      productsLoading = true;

      WsApi.fetch(apiMapping.Product.all).then(function (res) {
        process(res);
      });
    }
  };

  service.refreshRemoteProducts = function (productId) {
    if (productsLoading === false) {
      var productFound = false;
      for (var key in products) {
        if (products[key].id === productId) {
          productFound = true;
          break;
        }
      }

      if (productFound) {
        var options = {
          pathValues: {
            productId: productId
          }
        };

        remoteProductsLoading[productId] = true;

        WsApi.fetch(apiMapping.RemoteProducts.byProduct, options).then(function (res) {
          processRemoteProduct(res, productId);
        });
      }
    }
  };

  service.getProducts = function () {
    return products;
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

  service.refreshProducts();

  service.ready = defer.promise;

});
