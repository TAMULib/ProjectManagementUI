app.controller('VersionManagementSoftwareController', function ($controller, $scope, $filter, $rootScope, ApiResponseActions, NgTableParams, VersionManagementSoftware, VersionManagementSoftwareRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.vmses = VersionManagementSoftwareRepo.getAll();

    $scope.vmsToCreate = VersionManagementSoftwareRepo.getScaffold();

    $scope.vmsToEdit = {};
    $scope.vmsToDelete = {};

    VersionManagementSoftwareRepo.getTypes().then(function (types) {
        $scope.serviceTypes = types;
    });

    $scope.vmsForms = {
        validations: VersionManagementSoftwareRepo.getValidations(),
        getResults: VersionManagementSoftwareRepo.getValidationResults
    };

    $scope.resetVmsForms = function () {
        VersionManagementSoftwareRepo.clearValidationResults();
        for (var key in $scope.vmsForms) {
            if ($scope.vmsForms[key] !== undefined && !$scope.vmsForms[key].$pristine && $scope.vmsForms[key].$setPristine) {
                $scope.vmsForms[key].$setPristine();
            }
        }
        $scope.closeModal();
    };

    $scope.resetVmsForms();

    $scope.createVms = function () {
        VersionManagementSoftwareRepo.create($scope.vmsToCreate).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.cancelCreateVms();
            }
        });
    };

    $scope.cancelCreateVms = function () {
        $scope.vmsToCreate = VersionManagementSoftwareRepo.getScaffold();
        $scope.resetVmsForms();
    };

    $scope.editVms = function (vms) {
        $scope.vmsToEdit = angular.copy(vms);
        $scope.openModal('#editVmsModal');
    };

    $scope.updateVms = function () {
        $scope.vmsToEdit.dirty(true);
        $scope.vmsToEdit.save().then(function () {
            $scope.cancelEditVms();
        });
    };

    $scope.cancelEditVms = function () {
        $scope.vmsToEdit.refresh();
        $scope.resetVmsForms();
    };

    $scope.confirmDeleteVms = function (vms) {
        $scope.vmsToDelete = vms;
        $scope.openModal('#deleteVmsModal');
    };

    $scope.cancelDeleteVms = function () {
        $scope.vmsToDelete = {};
        $scope.closeModal();
    };

    $scope.deleteVms = function (vms) {
        VersionManagementSoftwareRepo.delete(vms).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.cancelDeleteVms();
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
        var allVmses = VersionManagementSoftwareRepo.getAll();
        $scope.tableParams = new NgTableParams({
            count: allVmses.length,
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

    VersionManagementSoftwareRepo.ready().then(function () {
        buildTable();
    });

    VersionManagementSoftwareRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function (arg) {
        buildTable();
    });

});