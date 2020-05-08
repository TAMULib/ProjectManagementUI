describe("service: RemoteProductsByProductIdService", function () {
  var $q, $rootScope, $scope, WsApi, service;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      WsApi = _WsApi_;
    });
  };

  var initializeService = function (settings) {
    inject(function ($injector, _RemoteProductsByProductIdService_) {
      $scope = $rootScope.$new();

      service = _RemoteProductsByProductIdService_;

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.product");
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
      "productId",
      "refreshRemoteProductsByProductId",
      "remoteProducts"
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

  describe("Do the service method", function () {
    it("productId should return a product id, when assigned and null when unassigned", function () {
      var response;
      var id = 1;

      response = service.productId();
      expect(response).not.toBeDefined();

      service.refreshRemoteProductsByProductId(id);

      response = service.productId();
      expect(response).toBe(1);
    });

    it("refreshRemoteProductsByProductId should assign a product id", function () {
      var response;
      var id = 2;

      service.refreshRemoteProductsByProductId(id);
      expect(service.productId()).toBe(id);
    });

    it("remoteProducts should return remote products for the given id", function () {
      var response;
      var id = 1;

      service.refreshRemoteProductsByProductId(id);

      // @todo:
      //response = service.remoteProducts();
      //expect(response).toBe(1);
    });

  });

});
