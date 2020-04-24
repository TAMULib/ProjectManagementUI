app.controller('ProjectController', function ($controller, $scope, ApiResponseActions, ProjectRepo, RemoteProjectManagerRepo, RemoteProjectsService) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.projects = ProjectRepo.getAll();

    $scope.projectToCreate = ProjectRepo.getScaffold();

    $scope.projectToDelete = {};

    $scope.projectForms = {
        validations: ProjectRepo.getValidations(),
        getResults: ProjectRepo.getValidationResults
    };

    $scope.resetProjectForms = function () {
        ProjectRepo.clearValidationResults();
        for (var key in $scope.projectForms) {
            if ($scope.projectForms[key] !== undefined && !$scope.projectForms[key].$pristine && $scope.projectForms[key].$setPristine) {
                $scope.projectForms[key].$setPristine();
            }
        }
        $scope.closeModal();
    };

    $scope.resetProjectForms();

    $scope.createProject = function () {
        ProjectRepo.create($scope.projectToCreate).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetCreateProject();
            }
        });
    };

    $scope.resetCreateProject = function () {
        angular.extend($scope.projectToCreate, ProjectRepo.getScaffold());
        $scope.resetProjectForms();
    };

    $scope.editProject = function (project) {
        $scope.projectToEdit = project;
        $scope.openModal('#editProjectModal');
    };

    $scope.updateProject = function () {
        $scope.projectToEdit.dirty(true);
        $scope.projectToEdit.save().then(function () {
            $scope.cancelEditProject();
        });
    };

    $scope.cancelEditProject = function () {
        $scope.projectToEdit.refresh();
        $scope.projectToEdit = {};
        $scope.resetProjectForms();
    };

    $scope.confirmDeleteProject = function (project) {
        $scope.projectToDelete = project;
        $scope.openModal('#deleteProjectModal');
    };

    $scope.cancelDeleteProject = function () {
        $scope.projectToDelete = {};
        $scope.closeModal();
    };

    $scope.deleteProject = function (project) {
        ProjectRepo.delete(project).then(function (res) {
            if (angular.fromJson(res.body).meta.status === "SUCCESS") {
                $scope.cancelDeleteProject();
            }
        });
    };

    if ($scope.isManager() || $scope.isAdmin()) {
        $scope.remoteProjectManagers = RemoteProjectManagerRepo.getAll();

        $scope.remoteProjects = RemoteProjectsService.getRemoteProjects();

        $scope.getRemoteProjectManagerRemoteProjects = function (remoteProjectManagerId) {
            return $scope.remoteProjects[remoteProjectManagerId];
        };

        RemoteProjectManagerRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function () {
            $scope.remoteProjectManagers.length = 0;
            var remoteProjectManagers = RemoteProjectManagerRepo.getAll();
            for (var i in remoteProjectManagers) {
                $scope.remoteProjectManagers.push(remoteProjectManagers[i]);
            }
        });
    }

    ProjectRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function () {
        $scope.projects.length = 0;
        var projects = ProjectRepo.getAll();
        for (var i in projects) {
            $scope.projects.push(projects[i]);
        }
    });

});