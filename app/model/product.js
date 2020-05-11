app.model("Product", function Product(ProductsStatsService, RemoteProductsService) {
  return function Product() {
    var product = this;

    product.before(function () {
      ProductsStatsService.getById(product.id).then(function (productStats) {
        angular.extend(product, {
          stats: productStats
        });
      });
    });

    return product;
  };
});
