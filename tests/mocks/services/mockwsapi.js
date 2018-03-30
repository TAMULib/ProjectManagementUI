angular.module('mock.wsApi', []).service('WsApi', function ($q) {

    this.fetch = function (apiReq) {
        var defer = $q.defer();
        return defer.promise;
    }

    this.listen = function (apiReq) {
        var defer = $q.defer();
        return defer.promise;
    }

});