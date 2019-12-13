describe('model: RemoteProjectManager', function () {

  var RemoteProjectManager;

  beforeEach(function () {
    module('core');
    module('app');
    module('mock.wsApi');
    inject(function (_$rootScope_, _$q_, _WsApi_, _RemoteProjectManager_) {
      $rootScope = _$rootScope_;
      $q = _$q_;
      WsApi = _WsApi_;
      RemoteProjectManager = _RemoteProjectManager_;
    });
  });

  // describe('Is the model defined', function () {
  //   it('should be defined', function () {
  //     expect(RemoteProjectManager).toBeDefined();
  //   });
  // });

});
