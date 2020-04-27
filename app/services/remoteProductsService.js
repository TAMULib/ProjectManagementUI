app.service('RemoteProductsService', function ($q, ProductRepo, WsApi) {

    var remoteProducts = {};

    var defer = $q.defer();

    var process = function (response) {
        var apiRes = angular.fromJson(response.body);
        if (apiRes.meta.status === 'SUCCESS') {
            for (var key in remoteProducts) {
                remoteProducts[key] = undefined;
            }
            angular.extend(remoteProducts, apiRes.payload.HashMap);
            defer.resolve();
            ProductRepo.reset();
        } else {
            console.error(apiRes.meta);
            throw "Unable to retrieve remote products";
        }
    };

    WsApi.listen(apiMapping.RemoteProducts.listen).then(null, null, function (response) {
        process(response);
    });

    this.refreshRemoteProducts = function () {
        WsApi.fetch(apiMapping.RemoteProducts.all).then(function (response) {
            process(response);
        });
    };

    this.getRemoteProducts = function () {
        return remoteProducts;
    };

    this.getByScopeId = function (remoteProductManagerId, scopeId) {
        return $q(function (resolve, reject) {
            this.ready.then(function () {
                for (var i in remoteProducts[remoteProductManagerId]) {
                    if (remoteProducts[remoteProductManagerId][i].id === scopeId) {
                        resolve(remoteProducts[remoteProductManagerId][i]);
                    }
                }
            });
        }.bind(this));
    };

    this.refreshRemoteProducts();

    this.ready = defer.promise;

});
