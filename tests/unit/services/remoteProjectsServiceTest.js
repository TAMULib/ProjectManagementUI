describe('service: RemoteProjectsService', function () {

  var RemoteProjectsService;

  beforeEach(function () {
    module('core');
    module('app');
    module('mock.wsApi');
    module('mock.projectRepo');
    inject(function (_$rootScope_, _$q_, _WsApi_, _ProjectRepo_, _RemoteProjectsService_) {
      $rootScope = _$rootScope_;
      $q = _$q_;
      WsApi = _WsApi_;
      ProjectRepo = _ProjectRepo_;
      RemoteProjectsService = _RemoteProjectsService_;
    });
  });

  describe('Is the service defined', function () {
    it('should be defined', function () {
      expect(RemoteProjectsService).toBeDefined();
    });
  });

  describe('Are the service methods defined', function () {
    it('refreshRemoteProjects should be defined', function () {
      expect(RemoteProjectsService.refreshRemoteProjects).toBeDefined();
      expect(typeof RemoteProjectsService.refreshRemoteProjects).toEqual('function');
    });
    it('getRemoteProjects should be defined', function () {
      expect(RemoteProjectsService.getRemoteProjects).toBeDefined();
      expect(typeof RemoteProjectsService.getRemoteProjects).toEqual('function');
    });
    it('getByScopeId should be defined', function () {
      expect(RemoteProjectsService.getByScopeId).toBeDefined();
      expect(typeof RemoteProjectsService.getByScopeId).toEqual('function');
    });
  });

  describe('Are the service properties defined', function () {
    it('ready should be defined', function () {
      expect(RemoteProjectsService.ready).toBeDefined();
      expect(typeof RemoteProjectsService.ready).toEqual('object');
    });
  });

  describe('Do the service methods work as expected', function () {
    it('refreshRemoteProjects should fetch remote projects', function () {
      deferred = $q.defer();
      spyOn(WsApi, 'fetch').and.returnValue(deferred.promise);
      RemoteProjectsService.refreshRemoteProjects();
      deferred.resolve(mockRemoteProjects);
      expect(WsApi.fetch).toHaveBeenCalledWith(apiMapping.RemoteProjects.all);
    });
    it('getRemoteProjects should get remote projects', function () {
      spyOn(ProjectRepo, 'reset');
      $rootScope.$apply();
      var remoteProjects = RemoteProjectsService.getRemoteProjects();
      expect(remoteProjects).toEqual(mockRemoteProjects);
      expect(ProjectRepo.reset).toHaveBeenCalled();
    });
    it('getByScopeId should get remote project by remote project manager id and scope id', function () {
      $rootScope.$apply();
      RemoteProjectsService.getByScopeId(1, 1934).then(function (remoteProject) {
        expect(remoteProject).toEqual(mockRemoteProjects['1'][0]);
      });
    });
  });

});
