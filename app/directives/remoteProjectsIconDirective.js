app.directive('remoteProjectsIcon', function ($controller) {
    return {
        templateUrl: 'views/directives/remoteProjectsIcon.html',
        restrict: 'E',
        scope: {
            type: '@',
            width: '@',
            height: '@'
        },
        link: function ($scope, element, attr) {
            $scope.typeIcon = false;
            $scope.tooltip = "";

            if ($scope.type === 'GITHUB_MILESTONE') {
                $scope.typeIcon = 'github-milestone.png';
                $scope.tooltip = "Github Milestone";
            } else if ($scope.type === 'GITHUB_PROJECT') {
                $scope.typeIcon = 'github-project.png';
                $scope.tooltip = "Github Project";
            } else if ($scope.type === 'VERSION_ONE') {
                $scope.typeIcon = 'versionone.png';
                $scope.tooltip = "Version One";
            }

            if (angular.isUndefined($scope.width)) {
              $scope.width = "16";
            }

            if (angular.isUndefined($scope.height)) {
              $scope.height = "16";
            }
        }
    };
});
