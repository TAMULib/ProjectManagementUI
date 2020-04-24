app.model("Product", function Product(ProductsStatsService, RemoteProductsService) {
    return function Product() {

        var product = this;

        product.before(function () {
            if (product.remoteProductManager && product.scopeId) {
                ProductsStatsService.getById(product.id).then(function (productStats) {
                    angular.extend(product, {
                        stats: productStats
                    });
                });
            }
        });

        product.before(function () {
            if (product.remoteProductManager && product.scopeId) {
                RemoteProductsService.getByScopeId(product.remoteProductManager.id, product.scopeId).then(function (remoteProduct) {
                    angular.extend(product, {
                        remoteProduct: remoteProduct
                    });
                });
            }
        });

        return product;
    };
});
