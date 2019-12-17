var dataRemoteProjectManager1 = {
  id: 1,
  name: "Remote Project Manager 1",
  settings: {
    password: "password1",
    url: "url1",
    username: "username1"
  },
  type: "VERSION_ONE"
};

var dataRemoteProjectManager2 = {
  id: 2,
  name: "Remote Project Manager 2",
  settings: {
    password: "password2",
    url: "url2",
    username: "username2"
  },
  type: "VERSION_ONE"
};

var dataRemoteProjectManager3 = {
  id: 3,
  name: "Remote Project Manager 3",
  settings: {
    password: "password3",
    url: "url3",
    username: "username3"
  },
  type: "VERSION_ONE"
};

var mockRemoteProjectManager = function($q) {
  var model = mockModel("RemoteProjectManager", $q, dataRemoteProjectManager1);

  return model;
};

angular.module("mock.remoteProjectManager", []).service("RemoteProjectManager", mockRemoteProjectManager);
