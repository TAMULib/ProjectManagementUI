app.directive('remoteProjectManagerForm', function () {
    return {
        templateUrl: 'views/directives/remoteProjectManagerForm.html',
        restrict: 'E',
        replace: false,
        scope: {
            'managementType': '<',
            'managementSettings': '=',
            'model': '='
        },
        link: function ($scope) {

            $scope.auth = {
                useToken: false,
                required: false
            };

            var originalType;

            var isAuthRequired = function () {
                $scope.auth.useToken = false;
                $scope.auth.required = false;

                for (var i in $scope.managementSettings) {
                    var key = $scope.managementSettings[i].key;
                    if (key === 'password') {
                        $scope.auth.required = true;
                    }

                    if (key === 'token') {
                        $scope.auth.useToken = true;
                    }
                }
            };

            var refreshAuth = function () {
                if (originalType === undefined || originalType == $scope.managementType) {
                    if (originalType === undefined) {
                        isAuthRequired();

                        originalType = $scope.managementType;
                    }

                    if ($scope.auth.required) {
                        $scope.auth.useToken = false;

                        for (var key in $scope.model.settings) {
                            var value = $scope.model.settings[key];

                            if (key === 'token' && value != undefined && value.length > 0) {
                                $scope.auth.useToken = true;
                            }
                        }
                    }
                } else {
                    isAuthRequired();

                    originalType = $scope.managementType;
                }
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

            refreshAuth();

            $scope.$watch('managementType', function() {
                refreshAuth();
            });
        }
    };
});
