describe("controller: InternalStatsController", function () {
  var $q, $scope, InternalRequestRepo, InternalStatsService, MockedUser, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$compile_, _$q_, _InternalRequestRepo_, _InternalStatsService_, _WsApi_) {
      $q = _$q_;

      InternalStatsService = _InternalStatsService_;
      InternalRequestRepo = _InternalRequestRepo_;

      MockedUser = new mockUser($q);

      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("InternalStatsController", {
        $scope: $scope,
        InternalRequestRepo: InternalRequestRepo,
        InternalStatsService: InternalStatsService,
        UserService: _UserService_
      });

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module("templates");
    module("mock.internalRequestRepo");
    module("mock.internalStatsService");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");
    module("mock.wsApi");

    installPromiseMatchers();
    initializeVariables();
    initializeController();
  });

  describe("Is the controller", function () {
    var roles = [ "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER", "ROLE_ANONYMOUS" ];

    var controllerExists = function (setting) {
      return function() {
        initializeController(setting);
        expect(controller).toBeDefined();
      };
    };

    for (var i in roles) {
      it("defined for " + roles[i], controllerExists({ role: roles[i] }));
    }
  });

});
