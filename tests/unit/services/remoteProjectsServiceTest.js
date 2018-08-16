describe('service: RemoteProjectsService', function () {

    var RemoteProjectsService;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.wsApi');
        module('mock.projectRepo');
        inject(function (_$q_, _WsApi_, _ProjectRepo_, _RemoteProjectsService_) {
            $q = _$q_;
            WsApi = _WsApi_;
            ProjectRepo = _ProjectRepo_;
            RemoteProjectsService = _RemoteProjectsService_;
        });
    });

    describe('Is the service defined', function () {
        it('should be defined', function () {
            expect(RemoteProjectsService).toBeDefined();
        });
    });

});