app.service('ActiveSprintsService', function ($q, WsApi) {

  var activeSprints = [];

  var defer = $q.defer();

  var process = function (response) {
    var apiRes = angular.fromJson(response.body);
    if (apiRes.meta.status === 'SUCCESS') {
      activeSprints.length = 0;
      angular.extend(activeSprints, apiRes.payload['ArrayList<Sprint>']);
      defer.notify();
    } else {
      console.error(apiRes.meta);
      throw "Unable to retrieve active sprints";
    }
  };

  WsApi.listen(apiMapping.ActiveSprints.listen).then(null, null, function (response) {
    process(response);
  });

  this.refreshActiveSprints = function () {
    WsApi.fetch(apiMapping.ActiveSprints.all).then(function (response) {
      process(response);
    });
  };

  this.getActiveSprints = function () {
    return activeSprints;
  };

  this.refreshActiveSprints();

  this.updated = defer.promise;

});
