app.repo("RemoteProjectManagerRepo", function RemoteProjectManagerRepo($q, WsApi) {

    this.scaffold = {
        name: '',
        type: '',
        url: '',
        token: ''
    };

    this.getTypes = function () {
        return $q(function (resolve, reject) {
            WsApi.fetch(apiMapping.RemoteProjectManager.types).then(function (res) {
                var apiRes = angular.fromJson(res.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    resolve(apiRes.payload['ArrayList<HashMap>']);
                } else {
                    reject();
                }
            });
        });
    };

    return this;

});
