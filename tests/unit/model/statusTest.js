describe('model: Status', function () {

    var Status;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.wsApi');
        inject(function (_$rootScope_, _$q_, _WsApi_, _Status_) {
            $rootScope = _$rootScope_;
            $q = _$q_;
            WsApi = _WsApi_;
            Status = _Status_;
        });
    });

    // describe('Is the model defined', function () {
    //     it('should be defined', function () {
    //         expect(Status).toBeDefined();
    //     });
    // });

});