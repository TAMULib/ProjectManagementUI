app.directive('remoteProjectManagerForm', function () {
    return {
        templateUrl: 'views/directives/remoteProjectManagerForm.html',
        restrict: 'E',
        replace: false,
        scope: {
            'managementSettings': '=',
            'model': '='
        },
        link: function ($scope) {}
    };
});