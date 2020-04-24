app.controller('RemoteProjectManagerController', function ($controller, $scope, ApiResponseActions, RemoteProjectManagerRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.remoteProjectManagers = RemoteProjectManagerRepo.getAll();

    $scope.remoteProjectManagerToCreate = RemoteProjectManagerRepo.getScaffold();

    $scope.remoteProjectManagerToEdit = {};
    $scope.remoteProjectManagerToDelete = {};

    RemoteProjectManagerRepo.getTypes().then(function (types) {
        $scope.serviceTypes = types;
        $scope.resetRemoteProjectManagerForms();
    });

    $scope.remoteProjectManagerForms = {
        validations: RemoteProjectManagerRepo.getValidations(),
        getResults: RemoteProjectManagerRepo.getValidationResults
    };

    $scope.resetRemoteProjectManagerForms = function () {
        RemoteProjectManagerRepo.clearValidationResults();
        for (var key in $scope.remoteProjectManagerForms) {
            if ($scope.remoteProjectManagerForms[key] !== undefined && !$scope.remoteProjectManagerForms[key].$pristine && $scope.remoteProjectManagerForms[key].$setPristine) {
                $scope.remoteProjectManagerForms[key].$setPristine();
            }
        }
        $scope.closeModal();
    };

    $scope.createRemoteProjectManager = function () {
        RemoteProjectManagerRepo.create($scope.remoteProjectManagerToCreate).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetCreateRemoteProjectManager();
            }
        });
    };

    $scope.resetCreateRemoteProjectManager = function () {
        $scope.remoteProjectManagerToCreate = RemoteProjectManagerRepo.getScaffold();
        $scope.resetRemoteProjectManagerForms();
    };

    $scope.editRemoteProjectManager = function (remoteProjectManager) {
        $scope.remoteProjectManagerToEdit = angular.copy(remoteProjectManager);
        $scope.openModal('#editRemoteProjectManagerModal');
    };

    $scope.updateRemoteProjectManager = function () {
        $scope.remoteProjectManagerToEdit.dirty(true);
        $scope.remoteProjectManagerToEdit.save().then(function (res) {
            if (angular.fromJson(res.body).meta.status === "SUCCESS") {
                $scope.cancelEditRemoteProjectManager();
            }
        });
    };

    $scope.cancelEditRemoteProjectManager = function () {
        $scope.remoteProjectManagerToEdit.refresh();
        $scope.resetRemoteProjectManagerForms();
    };

    $scope.confirmDeleteRemoteProjectManager = function (remoteProjectManager) {
        $scope.remoteProjectManagerToDelete = remoteProjectManager;
        $scope.openModal('#deleteRemoteProjectManagerModal');
    };

    $scope.cancelDeleteRemoteProjectManager = function () {
        $scope.remoteProjectManagerToDelete = {};
        $scope.closeModal();
    };

    $scope.deleteRemoteProjectManager = function (remoteProjectManager) {
        RemoteProjectManagerRepo.delete(remoteProjectManager).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.cancelDeleteRemoteProjectManager();
            }
        });
    };

    $scope.typeSettings = function (type) {
        for (var i in $scope.serviceTypes) {
            if ($scope.serviceTypes[i].value === type) {
                return $scope.serviceTypes[i].scaffold;
            }
        }
        return [];
    };

    RemoteProjectManagerRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function () {
        $scope.remoteProjectManagers.length = 0;
        var remoteProjectManagers = RemoteProjectManagerRepo.getAll();
        for (var i in remoteProjectManagers) {
            $scope.remoteProjectManagers.push(remoteProjectManagers[i]);
        }
    });

});