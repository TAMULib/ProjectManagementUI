app.directive('remoteProjectManagerForm', function () {
    return {
        templateUrl: 'views/directives/remoteProjectManagerForm.html',
        restrict: 'E',
        replace: false,
        scope: {
            'managementSettings': '=',
            'model': '='
        },
        link: function ($scope) {

            var isAuthRequired = function () {
                for (var i in $scope.managementSettings) {
                    var key = $scope.managementSettings[i].key;
                    if (key === 'password' || key === 'token') {
                        return true;
                    }
                }
            };

            var hasToken = function () {
                for (var key in $scope.model.settings) {
                    var value = $scope.model.settings[key];
                    if (key === 'token' && value !== undefined && value.length > 0) {
                        return true;
                    }
                }
            };

            $scope.auth = {
                useToken: hasToken(),
                required: isAuthRequired()
            };

            $scope.inputSetting = function (setting) {
                var display = true;
                if ($scope.auth.useToken) {
                    if (setting.key === 'username' || setting.key === 'password') {
                        display = false;
                    }
                } else {
                    if (setting.key === 'token') {
                        display = false;
                    }
                }
                return display;
            };

            $scope.clearAuthSettings = function () {
                for (var key in $scope.model.settings) {
                    if (key === 'token' || key === 'username' || key === 'password') {
                        $scope.model.settings[key] = '';
                    }
                }
            };
        }
    };
});