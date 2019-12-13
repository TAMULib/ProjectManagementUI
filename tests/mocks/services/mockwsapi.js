angular.module('mock.wsApi', []).service('WsApi', function ($q) {

  this.fetch = function (apiReq) {
    var defer = $q.defer();
    if (apiReq === apiMapping.ActiveSprints.all) {
      defer.resolve({
        body: angular.toJson({
          meta: {
            status: "SUCCESS"
          },
          payload: {
            "ArrayList<Sprint>": mockActiveSprints
          }
        })
      });
    }
    if (apiReq === apiMapping.ProjectsStats.all) {
      defer.resolve({
        body: angular.toJson({
          meta: {
            status: "SUCCESS"
          },
          payload: {
            "ArrayList<ProjectStats>": mockProjectsStats
          }
        })
      });
    }
    if (apiReq === apiMapping.RemoteProjects.all) {
      defer.resolve({
        body: angular.toJson({
          meta: {
            status: "SUCCESS"
          },
          payload: {
            "HashMap": mockRemoteProjects
          }
        })
      });
    }
    return defer.promise;
  }

  this.listen = function (apiReq) {
    var defer = $q.defer();
    return defer.promise;
  }


});
