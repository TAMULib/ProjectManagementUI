describe("controller: ActiveSprintsController", function () {
  var $q, $scope, WsApi, controller, MockedUser, WsApi;

  var initializeVariables = function () {
    inject(function (_$q_, _WsApi_) {
      $q = _$q_;

      MockedUser = new mockUser($q);

      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$sce_, _$rootScope_, _ActiveSprintsService_, _StatusRepo_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("ActiveSprintsController", {
        $scope: $scope,
        $sce: _$sce_,
        ActiveSprintsService: _ActiveSprintsService_,
        StatusRepo: _StatusRepo_
      });

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.activeSprintsService");
    module("mock.statusRepo");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");

    installPromiseMatchers();
    initializeVariables();
    initializeController();
  });

  describe("Is the controller", function () {
    var roles = [ "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER", "ROLE_ANONYMOUS" ];

    var controllerExists = function (setting) {
      return function() {
        initializeController(setting);
        expect(controller).toBeDefined();
      };
    };

    for (var i in roles) {
      it("defined for " + roles[i], controllerExists({ role: roles[i] }));
    }
  });

  describe("Is the scope method", function () {
    var methods = [
      "select",
      "kanbanHeader",
      "getSprintEstimateTotal",
      "getStatusEstimateTotal",
      "getAvatarUrl",
      "getHtmlContent",
      "getPanelClass",
      "getSelectedSprint"
    ];

    var scopeMethodExists = function (method) {
      return function() {
        expect($scope[method]).toBeDefined();
        expect(typeof $scope[method]).toEqual("function");
      };
    };

    for (var i in methods) {
      it(methods[i] + " defined", scopeMethodExists(methods[i]));
    }
  });

  describe("Does the scope method", function () {
    it("select set session storage to selected index", function () {
      $scope.select(0);
      expect(Number(sessionStorage.selected)).toEqual(0);
    });

    it("getSprintEstimateTotal get sprint total estimate", function () {
      var total = $scope.getSprintEstimateTotal($scope.activeSprints[0]);
      expect(total).toEqual(8.5);
    });

    it("getStatusEstimateTotal get status total estimate", function () {
      $scope.select(0);
      var total = $scope.getStatusEstimateTotal({
        "id": 4,
        "identifier": "Accepted",
        "mapping": ["Accepted"]
      });
      expect(total).toEqual(8);
    });

    it("getAvatarUrl get the member avatar url", function () {
      var avatarUrl = $scope.getAvatarUrl({
        "id": "6616",
        "name": "Ryan Laddusaw",
        "avatar": "no_avatar.png"
      });
      expect(avatarUrl).toEqual("http://localhost:9001/products/images/no_avatar.png");
    });

    it("getHtmlContent get trusted content", function () {
      var html = "<span>Hello, World!</span>";
      $scope.getHtmlContent(html);
    });

    it('getPanelClass return correct value', function () {
      var featureClass = $scope.getPanelClass('Feature');
      var defectClass = $scope.getPanelClass('Defect');
      var otherClass = $scope.getPanelClass('anything else');
      expect(featureClass).toEqual('panel-primary');
      expect(defectClass).toEqual('panel-danger');
      expect(otherClass).toEqual('panel-default');
    });

    it("getSelectedSprint get selected sprint", function () {
      $scope.select(0);
      var selectedSprint = $scope.getSelectedSprint();
      expect(selectedSprint).toEqual($scope.activeSprints[0]);
    });
  });

});
