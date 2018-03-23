describe('controller: ProjectController', function () {

  var scope, controller, ProjectRepo, VersionManagementSoftwareRepo;

  beforeEach(module('core'));
  beforeEach(module('app'));
  beforeEach(module('app/views/modals/addProjectModal.html'));
  beforeEach(module('mock.project'));
  beforeEach(module('mock.projectRepo'));
  beforeEach(module('mock.versionManagementSoftwareRepo'));
  beforeEach(module('mock.versionProjectService'));

  beforeEach(inject(function ($controller, $rootScope, $templateCache, _$compile_, _$q_, _$templateRequest_, _ModalService_, _Project_, _ProjectRepo_, _VersionManagementSoftwareRepo_, _VersionProjectService_) {
    installPromiseMatchers();
    scope = $rootScope.$new();
    Project = _Project_;
    ProjectRepo = _ProjectRepo_;
    VersionManagementSoftwareRepo = _VersionManagementSoftwareRepo_;
    VersionProjectService = _VersionProjectService_;
    $compile = _$compile_;
    $q = _$q_;
    cache = $templateCache;
    controller = $controller('ProjectController', {
      $scope: scope,
      $compile: _$compile_,
      $templateRequest: _$templateRequest_,
      ModalService: _ModalService_,
      Project: _Project_,
      ProjectRepo: _ProjectRepo_,
      VersionManagementSoftwareRepo: _VersionManagementSoftwareRepo_,
      VersionProjectService: _VersionProjectService_
    });
  }));

  describe('Is the controller defined', function () {
    it('should be defined', function () {
      expect(controller).toBeDefined();
    });
  });

  describe('Are the scope methods defined', function () {
    it('resetProjectForms should be defined', function () {
      expect(scope.resetProjectForms).toBeDefined();
      expect(typeof scope.resetProjectForms).toEqual('function');
    });
    it('createProject should be defined', function () {
      expect(scope.createProject).toBeDefined();
      expect(typeof scope.createProject).toEqual('function');
    });
    it('cancelCreateProject should be defined', function () {
      expect(scope.cancelCreateProject).toBeDefined();
      expect(typeof scope.cancelCreateProject).toEqual('function');
    });
    it('editProject should be defined', function () {
      expect(scope.editProject).toBeDefined();
      expect(typeof scope.editProject).toEqual('function');
    });
    it('updateProject should be defined', function () {
      expect(scope.updateProject).toBeDefined();
      expect(typeof scope.updateProject).toEqual('function');
    });
    it('cancelEditProject should be defined', function () {
      expect(scope.cancelEditProject).toBeDefined();
      expect(typeof scope.cancelEditProject).toEqual('function');
    });
    it('confirmDeleteProject should be defined', function () {
      expect(scope.confirmDeleteProject).toBeDefined();
      expect(typeof scope.confirmDeleteProject).toEqual('function');
    });
    it('cancelDeleteProject should be defined', function () {
      expect(scope.cancelDeleteProject).toBeDefined();
      expect(typeof scope.cancelDeleteProject).toEqual('function');
    });
    it('deleteProject should be defined', function () {
      expect(scope.deleteProject).toBeDefined();
      expect(typeof scope.deleteProject).toEqual('function');
    });
  });

  describe('Do the scope methods work as expected', function () {
    it('resetProjectForms should reset project forms', function () {
      var modal = angular.element(cache.get('app/views/modals/addProjectModal.html'));
      modal = $compile(modal)(scope);
      scope.$digest();
      var form = scope.projectForms.create;
      form.$setDirty();

      expect(form.$dirty).toEqual(true);

      scope.resetProjectForms();

      expect(form.$pristine).toEqual(true);
      expect(form.$dirty).toEqual(false);
    });

    it('createProject should create a new project', function () {
      var length = mockProjects.length + 1;
      var newProject = {
        id: length,
        name: 'Mock Project 4'
      };
      scope.projectToCreate = newProject;
      scope.createProject();

      expect(ProjectRepo.findById(newProject.id)).toEqual(newProject);
    });

    it('cancelCreateProject should call resetProjectForms() and clear out the name field', function () {
      spyOn(scope, 'resetProjectForms');
      var length = mockProjects.length + 1;
      var newProject = {
        id: length,
        name: 'Mock Project 4'
      };
      scope.projectToCreate = newProject;
      var modal = angular.element(cache.get('app/views/modals/addProjectModal.html'));
      modal = $compile(modal)(scope);
      scope.$digest();
      var form = scope.projectForms.create;
      form.$setDirty();
      scope.cancelCreateProject();

      expect(scope.projectToCreate.name).toEqual('');
      expect(scope.resetProjectForms).toHaveBeenCalled();
    });

    it('editProject should set the projectToEdit and open the modal', function () {
      spyOn(scope, 'openModal');
      scope.editProject(mockProjects[0]);

      expect(scope.projectToEdit).toEqual(mockProjects[0]);
      expect(scope.openModal).toHaveBeenCalled();
    });

    it('updateProject should call dirty and save on the Project, and then call cancelEditProject', function () {
      spyOn(scope, 'cancelEditProject');
      spyOn(Project, 'dirty');
      deferred = $q.defer();
      spyOn(Project, 'save').and.returnValue(deferred.promise);
      scope.projectToEdit = Project;
      scope.updateProject();
      deferred.resolve();
      scope.$apply();

      expect(scope.cancelEditProject).toHaveBeenCalled();
      expect(Project.dirty).toHaveBeenCalledWith(true);
      expect(Project.save).toHaveBeenCalled();
    });

    it('cancelEditProject should clear out projectToEdit and call resetProjectForms', function () {
      spyOn(scope, 'resetProjectForms');
      scope.projectToEdit = Project;
      scope.cancelEditProject();

      expect(scope.projectToEdit).toEqual({});
      expect(scope.resetProjectForms).toHaveBeenCalled();
    });

    it('confirmDeleteProject should set the projectToDelete and open the modal', function () {
      spyOn(scope, 'openModal');
      scope.confirmDeleteProject(mockProjects[0]);

      expect(scope.openModal).toHaveBeenCalled();
      expect(scope.projectToDelete).toEqual(mockProjects[0]);
    });

    it('cancelDeleteProject should clear projectToDelete and close the modal', function () {
      spyOn(scope, 'closeModal');
      scope.projectToDelete = mockProjects[0];
      scope.cancelDeleteProject();

      expect(scope.closeModal).toHaveBeenCalled();
      expect(scope.projectToDelete).toEqual({});
    });

    it('deleteProject should call the repo delete method and then call cancelDeleteProject when successful', function () {
      scope.projectToDelete = Project;
      deferred = $q.defer();
      spyOn(ProjectRepo, 'delete').and.returnValue(deferred.promise);
      spyOn(scope, 'cancelDeleteProject');
      scope.deleteProject(Project);
      deferred.resolve({
        body: angular.toJson({
          meta: {
            status: "SUCCESS"
          }
        })
      });
      scope.$apply();

      expect(ProjectRepo.delete).toHaveBeenCalledWith(Project);
      expect(scope.cancelDeleteProject).toHaveBeenCalled();
    });

  });

});