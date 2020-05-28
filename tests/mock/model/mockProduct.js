var dataProduct1 = {
  id: 1,
  name: "Product 1",
  remoteProjectInfo: [{
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
  }]
};

var dataProduct2 = {
  id: 2,
  name: "Product 2",
  remoteProjectInfo: [{
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
  }]
};

var dataProduct3 = {
  id: 3,
  name: "Product 3",
  remoteProjectInfo: [{
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
  }]
};

var mockProduct = function ($q) {
  var model = mockModel("Product", $q, dataProduct1);

  return model;
};

angular.module("mock.product", []).service("Product", mockProduct);
