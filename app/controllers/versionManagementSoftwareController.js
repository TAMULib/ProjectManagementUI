app.controller('RemoteProjectManagerController', function ($controller, $scope, $filter, $rootScope, ApiResponseActions, NgTableParams, RemoteProjectManager, RemoteProjectManagerRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.vmses = RemoteProjectManagerRepo.getAll();

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

    $scope.editRemoteProjectManager = function (vms) {
        $scope.vmsToEdit = angular.copy(vms);
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

    $scope.confirmDeleteRemoteProjectManager = function (vms) {
        $scope.vmsToDelete = vms;
        $scope.openModal('#deleteRemoteProjectManagerModal');
    };

    $scope.cancelDeleteRemoteProjectManager = function () {
        $scope.vmsToDelete = {};
        $scope.closeModal();
    };

    $scope.deleteRemoteProjectManager = function (vms) {
        RemoteProjectManagerRepo.delete(vms).then(function (res) {
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
                return $scope.vmses;
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