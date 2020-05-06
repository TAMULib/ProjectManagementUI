app.controller('InternalRequestController', function ($controller, $scope, ApiResponseActions, InternalRequestRepo, InternalRequestsService, ProductRepo, RemoteProductsByProductIdService, ProductsService) {

  angular.extend(this, $controller('AbstractController', {
    $scope: $scope
  }));

  $scope.internalRequests = InternalRequestRepo.getAll();

  $scope.internalRequestToCreate = InternalRequestRepo.getScaffold();
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
    $scope.remoteProductsByProduct = RemoteProductsByProductIdService.remoteProducts();
    $scope.products = ProductsService.getProducts();

    $scope.refreshProductRemoteProducts = function () {
      RemoteProductsByProductIdService.refreshRemoteProductsByProductId($scope.featureRequestToPush.productId);
    };

    $scope.createInternalRequest = function () {
      $scope.internalRequestToCreate.createdOn = new Date().getTime();

      InternalRequestRepo.create($scope.internalRequestToCreate).then(function (res) {
        if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
          $scope.resetCreateInternalRequest();
        }
      });
    };

    $scope.resetCreateInternalRequest = function () {
      angular.extend($scope.internalRequestToCreate, InternalRequestRepo.getScaffold());
      $scope.resetInternalRequestForms();
    };

    $scope.pushInternalRequest = function (internalRequest) {
      $scope.featureRequestToPush = {
        id: internalRequest.id,
        title: internalRequest.title,
        description: internalRequest.description,
        rpmId: null,
        productId: null,
        scopeId: null
      };

      $scope.openModal('#pushInternalRequestModal');
    };

    $scope.pushFeatureRequest = function () {
      for (var key in $scope.products) {
        if ($scope.products[key].id == $scope.featureRequestToPush.productId) {
          for (var k in $scope.products[key].remoteProducts) {
            if ($scope.products[key].remoteProducts[k].scopeId == $scope.featureRequestToPush.scopeId) {
              $scope.featureRequestToPush.rpmId = $scope.products[key].remoteProducts[k].remoteProductManager.id;
              break;
            }
          }

          break;
        }
      }

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

    ProductRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function () {
      var products = ProductRepo.getAll();

      $scope.products.length = 0;

      for (var i in products) {
        $scope.products.push(products[i]);
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
