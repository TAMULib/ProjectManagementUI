app.controller('ManagementController', function ($controller, $scope) {

  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

});