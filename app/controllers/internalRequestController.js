app.controller('InternalRequestController', function ($controller, $scope, ApiResponseActions, InternalRequestRepo, InternalRequestsService, ProductRepo, ProductsService, WsApi) {

  angular.extend(this, $controller('AbstractController', {
    $scope: $scope
  }));

  if ($scope.isManager() || $scope.isAdmin()) {
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

    $scope.selectRemoteProducts = function () {
      if ($scope.featureRequestToPush.product && $scope.featureRequestToPush.product.id) {
        if (!$scope.remoteProducts[$scope.featureRequestToPush.product.id]) {
          $scope.refreshRemoteProducts($scope.featureRequestToPush.product.id);
        }
      }
    };

    $scope.refreshRemoteProducts = function (productId) {
      if (productId && !$scope.remoteProductsLoading[productId]) {
        ProductsService.refreshRemoteProducts(productId);
      }
    };

    $scope.addInternalRequest = function () {
      if (!$scope.productsLoading) {
        ProductsService.refreshProducts();
      }

      $scope.openModal('#addInternalRequestModal');
    };

    $scope.createInternalRequest = function () {
      $scope.internalRequestToCreate.createdOn = new Date().getTime();

      if (!$scope.productsLoading) {
        ProductsService.refreshProducts();
      }

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
        product: internalRequest.product,
        scopeId: null
      };

      if (!$scope.productsLoading) {
        ProductsService.refreshProducts();
      }

      $scope.openModal('#pushInternalRequestModal');
    };

    $scope.pushFeatureRequest = function () {
      for (var key in $scope.products) {
        if ($scope.products[key].id == $scope.featureRequestToPush.product.id) {
          for (var k in $scope.products[key].remoteProductInfo) {
            if ($scope.products[key].remoteProductInfo[k].scopeId == $scope.featureRequestToPush.scopeId) {
              $scope.featureRequestToPush.rpmId = $scope.products[key].remoteProductInfo[k].remoteProductManager.id;
              break;
            }
          }

          break;
        }
      }

      InternalRequestsService.pushFeatureRequest($scope.featureRequestToPush).then(function (res) {
        $scope.cancelPushFeatureRequest();
      }).catch(function() {
        $scope.cancelPushFeatureRequest();
      });
    };

    $scope.cancelPushFeatureRequest = function () {
      $scope.featureRequestToPush = {};
      $scope.resetInternalRequestForms();
    };

    $scope.editInternalRequest = function (internalRequest) {
      $scope.internalRequestToEdit = angular.copy(internalRequest);

      if (!$scope.productsLoading) {
        ProductsService.refreshProducts();
      }

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

    ProductsService.ready.then(null, null, function () {
      $scope.products = ProductsService.getProducts();
      $scope.productsLoading = ProductsService.getProductsLoading();
      $scope.remoteProducts = ProductsService.getRemoteProducts();
      $scope.remoteProductsLoading = ProductsService.getRemoteProductsLoading();
    });

    InternalRequestRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function () {
        $scope.internalRequests.length = 0;
        var internalRequests = InternalRequestRepo.getAll();
        for (var i in internalRequests) {
            $scope.internalRequests.push(internalRequests[i]);
        }
    });
  }

});
