describe("controller: RemoteProjectManagerController", function () {
  var $compile, $q, $scope, $templateCache, MockedRemoteProjectManager, RemoteProjectManagerRepo, MockedUser, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$compile_, _$q_, _$templateCache_, _RemoteProjectManagerRepo_, _WsApi_) {
      $compile = _$compile_;
      $q = _$q_;
      $templateCache = _$templateCache_;

      MockedRemoteProjectManager = new mockRemoteProjectManager($q);
      MockedUser = new mockUser($q);

      RemoteProjectManagerRepo = _RemoteProjectManagerRepo_;
      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$filter_, _$rootScope_, _ModalService_, _RemoteProjectManager_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("RemoteProjectManagerController", {
        $scope: $scope,
        $compile: $compile,
        $filter: _$filter_,
        ModalService: _ModalService_,
        RemoteProjectManagerRepo: RemoteProjectManagerRepo
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
    module("mock.remoteProjectManager", function ($provide) {
      var RemoteProjectManager = function () {
        return MockedRemoteProjectManager;
      };
      $provide.value("RemoteProjectManager", RemoteProjectManager);
    });
    module("mock.remoteProjectManagerRepo");
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
      "addRemoteProjectManager",
      "resetRemoteProjectManagerForms",
      "createRemoteProjectManager",
      "resetCreateRemoteProjectManager",
      "editRemoteProjectManager",
      "updateRemoteProjectManager",
      "cancelEditRemoteProjectManager",
      "confirmDeleteRemoteProjectManager",
      "cancelDeleteRemoteProjectManager",
      "deleteRemoteProjectManager",
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
    it("addRemoteProjectManager to open the modal", function () {
      var remoteProjectManager = new mockRemoteProjectManager($q);

      spyOn($scope, "openModal");

      $scope.addRemoteProjectManager();
      expect($scope.openModal).toHaveBeenCalledWith("#addRemoteProjectManagerModal");
    });

    it("resetRemoteProjectManagerForms reset Remote Project Manager forms", function () {

      var modal = angular.element($templateCache.get("views/modals/addRemoteProjectManagerModal.html"));
      modal = $compile(modal)($scope);

      var form = $scope.remoteProjectManagerForms.create;
      form.$setDirty();

      expect(form.$dirty).toEqual(true);

      $scope.resetRemoteProjectManagerForms();

      expect(form.$pristine).toEqual(true);
      expect(form.$dirty).toEqual(false);
    });

    it("createRemoteProjectManager create a new Remote Project Manager", function () {
      var newRemoteProjectManager = {
        "id": 4,
        "name": "Test 4",
        "type": "VERSION_ONE",
        "settings": {
          "password": "password4",
          "url": "url4",
          "username": "username4"
        }
      };
      $scope.remoteProjectManagerToCreate = newRemoteProjectManager;
      $scope.createRemoteProjectManager();

      expect(RemoteProjectManagerRepo.findById(newRemoteProjectManager.id)).toEqual(newRemoteProjectManager);
    });

    it("resetCreateRemoteProjectManager call resetRemoteProjectManagerForms() and clear out the fields", function () {
      var newRemoteProjectManager = {
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
      spyOn($scope, "resetRemoteProjectManagerForms");
      spyOn(RemoteProjectManagerRepo, "getScaffold").and.returnValue(scaffold);

      $scope.remoteProjectManagerToCreate = newRemoteProjectManager;
      $scope.resetCreateRemoteProjectManager();

      expect($scope.remoteProjectManagerToCreate.name).toEqual("");
      expect($scope.resetRemoteProjectManagerForms).toHaveBeenCalled();
    });

    it("editRemoteProjectManager set the remoteProjectManagerToEdit and open the modal", function () {
      var remoteProjectManager = new mockRemoteProjectManager($q);

      spyOn($scope, "openModal");
      $scope.editRemoteProjectManager(remoteProjectManager);

      expect($scope.remoteProjectManagerToEdit).toEqual(remoteProjectManager);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("updateRemoteProjectManager call dirty and save on the Remote Project Manager, and then call cancelEditRemoteProjectManager", function () {
      var remoteProjectManager = new mockRemoteProjectManager($q);

      spyOn($scope, "cancelEditRemoteProjectManager");
      spyOn(remoteProjectManager, "dirty");
      deferred = $q.defer();
      spyOn(remoteProjectManager, "save").and.returnValue(deferred.promise);
      $scope.remoteProjectManagerToEdit = remoteProjectManager;
      $scope.updateRemoteProjectManager();
      deferred.resolve({
        body: angular.toJson({
          meta: {
            status: "SUCCESS"
          }
        })
      });
      $scope.$apply();

      expect($scope.cancelEditRemoteProjectManager).toHaveBeenCalled();
      expect(remoteProjectManager.dirty).toHaveBeenCalledWith(true);
      expect(remoteProjectManager.save).toHaveBeenCalled();
    });

    it("cancelEditRemoteProjectManager clear out remoteProjectManagerToEdit and call resetRemoteProjectManagerForms", function () {
      var remoteProjectManager = new mockRemoteProjectManager($q);

      spyOn(remoteProjectManager, "refresh");
      spyOn($scope, "resetRemoteProjectManagerForms");

      $scope.remoteProjectManagerToEdit = remoteProjectManager;
      $scope.cancelEditRemoteProjectManager();

      expect(remoteProjectManager.refresh).toHaveBeenCalled();
      expect($scope.resetRemoteProjectManagerForms).toHaveBeenCalled();
    });

    it("confirmDeleteRemoteProjectManager set the remoteProjectManagerToDelete and open the modal", function () {
      var remoteProjectManager = new mockRemoteProjectManager($q);

      spyOn($scope, "openModal");
      $scope.confirmDeleteRemoteProjectManager(remoteProjectManager);

      expect($scope.openModal).toHaveBeenCalled();
      expect($scope.remoteProjectManagerToDelete).toEqual(remoteProjectManager);
    });

    it("cancelDeleteRemoteProjectManager clear remoteProjectManagerToDelete and close the modal", function () {
      var remoteProjectManager = new mockRemoteProjectManager($q);

      spyOn($scope, "closeModal");
      $scope.remoteProjectManagerToDelete = remoteProjectManager;
      $scope.cancelDeleteRemoteProjectManager();

      expect($scope.closeModal).toHaveBeenCalled();
      expect($scope.remoteProjectManagerToDelete).toEqual({});
    });

    it("deleteRemoteProjectManager call the repo delete method and then call cancelDeleteRemoteProjectManager when successful", function () {
      var remoteProjectManager = new mockRemoteProjectManager($q);

      $scope.remoteProjectManagerToDelete = remoteProjectManager;
      deferred = $q.defer();
      spyOn(RemoteProjectManagerRepo, "delete").and.returnValue(deferred.promise);
      spyOn($scope, "cancelDeleteRemoteProjectManager");
      $scope.deleteRemoteProjectManager(remoteProjectManager);
      deferred.resolve({
        body: angular.toJson({
          meta: {
            status: "SUCCESS"
          }
        })
      });
      $scope.$apply();

      expect(RemoteProjectManagerRepo.delete).toHaveBeenCalledWith(remoteProjectManager);
      expect($scope.cancelDeleteRemoteProjectManager).toHaveBeenCalled();
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
