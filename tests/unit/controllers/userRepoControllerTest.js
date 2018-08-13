describe('controller: UserRepoController', function () {

    var scope, controller;

    beforeEach(module('core'));
    beforeEach(module('app'));
    beforeEach(module('mock.storageService'));
    beforeEach(module('mock.userService'));

    beforeEach(inject(function ($controller, $rootScope, _StorageService_, _UserService_) {
        installPromiseMatchers();
        scope = $rootScope.$new();
        controller = $controller('UserRepoController', {
            $scope: scope,
            StorageService: _StorageService_,
            UserService: _UserService_
        });
    }));

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

});