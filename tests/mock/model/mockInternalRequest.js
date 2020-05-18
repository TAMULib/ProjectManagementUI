var dataInternalRequest1 = {
  id: 1,
  createdOn: 1588262229449,
  description: "description 1",
  product: null,
  title: "Internal Request 1"
};

var dataInternalRequest2 = {
  id: 2,
  createdOn: 1588262283332,
  description: "description 2",
  product: null,
  title: "Internal Request 2"
};

var dataInternalRequest3 = {
  id: 3,
  createdOn: 1588262294703,
  description: "description 3",
  product: null,
  title: "Internal Request 3"

};

var mockInternalRequest = function ($q) {
  var model = mockModel("InternalRequest", $q, dataInternalRequest1);

  return model;
};

angular.module("mock.internalRequest", []).service("InternalRequest", mockInternalRequest);
