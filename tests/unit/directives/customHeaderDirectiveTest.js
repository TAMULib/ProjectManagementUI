describe('directive: customHeader', function () {

  var scope, element;

  beforeEach(function () {
    module('core');
    module('app');
    module('views/directives/header.html');
    inject(function ($rootScope, _$compile_) {
      scope = $rootScope.$new();
      $compile = _$compile_;
    });
  });

});
