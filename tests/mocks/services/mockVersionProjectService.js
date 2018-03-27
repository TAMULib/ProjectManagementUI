angular.module('mock.versionProjectService', []).service('VersionProjectService', function ($q) {

    var AuthService = this;

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