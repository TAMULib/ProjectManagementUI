var dataRemoteProductManager1 = {
  id: 1,
  name: "Remote Product Manager 1",
  settings: {
    password: "password1",
    url: "url1",
    username: "username1"
  },
  type: "VERSION_ONE"
};

var dataRemoteProductManager2 = {
  id: 2,
  name: "Remote Product Manager 2",
  settings: {
    password: "password2",
    url: "url2",
    username: "username2"
  },
  type: "VERSION_ONE"
};

var dataRemoteProductManager3 = {
  id: 3,
  name: "Remote Product Manager 3",
  settings: {
    password: "password3",
    url: "url3",
    username: "username3"
  },
  type: "VERSION_ONE"
};

var mockRemoteProductManager = function ($q) {
  var model = mockModel("RemoteProductManager", $q, dataRemoteProductManager1);

  return model;
};

angular.module("mock.remoteProductManager", []).service("RemoteProductManager", mockRemoteProductManager);
