app.service('ProductsService', function ($q, ProductRepo, WsApi) {
  var service = this;

  var products = [];
  var productsLoading = false;
  var remoteProjects = {};
  var remoteProjectsLoading = [];

  var defer = $q.defer();

  var process = function (res) {
    var apiRes = angular.fromJson(res.body);

    if (apiRes.meta.status === 'SUCCESS') {
      products.length = 0;

      angular.extend(products, apiRes.payload['ArrayList<Product>']);
      defer.notify();
      productsLoading = false;

      var toRemove = {};
      for (var productId in remoteProjects) {
        toRemove[productId] = productId;
      }

      for (var key in products) {
        toRemove[products[key].id] = undefined;

        if (!remoteProjectsLoading[products[key].id]) {
          service.refreshRemoteProjectsForProduct(products[key].id);
        }
      }

      for (var id in toRemove) {
        remoteProjects[id] = undefined;
      }
    } else {
      console.error(apiRes.meta);
      throw "Unable to retrieve products";
    }
  };

  var processRemoteProject = function (res, productId) {
    var apiRes = angular.fromJson(res.body);

    if (apiRes.meta.status === 'SUCCESS') {
      if (angular.isDefined(remoteProjects[productId])) {
        for (var key in remoteProjects[productId]) {
          remoteProjects[productId][key] = undefined;
        }
      } else {
        remoteProjects[productId] = {};
      }

      angular.extend(remoteProjects[productId], apiRes.payload.HashMap);
      remoteProjectsLoading[productId] = false;
    } else {
      throw "Unable to retrieve remote projects for product " + productId;
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

  service.refreshRemoteProjectsForProduct = function (productId) {
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

        remoteProjectsLoading[productId] = true;

        WsApi.fetch(apiMapping.RemoteProjects.byProduct, options).then(function (res) {
          processRemoteProject(res, productId);
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

  service.refreshProducts();

  service.ready = defer.promise;

});
