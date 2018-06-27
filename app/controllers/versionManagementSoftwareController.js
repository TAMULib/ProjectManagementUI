app.controller('RemoteProjectManagerController', function ($controller, $scope, $filter, $rootScope, ApiResponseActions, NgTableParams, RemoteProjectManager, RemoteProjectManagerRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.remoteProjectManagers = RemoteProjectManagerRepo.getAll();

    $scope.vmsToCreate = RemoteProjectManagerRepo.getScaffold();

    $scope.vmsToEdit = {};
    $scope.vmsToDelete = {};

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
        RemoteProjectManagerRepo.create($scope.vmsToCreate).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.cancelCreateRemoteProjectManager();
            }
        });
    };

    $scope.cancelCreateRemoteProjectManager = function () {
        $scope.vmsToCreate = RemoteProjectManagerRepo.getScaffold();
        $scope.resetRemoteProjectManagerForms();
    };

    $scope.editRemoteProjectManager = function (remoteProjectManager) {
        $scope.vmsToEdit = angular.copy(remoteProjectManager);
        $scope.openModal('#editRemoteProjectManagerModal');
    };

    $scope.updateRemoteProjectManager = function () {
        $scope.vmsToEdit.dirty(true);
        $scope.vmsToEdit.save().then(function () {
            $scope.cancelEditRemoteProjectManager();
        });
    };

    $scope.cancelEditRemoteProjectManager = function () {
        $scope.vmsToEdit.refresh();
        $scope.resetRemoteProjectManagerForms();
    };

    $scope.confirmDeleteRemoteProjectManager = function (remoteProjectManager) {
        $scope.vmsToDelete = remoteProjectManager;
        $scope.openModal('#deleteRemoteProjectManagerModal');
    };

    $scope.cancelDeleteRemoteProjectManager = function () {
        $scope.vmsToDelete = {};
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