describe("controller: ActiveSprintsController", function () {
  var $q, $scope, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _WsApi_) {
      $q = _$q_;

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

    installPromiseMatchers();
    initializeVariables();
    initializeController();
  });

  describe("Is the controller", function () {
    var roles = [ "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER", "ROLE_ANONYMOUS" ];
    for (var i in roles) {
      it("defined for " + roles[i], function () {
        initializeController({ role: roles[i] });
        expect(controller).toBeDefined();
      });
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

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect($scope[methods[i]]).toBeDefined();
        expect(typeof $scope[methods[i]]).toEqual("function");
      });
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
      expect(avatarUrl).toEqual("http://localhost:9001/images/no_avatar.png");
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
