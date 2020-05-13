describe("service: InternalStatsService", function () {
  var $q, $rootScope, $scope, InternalRequestRepo, WsApi, service;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _$timeout_, _InternalRequestRepo_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      InternalRequestRepo = _InternalRequestRepo_;
      WsApi = _WsApi_;
    });
  };

  var initializeService = function (settings) {
    inject(function ($injector, _InternalStatsService_) {
      $scope = $rootScope.$new();

      service = _InternalStatsService_;

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.internalRequest");
    module("mock.internalRequestRepo");
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
      "getStats",
      "refreshStats"
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
      "ready"
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

  describe("Do the service method", function () {
    it("getStats should return internal stats", function () {
      var response = service.getStats();
      expect(response).toEqual(dataInternalStats1);
    });

    it("refreshStats should refresh stats", function () {
      var response;

      // @todo
    });
  });

});
