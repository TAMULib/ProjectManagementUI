app.repo("RemoteProductManagerRepo", function RemoteProductManagerRepo($q, WsApi) {

    this.scaffold = {
        name: '',
        type: ''
    };

    this.getTypes = function () {
        return $q(function (resolve, reject) {
            WsApi.fetch(apiMapping.RemoteProductManager.types).then(function (res) {
                var apiRes = angular.fromJson(res.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    resolve(apiRes.payload['ArrayList<HashMap>']);
                } else {
                    reject();
                }
            });
        });
    };

    this.getTypeScaffolding = function (type) {
        return $q(function (resolve, reject) {
            if (type !== undefined) {
                WsApi.fetch(apiMapping.RemoteProductManager.scaffolding, {
                    pathValues: {
                        type: type
                    }
                }).then(function (res) {
                    var apiRes = angular.fromJson(res.body);
                    if (apiRes.meta.status === 'SUCCESS') {
                        resolve(apiRes.payload['ArrayList<Setting>']);
                    } else {
                        reject();
                    }
                });
            }
        });
    };

    return this;

});
