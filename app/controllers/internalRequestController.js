app.controller('InternalRequestController', function ($controller, $scope, ApiResponseActions, InternalRequestRepo, InternalRequestsService, RemoteProductManagerRepo, RemoteProductsService) {

  angular.extend(this, $controller('AbstractController', {
    $scope: $scope
  }));

  $scope.internalRequests = InternalRequestRepo.getAll();

  $scope.internalRequestToEdit = {};
  $scope.internalRequestToDelete = {};

  $scope.featureRequestToPush = {};

  $scope.resetInternalRequestForms = function () {
    InternalRequestRepo.clearValidationResults();

    for (var key in $scope.internalRequestForms) {
      if ($scope.internalRequestForms[key] !== undefined && !$scope.internalRequestForms[key].$pristine && $scope.internalRequestForms[key].$setPristine) {
        $scope.internalRequestForms[key].$setPristine();
      }
    }

    $scope.closeModal();
  };

  $scope.resetInternalRequestForms();

  if ($scope.isManager() || $scope.isAdmin()) {
    $scope.remoteProductManagers = RemoteProductManagerRepo.getAll();

    $scope.getRemoteProductManagerRemoteProducts = function (remoteProductManagerId) {
      return RemoteProductManagerRepo.findById(remoteProductManagerId);
    };

    $scope.pushInternalRequest = function (internalRequest) {
      $scope.featureRequestToPush = {
        id: internalRequest.id,
        title: internalRequest.title,
        description: internalRequest.description,
        productId: null,
        scopeId: null
      };

      $scope.openModal('#pushInternalRequestModal');
    };

    $scope.pushFeatureRequest = function () {
      InternalRequestsService.pushFeatureRequest($scope.featureRequestToPush).then(function (res) {
        if (angular.fromJson(res.body).meta.status === "SUCCESS") {
          $scope.cancelPushFeatureRequest();
        }
      });
    };

    $scope.cancelPushFeatureRequest = function () {
      $scope.featureRequestToPush = {};
      $scope.resetInternalRequestForms();
    };

    $scope.editInternalRequest = function (internalRequest) {
      $scope.internalRequestToEdit = angular.copy(internalRequest);
      $scope.openModal('#editInternalRequestModal');
    };

    $scope.updateInternalRequest = function () {
      $scope.internalRequestToEdit.dirty(true);
      $scope.internalRequestToEdit.save().then(function () {
        $scope.cancelEditInternalRequest();
      });
    };

    $scope.cancelEditInternalRequest = function () {
      $scope.internalRequestToEdit.refresh();
      $scope.resetInternalRequestForms();
    };

    $scope.confirmDeleteInternalRequest = function (internalRequest) {
      $scope.internalRequestToDelete = angular.copy(internalRequest);
      $scope.openModal('#deleteInternalRequestModal');
    };

    $scope.cancelDeleteInternalRequest = function () {
      $scope.internalRequestToDelete = {};
      $scope.closeModal();
    };

    $scope.deleteInternalRequest = function (internalRequest) {
      InternalRequestRepo.delete(internalRequest).then(function (res) {
        if (angular.fromJson(res.body).meta.status === "SUCCESS") {
          $scope.cancelDeleteInternalRequest();
        }
      });
    };

    RemoteProductManagerRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function () {
      var remoteProductManagers = RemoteProductManagerRepo.getAll();

      $scope.remoteProductManagers.length = 0;

      for (var i in remoteProductManagers) {
        $scope.remoteProductManagers.push(remoteProductManagers[i]);
      }
    });
  }

  InternalRequestRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function () {
    var internalRequests = InternalRequestRepo.getAll();

    $scope.internalRequests.length = 0;

    for (var i in internalRequests) {
      $scope.internalRequests.push(internalRequests[i]);
    }
  });

});
