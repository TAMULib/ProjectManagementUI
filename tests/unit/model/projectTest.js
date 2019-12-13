describe("model: Project", function () {

  var Project;

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.wsApi");
    inject(function (_$rootScope_, _$q_, _WsApi_, _Project_) {
      $rootScope = _$rootScope_;
      $q = _$q_;
      WsApi = _WsApi_;
      Project = _Project_;
    });
  });

  // describe("Is the model defined", function () {
  //   it("should be defined", function () {
  //     expect(Project).toBeDefined();
  //   });
  // });

});
