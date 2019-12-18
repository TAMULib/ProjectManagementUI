describe("service: ActiveSprintsService", function () {
  var $q, $rootScope, $scope, WsApi, service;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

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

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect(service[methods[i]]).toBeDefined();
        expect(typeof service[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Is the service property", function () {
    var properties = [
      "updated"
    ];

    for (var i in properties) {
      it(properties[i] + " defined", function () {
        expect(service[properties[i]]).toBeDefined();
        expect(typeof service[properties[i]]).toEqual("object");
      });
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
