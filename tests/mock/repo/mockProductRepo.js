var dataProductRepo1 = [
  dataProduct1,
  dataProduct2,
  dataProduct3
];

var dataProductRepo2 = [
  dataProduct3,
  dataProduct2,
  dataProduct1
];

var dataProductRepo3 = [
  dataProduct1,
  dataProduct3,
  dataProduct2
];

angular.module("mock.productRepo", []).service("ProductRepo", function ($q) {
  var repo = mockRepo("ProductRepo", $q, mockProduct, dataProductRepo1);

  repo.scaffold = {
    name: '',
    remoteProjectInfo: []
  };

  repo.mockValidations({
    name: {
      required: {
        type: "required",
        message: "A Product requires a name",
        property: "name",
        value: true
      }
    }
  });

  return repo;
});
