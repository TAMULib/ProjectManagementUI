var dataProjectRepo1 = [
  dataProject1,
  dataProject2,
  dataProject3
];

var dataProjectRepo2 = [
  dataProject3,
  dataProject2,
  dataProject1
];

var dataProjectRepo3 = [
  dataProject1,
  dataProject3,
  dataProject2
];

angular.module("mock.projectRepo", []).service("ProjectRepo", function ($q) {
  var repo = mockRepo("ProjectRepo", $q, mockProject, dataProjectRepo1);

  repo.scaffold = {
    name: ''
  };

  repo.mockValidations({
    name: {
      required: {
        type: "required",
        message: "A Project requires a name",
        property: "name",
        value: true
      }
    }
  });

  return repo;
});
