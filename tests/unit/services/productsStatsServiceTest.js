describe("service: ProductsStatsService", function () {
  var $q, $rootScope, $scope, ProductRepo, WsApi, service;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _ProductRepo_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      ProductRepo = _ProductRepo_;
      WsApi = _WsApi_;
    });
  };

  var initializeService = function (settings) {
    inject(function ($injector, _ProductsStatsService_) {
      $scope = $rootScope.$new();

      service = _ProductsStatsService_;

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.productRepo");
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
      "getById",
      "getProductsStats",
      "refreshProductsStats"
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
    it("getById get product stats by id", function () {
      $rootScope.$apply();
      service.getById(1).then(function (productStats) {
        expect(productStats).toEqual(dataProductsStats[0]);
      });
    });

    it("getProductsStats get product stats", function () {
      var productsStats = service.getProductsStats();
      expect(productsStats).toEqual(dataProductsStats);
    });

    it("refreshProductsStats fetch product stats", function () {
      deferred = $q.defer();
      spyOn(WsApi, "fetch").and.returnValue(deferred.promise);
      service.refreshProductsStats();
      deferred.resolve(dataProductsStats);
      expect(WsApi.fetch).toHaveBeenCalledWith(apiMapping.ProductsStats.all);
    });
  });

});
