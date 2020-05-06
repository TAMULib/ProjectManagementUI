app.service('InternalRequestsService', function ($q, InternalRequestRepo, WsApi) {
  var internalRequestsService = this;

  internalRequestsService.pushFeatureRequest = function(featureRequest) {
    var options = {
      data: featureRequest.scopeId,
      pathValues: {
        requestId: featureRequest.id,
        productId: featureRequest.productId,
        rpmId: featureRequest.rpmId,
      }
    };

    return $q(function (resolve, reject) {
      WsApi.fetch(apiMapping.FeatureRequest.push, options).then(function (response) {
        var apiRes = angular.fromJson(response.body);

        if (apiRes.meta.status === 'SUCCESS') {
          resolve();
        } else {
          reject('Push failed!');
        }
      }, function error(error) {
        console.error(error);
        reject(error);
      });
    });
  };

});
