describe("service: userRepo", function () {
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
    inject(function ($injector, UserRepo) {
      $scope = $rootScope.$new();

      repo = UserRepo;
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.wsApi");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");

    initializeVariables();
    initializeRepo();
  });

  describe("Is the repo", function () {
    it("defined", function () {
      expect(repo).toBeDefined();
    });
  });

});
