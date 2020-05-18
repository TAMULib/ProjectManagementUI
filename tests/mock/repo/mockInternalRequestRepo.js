var dataInternalRequestRepo1 = [
  dataInternalRequest1,
  dataInternalRequest2,
  dataInternalRequest3
];

var dataInternalRequestRepo2 = [
  dataInternalRequest3,
  dataInternalRequest2,
  dataInternalRequest1
];

var dataInternalRequestRepo3 = [
  dataInternalRequest1,
  dataInternalRequest3,
  dataInternalRequest2
];

angular.module("mock.internalRequestRepo", []).service("InternalRequestRepo", function ($q) {
  var repo = mockRepo("InternalRequestRepo", $q, mockInternalRequest, dataInternalRequestRepo1);

  repo.scaffold = {
    title: '',
    description: '',
    product: null,
    createdOn: null
  };

  return repo;
});
