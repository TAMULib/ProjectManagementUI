describe("controller: RemoteProductManagerController", function () {
  var $compile, $q, $scope, $templateCache, MockedRemoteProductManager, RemoteProductManagerRepo, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$compile_, _$q_, _$templateCache_, _RemoteProductManagerRepo_, _WsApi_) {
      $compile = _$compile_;
      $q = _$q_;
      $templateCache = _$templateCache_;

      MockedRemoteProductManager = new mockRemoteProductManager($q);

      RemoteProductManagerRepo = _RemoteProductManagerRepo_;
      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$filter_, _$rootScope_, _ModalService_, _RemoteProductManager_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("RemoteProductManagerController", {
        $scope: $scope,
        $compile: $compile,
        $filter: _$filter_,
        ModalService: _ModalService_,
        RemoteProductManagerRepo: RemoteProductManagerRepo
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
    module("mock.remoteProductManager", function ($provide) {
      var RemoteProductManager = function () {
        return MockedRemoteProductManager;
      };
      $provide.value("RemoteProductManager", RemoteProductManager);
    });
    module("mock.remoteProductManagerRepo");
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
      "resetRemoteProductManagerForms",
      "createRemoteProductManager",
      "resetCreateRemoteProductManager",
      "editRemoteProductManager",
      "updateRemoteProductManager",
      "cancelEditRemoteProductManager",
      "confirmDeleteRemoteProductManager",
      "cancelDeleteRemoteProductManager",
      "deleteRemoteProductManager",
      "typeSettings"
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
    it("resetRemoteProductManagerForms reset Remote Product Manager forms", function () {

      var modal = angular.element($templateCache.get("views/modals/addRemoteProductManagerModal.html"));
      modal = $compile(modal)($scope);

      var form = $scope.remoteProductManagerForms.create;
      form.$setDirty();

      expect(form.$dirty).toEqual(true);

      $scope.resetRemoteProductManagerForms();

      expect(form.$pristine).toEqual(true);
      expect(form.$dirty).toEqual(false);
    });

    it("createRemoteProductManager create a new Remote Product Manager", function () {
      var newRemoteProductManager = {
        "id": 4,
        "name": "Test 4",
        "type": "VERSION_ONE",
        "settings": {
          "password": "password4",
          "url": "url4",
          "username": "username4"
        }
      };
      $scope.remoteProductManagerToCreate = newRemoteProductManager;
      $scope.createRemoteProductManager();

      expect(RemoteProductManagerRepo.findById(newRemoteProductManager.id)).toEqual(newRemoteProductManager);
    });

    it("resetCreateRemoteProductManager call resetRemoteProductManagerForms() and clear out the fields", function () {
      var newRemoteProductManager = {
        "id": 4,
        "name": "Test 4",
        "type": "VERSION_ONE",
        "settings": {
          "password": "password4",
          "url": "url4",
          "username": "username4"
        }
      };
      var scaffold = {
        "id": "",
        "name": "",
        "Type": "VERSION_ONE",
        "settings": {
          "password": "password4",
          "url": "url4",
          "username": "username4"
        }
      };
      spyOn($scope, "resetRemoteProductManagerForms");
      spyOn(RemoteProductManagerRepo, "getScaffold").and.returnValue(scaffold);

      $scope.remoteProductManagerToCreate = newRemoteProductManager;
      $scope.resetCreateRemoteProductManager();

      expect($scope.remoteProductManagerToCreate.name).toEqual("");
      expect($scope.resetRemoteProductManagerForms).toHaveBeenCalled();
    });

    it("editRemoteProductManager set the remoteProductManagerToEdit and open the modal", function () {
      var remoteProductManager = new mockRemoteProductManager($q);

      spyOn($scope, "openModal");
      $scope.editRemoteProductManager(remoteProductManager);

      expect($scope.remoteProductManagerToEdit).toEqual(remoteProductManager);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("updateRemoteProductManager call dirty and save on the Remote Product Manager, and then call cancelEditRemoteProductManager", function () {
      var remoteProductManager = new mockRemoteProductManager($q);

      spyOn($scope, "cancelEditRemoteProductManager");
      spyOn(remoteProductManager, "dirty");
      deferred = $q.defer();
      spyOn(remoteProductManager, "save").and.returnValue(deferred.promise);
      $scope.remoteProductManagerToEdit = remoteProductManager;
      $scope.updateRemoteProductManager();
      deferred.resolve({
        body: angular.toJson({
          meta: {
            status: "SUCCESS"
          }
        })
      });
      $scope.$apply();

      expect($scope.cancelEditRemoteProductManager).toHaveBeenCalled();
      expect(remoteProductManager.dirty).toHaveBeenCalledWith(true);
      expect(remoteProductManager.save).toHaveBeenCalled();
    });

    it("cancelEditRemoteProductManager clear out remoteProductManagerToEdit and call resetRemoteProductManagerForms", function () {
      var remoteProductManager = new mockRemoteProductManager($q);

      spyOn(remoteProductManager, "refresh");
      spyOn($scope, "resetRemoteProductManagerForms");

      $scope.remoteProductManagerToEdit = remoteProductManager;
      $scope.cancelEditRemoteProductManager();

      expect(remoteProductManager.refresh).toHaveBeenCalled();
      expect($scope.resetRemoteProductManagerForms).toHaveBeenCalled();
    });

    it("confirmDeleteRemoteProductManager set the remoteProductManagerToDelete and open the modal", function () {
      var remoteProductManager = new mockRemoteProductManager($q);

      spyOn($scope, "openModal");
      $scope.confirmDeleteRemoteProductManager(remoteProductManager);

      expect($scope.openModal).toHaveBeenCalled();
      expect($scope.remoteProductManagerToDelete).toEqual(remoteProductManager);
    });

    it("cancelDeleteRemoteProductManager clear remoteProductManagerToDelete and close the modal", function () {
      var remoteProductManager = new mockRemoteProductManager($q);

      spyOn($scope, "closeModal");
      $scope.remoteProductManagerToDelete = remoteProductManager;
      $scope.cancelDeleteRemoteProductManager();

      expect($scope.closeModal).toHaveBeenCalled();
      expect($scope.remoteProductManagerToDelete).toEqual({});
    });

    it("deleteRemoteProductManager call the repo delete method and then call cancelDeleteRemoteProductManager when successful", function () {
      var remoteProductManager = new mockRemoteProductManager($q);

      $scope.remoteProductManagerToDelete = remoteProductManager;
      deferred = $q.defer();
      spyOn(RemoteProductManagerRepo, "delete").and.returnValue(deferred.promise);
      spyOn($scope, "cancelDeleteRemoteProductManager");
      $scope.deleteRemoteProductManager(remoteProductManager);
      deferred.resolve({
        body: angular.toJson({
          meta: {
            status: "SUCCESS"
          }
        })
      });
      $scope.$apply();

      expect(RemoteProductManagerRepo.delete).toHaveBeenCalledWith(remoteProductManager);
      expect($scope.cancelDeleteRemoteProductManager).toHaveBeenCalled();
    });

    it("typeSettings return appropriate scaffold", function () {
      var scaffold = [{
        type: "text",
        key: "url",
        gloss: "URL",
        visible: true
      }, {
        type: "text",
        key: "username",
        gloss: "Username",
        visible: false
      }, {
        type: "password",
        key: "password",
        gloss: "Password",
        visible: false
      }, {
        type: "password",
        key: "token",
        gloss: "Token",
        visible: false
      }];
      $scope.serviceTypes = [{
        "gloss": "Version One",
        "scaffold": scaffold,
        "value": "VERSION_ONE"
      }];
      var typeSettings = $scope.typeSettings("VERSION_ONE");
      expect(typeSettings).toEqual(scaffold);
    });

  });

});
