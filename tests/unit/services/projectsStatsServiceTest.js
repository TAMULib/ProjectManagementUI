describe("service: ProjectsStatsService", function () {
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
    inject(function ($injector, _ProjectsStatsService_) {
      $scope = $rootScope.$new();

      service = _ProjectsStatsService_;

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
      "getById",
      "getProjectsStats",
      "refreshProjectsStats"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect(service[methods[i]]).toBeDefined();
        expect(typeof service[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Is the service property", function () {
    var properties = [
      "ready"
    ];

    for (var i in properties) {
      it(properties[i] + " defined", function () {
        expect(service[properties[i]]).toBeDefined();
        expect(typeof service[properties[i]]).toEqual("object");
      });
    }
  });

  describe("Do the service method", function () {
    it("getById get project stats by id", function () {
      $rootScope.$apply();
      service.getById(1).then(function (projectStats) {
        expect(projectStats).toEqual(dataProjectsStats[0]);
      });
    });

    it("getProjectsStats get project stats", function () {
      var projectsStats = service.getProjectsStats();
      expect(projectsStats).toEqual(dataProjectsStats);
    });

    it("refreshProjectsStats fetch project stats", function () {
      deferred = $q.defer();
      spyOn(WsApi, "fetch").and.returnValue(deferred.promise);
      service.refreshProjectsStats();
      deferred.resolve(dataProjectsStats);
      expect(WsApi.fetch).toHaveBeenCalledWith(apiMapping.ProjectsStats.all);
    });
  });

});
