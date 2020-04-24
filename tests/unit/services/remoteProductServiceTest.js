describe("service: RemoteProjectsService", function () {
  var $q, $rootScope, $scope, ProjectRepo, WsApi, service;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _ProjectRepo_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      ProjectRepo = _ProjectRepo_;
      WsApi = _WsApi_;
    });
  };

  var initializeService = function (settings) {
    inject(function ($injector, _RemoteProjectsService_) {
      $scope = $rootScope.$new();

      service = _RemoteProjectsService_;

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.projectRepo");
    module("mock.wsApi");

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
      "getByScopeId",
      "getRemoteProjects",
      "refreshRemoteProjects"
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

  describe("Is the service property", function () {
    var properties = [
      "ready"
    ];

    var servicePropertyExists = function (property) {
      return function() {
        expect(service[property]).toBeDefined();
        expect(typeof service[property]).toEqual("object");
      };
    };

    for (var i in properties) {
      it(properties[i] + " defined", servicePropertyExists(properties[i]));
    }
  });

  describe("Does the service method", function () {
    it("getByScopeId get remote project by remote project manager id and scope id", function () {
      $rootScope.$apply();
      service.getByScopeId(1, 1934).then(function (remoteProject) {
        expect(remoteProject).toEqual(dataRemoteProjects["1"][0]);
      });
    });

    it("getRemoteProjects get remote projects", function () {
      var remoteProjects = service.getRemoteProjects();
      expect(remoteProjects).toEqual(dataRemoteProjects);
    });

    it("refreshRemoteProjects fetch remote projects", function () {
      deferred = $q.defer();
      spyOn(WsApi, "fetch").and.returnValue(deferred.promise);
      service.refreshRemoteProjects();
      deferred.resolve(dataRemoteProjects);
      expect(WsApi.fetch).toHaveBeenCalledWith(apiMapping.RemoteProjects.all);
    });
  });

});
