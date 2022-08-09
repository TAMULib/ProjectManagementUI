describe("service: ActiveSprintsService", function () {
  var $q, $rootScope, $scope, MockedUser, WsApi, service;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;
      MockedUser = new mockUser($q);
      WsApi = _WsApi_;
    });
  };

  var initializeService = function (settings) {
    inject(function ($injector, _ActiveSprintsService_) {
      $scope = $rootScope.$new();

      service = _ActiveSprintsService_;

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");
    module("mock.wsApi");

    initializeVariables();
    initializeService();
  });

  describe("Is the service", function () {
    it("defined", function () {
      expect(service).toBeDefined();
    });
  });

  describe("Is the service method", function () {
    var methods = [
      "getActiveSprints",
      "refreshActiveSprints"
    ];

    var serviceMethodExists = function (method) {
      return function() {
        expect(service[method]).toBeDefined();
        expect(typeof service[method]).toEqual("function");
      };
    };

    for (var i in methods) {
      it(methods[i] + " defined", serviceMethodExists(methods[i]));
    }
  });

  describe("Is the service property", function () {
    var properties = [
      "updated"
    ];

    var servicePropertyExists = function (property) {
      return function() {
        expect(service[property]).toBeDefined();
        expect(typeof service[property]).toEqual("object");
      };
    };

    for (var i in properties) {
      it(properties[i] + " defined", servicePropertyExists(properties[i]));
    }
  });

  describe("Does the service method", function () {
    it("getActiveSprints get active sprints", function () {
      $rootScope.$apply();
      var activeSprints = service.getActiveSprints();
      expect(activeSprints).toEqual(mockActiveSprints);
    });

    it("refreshActiveSprints fetch active sprints", function () {
      deferred = $q.defer();
      spyOn(WsApi, "fetch").and.returnValue(deferred.promise);
      service.refreshActiveSprints();
      deferred.resolve(mockActiveSprints);
      expect(WsApi.fetch).toHaveBeenCalledWith(apiMapping.ActiveSprints.all);
    });
  });

});
