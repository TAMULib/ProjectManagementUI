app.config(function ($routeProvider) {
    $routeProvider.
    when('/management', {
        redirectTo: '/management/products'
    }).
    when('/management/:tab', {
        templateUrl: 'views/management.html',
        access: ["ROLE_ADMIN", "ROLE_MANAGER"]
    }).
    when('/home', {
        redirectTo: '/'
    }).
    when('/', {
        templateUrl: 'views/home.html'
    }).

    // Error Routes
    when('/error/403', {
        templateUrl: 'views/errors/403.html',
        controller: 'ErrorPageController'
    }).
    when('/error/404', {
        templateUrl: 'views/errors/404.html',
        controller: 'ErrorPageController'

    }).
    when('/error/500', {
        templateUrl: 'views/errors/500.html',
        controller: 'ErrorPageController'
    }).
    otherwise({
        redirectTo: '/error/404'
    });
});
