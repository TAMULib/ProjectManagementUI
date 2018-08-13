describe('controller: ManagementController', function () {

    var scope, controller;

    beforeEach(module('core'));
    beforeEach(module('app'));

    beforeEach(inject(function ($controller, $rootScope) {
        installPromiseMatchers();
        scope = $rootScope.$new();
        controller = $controller('ManagementController', {
            $scope: scope
        });
    }));

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

});