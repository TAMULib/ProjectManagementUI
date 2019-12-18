var dataRemoteProjectManagerRepo1 = [
  dataRemoteProjectManager1,
  dataRemoteProjectManager2,
  dataRemoteProjectManager3
];

var dataRemoteProjectManagerRepo2 = [
  dataRemoteProjectManager3,
  dataRemoteProjectManager2,
  dataRemoteProjectManager1
];

var dataRemoteProjectManagerRepo3 = [
  dataRemoteProjectManager1,
  dataRemoteProjectManager3,
  dataRemoteProjectManager2
];

angular.module("mock.remoteProjectManagerRepo", []).service("RemoteProjectManagerRepo", function ($q) {
  var repo = mockRepo("RemoteProjectManagerRepo", $q, mockRemoteProjectManager, dataRemoteProjectManagerRepo1);

  repo.scaffold = {
    name: '',
    type: ''
  };

  repo.getTypes = function () {
    return payloadPromise($q.defer());
  };

  repo.getTypeScaffolding = function (type) {};

  return repo;
});
