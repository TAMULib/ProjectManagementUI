app.controller('InternalRequestController', function ($controller, $scope, ApiResponseActions, InternalRequestRepo, InternalRequestsService, ProductRepo, ProductsService, WsApi) {

  angular.extend(this, $controller('AbstractController', {
    $scope: $scope
  }));

  $scope.internalRequests = InternalRequestRepo.getAll();

  $scope.internalRequestToCreate = InternalRequestRepo.getScaffold();
  $scope.internalRequestToEdit = {};
  $scope.internalRequestToDelete = {};

  $scope.featureRequestToPush = {};

  $scope.products = [];
  $scope.remoteProducts = {};
  $scope.remoteProductsLoading = false;

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
    $scope.selectRemoteProducts = function () {
      if ($scope.remoteProductsLoading === false) {
        $scope.remoteProducts = {};

        if (angular.isDefined($scope.featureRequestToPush.productId) && $scope.featureRequestToPush.productId !== null) {
          var productId = $scope.featureRequestToPush.productId;
          var remoteProducts = ProductsService.getRemoteProducts();

          if (angular.isDefined(remoteProducts[productId])) {
            angular.extend($scope.remoteProducts, remoteProducts[productId]);
          } else {
            $scope.refreshRemoteProducts(productId);
          }
        }
      }
    };

    $scope.refreshRemoteProducts = function (productId) {
      if ($scope.remoteProductsLoading === false) {
        $scope.remoteProductsLoading = true;
        $scope.remoteProducts = {};

        ProductsService.refreshRemoteProducts(productId).then(null, null, function (res) {
          remoteProducts = ProductsService.getRemoteProducts();

          if (angular.isDefined(remoteProducts[productId])) {
            angular.extend($scope.remoteProducts, remoteProducts[productId]);
          }

          $scope.remoteProductsLoading = false;
        }).catch(function() {
          $scope.remoteProductsLoading = false;
        });
      }
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

      if ($scope.remoteProductsLoading !== true) {
        ProductsService.refreshProducts();
      }

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
        $scope.cancelPushFeatureRequest();
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

    ProductsService.ready.then(null, null, function () {
      $scope.products = ProductsService.getProducts();
    });

    WsApi.listen(apiMapping.Product.listen).then(null, null, function (res) {
      var productId = angular.isDefined($scope.featureRequestToPush.productId) ? $scope.featureRequestToPush.productId : null;

      ProductsService.refreshProducts();

      if ($scope.remoteProductsLoading === false && productId !== null) {
        var apiRes = angular.fromJson(res.body);

        if (apiRes.meta.status === 'SUCCESS') {
          $scope.refreshRemoteProducts(productId);
        }
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
