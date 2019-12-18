describe("controller: ProjectController", function () {
  var $compile, $q, $scope, $templateCache, $templateRequest, MockedProject, MockedRemoteProjectManager, MockedUser, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$compile_, _$q_, _$templateCache_, _$templateRequest_, _ProjectRepo_, _WsApi_) {
      $compile = _$compile_;
      $q = _$q_;
      $templateCache = _$templateCache_;
      $templateRequest = _$templateRequest_;

      MockedUser = new mockUser($q);
      MockedProject = new mockProject($q);
      MockedRemoteProjectManager = new mockRemoteProjectManager($q);

      ProjectRepo = _ProjectRepo_;
      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _ModalService_, _Project_, _RemoteProjectManagerRepo_, _RemoteProjectsService_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("ProjectController", {
        $scope: $scope,
        $compile: $compile,
        $templateRequest: $templateRequest,
        ModalService: _ModalService_,
        Project: _Project_,
        ProjectRepo: ProjectRepo,
        RemoteProjectManagerRepo: _RemoteProjectManagerRepo_,
        RemoteProjectsService: _RemoteProjectsService_,
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
    module("mock.project", function ($provide) {
      var Project = function () {
        return MockedProject;
      };
      $provide.value("Project", Project);
    });
    module("mock.projectRepo");
    module("mock.remoteProjectManager", function ($provide) {
      var RemoteProjectManager = function () {
        return MockedRemoteProjectManager;
      };
      $provide.value("RemoteProjectManager", RemoteProjectManager);
    });
    module("mock.remoteProjectManagerRepo");
    module("mock.remoteProjectService");
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

  describe("Is the controller defined", function () {
    it("should be defined", function () {
      expect(controller).toBeDefined();
    });
  });

  describe("Are the scope methods defined", function () {
    it("resetProjectForms should be defined", function () {
      expect($scope.resetProjectForms).toBeDefined();
      expect(typeof $scope.resetProjectForms).toEqual("function");
    });

    it("createProject should be defined", function () {
      expect($scope.createProject).toBeDefined();
      expect(typeof $scope.createProject).toEqual("function");
    });

    it("resetCreateProject should be defined", function () {
      expect($scope.resetCreateProject).toBeDefined();
      expect(typeof $scope.resetCreateProject).toEqual("function");
    });

    it("editProject should be defined", function () {
      expect($scope.editProject).toBeDefined();
      expect(typeof $scope.editProject).toEqual("function");
    });

    it("updateProject should be defined", function () {
      expect($scope.updateProject).toBeDefined();
      expect(typeof $scope.updateProject).toEqual("function");
    });

    it("cancelEditProject should be defined", function () {
      expect($scope.cancelEditProject).toBeDefined();
      expect(typeof $scope.cancelEditProject).toEqual("function");
    });

    it("confirmDeleteProject should be defined", function () {
      expect($scope.confirmDeleteProject).toBeDefined();
      expect(typeof $scope.confirmDeleteProject).toEqual("function");
    });

    it("cancelDeleteProject should be defined", function () {
      expect($scope.cancelDeleteProject).toBeDefined();
      expect(typeof $scope.cancelDeleteProject).toEqual("function");
    });

    it("deleteProject should be defined", function () {
      expect($scope.deleteProject).toBeDefined();
      expect(typeof $scope.deleteProject).toEqual("function");
    });
  });

  describe("Do the scope methods work as expected", function () {
    it("resetProjectForms should reset project forms", function () {
      var modal = angular.element($templateCache.get("views/modals/addProjectModal.html"));
      modal = $compile(modal)($scope);

      var form = $scope.projectForms.create;
      form.$setDirty();

      expect(form.$dirty).toEqual(true);

      $scope.resetProjectForms();

      expect(form.$pristine).toEqual(true);
      expect(form.$dirty).toEqual(false);
    });

    it("createProject should create a new project", function () {
      var newProject = new mockProject($q);

      newProject.mock({
        id: dataProjectRepo1.length + 1,
        name: "Mock Project 4"
      });

      $scope.projectToCreate = newProject;
      $scope.createProject();

      expect(ProjectRepo.findById(newProject.id)).toEqual(newProject);
    });

    it("resetCreateProject should call resetProjectForms() and clear out the name field", function () {
      spyOn($scope, "resetProjectForms");

      $scope.projectToCreate = new mockProject($q);
      $scope.projectToCreate.mock({
        id: dataProjectRepo1.length + 1,
        name: "Mock Project 4"
      });

      var modal = angular.element($templateCache.get("views/modals/addProjectModal.html"));
      modal = $compile(modal)($scope);

      var form = $scope.projectForms.create;
      form.$setDirty();
      $scope.resetCreateProject();

      expect($scope.projectToCreate.name).toEqual("");
      expect($scope.resetProjectForms).toHaveBeenCalled();
    });

    it("editProject should set the projectToEdit and open the modal", function () {
      spyOn($scope, "openModal");
      $scope.editProject(dataProjectRepo1[0]);

      expect($scope.projectToEdit).toEqual(dataProjectRepo1[0]);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("updateProject should call dirty and save on the Project, and then call cancelEditProject", function () {
      var project = new mockProject($q);

      spyOn($scope, "cancelEditProject");
      spyOn(project, "dirty");
      deferred = $q.defer();
      spyOn(project, "save").and.returnValue(deferred.promise);
      $scope.projectToEdit = project;
      $scope.updateProject();
      deferred.resolve();
      $scope.$apply();

      expect($scope.cancelEditProject).toHaveBeenCalled();
      expect(project.dirty).toHaveBeenCalledWith(true);
      expect(project.save).toHaveBeenCalled();
    });

    it("cancelEditProject should clear out projectToEdit and call resetProjectForms", function () {
      var project = new mockProject($q);

      spyOn($scope, "resetProjectForms");
      $scope.projectToEdit = project;
      $scope.cancelEditProject();

      expect($scope.projectToEdit).toEqual({});
      expect($scope.resetProjectForms).toHaveBeenCalled();
    });

    it("confirmDeleteProject should set the projectToDelete and open the modal", function () {
      spyOn($scope, "openModal");
      $scope.confirmDeleteProject(dataProjectRepo1[0]);

      expect($scope.openModal).toHaveBeenCalled();
      expect($scope.projectToDelete).toEqual(dataProjectRepo1[0]);
    });

    it("cancelDeleteProject should clear projectToDelete and close the modal", function () {
      spyOn($scope, "closeModal");
      $scope.projectToDelete = dataProjectRepo1[0];
      $scope.cancelDeleteProject();

      expect($scope.closeModal).toHaveBeenCalled();
      expect($scope.projectToDelete).toEqual({});
    });

    it("deleteProject should call the repo delete method and then call cancelDeleteProject when successful", function () {
      var project = new mockProject($q);

      $scope.projectToDelete = project;
      deferred = $q.defer();
      spyOn(ProjectRepo, "delete").and.returnValue(deferred.promise);
      spyOn($scope, "cancelDeleteProject");
      $scope.deleteProject(project);
      deferred.resolve({
        body: angular.toJson({
          meta: {
            status: "SUCCESS"
          }
        })
      });
      $scope.$apply();

      expect(ProjectRepo.delete).toHaveBeenCalledWith(project);
      expect($scope.cancelDeleteProject).toHaveBeenCalled();
    });

  });

});
