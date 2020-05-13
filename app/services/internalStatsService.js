app.service('InternalStatsService', function ($q, InternalRequestRepo, WsApi) {
  var service = this;

  var defer = $q.defer();

  var stats = {
    internalCount: 0
  };

  var refreshable = true;

  var process = function (response) {
    var apiRes = angular.fromJson(response.body);

    if (apiRes.meta.status === 'SUCCESS') {
      for (var key in stats) {
        stats[key] = undefined;
      }

      angular.extend(stats, apiRes.payload.InternalStats);
      defer.notify();
    } else {
      console.error(apiRes.meta);
      throw "Unable to retrieve internal stats";
    }
  };

  WsApi.listen(apiMapping.FeatureRequest.listen).then(null, null, function (response) {
    service.refreshStats();
  });

  service.refreshStats = function () {
    if (refreshable) {
      refreshable = false;
      WsApi.fetch(apiMapping.FeatureRequest.stats).then(function (response) {
        process(response);
        refreshable = true;
      });
    }
  };

  service.getStats = function () {
    return stats;
  };

  this.refreshStats();

  this.ready = defer.promise;

});
