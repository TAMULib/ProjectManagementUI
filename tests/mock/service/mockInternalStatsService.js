var mockInternalStatsService = function ($q) {
  var service = mockService($q);

  service.refreshStats = function () {
    return payloadPromise($q.defer(), dataInternalStats1);
  };

  service.getStats = function () {
    return dataInternalStats1;
  };

  service.ready = $q.defer().promise;

  return service;
};

angular.module("mock.internalStatsService", []).service("InternalStatsService", mockInternalStatsService);
