angular.module('mock.userService', []).service('UserService', function ($q) {

  this.userEvents = function () {
    var defer = $q.defer();
    return defer.promise;
  }

  this.getCurrentUser = function () {
    return {};
  }

  this.userReady = function () {
    return $q(function (resolve) {
      resolve();
    });
  }

});
