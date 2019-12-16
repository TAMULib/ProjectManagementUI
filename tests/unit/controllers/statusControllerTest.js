describe("controller: StatusController", function () {

  var scope, controller, Status, StatusRepo;

  beforeEach(function () {
    module("core");
    module("app");
    module("templates");
    module("mock.status");
    module("mock.statusRepo");
    inject(function ($controller, $rootScope, $templateCache, _$compile_, _$q_, _Status_, _StatusRepo_) {
      scope = $rootScope.$new();
      $compile = _$compile_;
      $q = _$q_;
      cache = $templateCache;
      Status = _Status_;
      StatusRepo = _StatusRepo_;
      controller = $controller("StatusController", {
        $scope: scope,
        StatusRepo: _StatusRepo_
      });
    });
  });

  describe("Is the controller defined", function () {
    it("should be defined", function () {
      expect(controller).toBeDefined();
    });
  });

  describe("Are the scope methods defined", function () {
    it("resetStatusForms should be defined", function () {
      expect(scope.resetStatusForms).toBeDefined();
      expect(typeof scope.resetStatusForms).toEqual("function");
    });
    it("createStatus should be defined", function () {
      expect(scope.createStatus).toBeDefined();
      expect(typeof scope.createStatus).toEqual("function");
    });
    it("resetCreateStatus should be defined", function () {
      expect(scope.resetCreateStatus).toBeDefined();
      expect(typeof scope.resetCreateStatus).toEqual("function");
    });
    it("editStatus should be defined", function () {
      expect(scope.editStatus).toBeDefined();
      expect(typeof scope.editStatus).toEqual("function");
    });
    it("updateStatus should be defined", function () {
      expect(scope.updateStatus).toBeDefined();
      expect(typeof scope.updateStatus).toEqual("function");
    });
    it("addMatch should be defined", function () {
      expect(scope.addMatch).toBeDefined();
      expect(typeof scope.addMatch).toEqual("function");
    });
    it("removeMatch should be defined", function () {
      expect(scope.removeMatch).toBeDefined();
      expect(typeof scope.removeMatch).toEqual("function");
    });
    it("cancelEditStatus should be defined", function () {
      expect(scope.cancelEditStatus).toBeDefined();
      expect(typeof scope.cancelEditStatus).toEqual("function");
    });
    it("confirmDeleteStatus should be defined", function () {
      expect(scope.confirmDeleteStatus).toBeDefined();
      expect(typeof scope.confirmDeleteStatus).toEqual("function");
    });
    it("cancelDeleteStatus should be defined", function () {
      expect(scope.cancelDeleteStatus).toBeDefined();
      expect(typeof scope.cancelDeleteStatus).toEqual("function");
    });
    it("deleteStatus should be defined", function () {
      expect(scope.deleteStatus).toBeDefined();
      expect(typeof scope.deleteStatus).toEqual("function");
    });
  });

  describe("Do the scope methods work as expected", function () {
    it("resetStatusForms should reset Status forms", function () {

      var modal = angular.element(cache.get("views/modals/addStatusModal.html"));
      modal = $compile(modal)(scope);

      var form = scope.statusForms.create;
      form.$setDirty();

      expect(form.$dirty).toEqual(true);

      scope.resetStatusForms();

      expect(form.$pristine).toEqual(true);
      expect(form.$dirty).toEqual(false);
    });

    it("createStatus should create a new Status", function () {
      var newStatus = {
        "id": 5,
        "identifier": "Fubar",
        "mapping": [
          "Foo",
          "Bar"
        ]
      };
      scope.statusToCreate = newStatus;
      scope.createStatus();

      expect(StatusRepo.findById(newStatus.id)).toEqual(newStatus);
    });

    it("resetCreateStatus should call resetCreateStatus() and clear out the fields", function () {
      var newStatus = {
        "id": 5,
        "identifier": "Fubar",
        "mapping": [
          "Foo",
          "Bar"
        ]
      };
      var scaffold = {
        "identifier": "",
        "mapping": [""]
      };
      spyOn(scope, "resetStatusForms");
      spyOn(StatusRepo, "getScaffold").and.returnValue(scaffold);

      scope.statusToCreate = newStatus;
      scope.resetCreateStatus();

      expect(scope.resetStatusForms).toHaveBeenCalled();
      expect(scope.statusToCreate.identifier).toEqual("");
      expect(scope.statusToCreate.mapping).toEqual([""]);
    });

    it("editStatus should set the statusToEdit and open the modal", function () {
      spyOn(scope, "openModal");
      scope.editStatus(mockStatuses[0]);

      expect(scope.statusToEdit).toEqual(mockStatuses[0]);
      expect(scope.openModal).toHaveBeenCalled();
    });

    it("updateStatus should call dirty and save on the Status, and then call cancelEditStatus", function () {
      spyOn(scope, "cancelEditStatus");
      spyOn(Status, "dirty");
      deferred = $q.defer();
      spyOn(Status, "save").and.returnValue(deferred.promise);
      scope.statusToEdit = Status;
      scope.updateStatus();
      deferred.resolve({
        body: angular.toJson({
          meta: {
            status: "SUCCESS"
          }
        })
      });
      scope.$apply();

      expect(scope.cancelEditStatus).toHaveBeenCalled();
      expect(Status.dirty).toHaveBeenCalledWith(true);
      expect(Status.save).toHaveBeenCalled();
    });

    it("cancelEditStatus should clear out statusToEdit and call resetStatusForms", function () {
      spyOn(scope, "resetStatusForms");
      scope.statusToEdit = Status;
      scope.cancelEditStatus();

      expect(scope.statusToEdit.identifier).not.toBeDefined();
      expect(scope.resetStatusForms).toHaveBeenCalled();
    });

    it("confirmDeleteStatus should set the statusToDelete and open the modal", function () {
      spyOn(scope, "openModal");
      scope.confirmDeleteStatus(mockStatuses[0]);

      expect(scope.openModal).toHaveBeenCalled();
      expect(scope.statusToDelete).toEqual(mockStatuses[0]);
    });

    it("cancelDeleteStatus should clear statusToDelete and close the modal", function () {
      spyOn(scope, "closeModal");
      scope.statusToDelete = mockStatuses[0];
      scope.cancelDeleteStatus();

      expect(scope.closeModal).toHaveBeenCalled();
      expect(scope.statusToDelete).toEqual({});
    });

    it("deleteStatus should call the repo delete method and then call cancelDeleteStatus when successful", function () {
      scope.statusToDelete = Status;
      deferred = $q.defer();
      spyOn(StatusRepo, "delete").and.returnValue(deferred.promise);
      spyOn(scope, "cancelDeleteStatus");
      scope.deleteStatus(Status);
      deferred.resolve({
        body: angular.toJson({
          meta: {
            status: "SUCCESS"
          }
        })
      });
      scope.$apply();

      expect(StatusRepo.delete).toHaveBeenCalledWith(Status);
      expect(scope.cancelDeleteStatus).toHaveBeenCalled();
    });
  });

});
