describe("directive: remoteProjectManagerForm", function () {
  var $compile, $q, $scope, directive, element;

  var initializeVariables = function () {
    inject(function (_$q_, _$compile_) {
      $q = _$q_;
      $compile = _$compile_;
    });
  };

  var initializeDirective = function (settings) {
    inject(function (_$rootScope_) {
      $scope = _$rootScope_.$new();

      var attr = settings && settings.attr ? settings.attr : "management-settings='managementSettings' model='model'></remote-project-manager-form";
      var body = settings && settings.body ? settings.body : "";

      var managementType = settings && settings.managementType ? settings.managementType : "type";

      var managementSettings = settings && settings.managementSettings ? settings.managementSettings : [
        {
          type: "text",
          key: "url",
          gloss: "URL",
          visible: true
        },{
          type: "text",
          key: "username",
          gloss: "Username",
          visible: false
        }, {
          type: "password",
          key: "password",
          gloss: "Password",
          visible: false
        }, {
          type: "password",
          key: "token",
          gloss: "Token",
          visible: false
        }
      ];

      var model = settings && settings.model ? settings.model : {
        name: "",
        type: "",
        settings: {}
      };

      element = angular.element("<remote-project-manager-form " + attr + ">" + body + "</remote-project-manager-form>");
      directive = $compile(element)($scope);

      $scope.managementType = managementType;
      $scope.managementSettings = managementSettings;
      $scope.model = model;

      $scope.$digest();
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module("templates");

    installPromiseMatchers();
    initializeVariables();
  });

  describe("Is the directive", function () {
    it("defined", function () {
      initializeDirective();
      expect(directive).toBeDefined();
    });

    it("defined with token auth", function () {
      var settings = {
        model: {
          name: "",
          type: "",
          settings: {
            token: "1234567890"
          }
        }
      };

      initializeDirective(settings);
      expect(directive).toBeDefined();
    });

    it("defined with password auth", function () {
      var settings = {
        model: {
          name: "",
          type: "",
          settings: {
            password: "1234567890"
          }
        }
      };

      initializeDirective(settings);
      expect(directive).toBeDefined();
    });
  });
});
