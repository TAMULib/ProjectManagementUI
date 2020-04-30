describe("controller: InternalRequestController", function () {
  var $q, $scope, $templateCache, MockedInternalRequest, InternalRequestRepo, InternalRequestsService, RemoteProductManagerRepo, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$compile_, _$q_, _$templateCache_, _InternalRequestRepo_, _InternalRequestsService_, _RemoteProductManagerRepo_, _WsApi_) {
      $compile = _$compile_;
      $q = _$q_;
      $templateCache = _$templateCache_;

      MockedInternalRequest = new mockInternalRequest($q);

      InternalRequestRepo = _InternalRequestRepo_;
      InternalRequestsService = _InternalRequestsService_;
      RemoteProductManagerRepo = _RemoteProductManagerRepo_;

      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _InternalRequestsService_, _ModalService_, _RemoteProductsService_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("InternalRequestController", {
        $scope: $scope,
        InternalRequestRepo: InternalRequestRepo,
        InternalRequestsService: _InternalRequestsService_,
        ModalService: _ModalService_,
        RemoteProductManagerRepo: RemoteProductManagerRepo,
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
    module("mock.internalRequest", function ($provide) {
      var InternalRequest = function () {
        return MockedInternalRequest;
      };
      $provide.value("InternalRequest", InternalRequest);
    });
    module("mock.internalRequestRepo");
    module("mock.internalRequestsService");
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
      "cancelDeleteInternalRequest",
      "cancelEditInternalRequest",
      "cancelPushFeatureRequest",
      "confirmDeleteInternalRequest",
      "deleteInternalRequest",
      "editInternalRequest",
      "getRemoteProductManagerRemoteProducts",
      "pushFeatureRequest",
      "pushInternalRequest",
      "resetInternalRequestForms",
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

    //initializeController({role: "ROLE_MANAGER"});
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

      expect($scope.openModal).toHaveBeenCalled();
      expect($scope.internalRequestToDelete).toEqual(internalRequest);
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
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("getRemoteProductManagerRemoteProducts return the requested Remote Products", function () {
      var response;
      var productManagerId = dataRemoteProductManager2.id;

      response = $scope.getRemoteProductManagerRemoteProducts(productManagerId);

      expect(response.id).toEqual(productManagerId);
    });

    it("pushFeatureRequest push a FeatureRequest", function () {
      var featureRequest = dataFeatureRequest1;

      $scope.featureRequestToPush = featureRequest;

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
      expect($scope.featureRequestToPush.productId).toBe(null);
      expect($scope.featureRequestToPush.scopeId).toBe(null);
      expect($scope.openModal).toHaveBeenCalled();
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
