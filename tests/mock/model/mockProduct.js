var dataProject1 = {
  id: 1,
  name: "Project 1",
  remoteProjectManager: {
    id: 1,
    name: "Remote Project Manager 1",
    settings: {
      password: "password1",
      url: "url1",
      username: "username1"
    },
    type: "VERSION_ONE"
  },
  scopeId: "scope 1"
};

var dataProject2 = {
  id: 2,
  name: "Project 2",
  remoteProjectManager: {
    id: 1,
    name: "Remote Project Manager 1",
    settings: {
      password: "password1",
      url: "url1",
      username: "username1"
    },
    type: "VERSION_ONE"
  },
  scopeId: "scope 2"
};

var dataProject3 = {
  id: 3,
  name: "Project 3",
  remoteProjectManager: {
    id: 1,
    name: "Remote Project Manager 1",
    settings: {
      password: "password1",
      url: "url1",
      username: "username1"
    },
    type: "VERSION_ONE"
  },
  scopeId: "scope 3"
};

var mockProject = function ($q) {
  var model = mockModel("Project", $q, dataProject1);

  return model;
};

angular.module("mock.project", []).service("Project", mockProject);
