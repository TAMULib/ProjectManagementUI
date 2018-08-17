describe('repo: UserRepo', function () {

    var UserRepo;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.wsApi');
        inject(function (_$rootScope_, _$q_, _WsApi_, _UserRepo_) {
            $rootScope = _$rootScope_;
            $q = _$q_;
            WsApi = _WsApi_;
            UserRepo = _UserRepo_;
        });
    });

    describe('Is the repo defined', function () {
        it('should be defined', function () {
            expect(UserRepo).toBeDefined();
        });
    });

});