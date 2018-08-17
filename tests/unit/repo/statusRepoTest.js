describe('repo: StatusRepo', function () {

    var StatusRepo;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.wsApi');
        inject(function (_$rootScope_, _$q_, _WsApi_, _StatusRepo_) {
            $rootScope = _$rootScope_;
            $q = _$q_;
            WsApi = _WsApi_;
            StatusRepo = _StatusRepo_;
        });
    });

    // describe('Is the repo defined', function () {
    //     it('should be defined', function () {
    //         expect(StatusRepo).toBeDefined();
    //     });
    // });

});