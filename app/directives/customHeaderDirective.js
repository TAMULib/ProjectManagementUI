app.directive('customHeader', function ($controller) {
    return {
        templateUrl: 'views/directives/header.html',
        restrict: 'E',
        replace: false,
        transclude: true,
        scope: {
            login: '&',
            anonymous: '='
        },
        link: function ($scope, element, attr) {
            $scope.title = attr.title;
            $scope.home = attr.home;
            $scope.loginuser = function () {
                $scope.login({});
            };
        }
    };
});