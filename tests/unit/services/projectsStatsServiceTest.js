describe('service: ProjectsStatsService', function () {

    var ProjectsStatsService;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.wsApi');
        module('mock.projectRepo');
        inject(function (_$q_, _WsApi_, _ProjectRepo_, _ProjectsStatsService_) {
            $q = _$q_;
            WsApi = _WsApi_;
            ProjectRepo = _ProjectRepo_;
            ProjectsStatsService = _ProjectsStatsService_;
        });
    });

    describe('Is the service defined', function () {
        it('should be defined', function () {
            expect(ProjectsStatsService).toBeDefined();
        });
    });

});