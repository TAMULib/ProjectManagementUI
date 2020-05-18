app.service('RemoteProjectsService', function ($q, ProductRepo, WsApi) {

  var remoteProjectInfo = {};

  var defer = $q.defer();

  var process = function (response) {
    var apiRes = angular.fromJson(response.body);
    if (apiRes.meta.status === 'SUCCESS') {
      for (var key in remoteProjectInfo) {
        remoteProjectInfo[key] = undefined;
      }
      angular.extend(remoteProjectInfo, apiRes.payload.HashMap);
      defer.resolve();
      ProductRepo.reset();
    } else {
      console.error(apiRes.meta);
      throw "Unable to retrieve remote project information";
    }
  };

  WsApi.listen(apiMapping.RemoteProjects.listen).then(null, null, function (response) {
    process(response);
  });

  this.refreshRemoteProjectInfo = function () {
    WsApi.fetch(apiMapping.RemoteProjects.all).then(function (response) {
      process(response);
    });
  };

  this.getRemoteProjectInfo = function () {
    return remoteProjectInfo;
  };

  this.refreshRemoteProjectInfo();

  this.ready = defer.promise;

});
