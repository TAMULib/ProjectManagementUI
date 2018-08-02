app.controller('StatusController', function ($controller, $scope, ApiResponseActions, StatusRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.statuses = StatusRepo.getAll();

    $scope.statusToCreate = StatusRepo.getScaffold();

    $scope.statusToDelete = {};

    $scope.statusForms = {
        validations: StatusRepo.getValidations(),
        getResults: StatusRepo.getValidationResults
    };

    $scope.resetStatusForms = function () {
        StatusRepo.clearValidationResults();
        for (var key in $scope.statusForms) {
            if ($scope.statusForms[key] !== undefined && !$scope.statusForms[key].$pristine && $scope.statusForms[key].$setPristine) {
                $scope.statusForms[key].$setPristine();
            }
        }
        $scope.closeModal();
    };

    $scope.resetStatusForms();

    $scope.createStatus = function () {
        sanatizeMapping($scope.statusToCreate);
        StatusRepo.create($scope.statusToCreate).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetCreateStatus();
            }
        });
    };

    $scope.resetCreateStatus = function () {
        angular.extend($scope.statusToCreate, StatusRepo.getScaffold());
        $scope.resetStatusForms();
    };

    $scope.editStatus = function (status) {
        $scope.statusToEdit = status;
        if ($scope.statusToEdit.mapping.length === 0) {
            $scope.statusToEdit.mapping.push('');
        }
        $scope.openModal('#editStatusModal');
    };

    $scope.updateStatus = function () {
        sanatizeMapping($scope.statusToEdit);
        $scope.statusToEdit.dirty(true);
        $scope.statusToEdit.save().then(function () {
            $scope.cancelEditStatus();
        });
    };

    $scope.addMatch = function (status) {
        status.mapping.push('');
    };

    $scope.removeMatch = function (status, index) {
        status.mapping.splice(index, 1);
    };

    $scope.cancelEditStatus = function () {
        $scope.statusToEdit.refresh();
        $scope.statusToEdit = {};
        $scope.resetStatusForms();
    };

    $scope.confirmDeleteStatus = function (status) {
        $scope.statusToDelete = status;
        $scope.openModal('#deleteStatusModal');
    };

    $scope.cancelDeleteStatus = function () {
        $scope.statusToDelete = {};
        $scope.closeModal();
    };

    $scope.deleteStatus = function (status) {
        StatusRepo.delete(status).then(function (res) {
            if (angular.fromJson(res.body).meta.status === "SUCCESS") {
                $scope.cancelDeleteStatus();
            }
        });
    };

    var sanatizeMapping = function (status) {
        for (var i = status.mapping.length - 1; i >= 0; i--) {
            if (status.mapping[i].trim().length === 0) {
                status.mapping.splice(i, 1);
            }
        }
    };

    StatusRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function (arg) {
        $scope.statuses = StatusRepo.getAll();
    });

});