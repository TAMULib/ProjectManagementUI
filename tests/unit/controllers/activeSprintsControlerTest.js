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

    describe('Are the scope methods defined', function () {
        it('select should be defined', function () {
            expect(scope.select).toBeDefined();
            expect(typeof scope.select).toEqual('function');
        });
        it('kanbanHeader should be defined', function () {
            expect(scope.kanbanHeader).toBeDefined();
            expect(typeof scope.kanbanHeader).toEqual('function');
        });
        it('getSprintEstimateTotal should be defined', function () {
            expect(scope.getSprintEstimateTotal).toBeDefined();
            expect(typeof scope.getSprintEstimateTotal).toEqual('function');
        });
        it('getStatusEstimateTotal should be defined', function () {
            expect(scope.getStatusEstimateTotal).toBeDefined();
            expect(typeof scope.getStatusEstimateTotal).toEqual('function');
        });
        it('getAvatarUrl should be defined', function () {
            expect(scope.getAvatarUrl).toBeDefined();
            expect(typeof scope.getAvatarUrl).toEqual('function');
        });
        it('getHtmlContent should be defined', function () {
            expect(scope.getHtmlContent).toBeDefined();
            expect(typeof scope.getHtmlContent).toEqual('function');
        });
        it('getSelectedSprint should be defined', function () {
            expect(scope.getSelectedSprint).toBeDefined();
            expect(typeof scope.getSelectedSprint).toEqual('function');
        });
    });

    describe('Do the scope methods work as expected', function () {
        it('select should set session storage to selected index', function () {
            scope.select(0);
            expect(Number(sessionStorage.selected)).toEqual(0);
        });

        it('getSprintEstimateTotal should get sprint total estimate', function () {
            var total = scope.getSprintEstimateTotal(scope.activeSprints[0]);
            expect(total).toEqual(8.5);
        });

        it('getStatusEstimateTotal should get status total estimate', function () {
            scope.select(0);
            var total = scope.getStatusEstimateTotal({
                "id": 4,
                "identifier": "Accepted",
                "mapping": ["Accepted"]
            });
            expect(total).toEqual(8);
        });

        it('getAvatarUrl should get the member avatar url', function () {
            var avatarUrl = scope.getAvatarUrl({
                "id": "6616",
                "name": "Ryan Laddusaw",
                "avatar": "no_avatar.png"
            });
            expect(avatarUrl).toEqual('http://localhost:9001/images/no_avatar.png');
        });

        it('getHtmlContent should get trusted content', function () {
            var html = '<span>Hello, World!</span>';
            scope.getHtmlContent(html);
        });

        it('getSelectedSprint should get selected sprint', function () {
            scope.select(0);
            var selectedSprint = scope.getSelectedSprint();
            expect(selectedSprint).toEqual(scope.activeSprints[0]);
        });
    });

});