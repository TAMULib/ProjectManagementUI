describe("service: ActiveSprintsService", function () {

  var ActiveSprintsService;

  beforeEach(function () {
    module("core");
    module("app");
    module("mock.wsApi");
    inject(function (_$rootScope_, _$q_, _WsApi_, _ActiveSprintsService_) {
      $rootScope = _$rootScope_;
      $q = _$q_;
      WsApi = _WsApi_;
      ActiveSprintsService = _ActiveSprintsService_;
    });
  });

  describe("Is the service defined", function () {
    it("should be defined", function () {
      expect(ActiveSprintsService).toBeDefined();
    });
  });

  describe("Are the service methods defined", function () {
    it("refreshActiveSprints should be defined", function () {
      expect(ActiveSprintsService.refreshActiveSprints).toBeDefined();
      expect(typeof ActiveSprintsService.refreshActiveSprints).toEqual("function");
    });
    it("getActiveSprints should be defined", function () {
      expect(ActiveSprintsService.getActiveSprints).toBeDefined();
      expect(typeof ActiveSprintsService.getActiveSprints).toEqual("function");
    });
  });

  describe("Are the service properties defined", function () {
    it("updated should be defined", function () {
      expect(ActiveSprintsService.updated).toBeDefined();
      expect(typeof ActiveSprintsService.updated).toEqual("object");
    });
  });

  describe("Do the service methods work as expected", function () {
    it("refreshActiveSprints should fetch active sprints", function () {
      deferred = $q.defer();
      spyOn(WsApi, "fetch").and.returnValue(deferred.promise);
      ActiveSprintsService.refreshActiveSprints();
      deferred.resolve(mockActiveSprints);
      expect(WsApi.fetch).toHaveBeenCalledWith(apiMapping.ActiveSprints.all);
    });
    it("getActiveSprints should get active sprints", function () {
      $rootScope.$apply();
      var activeSprints = ActiveSprintsService.getActiveSprints();
      expect(activeSprints).toEqual(mockActiveSprints);
    });
  });

});
