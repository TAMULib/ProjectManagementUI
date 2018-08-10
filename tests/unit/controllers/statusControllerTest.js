describe('controller: StatusController', function () {

    var scope, controller;

    beforeEach(module('core'));
    beforeEach(module('app'));
    beforeEach(module('mock.statusRepo'));

    beforeEach(inject(function ($controller, $rootScope, _StatusRepo_) {
        installPromiseMatchers();
        scope = $rootScope.$new();
        controller = $controller('StatusController', {
            $scope: scope,
            StatusRepo: _StatusRepo_
        });
    }));

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

});