app.directive('vmsForm', function () {
    return {
        templateUrl: 'views/directives/vmsForm.html',
        restrict: 'E',
        replace: false,
        scope: {
            'managementSettings': '=',
            'model': '='
        },
        link: function ($scope) {}
    };
});