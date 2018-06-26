var mockRemoteProjectManagers = [{
        "id": 1,
        "name": "Test 1",
        "type": "VERSION_ONE",
        "settings": {
            "password": "password1",
            "url": "url1",
            "username": "username1"
        }
    },
    {
        "id": 2,
        "name": "Test 2",
        "type": "VERSION_ONE",
        "settings": {
            "password": "password2",
            "url": "url2",
            "username": "username2"
        }
    },
    {
        "id": 3,
        "name": "Test 3",
        "type": "VERSION_ONE",
        "settings": {
            "password": "password3",
            "url": "url3",
            "username": "username3"
        }
    }
];

angular.module('mock.remoteProjectManagerRepo', []).service('RemoteProjectManagerRepo', function ($q) {

    this.scaffold = {};

    this.list = mockRemoteProjectManagers;

    this.getAll = function () {
        var defer = $q.defer();
        defer.resolve(this.list);
        return defer.promise;
    };

    this.findById = function (id) {
        for (var i in this.list) {
            if (this.list[i].id === id) {
                return this.list[i];
            }
        }
    };

    this.getScaffold = function (defaults) {
        if (!defaults) defaults = {};
        return angular.copy(angular.extend(this.scaffold, defaults));
    };

    this.getTypes = function () {
        var defer = $q.defer();
        defer.resolve();
        return defer.promise;
    };

    this.create = function (vms) {
        var defer = $q.defer();
        vms.id = this.list.length + 1;
        this.list.push(vms);
        defer.resolve(vms);
        return defer.promise;
    };

    this.getValidations = function () {};

    this.clearValidationResults = function () {};

    this.ready = function () {
        var defer = $q.defer();
        defer.resolve();
        return defer.promise;
    };

    this.getTypeScaffolding = function (type) {};

    this.listen = function () {};

    this.delete = function () {};

    return this;

});