var dataStatusRepo1 = [
  dataStatus1,
  dataStatus2,
  dataStatus3
];

var dataStatusRepo2 = [
  dataStatus3,
  dataStatus2,
  dataStatus1
];

var dataStatusRepo3 = [
  dataStatus1,
  dataStatus3,
  dataStatus2
];

angular.module("mock.statusRepo", []).service("StatusRepo", function($q) {
  var repo = mockRepo("StatusRepo", $q, mockStatus, dataStatusRepo1);

  this.scaffold = {
    identifier: "",
    mapping: [ "" ]
  };

  return repo;
});
