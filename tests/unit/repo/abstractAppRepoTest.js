describe('repo: AbstractAppRepo', function () {

    var AbstractAppRepo;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.wsApi');
        inject(function (_$rootScope_, _$q_, _WsApi_, _AbstractAppRepo_) {
            $rootScope = _$rootScope_;
            $q = _$q_;
            WsApi = _WsApi_;
            AbstractAppRepo = _AbstractAppRepo_;
        });
    });

    describe('Is the repo defined', function () {
        it('should be defined', function () {
            expect(AbstractAppRepo).toBeDefined();
        });
    });

});