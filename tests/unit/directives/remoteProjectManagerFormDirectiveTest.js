describe("directive: remoteProjectManagerForm", function () {
  var $compile, $q, $scope, directive, element, formSettings, formModel;

  var initializeVariables = function() {
    inject(function (_$q_, _$compile_) {
      $q = _$q_;
      $compile = _$compile_;

      formModel = {
        name: "",
        type: ""
      };

      formSettings = [{
        "type": "text",
        "key": "url",
        "gloss": "URL",
        "visible": true
      }, {
        "type": "text",
        "key": "username",
        "gloss": "Username",
        "visible": false
      }, {
        "type": "password",
        "key": "password",
        "gloss": "Password",
        "visible": false
      }, {
        "type": "password",
        "key": "token",
        "gloss": "Token",
        "visible": false
      }];
    });
  };

  var initializeDirective = function(settings) {
    inject(function (_$rootScope_) {
      $scope = _$rootScope_.$new();

      var attr = settings && settings.attr ? settings.attr : "management-settings='settings' model='model'></remote-project-manager-form";
      var body = settings && settings.body ? settings.body : "";

      element = angular.element("<remote-project-manager-form " + attr + ">" + body + "</remote-project-manager-form>");
      directive = $compile(element)($scope);

      $scope.model = formModel;
      $scope.settings = formSettings;

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
