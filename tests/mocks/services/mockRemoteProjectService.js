angular.module('mock.remoteProjectService', []).service('RemoteProjectService', function ($q) {

    this.getAll = function (vmsId) {
        return $q(function (resolve, reject) {
            resolve([]);
        });
    };

    this.getByScopeId = function (vmsId, scopeId) {
        return $q(function (resolve, reject) {
            resolve({});
        });
    };

});