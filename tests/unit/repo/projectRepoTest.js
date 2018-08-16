describe('repo: ProjectRepo', function () {

    var ProjectRepo;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.wsApi');
        inject(function (_$rootScope_, _$q_, _WsApi_, _ProjectRepo_) {
            $rootScope = _$rootScope_;
            $q = _$q_;
            WsApi = _WsApi_;
            ProjectRepo = _ProjectRepo_;
        });
    });

    describe('Is the repo defined', function () {
        it('should be defined', function () {
            expect(ProjectRepo).toBeDefined();
        });
    });

});