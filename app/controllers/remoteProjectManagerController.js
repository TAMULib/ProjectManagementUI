app.controller('RemoteProjectManagerController', function ($controller, $scope, $filter, $rootScope, ApiResponseActions, NgTableParams, RemoteProjectManager, RemoteProjectManagerRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.remoteProjectManagers = RemoteProjectManagerRepo.getAll();

    $scope.remoteProjectManagerToCreate = RemoteProjectManagerRepo.getScaffold();

    $scope.remoteProjectManagerToEdit = {};
    $scope.remoteProjectManagerToDelete = {};

    RemoteProjectManagerRepo.getTypes().then(function (types) {
        $scope.serviceTypes = types;
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

    $scope.resetRemoteProjectManagerForms();

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
        $scope.remoteProjectManagerToEdit.save().then(function () {
            $scope.cancelEditRemoteProjectManager();
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

    var buildTable = function () {
        var allRemoteProjectManageres = RemoteProjectManagerRepo.getAll();
        $scope.tableParams = new NgTableParams({
            count: allRemoteProjectManageres.length,
            sorting: {
                name: 'ASC'
            }
        }, {
            counts: [],
            total: 0,
            getData: function (params) {
                return $scope.remoteProjectManagers;
            }
        });
    };

    RemoteProjectManagerRepo.ready().then(function () {
        buildTable();
    });

    RemoteProjectManagerRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function (arg) {
        buildTable();
    });

});