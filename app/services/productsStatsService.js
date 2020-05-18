app.service('ProductsStatsService', function ($q, ProductRepo, WsApi) {

    var productsStats = [];

    var defer = $q.defer();

    var process = function (response) {
        var apiRes = angular.fromJson(response.body);
        if (apiRes.meta.status === 'SUCCESS') {
            angular.extend(productsStats, apiRes.payload['ArrayList<ProductStats>']);
            defer.resolve();
            ProductRepo.reset();
        } else {
            console.error(apiRes.meta);
            throw "Unable to retrieve remote projects";
        }
    };

    WsApi.listen(apiMapping.ProductsStats.listen).then(null, null, function (response) {
        process(response);
    });

    this.refreshProductsStats = function () {
        WsApi.fetch(apiMapping.ProductsStats.all).then(function (response) {
            process(response);
        });
    };

    this.getProductsStats = function () {
        return productsStats;
    };

    this.getById = function (id) {
        return $q(function (resolve, reject) {
            this.ready.then(function () {
                for (var i in productsStats) {
                    if (productsStats[i].id == id) {
                        resolve(productsStats[i]);
                    }
                }
            });
        }.bind(this));
    };

    this.refreshProductsStats();

    this.ready = defer.promise;

});
