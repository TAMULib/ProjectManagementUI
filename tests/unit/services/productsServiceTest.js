describe("service: ProductsService", function () {
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
    inject(function ($injector, _ProductsService_) {
      $scope = $rootScope.$new();

      service = _ProductsService_;

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
      "getById",
      "getProductRemoteProducts",
      "getProducts",
      "refreshProducts"
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
    it("getById should return a product by the given id", function () {
      var response;
      var id = 1;

      // @todo
      //response = service.getById(id);
      //$scope.$digest();

      //expect(response.id).toBe(id);
    });

    it("getProducts should return all products", function () {
      var response;

      // @todo
      //response = service.getProducts();
      //$scope.$digest();

      //expect(response).toBe();
    });

    it("getProductRemoteProducts should return all remote products for a given product", function () {
      var response;
      var id = 1;

       // @todo
      //response = service.getById(id);
      //$scope.$digest();

      //expect(response.id).toBe(id);
    });
  });

});
