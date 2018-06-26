app.service('RemoteProjectService', function ($q, WsApi) {

    this.getAll = function (vmsId) {
        angular.extend(apiMapping.VersionProject.all, {
            'method': vmsId + "/version-projects"
        });
        return $q(function (resolve, reject) {
            WsApi.fetch(apiMapping.VersionProject.all).then(function (response) {
                var apiRes = angular.fromJson(response.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    resolve(apiRes.payload['ArrayList<VersionProject>']);
                } else {
                    reject();
                }
            });
        });
    };

    this.getByScopeId = function (vmsId, scopeId) {
        angular.extend(apiMapping.VersionProject.getByScopeId, {
            'method': vmsId + "/version-projects/" + scopeId
        });
        return $q(function (resolve, reject) {
            WsApi.fetch(apiMapping.VersionProject.getByScopeId).then(function (response) {
                var apiRes = angular.fromJson(response.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    resolve(apiRes.payload.VersionProject);
                } else {
                    reject();
                }
            });
        });
    };

});