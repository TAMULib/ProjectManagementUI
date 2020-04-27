describe("model: RemoteProductManager", function () {
  var $rootScope, $scope, WsApi, model;

  var initializeVariables = function (settings) {
    inject(function (_$rootScope_, _WsApi_) {
      $rootScope = _$rootScope_;

      WsApi = _WsApi_;
    });
  };

  var initializeModel = function (settings) {
    inject(function (_RemoteProductManager_) {
      $scope = $rootScope.$new();

      model = angular.extend(new _RemoteProductManager_(), dataRemoteProductManager1);
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.wsApi");

    initializeVariables();
    initializeModel();
  });

  describe("Is the model", function () {
    it("defined", function () {
      expect(model).toBeDefined();
    });
  });
});
