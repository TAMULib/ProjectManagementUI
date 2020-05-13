app.controller('InternalStatsController', function ($controller, $scope, ApiResponseActions, InternalRequestRepo, InternalStatsService) {

  angular.extend(this, $controller('AbstractController', {
    $scope: $scope
  }));

  $scope.stats = InternalStatsService.getStats();

});
