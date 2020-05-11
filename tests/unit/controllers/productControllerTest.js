describe("controller: ProductController", function () {
  var $compile, $q, $scope, $templateCache, $templateRequest, MockedProduct, MockedRemoteProductManager, MockedUser, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$compile_, _$q_, _$templateCache_, _$templateRequest_, _ProductRepo_, _WsApi_) {
      $compile = _$compile_;
      $q = _$q_;
      $templateCache = _$templateCache_;
      $templateRequest = _$templateRequest_;

      MockedUser = new mockUser($q);
      MockedProduct = new mockProduct($q);
      MockedRemoteProductManager = new mockRemoteProductManager($q);

      ProductRepo = _ProductRepo_;
      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _ModalService_, _Product_, _RemoteProductManagerRepo_, _RemoteProductsService_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("ProductController", {
        $scope: $scope,
        $compile: $compile,
        $templateRequest: $templateRequest,
        ModalService: _ModalService_,
        Product: _Product_,
        ProductRepo: ProductRepo,
        RemoteProductManagerRepo: _RemoteProductManagerRepo_,
        RemoteProductsService: _RemoteProductsService_,
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
    module("mock.product", function ($provide) {
      var Product = function () {
        return MockedProduct;
      };
      $provide.value("Product", Product);
    });
    module("mock.productRepo");
    module("mock.remoteProductManager", function ($provide) {
      var RemoteProductManager = function () {
        return MockedRemoteProductManager;
      };
      $provide.value("RemoteProductManager", RemoteProductManager);
    });
    module("mock.remoteProductManagerRepo");
    module("mock.remoteProductsService");
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

  describe("Is the scope method", function () {
    var methods = [
      "addRemoteProductInfo",
      "cancelDeleteProduct",
      "cancelEditProduct",
      "confirmDeleteProduct",
      "createProduct",
      "deleteProduct",
      "editProduct",
      "getRemoteProductByRemoteProductInfo",
      "getRemoteProductManagerRemoteProducts",
      "openAddRemoteProductInfo",
      "removeRemoteProductInfo",
      "resetCreateProduct",
      "resetProductForms",
      "updateProduct"
    ];

    var scopeMethodExists = function (method) {
      return function() {
        expect($scope[method]).toBeDefined();
        expect(typeof $scope[method]).toEqual("function");
      };
    };

    for (var i in methods) {
      it(methods[i] + " defined", scopeMethodExists(methods[i]));
    }
  });

  describe("Does the scope method", function () {
    it("addRemoteProductInfo should push changes and close info", function () {
      var remoteProductInfo = [
        dataRemoteProducts[1],
        dataRemoteProducts[2],
        dataRemoteProducts[3],
      ];
      var remoteProduct = dataRemoteProducts[1];

      $scope.remoteProductInfoChanged = null;

      spyOn(remoteProductInfo, "push");
      spyOn($scope, "remoteProductInfoChanged");

      $scope.addRemoteProductInfo(remoteProductInfo, remoteProduct);

      expect($scope.remoteProductInfoChanged).toEqual(true);
      expect(remoteProductInfo.push).toHaveBeenCalled();
    });

    it("cancelEditProduct clear out productToEdit and call resetProductForms", function () {
      var product = new mockProduct($q);

      spyOn($scope, "resetProductForms");
      $scope.productToEdit = product;
      $scope.cancelEditProduct();

      expect($scope.productToEdit).toEqual({});
      expect($scope.resetProductForms).toHaveBeenCalled();
    });

    it("cancelDeleteProduct clear productToDelete and close the modal", function () {
      spyOn($scope, "closeModal");
      $scope.productToDelete = dataProductRepo1[0];
      $scope.cancelDeleteProduct();

      expect($scope.closeModal).toHaveBeenCalled();
      expect($scope.productToDelete).toEqual({});
    });

    it("createProduct create a new product", function () {
      var newProduct = new mockProduct($q);

      newProduct.mock({
        id: dataProductRepo1.length + 1,
        name: "Mock Product 4"
      });

      spyOn($scope, "resetCreateProduct");

      $scope.productToCreate = newProduct;
      $scope.createProduct();
      $scope.$digest();

      expect(ProductRepo.findById(newProduct.id)).toEqual(newProduct);
      expect($scope.resetCreateProduct).toHaveBeenCalled();
    });

    it("confirmDeleteProduct set the productToDelete and open the modal", function () {
      spyOn($scope, "openModal");
      $scope.confirmDeleteProduct(dataProductRepo1[0]);

      expect($scope.openModal).toHaveBeenCalled();
      expect($scope.productToDelete).toEqual(dataProductRepo1[0]);
    });

    it("deleteProduct call the repo delete method and then call cancelDeleteProduct when successful", function () {
      var product = new mockProduct($q);

      $scope.productToDelete = product;
      deferred = $q.defer();
      spyOn(ProductRepo, "delete").and.returnValue(deferred.promise);
      spyOn($scope, "cancelDeleteProduct");
      $scope.deleteProduct(product);
      deferred.resolve({
        body: angular.toJson({
          meta: {
            status: "SUCCESS"
          }
        })
      });
      $scope.$apply();

      expect(ProductRepo.delete).toHaveBeenCalledWith(product);
      expect($scope.cancelDeleteProduct).toHaveBeenCalled();
    });

    it("editProduct set the productToEdit and open the modal", function () {
      spyOn($scope, "openModal");

      $scope.editProduct(dataProductRepo1[0]);

      expect($scope.productToEdit).toEqual(dataProductRepo1[0]);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("getRemoteProductManagerRemoteProducts should return the remote product by id", function () {
      var response;

      response = $scope.getRemoteProductManagerRemoteProducts(2);

      expect(response).toEqual(dataRemoteProducts[2]);
    });

    it("getRemoteProductByRemoteProductInfo should return the remote product by scope id", function () {
      var response;
      var remoteProductInfo = {
        scopeId: "3783",
        remoteProductManager: new mockRemoteProductManager($q)
      };

      response = $scope.getRemoteProductByRemoteProductInfo(remoteProductInfo);

      expect(response).toEqual(dataRemoteProducts[3]);
    });

    it("openAddRemoteProductInfo should assign addingRemoteProductInfo to true", function () {
      $scope.addingRemoteProductInfo = null;

      $scope.openAddRemoteProductInfo();

      expect($scope.addingRemoteProductInfo).toEqual(true);
    });

    it("resetCreateProduct call resetProductForms() and clear out the name field", function () {
      spyOn($scope, "resetProductForms");

      $scope.productToCreate = new mockProduct($q);
      $scope.productToCreate.mock({
        id: dataProductRepo1.length + 1,
        name: "Mock Product 4"
      });

      var modal = angular.element($templateCache.get("views/modals/addProductModal.html"));
      modal = $compile(modal)($scope);

      var form = $scope.productForms.create;
      form.$setDirty();
      $scope.resetCreateProduct();

      expect($scope.productToCreate.name).toEqual("");
      expect($scope.resetProductForms).toHaveBeenCalled();
    });

    it("resetProductForms reset product forms", function () {
      var modal = angular.element($templateCache.get("views/modals/addProductModal.html"));
      modal = $compile(modal)($scope);

      var form = $scope.productForms.create;
      form.$setDirty();

      expect(form.$dirty).toEqual(true);

      $scope.resetProductForms();

      expect(form.$pristine).toEqual(true);
      expect(form.$dirty).toEqual(false);
    });

    it("removeRemoteProductInfo should remove product info", function () {
      var remoteProductInfo = [
        dataRemoteProducts[1],
        dataRemoteProducts[2],
        dataRemoteProducts[3],
      ];
      var remoteProduct = dataRemoteProducts[1];

      $scope.remoteProductInfoChanged = null;

      spyOn(remoteProductInfo, "splice");

      $scope.removeRemoteProductInfo(remoteProductInfo, remoteProduct);

      expect($scope.remoteProductInfoChanged).toEqual(true);
      expect(remoteProductInfo.splice).toHaveBeenCalled();
    });

    it("updateProduct call dirty and save on the Product, and then call cancelEditProduct", function () {
      var product = new mockProduct($q);

      spyOn($scope, "cancelEditProduct");
      spyOn(product, "dirty");
      deferred = $q.defer();
      spyOn(product, "save").and.returnValue(deferred.promise);
      $scope.productToEdit = product;
      $scope.updateProduct();
      deferred.resolve();
      $scope.$apply();

      expect($scope.cancelEditProduct).toHaveBeenCalled();
      expect(product.dirty).toHaveBeenCalledWith(true);
      expect(product.save).toHaveBeenCalled();
    });

  });

});
