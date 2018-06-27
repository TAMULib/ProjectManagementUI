app.service('VersionProjectService', function ($q, WsApi) {

    this.getAll = function (remoteProjectManagerId) {
        angular.extend(apiMapping.RemoteProject.all, {
            'method': remoteProjectManagerId + "/remote-projects"
        });
        return $q(function (resolve, reject) {
            WsApi.fetch(apiMapping.RemoteProject.all).then(function (response) {
                var apiRes = angular.fromJson(response.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    resolve(apiRes.payload['ArrayList<RemoteProject>']);
                } else {
                    reject();
                }
            });
        });
    };

    this.getByScopeId = function (remoteProjectManagerId, scopeId) {
        angular.extend(apiMapping.RemoteProject.getByScopeId, {
            'method': remoteProjectManagerId + "/remote-projects/" + scopeId
        });
        return $q(function (resolve, reject) {
            WsApi.fetch(apiMapping.RemoteProject.getByScopeId).then(function (response) {
                var apiRes = angular.fromJson(response.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    resolve(apiRes.payload.RemoteProject);
                } else {
                    reject();
                }
            });
        });
    };

});