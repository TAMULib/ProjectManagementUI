app.service('InternalRequestsService', function ($q, InternalRequestRepo, WsApi) {
  var internalRequestsService = this;

  internalRequestsService.pushFeatureRequest = function(featureRequest) {
    var push = angular.copy(apiMapping.FeatureRequest.push);

    angular.extend(push, {
      'data': {
        productId: featureRequest.productId,
        scopeId: featureRequest.scopeId
      },
      'method': apiMapping.FeatureRequest.push.method + '/' + featureRequest.id
    });

    return $q(function (resolve, reject) {
      WsApi.fetch(push).then(function (response) {
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
