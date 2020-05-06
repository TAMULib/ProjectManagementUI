app.service('RemoteProductsByProductIdService', function ($q, WsApi) {
    var service = this;

    var productId;
    var remoteProducts = {};

    var process = function (response) {
      var apiRes = angular.fromJson(response.body);

      if (apiRes.meta.status === 'SUCCESS') {
        if (productId) {
          angular.extend(remoteProducts, apiRes.payload.HashMap);
        }
      } else {
        console.error(apiRes.meta);
        throw "Unable to retrieve remote products for product";
      }
    };

    WsApi.listen(apiMapping.Product.listen).then(null, null, function (response) {
      if (productId === undefined) {
        return;
      }

      // @todo: walk through list of projects and only perform this if project for projectId is present.

      //service.fetchRemoteProductsByProductId();
    });

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

      var options = {
        pathValues: {
          productId: id
        }
      };

      WsApi.fetch(apiMapping.RemoteProducts.byProduct, options).then(function (response) {
        process(response);
      });
    };

    service.productId = function () {
      return productId;
    };

    service.remoteProducts = function () {
      return remoteProducts;
    };

});
