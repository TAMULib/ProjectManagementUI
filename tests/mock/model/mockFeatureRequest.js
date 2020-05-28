var dataFeatureRequest1 = {
  id: 1,
  title: "Internal Request 1",
  description: "description 1",
  productId: 1,
  rpmId: 1,
  scopeId: "scope 1"
};

var dataFeatureRequest2 = {
  id: 2,
  title: "Internal Request 2",
  description: "description 2",
  productId: 1,
  rpmId: 1,
  scopeId: "scope 2"
};

var dataFeatureRequest3 = {
  id: 3,
  title: "Internal Request 3",
  description: "description 3",
  productId: 2,
  rpmId: 2,
  scopeId: "scope 3"
};

var mockFeatureRequest = function ($q) {
  var model = mockModel("FeatureRequest", $q, dataFeatureRequest1);

  return model;
};

angular.module("mock.featureRequest", []).service("FeatureRequest", mockFeatureRequest);
