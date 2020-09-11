app.controller('ProductController', function ($controller, $scope, ApiResponseActions, ProductRepo, RemoteProjectManagerRepo, RemoteProjectsService) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.products = ProductRepo.getAll();

    $scope.productToCreate = ProductRepo.getScaffold();

    $scope.productToDelete = {};

    $scope.addingRemoteProjectInfo = false;
    $scope.remoteProjectInfoChanged = false;
    $scope.otherUrlsChanged = false;

    $scope.remoteProjectInfoToAdd = {
        remoteProjectManager: null,
        scopeId: null
    };

    $scope.productForms = {
        validations: ProductRepo.getValidations(),
        getResults: ProductRepo.getValidationResults
    };

    $scope.closeAddRemoteProjectInfo = function() {
        $scope.addingRemoteProjectInfo = false;
        $scope.remoteProjectInfoToAdd = {
            remoteProjectManager: null,
            scopeId: null
        };
    };

    $scope.resetProductForms = function () {
        ProductRepo.clearValidationResults();
        for (var key in $scope.productForms) {
            if ($scope.productForms[key] !== undefined && !$scope.productForms[key].$pristine && $scope.productForms[key].$setPristine) {
                $scope.productForms[key].$setPristine();
            }
        }
        $scope.closeAddRemoteProjectInfo();
        $scope.remoteProjectInfoChanged = false;
        $scope.otherUrlsChanged = false;
        $scope.closeModal();
    };

    $scope.resetProductForms();

    $scope.createProduct = function () {
        ProductRepo.create($scope.productToCreate).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetCreateProduct();
            }
        });
    };

    $scope.resetCreateProduct = function () {
        angular.extend($scope.productToCreate, ProductRepo.getScaffold());
        $scope.resetProductForms();
    };

    $scope.editProduct = function (product) {
        $scope.productToEdit = product;
        $scope.openModal('#editProductModal');
    };

    $scope.updateProduct = function () {
        $scope.productToEdit.dirty(true);
        $scope.productToEdit.save().then(function () {
            $scope.cancelEditProduct();
        });
    };

    $scope.cancelEditProduct = function () {
        $scope.productToEdit.refresh();
        $scope.productToEdit = {};
        $scope.resetProductForms();
    };

    $scope.confirmDeleteProduct = function (product) {
        $scope.productToDelete = product;
        $scope.openModal('#deleteProductModal');
    };

    $scope.cancelDeleteProduct = function () {
        $scope.productToDelete = {};
        $scope.closeModal();
    };

    $scope.deleteProduct = function (product) {
        ProductRepo.delete(product).then(function (res) {
            if (angular.fromJson(res.body).meta.status === "SUCCESS") {
                $scope.cancelDeleteProduct();
            }
        });
    };

    $scope.openAddRemoteProjectInfo = function() {
        $scope.addingRemoteProjectInfo = true;
    };

    $scope.addRemoteProjectInfo = function(remoteProjectInfo, remoteProject) {
        remoteProjectInfo.push(remoteProject);
        $scope.remoteProjectInfoChanged = true;
        $scope.closeAddRemoteProjectInfo();
    };

    $scope.removeRemoteProjectInfo = function(remoteProjectInfo, remoteProject) {
        remoteProjectInfo.splice(remoteProjectInfo.indexOf(remoteProject), 1);
        $scope.remoteProjectInfoChanged = true;
    };

    $scope.addOtherUrl = function (product) {
        product.otherUrls.push('');
    };

    $scope.removeOtherUrl = function (product, index) {
        product.otherUrls.splice(index, 1);
        $scope.otherUrlsChanged = true;
    };

    if ($scope.isManager() || $scope.isAdmin()) {
        $scope.remoteProjectManagers = RemoteProjectManagerRepo.getAll();

        $scope.remoteProjectInfo = RemoteProjectsService.getRemoteProjectInfo();

        $scope.getRemoteProjectManagerRemoteProjects = function (remoteProjectManagerId) {
            return $scope.remoteProjectInfo[remoteProjectManagerId];
        };

        $scope.getRemoteProjectByRemoteProjectInfo = function(remoteProjectInfo) {
          if (angular.isDefined(remoteProjectInfo.remoteProjectManager.id)) {
            if (angular.isDefined($scope.remoteProjectInfo[remoteProjectInfo.remoteProjectManager.id])) {
              return $scope.remoteProjectInfo[remoteProjectInfo.remoteProjectManager.id].filter(function(rp) {
                  return rp.id === remoteProjectInfo.scopeId;
              })[0];
            }
          }
        };

        RemoteProjectManagerRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function () {
            $scope.remoteProjectManagers.length = 0;
            var remoteProjectManagers = RemoteProjectManagerRepo.getAll();
            for (var i in remoteProjectManagers) {
                $scope.remoteProjectManagers.push(remoteProjectManagers[i]);
            }
        });
    }

    ProductRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function () {
        $scope.products.length = 0;
        var products = ProductRepo.getAll();
        for (var i in products) {
            $scope.products.push(products[i]);
        }
    });

});
