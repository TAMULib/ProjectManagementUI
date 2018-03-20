app.controller('ProjectController', function ($controller, $scope, NgTableParams, ApiResponseActions, Project, ProjectRepo) {

  angular.extend(this, $controller('AbstractController', {$scope: $scope}));

  $scope.projectRepo = ProjectRepo;

  $scope.projects = ProjectRepo.getAll();

  $scope.projectToCreate = ProjectRepo.getScaffold();

  $scope.projectToDelete = {};
  $scope.projectToEdit = {};

  $scope.projectForms = {
    validations: ProjectRepo.getValidations(),
    getResults: ProjectRepo.getValidationResults
  };

  $scope.resetProjectForms = function() {
    ProjectRepo.clearValidationResults();
    for (var key in $scope.projectForms) {
      if (!$scope.projectForms[key] !== undefined && !$scope.projectForms[key].$pristine && $scope.projectForms[key].$setPristine) {
        $scope.projectForms[key].$setPristine();
      }
    }
    delete $scope.projectToTest;
    $scope.closeModal();
  };

  $scope.resetProjectForms();

  $scope.createProject = function() {
    ProjectRepo.create($scope.projectToCreate).then(function(res) {
      if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
        $scope.cancelCreateProject();
      }
    });
  };

  $scope.cancelCreateProject = function() {
    angular.extend($scope.projectToCreate, ProjectRepo.getScaffold());
    $scope.resetProjectForms();
  };

  $scope.editProject = function(project) {
    $scope.projectToEdit = project;
    $scope.openModal('#editProjectModal');
  };

  $scope.updateProject = function() {
    $scope.projectToEdit.dirty(true);
    $scope.projectToEdit.save().then(function() {
      $scope.cancelEditProject();
    });
  };

  $scope.cancelEditProject = function() {
    $scope.projectToEdit.refresh();
    $scope.projectToEdit = {};
    $scope.resetProjectForms();
  };

  $scope.confirmDeleteProject = function(project) {
    $scope.projectToDelete = project;
    $scope.openModal('#deleteProjectModal');
  };

  $scope.cancelDeleteProject = function() {
    $scope.projectToDelete = {};
    $scope.closeModal();
  };

  $scope.deleteProject = function(project) {
    ProjectRepo.delete(project).then(function(res) {
      if (angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelDeleteProject();
      }
    });
  };

  var buildTable = function () {
    var allProjects = ProjectRepo.getAll();
    $scope.tableParams = new NgTableParams({
      count: allProjects.length,
      sorting: {
        name: 'asc'
      }
    }, {
      counts: [],
      total: 0,
      getData: function(params) {
        return $scope.projects;
      }
    });
  };

  ProjectRepo.ready().then(function () {
    buildTable();
  });

  ProjectRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function(arg) {
    buildTable();
  });

});