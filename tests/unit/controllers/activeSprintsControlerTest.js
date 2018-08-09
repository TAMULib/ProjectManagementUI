describe('controller: ActiveSprintsController', function () {

    var scope, controller;

    beforeEach(module('core'));
    beforeEach(module('app'));
    beforeEach(module('mock.activeSprintsService'));
    beforeEach(module('mock.statusRepo'));

    beforeEach(inject(function ($controller, $sce, $rootScope, _ActiveSprintsService_, _StatusRepo_) {
        installPromiseMatchers();
        scope = $rootScope.$new();
        controller = $controller('ActiveSprintsController', {
            $scope: scope,
            $sce: $sce,
            ActiveSprintsService: _ActiveSprintsService_,
            StatusRepo: _StatusRepo_
        });
    }));

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

});