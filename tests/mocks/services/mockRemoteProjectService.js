angular.module('mock.remoteProjectService', []).service('RemoteProjectsService', function ($q) {

    this.getAll = function (remoteProjectManagerId) {
        return $q(function (resolve, reject) {
            resolve([]);
        });
    };

    this.getByScopeId = function (remoteProjectManagerId, scopeId) {
        return $q(function (resolve, reject) {
            resolve({});
        });
    };

});