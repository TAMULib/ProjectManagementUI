describe("directive: customHeader", function () {
  var $compile, $q, $scope, directive, element;

  var initializeVariables = function() {
    inject(function (_$q_, _$compile_) {
      $q = _$q_;
      $compile = _$compile_;
    });
  };

  var initializeDirective = function(settings) {
    inject(function (_$rootScope_) {
      $scope = _$rootScope_.$new();

      var attr = settings && settings.attr ? settings.attr : "";
      var body = settings && settings.body ? settings.body : "";

      element = angular.element("<custom-header " + attr + ">" + body + "</custom-header>");
      directive = $compile(element)($scope);

      $scope.$digest();
    });
  };

  beforeEach(function() {
    module("core");
    module("app");
    module("templates");

    installPromiseMatchers();
    initializeVariables();
  });

  describe("Is the directive defined", function () {
    it("should be defined", function () {
      initializeDirective();
      expect(directive).toBeDefined();
    });
  });
});
