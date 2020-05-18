app.controller('RemoteProductManagerController', function ($controller, $scope, ApiResponseActions, RemoteProductManagerRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.remoteProductManagers = RemoteProductManagerRepo.getAll();

    $scope.remoteProductManagerToCreate = RemoteProductManagerRepo.getScaffold();

    $scope.remoteProductManagerToEdit = {};
    $scope.remoteProductManagerToDelete = {};

    RemoteProductManagerRepo.getTypes().then(function (types) {
        $scope.serviceTypes = types;
        $scope.resetRemoteProductManagerForms();
    });

    $scope.remoteProductManagerForms = {
        validations: RemoteProductManagerRepo.getValidations(),
        getResults: RemoteProductManagerRepo.getValidationResults
    };

    $scope.resetRemoteProductManagerForms = function () {
        RemoteProductManagerRepo.clearValidationResults();
        for (var key in $scope.remoteProductManagerForms) {
            if ($scope.remoteProductManagerForms[key] !== undefined && !$scope.remoteProductManagerForms[key].$pristine && $scope.remoteProductManagerForms[key].$setPristine) {
                $scope.remoteProductManagerForms[key].$setPristine();
            }
        }
        $scope.closeModal();
    };

    $scope.createRemoteProductManager = function () {
        RemoteProductManagerRepo.create($scope.remoteProductManagerToCreate).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetCreateRemoteProductManager();
            }
        });
    };

    $scope.resetCreateRemoteProductManager = function () {
        $scope.remoteProductManagerToCreate = RemoteProductManagerRepo.getScaffold();
        $scope.resetRemoteProductManagerForms();
    };

    $scope.editRemoteProductManager = function (remoteProductManager) {
        $scope.remoteProductManagerToEdit = angular.copy(remoteProductManager);
        $scope.openModal('#editRemoteProductManagerModal');
    };

    $scope.updateRemoteProductManager = function () {
        $scope.remoteProductManagerToEdit.dirty(true);
        $scope.remoteProductManagerToEdit.save().then(function (res) {
            if (angular.fromJson(res.body).meta.status === "SUCCESS") {
                $scope.cancelEditRemoteProductManager();
            }
        });
    };

    $scope.cancelEditRemoteProductManager = function () {
        $scope.remoteProductManagerToEdit.refresh();
        $scope.resetRemoteProductManagerForms();
    };

    $scope.confirmDeleteRemoteProductManager = function (remoteProductManager) {
        $scope.remoteProductManagerToDelete = remoteProductManager;
        $scope.openModal('#deleteRemoteProductManagerModal');
    };

    $scope.cancelDeleteRemoteProductManager = function () {
        $scope.remoteProductManagerToDelete = {};
        $scope.closeModal();
    };

    $scope.deleteRemoteProductManager = function (remoteProductManager) {
        RemoteProductManagerRepo.delete(remoteProductManager).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.cancelDeleteRemoteProductManager();
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

    RemoteProductManagerRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function () {
        $scope.remoteProductManagers.length = 0;
        var remoteProductManagers = RemoteProductManagerRepo.getAll();
        for (var i in remoteProductManagers) {
            $scope.remoteProductManagers.push(remoteProductManagers[i]);
        }
    });

});
