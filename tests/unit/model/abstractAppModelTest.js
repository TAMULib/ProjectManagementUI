describe("model: AbstractAppModel", function () {

  var AbstractAppModel;

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.wsApi");
    inject(function (_$rootScope_, _$q_, _WsApi_, _AbstractAppModel_) {
      $rootScope = _$rootScope_;
      $q = _$q_;
      WsApi = _WsApi_;
      AbstractAppModel = _AbstractAppModel_;
    });
  });

  describe("Is the model defined", function () {
    it("should be defined", function () {
      expect(AbstractAppModel).toBeDefined();
    });
  });

});
