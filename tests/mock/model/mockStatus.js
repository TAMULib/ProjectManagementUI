var dataStatus1 = {
  id: 1,
  identifier: "None",
  mapping: [
    "None",
    "Future"
  ]
};

var dataStatus2 = {
  id: 2,
  identifier: "In Progress",
  mapping: [
    "In Progress"
  ]
};

var dataStatus3 = {
  id: 3,
  identifier: "Accepted",
  mapping: [
    "Accepted"
  ]
};

var mockStatus = function ($q) {
  var model = mockModel("Status", $q, dataStatus1);

  return model;
};

angular.module("mock.status", []).service("Status", mockStatus);
