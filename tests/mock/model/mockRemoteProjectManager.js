var dataRemoteProjectManager1 = {
  id: 1,
  name: "Remote Project Manager 1",
  url: "url1",
  token: "username1:password1",
  type: "VERSION_ONE"
};

var dataRemoteProjectManager2 = {
  id: 2,
  name: "Remote Project Manager 2",
  url: "url1",
  token: "username2:password2",
  type: "VERSION_ONE"
};

var dataRemoteProjectManager3 = {
  id: 3,
  name: "Remote Project Manager 3",
  url: "url3",
  token: "username1:password3",
  type: "VERSION_ONE"
};

var mockRemoteProjectManager = function ($q) {
  var model = mockModel("RemoteProjectManager", $q, dataRemoteProjectManager1);

  return model;
};

angular.module("mock.remoteProjectManager", []).service("RemoteProjectManager", mockRemoteProjectManager);
