describe("repo: RemoteProjectManagerRepo", function () {

  var RemoteProjectManagerRepo;

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.wsApi");
    inject(function (_$rootScope_, _$q_, _WsApi_, _RemoteProjectManagerRepo_) {
      $rootScope = _$rootScope_;
      $q = _$q_;
      WsApi = _WsApi_;
      RemoteProjectManagerRepo = _RemoteProjectManagerRepo_;
    });
  });

  // describe("Is the repo defined", function () {
  //   it("should be defined", function () {
  //     expect(RemoteProjectManagerRepo).toBeDefined();
  //   });
  // });

});
