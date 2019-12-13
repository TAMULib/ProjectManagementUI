describe("service: ProjectsStatsService", function () {

  var ProjectsStatsService;

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.wsApi");
    module("mock.projectRepo");
    inject(function (_$rootScope_, _$q_, _WsApi_, _ProjectRepo_, _ProjectsStatsService_) {
      $rootScope = _$rootScope_;
      $q = _$q_;
      WsApi = _WsApi_;
      ProjectRepo = _ProjectRepo_;
      ProjectsStatsService = _ProjectsStatsService_;
    });
  });

  describe("Is the service defined", function () {
    it("should be defined", function () {
      expect(ProjectsStatsService).toBeDefined();
    });
  });

  describe("Are the service methods defined", function () {
    it("refreshProjectsStats should be defined", function () {
      expect(ProjectsStatsService.refreshProjectsStats).toBeDefined();
      expect(typeof ProjectsStatsService.refreshProjectsStats).toEqual("function");
    });
    it("getProjectsStats should be defined", function () {
      expect(ProjectsStatsService.getProjectsStats).toBeDefined();
      expect(typeof ProjectsStatsService.getProjectsStats).toEqual("function");
    });
    it("getById should be defined", function () {
      expect(ProjectsStatsService.getById).toBeDefined();
      expect(typeof ProjectsStatsService.getById).toEqual("function");
    });
  });

  describe("Are the service properties defined", function () {
    it("ready should be defined", function () {
      expect(ProjectsStatsService.ready).toBeDefined();
      expect(typeof ProjectsStatsService.ready).toEqual("object");
    });
  });

  describe("Do the service methods work as expected", function () {
    it("refreshProjectsStats should fetch project stats", function () {
      deferred = $q.defer();
      spyOn(WsApi, "fetch").and.returnValue(deferred.promise);
      ProjectsStatsService.refreshProjectsStats();
      deferred.resolve(mockProjectsStats);
      expect(WsApi.fetch).toHaveBeenCalledWith(apiMapping.ProjectsStats.all);
    });
    it("getProjectsStats should get project stats", function () {
      spyOn(ProjectRepo, "reset");
      $rootScope.$apply();
      var projectsStats = ProjectsStatsService.getProjectsStats();
      expect(projectsStats).toEqual(mockProjectsStats);
      expect(ProjectRepo.reset).toHaveBeenCalled();
    });
    it("getById should get project stats by id", function () {
      $rootScope.$apply();
      ProjectsStatsService.getById(1).then(function (projectStats) {
        expect(projectStats).toEqual(mockProjectsStats[0]);
      });
    });
  });

});
