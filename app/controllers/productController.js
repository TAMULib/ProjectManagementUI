app.controller('ProductController', function ($controller, $scope, ApiResponseActions, ProductRepo, RemoteProductManagerRepo, RemoteProductsService) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.products = ProductRepo.getAll();

    $scope.productToCreate = ProductRepo.getScaffold();

    $scope.productToDelete = {};

    $scope.productForms = {
        validations: ProductRepo.getValidations(),
        getResults: ProductRepo.getValidationResults
    };

    $scope.resetProductForms = function () {
        ProductRepo.clearValidationResults();
        for (var key in $scope.productForms) {
            if ($scope.productForms[key] !== undefined && !$scope.productForms[key].$pristine && $scope.productForms[key].$setPristine) {
                $scope.productForms[key].$setPristine();
            }
        }
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

    if ($scope.isManager() || $scope.isAdmin()) {
        $scope.remoteProductManagers = RemoteProductManagerRepo.getAll();

        $scope.remoteProducts = RemoteProductsService.getRemoteProducts();

        $scope.getRemoteProductManagerRemoteProducts = function (remoteProductManagerId) {
            return $scope.remoteProducts[remoteProductManagerId];
        };

        RemoteProductManagerRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function () {
            $scope.remoteProductManagers.length = 0;
            var remoteProductManagers = RemoteProductManagerRepo.getAll();
            for (var i in remoteProductManagers) {
                $scope.remoteProductManagers.push(remoteProductManagers[i]);
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