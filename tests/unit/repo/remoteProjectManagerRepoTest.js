describe("service: RemoteProjectManagerRepo", function () {
  var $q, $rootScope, $scope, MockedUser, WsApi, repo;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      MockedUser = new mockUser($q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function (settings) {
    inject(function ($injector, _RemoteProjectManagerRepo_) {
      $scope = $rootScope.$new();

      repo = _RemoteProjectManagerRepo_;
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.wsApi");

    initializeVariables();
    initializeRepo();
  });

  describe("Is the repo", function () {
    it("defined", function () {
      expect(repo).toBeDefined();
    });
  });

  describe("Is the repo method", function () {
    var methods = [
      "getTypes",
      "getTypeScaffolding"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect(repo[methods[i]]).toBeDefined();
        expect(typeof repo[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Does the repo method", function () {
    it("getTypes work as expected", function () {
      var response = repo.getTypes();
      $scope.$digest();

      // TODO
    });

    it("getTypeScaffolding work as expected", function () {
      var response = repo.getTypeScaffolding();
      $scope.$digest();

      // TODO
    });
  });

});
