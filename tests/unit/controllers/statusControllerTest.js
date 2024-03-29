describe("controller: StatusController", function () {
  var $q, $scope, $templateCache, MockedStatus, StatusRepo, MockedUser, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$compile_, _$q_, _$templateCache_, _StatusRepo_, _WsApi_) {
      $compile = _$compile_;
      $q = _$q_;
      $templateCache = _$templateCache_;

      MockedStatus = new mockStatus($q);
      MockedUser = new mockUser($q);

      StatusRepo = _StatusRepo_;
      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("StatusController", {
        $scope: $scope,
        StatusRepo: StatusRepo
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
    module("mock.status", function ($provide) {
      var Status = function () {
        return MockedStatus;
      };
      $provide.value("Status", Status);
    });
    module("mock.statusRepo");
    module("mock.wsApi");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");

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
      "resetStatusForms",
      "createStatus",
      "resetCreateStatus",
      "editStatus",
      "updateStatus",
      "addMatch",
      "removeMatch",
      "cancelEditStatus",
      "confirmDeleteStatus",
      "cancelDeleteStatus",
      "deleteStatus"
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
    it("resetStatusForms reset Status forms", function () {
      var modal = angular.element($templateCache.get("views/modals/addStatusModal.html"));
      modal = $compile(modal)($scope);

      var form = $scope.statusForms.create;
      form.$setDirty();

      expect(form.$dirty).toEqual(true);

      $scope.resetStatusForms();

      expect(form.$pristine).toEqual(true);
      expect(form.$dirty).toEqual(false);
    });

    it("createStatus create a new Status", function () {
      var newStatus = new mockStatus($q);
      newStatus.mock({
        id: 5,
        identifier: "Fubar",
        mapping: [
          "Foo",
          "Bar"
        ]
      });

      $scope.statusToCreate = newStatus;
      $scope.createStatus();

      expect(StatusRepo.findById(newStatus.id)).toEqual(newStatus);
    });

    it("resetCreateStatus call resetCreateStatus() and clear out the fields", function () {
      var newStatus = new mockStatus($q);
      newStatus.mock({
        id: 5,
        identifier: "Fubar",
        mapping: [
          "Foo",
          "Bar"
        ]
      });

      var scaffold = {
        identifier: "",
        mapping: [""]
      };

      spyOn($scope, "resetStatusForms");
      spyOn(StatusRepo, "getScaffold").and.returnValue(scaffold);

      $scope.statusToCreate = newStatus;
      $scope.resetCreateStatus();

      expect($scope.resetStatusForms).toHaveBeenCalled();
      expect($scope.statusToCreate.identifier).toEqual("");
      expect($scope.statusToCreate.mapping).toEqual([""]);
    });

    it("editStatus set the statusToEdit and open the modal", function () {
      var status = new mockStatus($q);

      spyOn($scope, "openModal");
      $scope.editStatus(status);

      expect($scope.statusToEdit).toEqual(status);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("updateStatus call dirty and save on the Status, and then call cancelEditStatus", function () {
      var status = new mockStatus($q);

      spyOn($scope, "cancelEditStatus");
      spyOn(status, "dirty");
      deferred = $q.defer();
      spyOn(status, "save").and.returnValue(deferred.promise);
      $scope.statusToEdit = status;
      $scope.updateStatus();
      deferred.resolve({
        body: angular.toJson({
          meta: {
            status: "SUCCESS"
          }
        })
      });
      $scope.$apply();

      expect($scope.cancelEditStatus).toHaveBeenCalled();
      expect(status.dirty).toHaveBeenCalledWith(true);
      expect(status.save).toHaveBeenCalled();
    });

    it("cancelEditStatus clear out statusToEdit and call resetStatusForms", function () {
      spyOn($scope, "resetStatusForms");
      $scope.statusToEdit = new mockStatus($q);
      $scope.cancelEditStatus();

      expect($scope.statusToEdit.identifier).not.toBeDefined();
      expect($scope.resetStatusForms).toHaveBeenCalled();
    });

    it("confirmDeleteStatus set the statusToDelete and open the modal", function () {
      var status = new mockStatus($q);

      spyOn($scope, "openModal");
      $scope.confirmDeleteStatus(status);

      expect($scope.openModal).toHaveBeenCalled();
      expect($scope.statusToDelete).toEqual(status);
    });

    it("cancelDeleteStatus clear statusToDelete and close the modal", function () {
      var status = new mockStatus($q);

      spyOn($scope, "closeModal");
      $scope.statusToDelete = status;
      $scope.cancelDeleteStatus();

      expect($scope.closeModal).toHaveBeenCalled();
      expect($scope.statusToDelete).toEqual({});
    });

    it("deleteStatus call the repo delete method and then call cancelDeleteStatus when successful", function () {
      var status = new mockStatus($q);
      $scope.statusToDelete = status;
      deferred = $q.defer();
      spyOn(StatusRepo, "delete").and.returnValue(deferred.promise);
      spyOn($scope, "cancelDeleteStatus");
      $scope.deleteStatus(status);
      deferred.resolve({
        body: angular.toJson({
          meta: {
            status: "SUCCESS"
          }
        })
      });
      $scope.$apply();

      expect(StatusRepo.delete).toHaveBeenCalledWith(status);
      expect($scope.cancelDeleteStatus).toHaveBeenCalled();
    });
  });

});
