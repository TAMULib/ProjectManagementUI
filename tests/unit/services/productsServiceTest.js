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
      "getProducts",
      "getProductsLoading",
      "getRemoteProjects",
      "getRemoteProjectInfo",
      "getRemoteProjectsLoading",
      "refreshProducts",
      "refreshRemoteProjectsForProduct"
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
    it("getProducts should return all products", function () {
      var response = service.getProducts();
      expect(response).toEqual(dataProductRepo1);
    });

    it("getProductsLoading should return the current loading status for projects", function () {
      var response = service.getProductsLoading();
      expect(response).toEqual(false);
    });

    it("getRemoteProjects should return all remote projects for a given product", function () {
      // @todo
      //var response = service.getRemoteProjects();
      //expect(response).toEqual(dataRemoteProjects);
    });

    it("getRemoteProjectsLoading should return the current loading status for all remote projects", function () {
      var response = service.getRemoteProjectsLoading();
      expect(response).toBeDefined();
    });

    it("getRemoteProjectInfo should return all remote project info for a given product", function () {
      var response;

      // @todo
      //response = service.getById(id);
      //$scope.$digest();

      //expect(response.id).toBe(id);
    });

    it("refreshProducts should refresh products", function () {
      var response;

      // @todo
      //response = service.refreshProducts();
      //$scope.$digest();

      //expect(response.id).toBe(id);
    });

    it("refreshRemoteProjectsForProduct should refresh remote projects", function () {
      var response;

      // @todo
      //response = service.refreshRemoteProjectsForProduct(id);
      //$scope.$digest();
    });
  });

});
