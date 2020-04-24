describe("service: RemoteProductsService", function () {
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
    inject(function ($injector, _RemoteProductsService_) {
      $scope = $rootScope.$new();

      service = _RemoteProductsService_;

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
      "getByScopeId",
      "getRemoteProducts",
      "refreshRemoteProducts"
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

  describe("Does the service method", function () {
    it("getByScopeId get remote product by remote product manager id and scope id", function () {
      $rootScope.$apply();
      service.getByScopeId(1, 1934).then(function (remoteProduct) {
        expect(remoteProduct).toEqual(dataRemoteProducts["1"][0]);
      });
    });

    it("getRemoteProducts get remote products", function () {
      var remoteProducts = service.getRemoteProducts();
      expect(remoteProducts).toEqual(dataRemoteProducts);
    });

    it("refreshRemoteProducts fetch remote products", function () {
      deferred = $q.defer();
      spyOn(WsApi, "fetch").and.returnValue(deferred.promise);
      service.refreshRemoteProducts();
      deferred.resolve(dataRemoteProducts);
      expect(WsApi.fetch).toHaveBeenCalledWith(apiMapping.RemoteProducts.all);
    });
  });

});
