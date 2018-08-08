angular.module('mock.userService', []).service('UserService', function ($q) {

    this.userEvents = function () {
        var defer = $q.defer();


        return defer.promise;
    }

});