app.service('RemoteProjectsService', function ($q, ProjectRepo, WsApi) {

    var remoteProjects = {};

    var defer = $q.defer();

    var process = function (response) {
        var apiRes = angular.fromJson(response.body);
        if (apiRes.meta.status === 'SUCCESS') {
            for (var key in remoteProjects) {
                remoteProjects[key] = undefined;
            }
            angular.extend(remoteProjects, apiRes.payload.HashMap);
            defer.resolve();
            ProjectRepo.reset();
        } else {
            console.error(apiRes.meta);
            throw "Unable to retrieve remote projects";
        }
    };

    WsApi.listen(apiMapping.RemoteProjects.listen).then(null, null, function (response) {
        process(response);
    });

    this.refreshRemoteProjects = function () {
        WsApi.fetch(apiMapping.RemoteProjects.all).then(function (response) {
            process(response);
        });
    };

    this.getRemoteProjects = function () {
        return remoteProjects;
    };

    this.getAll = function (remoteProjectManagerId) {
        return $q(function (resolve, reject) {
            this.ready.then(function () {
                resolve(remoteProjects[remoteProjectManagerId]);
            });
        }.bind(this));
    };

    this.getByScopeId = function (remoteProjectManagerId, scopeId) {
        return $q(function (resolve, reject) {
            this.ready.then(function () {
                for (var i in remoteProjects[remoteProjectManagerId]) {
                    if (remoteProjects[remoteProjectManagerId][i].id === scopeId) {
                        resolve(remoteProjects[remoteProjectManagerId][i]);
                    }
                }
            });
        }.bind(this));
    };

    this.refreshRemoteProjects();

    this.ready = defer.promise;

});