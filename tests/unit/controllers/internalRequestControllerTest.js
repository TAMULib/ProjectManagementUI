describe("controller: InternalRequestController", function () {
  var $q, $scope, $templateCache, MockedInternalRequest, InternalRequestRepo, InternalRequestsService, ProductRepo, ProductsService, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$compile_, _$q_, _$templateCache_, _InternalRequestRepo_, _InternalRequestsService_, _ProductRepo_, _ProductsService_, _RemoteProductManagerRepo_, _WsApi_) {
      $compile = _$compile_;
      $q = _$q_;
      $templateCache = _$templateCache_;

      MockedInternalRequest = new mockInternalRequest($q);

      InternalRequestRepo = _InternalRequestRepo_;
      InternalRequestsService = _InternalRequestsService_;
      ProductRepo = _ProductRepo_;
      ProductsService = _ProductsService_;

      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _ModalService_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("InternalRequestController", {
        $scope: $scope,
        InternalRequestRepo: InternalRequestRepo,
        InternalRequestsService: InternalRequestsService,
        ModalService: _ModalService_,
        ProductRepo: ProductRepo,
        ProductsService: ProductsService,
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
    module("mock.internalRequest", function ($provide) {
      var InternalRequest = function () {
        return MockedInternalRequest;
      };
      $provide.value("InternalRequest", InternalRequest);
    });
    module("mock.internalRequestRepo");
    module("mock.internalRequestsService");
    module("mock.remoteProductManagerRepo");
    module("mock.product");
    module("mock.productsService");
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
      "cancelDeleteInternalRequest",
      "cancelEditInternalRequest",
      "cancelPushFeatureRequest",
      "confirmDeleteInternalRequest",
      "createInternalRequest",
      "deleteInternalRequest",
      "editInternalRequest",
      "pushFeatureRequest",
      "pushInternalRequest",
      "refreshRemoteProducts",
      "resetCreateInternalRequest",
      "resetInternalRequestForms",
      "selectRemoteProducts",
      "updateInternalRequest"
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
    it("cancelDeleteInternalRequest clear internalRequestToDelete and close the modal", function () {
      var internalRequest = new mockInternalRequest($q);

      $scope.internalRequestToDelete = internalRequest;

      spyOn($scope, "closeModal");

      $scope.cancelDeleteInternalRequest();

      expect($scope.closeModal).toHaveBeenCalled();
      expect($scope.internalRequestToDelete).toEqual({});
    });

    it("cancelEditInternalRequest clear out internalRequestToEdit, close the modal, and call resetInternalRequestForms", function () {
      var internalRequest = new mockInternalRequest($q);

      $scope.internalRequestToEdit = internalRequest;

      spyOn($scope.internalRequestToEdit, "refresh");
      spyOn($scope, "resetInternalRequestForms");

      $scope.cancelEditInternalRequest();

      expect($scope.internalRequestToEdit.refresh).toHaveBeenCalled();
      expect($scope.resetInternalRequestForms).toHaveBeenCalled();
    });

    it("cancelPushFeatureRequest clear out featureRequestToPush, close the modal, and call resetInternalRequestForms", function () {
      var internalRequest = new mockInternalRequest($q);

      $scope.featureRequestToPush = dataFeatureRequest1;

      spyOn($scope, "resetInternalRequestForms");

      $scope.cancelPushFeatureRequest();

      expect($scope.featureRequestToPush).toEqual({});
      expect($scope.resetInternalRequestForms).toHaveBeenCalled();
    });

    it("confirmDeleteInternalRequest set the internalRequestToDelete and open the modal", function () {
      var internalRequest = new mockInternalRequest($q);

      spyOn($scope, "openModal");

      $scope.confirmDeleteInternalRequest(internalRequest);

      expect($scope.openModal).toHaveBeenCalledWith("#deleteInternalRequestModal");
      expect($scope.internalRequestToDelete).toEqual(internalRequest);
    });

    it("addInternalRequest to open the modal", function () {
      var internalRequest = new mockInternalRequest($q);

      spyOn($scope, "openModal");

      $scope.addInternalRequest();
      expect($scope.openModal).toHaveBeenCalledWith("#addInternalRequestModal");
    });

    it("createInternalRequest create a new Internal Requst", function () {
      var internalRequest = new mockInternalRequest($q);
      var id = dataInternalRequestRepo1.length + 1;

      internalRequest.mock({
        id: id,
        name: "Mock Internal Request " + id
      });

      spyOn($scope, "resetCreateInternalRequest");

      $scope.internalRequestToCreate = internalRequest;
      $scope.createInternalRequest();
      $scope.$digest();

      expect(InternalRequestRepo.findById(id)).toEqual(internalRequest);
      expect($scope.resetCreateInternalRequest).toHaveBeenCalled();
    });

    it("deleteInternalRequest call the repo delete method and then call cancelDeleteInternalRequest when successful", function () {
      var internalRequest = new mockInternalRequest($q);

      $scope.internalRequestToDelete = internalRequest;

      spyOn(InternalRequestRepo, "delete").and.callThrough();
      spyOn($scope, "cancelDeleteInternalRequest");

      $scope.deleteInternalRequest(internalRequest);
      $scope.$digest();

      expect(InternalRequestRepo.delete).toHaveBeenCalledWith(internalRequest);
      expect($scope.cancelDeleteInternalRequest).toHaveBeenCalled();
    });

    it("editInternalRequest set the internalRequestToEdit and open the modal", function () {
      var internalRequest = new mockInternalRequest($q);

      spyOn($scope, "openModal");

      $scope.editInternalRequest(internalRequest);

      expect($scope.internalRequestToEdit).toEqual(internalRequest);
      expect($scope.openModal).toHaveBeenCalledWith("#editInternalRequestModal");
    });

    it("pushFeatureRequest push a FeatureRequest", function () {
      var featureRequest = new mockFeatureRequest($q);

      $scope.featureRequestToPush = featureRequest;
      $scope.featureRequestToPush.product = new mockProduct($q);
      $scope.products = [
        new mockProduct($q),
        new mockProduct($q)
      ];

      $scope.products[0].mock(dataProduct2);

      spyOn(InternalRequestsService, "pushFeatureRequest").and.callThrough();
      spyOn($scope, "cancelPushFeatureRequest");

      $scope.pushFeatureRequest();

      $scope.$digest();

      expect(InternalRequestsService.pushFeatureRequest).toHaveBeenCalledWith(featureRequest);
      expect($scope.cancelPushFeatureRequest).toHaveBeenCalled();
    });

    it("pushInternalRequest push an InternalRequest as a FeatureRequest", function () {
      var internalRequest = new mockInternalRequest($q);

      spyOn($scope, "openModal");

      $scope.pushInternalRequest(internalRequest);

      expect($scope.featureRequestToPush.title).toEqual(internalRequest.title);
      expect($scope.featureRequestToPush.description).toEqual(internalRequest.description);
      expect($scope.featureRequestToPush.product).toBe(null);
      expect($scope.featureRequestToPush.rpmId).toBe(null);
      expect($scope.featureRequestToPush.scopeId).toBe(null);
      expect($scope.openModal).toHaveBeenCalledWith("#pushInternalRequestModal");
    });

    it("refreshRemoteProducts should call the service refresh for a given product id", function () {
      var featureRequest = new mockFeatureRequest($q);
      featureRequest.product = new mockProduct($q);

      $scope.remoteProducts = {};
      $scope.remoteProducts[featureRequest.product.id] = {};
      $scope.remoteProductsLoading = {};
      $scope.remoteProductsLoading[featureRequest.product.id] = false;

      spyOn(ProductsService, "refreshRemoteProducts");

      $scope.refreshRemoteProducts(featureRequest.product.id);
      expect(ProductsService.refreshRemoteProducts).toHaveBeenCalledWith(featureRequest.product.id);
    });

    it("refreshRemoteProducts should not call the service refresh for a given product id when remoteProductsLoading for that product id", function () {
      var featureRequest = new mockFeatureRequest($q);
      featureRequest.product = new mockProduct($q);

      $scope.remoteProducts = {};
      $scope.remoteProducts[featureRequest.product.id] = {};
      $scope.remoteProductsLoading = {};
      $scope.remoteProductsLoading[featureRequest.product.id] = true;

      spyOn(ProductsService, "refreshRemoteProducts");

      $scope.refreshRemoteProducts(featureRequest.product.id);
      expect(ProductsService.refreshRemoteProducts).not.toHaveBeenCalled();
    });

    it("refreshRemoteProducts should not call the service refresh when there is no given product id", function () {
      var featureRequest = new mockFeatureRequest($q);
      featureRequest.product = new mockProduct($q);

      $scope.remoteProducts = {};
      $scope.remoteProducts[featureRequest.product.id] = {};
      $scope.remoteProductsLoading = {};
      $scope.remoteProductsLoading[featureRequest.product.id] = false;

      spyOn(ProductsService, "refreshRemoteProducts");

      $scope.refreshRemoteProducts();
      expect(ProductsService.refreshRemoteProducts).not.toHaveBeenCalled();
    });

    it("resetCreateInternalRequest call resetInternalRequestForms() and clear out the properties", function () {
      var internalRequest = new mockInternalRequest($q);
      var id = dataInternalRequestRepo1.length + 1;

      internalRequest.mock({
        id: id,
        name: "Mock Internal Request " + id
      });

      $scope.internalRequestToCreate = internalRequest;

      var modal = angular.element($templateCache.get("views/modals/addInternalRequestModal.html"));
      modal = $compile(modal)($scope);

      var form = $scope.internalRequestForms.create;
      form.$setDirty();

      expect(form.$dirty).toEqual(true);

      spyOn($scope, "resetInternalRequestForms");

      $scope.resetCreateInternalRequest();

      expect($scope.internalRequestToCreate.title).toEqual("");
      expect($scope.internalRequestToCreate.description).toEqual("");
      expect($scope.internalRequestToCreate.createdOn).toBe(null);
      expect($scope.resetInternalRequestForms).toHaveBeenCalled();
    });

    it("resetInternalRequestForms should close modals and reset InternalRequest forms", function () {
      var modal = angular.element($templateCache.get("views/modals/editInternalRequestModal.html"));
      modal = $compile(modal)($scope);

      var form = $scope.internalRequestForms.edit;
      form.$setDirty();

      expect(form.$dirty).toEqual(true);

      spyOn($scope, "closeModal");

      $scope.resetInternalRequestForms();

      expect(form.$pristine).toEqual(true);
      expect(form.$dirty).toEqual(false);
      expect($scope.closeModal).toHaveBeenCalled();
    });

    it("selectRemoteProducts select should call refresh for a given product id", function () {
      $scope.featureRequestToPush = new mockFeatureRequest($q);
      $scope.featureRequestToPush.product = new mockProduct($q);
      $scope.remoteProducts = {};

      spyOn($scope, "refreshRemoteProducts");

      $scope.selectRemoteProducts();
      expect($scope.refreshRemoteProducts).toHaveBeenCalled();
    });

    it("selectRemoteProducts select should not call refresh for a given product id if already loaded", function () {
      $scope.featureRequestToPush = new mockFeatureRequest($q);
      $scope.featureRequestToPush.product = new mockProduct($q);
      $scope.remoteProducts = {};
      $scope.remoteProducts[$scope.featureRequestToPush.product.id] = $scope.featureRequestToPush.product;

      spyOn($scope, "refreshRemoteProducts");

      $scope.selectRemoteProducts();
      expect($scope.refreshRemoteProducts).not.toHaveBeenCalled();
    });

    it("selectRemoteProducts should not call refresh if no product id is available", function () {
      $scope.featureRequestToPush = {};
      $scope.remoteProducts = {};

      spyOn($scope, "refreshRemoteProducts");

      $scope.selectRemoteProducts();
      expect($scope.refreshRemoteProducts).not.toHaveBeenCalled();
    });

    it("updateInternalRequest call dirty and save on the InternalRequest, and then call cancelEditInternalRequest", function () {
      var internalRequest = new mockInternalRequest($q);

      $scope.internalRequestToEdit = internalRequest;

      spyOn($scope, "cancelEditInternalRequest");
      spyOn(internalRequest, "dirty").and.callThrough();
      spyOn(internalRequest, "save").and.callThrough();

      $scope.updateInternalRequest();

      $scope.$digest();

      expect($scope.cancelEditInternalRequest).toHaveBeenCalled();
      expect(internalRequest.dirty).toHaveBeenCalledWith(true);
      expect(internalRequest.save).toHaveBeenCalled();
    });
  });

});
