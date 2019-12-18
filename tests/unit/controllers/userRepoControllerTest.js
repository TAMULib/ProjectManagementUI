describe("controller: UserRepoController", function () {
  var $q, $scope, MockedUser, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _WsApi_) {
      $q = _$q_;

      MockedUser = new mockUser($q);

      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$injector_, _$location_, _$rootScope_, _$route_, _$window_, _ModalService_, _RestApi_, _StorageService_, _UserRepo_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("UserRepoController", {
        $route: _$route_,
        $scope: $scope,
        $injector: _$injector_,
        $location: _$location_,
        $window: _$window_,
        ModalService: _ModalService_,
        RestApi: _RestApi_,
        StorageService: _StorageService_,
        UserRepo: _UserRepo_,
        UserService: _UserService_,
        WsApi: WsApi
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
    module("mock.modalService");
    module("mock.restApi");
    module("mock.storageService");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userRepo");
    module("mock.userService");
    module("mock.wsApi");

    installPromiseMatchers();
    initializeVariables();
    initializeController();
  });

  describe("Is the controller defined", function () {
    it("should be defined for admin", function () {
      initializeController({role: "ROLE_ADMIN"});
      expect(controller).toBeDefined();
    });

    it("should be defined for manager", function () {
      initializeController({role: "ROLE_MANAGER"});
      expect(controller).toBeDefined();
    });

    it("should be defined for anonymous", function () {
      initializeController({role: "ROLE_ANONYMOUS"});
      expect(controller).toBeDefined();
    });
  });

  describe("Are the scope methods defined", function () {
    it("allowableRoles should be defined", function () {
      expect($scope.allowableRoles).toBeDefined();
      expect(typeof $scope.allowableRoles).toEqual("function");
    });

    it("updateRole should be defined", function () {
      expect($scope.updateRole).toBeDefined();
      expect(typeof $scope.updateRole).toEqual("function");
    });
  });

  describe("Do the scope methods work as expected", function () {
    it("allowableRoles should return a list of allowed roles", function () {
      var roles;

      roles = $scope.allowableRoles();
      expect(roles).toBeDefined();

      initializeController({role: "ROLE_MANAGER"});

      roles = $scope.allowableRoles("ROLE_ADMIN");
      expect(roles).toBeDefined();

      roles = $scope.allowableRoles();
      expect(roles).toBeDefined();

      roles = $scope.allowableRoles("ROLE_USER");
      expect(roles).toBeDefined();

      initializeController({role: "ROLE_USER"});
      expect($scope.allowableRoles).not.toBeDefined();
    });

    it("updateRole should update a users role", function () {
      var originalUser2 = angular.copy(dataUser2);
      dataUser2.role = "ROLE_NEW";
      dataUser2.save = function () {};

      spyOn(dataUser2, "save");

      $scope.updateRole(dataUser2);
      $scope.$digest();

      expect(dataUser2.role).not.toEqual(originalUser2.role);
      expect(dataUser2.save).toHaveBeenCalled();

      dataUser2.role = "ROLE_ANNOTATOR";
      dataUser2.save = function () {};

      spyOn(dataUser2, "save");

      $scope.updateRole(dataUser2);
      $scope.$digest();

      expect(dataUser2.save).toHaveBeenCalled();

      dataUser2.role = "ROLE_USER";
      dataUser2.save = function () {};

      spyOn(dataUser2, "save");

      $scope.updateRole(dataUser2);
      $scope.$digest();

      expect(dataUser2.save).toHaveBeenCalled();
    });
  });

});
