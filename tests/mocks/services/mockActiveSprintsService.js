angular.module('mock.activeSprintsService', []).service('ActiveSprintsService', function ($q) {

  this.getActiveSprints = function () {
    return [];
  };

  this.updated = $q.defer().promise;

});