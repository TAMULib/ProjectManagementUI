describe("directive: remoteProjectsIcon", function () {
  var $compile, $q, $scope, directive, element, MockedUser, WsApi;

  var initializeVariables = function () {
    inject(function (_$q_, _$compile_) {
      $q = _$q_;

      MockedUser = new mockUser($q);

      $compile = _$compile_;
    });
  };

  var initializeDirective = function (settings) {
    inject(function (_$rootScope_) {
      $scope = _$rootScope_.$new();

      var attr = settings && settings.attr ? settings.attr : "";
      var body = settings && settings.body ? settings.body : "";

      element = angular.element("<remote-projects-icon " + attr + ">" + body + "</remote-projects-icon>");
      directive = $compile(element)($scope);

      $scope.$digest();
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module("templates");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");

    installPromiseMatchers();
    initializeVariables();
  });

  describe("Is the directive", function () {
    it("defined", function () {
      initializeDirective();
      expect(directive).toBeDefined();
    });

    it("defined using GITHUB_MILESTONE", function () {
      initializeDirective({attr: "type=\"GITHUB_MILESTONE\""});
      expect(directive).toBeDefined();
    });

    it("defined using GITHUB_PROJECT", function () {
      initializeDirective({attr: "type=\"GITHUB_PROJECT\""});
      expect(directive).toBeDefined();
    });

    it("defined using VERSION_ONE", function () {
      initializeDirective({attr: "type=\"VERSION_ONE\""});
      expect(directive).toBeDefined();
    });
  });
});
