var dataRemoteProductManagerRepo1 = [
  dataRemoteProductManager1,
  dataRemoteProductManager2,
  dataRemoteProductManager3
];

var dataRemoteProductManagerRepo2 = [
  dataRemoteProductManager3,
  dataRemoteProductManager2,
  dataRemoteProductManager1
];

var dataRemoteProductManagerRepo3 = [
  dataRemoteProductManager1,
  dataRemoteProductManager3,
  dataRemoteProductManager2
];

angular.module("mock.remoteProductManagerRepo", []).service("RemoteProductManagerRepo", function ($q) {
  var repo = mockRepo("RemoteProductManagerRepo", $q, mockRemoteProductManager, dataRemoteProductManagerRepo1);

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
