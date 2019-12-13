describe('controller: UserRepoController', function () {

  var scope, controller;

  beforeEach(function () {
    module('core');
    module('app');
    module('mock.storageService');
    module('mock.userService');
    inject(function ($controller, $rootScope, _StorageService_, _UserService_) {
      scope = $rootScope.$new();
      controller = $controller('UserRepoController', {
        $scope: scope,
        StorageService: _StorageService_,
        UserService: _UserService_
      });
    });
  });

  describe('Is the controller defined', function () {
    it('should be defined', function () {
      expect(controller).toBeDefined();
    });
  });

});
