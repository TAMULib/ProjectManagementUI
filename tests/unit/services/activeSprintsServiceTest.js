describe('service: ActiveSprintsService', function () {

    var ActiveSprintsService;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.wsApi');
        inject(function (_$q_, _WsApi_, _ActiveSprintsService_) {
            $q = _$q_;
            WsApi = _WsApi_;
            ActiveSprintsService = _ActiveSprintsService_;
        });
    });

    describe('Is the service defined', function () {
        it('should be defined', function () {
            expect(ActiveSprintsService).toBeDefined();
        });
    });

});