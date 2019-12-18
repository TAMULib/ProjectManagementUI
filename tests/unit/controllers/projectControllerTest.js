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

  describe("Is the controller", function () {
    var roles = [ "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER", "ROLE_ANONYMOUS" ];
    for (var i in roles) {
      it("defined for " + roles[i], function () {
        initializeController({ role: roles[i] });
        expect(controller).toBeDefined();
      });
    }
  });

  describe("Is the scope method", function () {
    var methods = [
      "resetProjectForms",
      "createProject",
      "resetCreateProject",
      "editProject",
      "updateProject",
      "cancelEditProject",
      "confirmDeleteProject",
      "cancelDeleteProject",
      "deleteProject"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect($scope[methods[i]]).toBeDefined();
        expect(typeof $scope[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Does the scope method", function () {
    it("resetProjectForms reset project forms", function () {
      var modal = angular.element($templateCache.get("views/modals/addProjectModal.html"));
      modal = $compile(modal)($scope);

      var form = $scope.projectForms.create;
      form.$setDirty();

      expect(form.$dirty).toEqual(true);

      $scope.resetProjectForms();

      expect(form.$pristine).toEqual(true);
      expect(form.$dirty).toEqual(false);
    });

    it("createProject create a new project", function () {
      var newProject = new mockProject($q);

      newProject.mock({
        id: dataProjectRepo1.length + 1,
        name: "Mock Project 4"
      });

      $scope.projectToCreate = newProject;
      $scope.createProject();

      expect(ProjectRepo.findById(newProject.id)).toEqual(newProject);
    });

    it("resetCreateProject call resetProjectForms() and clear out the name field", function () {
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

    it("editProject set the projectToEdit and open the modal", function () {
      spyOn($scope, "openModal");
      $scope.editProject(dataProjectRepo1[0]);

      expect($scope.projectToEdit).toEqual(dataProjectRepo1[0]);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("updateProject call dirty and save on the Project, and then call cancelEditProject", function () {
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

    it("cancelEditProject clear out projectToEdit and call resetProjectForms", function () {
      var project = new mockProject($q);

      spyOn($scope, "resetProjectForms");
      $scope.projectToEdit = project;
      $scope.cancelEditProject();

      expect($scope.projectToEdit).toEqual({});
      expect($scope.resetProjectForms).toHaveBeenCalled();
    });

    it("confirmDeleteProject set the projectToDelete and open the modal", function () {
      spyOn($scope, "openModal");
      $scope.confirmDeleteProject(dataProjectRepo1[0]);

      expect($scope.openModal).toHaveBeenCalled();
      expect($scope.projectToDelete).toEqual(dataProjectRepo1[0]);
    });

    it("cancelDeleteProject clear projectToDelete and close the modal", function () {
      spyOn($scope, "closeModal");
      $scope.projectToDelete = dataProjectRepo1[0];
      $scope.cancelDeleteProject();

      expect($scope.closeModal).toHaveBeenCalled();
      expect($scope.projectToDelete).toEqual({});
    });

    it("deleteProject call the repo delete method and then call cancelDeleteProject when successful", function () {
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
