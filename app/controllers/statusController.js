app.controller('StatusController', function ($controller, $scope, ApiResponseActions, NgTableParams, StatusRepo) {

  angular.extend(this, $controller('AbstractController', {
    $scope: $scope
  }));

  var status = StatusRepo.getAll();

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
    $scope.openModal('#editStatusModal');
  };

  $scope.updateStatus = function () {
    sanatizeMapping($scope.statusToEdit);
    $scope.statusToEdit.dirty(true);
    $scope.statusToEdit.save().then(function () {
      $scope.cancelEditStatus();
    });
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
  }

  var buildTable = function () {
    $scope.tableParams = new NgTableParams({
      count: StatusRepo.getAll().length
    }, {
      counts: [],
      total: 0,
      getData: function (params) {
        return status;
      }
    });
  };

  StatusRepo.ready().then(function () {
    buildTable();
  });

  StatusRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function (arg) {
    buildTable();
  });

});