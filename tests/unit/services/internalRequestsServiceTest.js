describe("service: InternalRequestsService", function () {
  var $q, $rootScope, $scope, InternalRequestRepo, MockedUser, WsApi, service;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _$timeout_, _InternalRequestRepo_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;
      MockedUser = new mockUser($q);
      InternalRequestRepo = _InternalRequestRepo_;
      WsApi = _WsApi_;
    });
  };

  var initializeService = function (settings) {
    inject(function ($injector, _InternalRequestsService_) {
      $scope = $rootScope.$new();

      service = _InternalRequestsService_;

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.internalRequest");
    module("mock.internalRequestRepo");
    module("mock.product");
    module("mock.wsApi");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");

    initializeVariables();
    initializeService();
  });

  describe("Is the service", function () {
    it("defined", function () {
      expect(service).toBeDefined();
    });
  });

  describe("Is the service method", function () {
    var methods = [
      "pushFeatureRequest"
    ];

    var serviceMethodExists = function (method) {
      return function() {
        expect(service[method]).toBeDefined();
        expect(typeof service[method]).toEqual("function");
      };
    };

    for (var i in methods) {
      it(methods[i] + " defined", serviceMethodExists(methods[i]));
    }
  });

  describe("Do the service method", function () {
    it("pushFeatureRequest should push a FeatureRequest", function () {
      var response;
      var featureRequest = new mockFeatureRequest($q);
      featureRequest.product = new mockProduct($q);

      service.pushFeatureRequest(featureRequest).then(function () {
        response = true;
      }).catch(function () {
        response = false;
      });

      $scope.$digest();

      expect(response).toBe(true);
    });

    it("pushFeatureRequest should not push an invalid FeatureRequest id", function () {
      var response;
      var featureRequest = new mockFeatureRequest($q);
      featureRequest.id = undefined;
      featureRequest.product = new mockProduct($q);

      service.pushFeatureRequest(featureRequest).then(function () {
        response = true;
      }).catch(function () {
        response = false;
      });

      $scope.$digest();

      expect(response).toBe(false);
    });

    it("pushFeatureRequest should not push an invalid FeatureRequest productId", function () {
      var response;
      var featureRequest = new mockFeatureRequest($q);
      featureRequest.product = undefined;

      service.pushFeatureRequest(featureRequest).then(function () {
        response = true;
      }).catch(function () {
        response = false;
      });

      $scope.$digest();

      expect(response).toBe(false);
    });

    it("pushFeatureRequest should not push an invalid FeatureRequest rpmId", function () {
      var response;
      var featureRequest = new mockFeatureRequest($q);
      featureRequest.product = new mockProduct($q);
      featureRequest.rpmId = undefined;

      service.pushFeatureRequest(featureRequest).then(function () {
        response = true;
      }).catch(function () {
        response = false;
      });

      $scope.$digest();

      expect(response).toBe(false);
    });

    it("pushFeatureRequest should not push an invalid FeatureRequest scopeId", function () {
      var response;
      var featureRequest = new mockFeatureRequest($q);
      featureRequest.product = new mockProduct($q);
      featureRequest.scopeId = undefined;

      service.pushFeatureRequest(featureRequest).then(function () {
        response = true;
      }).catch(function () {
        response = false;
      });

      $scope.$digest();

      expect(response).toBe(false);
    });
  });

});
