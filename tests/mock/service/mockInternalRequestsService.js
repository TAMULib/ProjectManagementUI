var mockInternalRequestsService = function ($q) {
  var service = mockService($q);

  service.pushFeatureRequest = function (featureRequest) {
    return payloadPromise($q.defer(), featureRequest);
  };

  return service;
};

angular.module("mock.internalRequestsService", []).service("InternalRequestsService", mockInternalRequestsService);
