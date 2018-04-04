app.service("AbstractAppRepo", function () {

    return function AbstractAppRepo() {

        this.getScaffold = function (defaults) {
            return angular.copy(angular.extend(this.scaffold, defaults ? deafults : {}));
        };

        return this;
    };

});