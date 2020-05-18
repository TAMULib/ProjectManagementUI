app.service('RemoteProductsService', function ($q, ProductRepo, WsApi) {

  var remoteProductInfo = {};

  var defer = $q.defer();

  var process = function (response) {
    var apiRes = angular.fromJson(response.body);
    if (apiRes.meta.status === 'SUCCESS') {
      for (var key in remoteProductInfo) {
        remoteProductInfo[key] = undefined;
      }
      angular.extend(remoteProductInfo, apiRes.payload.HashMap);
      defer.resolve();
      ProductRepo.reset();
    } else {
      console.error(apiRes.meta);
      throw "Unable to retrieve remote product information";
    }
  };

  WsApi.listen(apiMapping.RemoteProducts.listen).then(null, null, function (response) {
    process(response);
  });

  this.refreshRemoteProductInfo = function () {
    WsApi.fetch(apiMapping.RemoteProducts.all).then(function (response) {
      process(response);
    });
  };

  this.getRemoteProductInfo = function () {
    return remoteProductInfo;
  };

  this.refreshRemoteProductInfo();

  this.ready = defer.promise;

});
