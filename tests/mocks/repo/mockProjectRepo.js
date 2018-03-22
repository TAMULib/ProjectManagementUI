var mockProjects = [
  {
    "id": 1,
    "name": "Test 1"
  },
  {
    "id": 2,
    "name": "Test 2"
  },
  {
    "id": 3,
    "name": "Test 3"
  }
];

angular.module('mock.projectRepo', []).service('ProjectRepo', function($q) {
  var ProjectRepo = this;

  ProjectRepo.list = mockProjects;

  ProjectRepo.create = function(project) {
    var defer = $q.defer();
    project.id = ProjectRepo.list.length + 1;
    ProjectRepo.list.push(project);
    defer.resolve(project);
    return defer.promise;
  };

  ProjectRepo.update = function(project) {
    var defer = $q.defer();
    for (var i in ProjectRepo.list) {
      if (ProjectRepo.list[i].id === project.id) {
        angular.extend(ProjectRepo.list[i], project);
        project = ProjectRepo.list[i];
        break;
      }
    }
    defer.resolve(project);
    return defer.promise;
  };

  ProjectRepo.delete = function(project) {};

  ProjectRepo.getAll = function () {
    var defer = $q.defer();
    defer.resolve(ProjectRepo.list);
    return defer.promise;
  };

  ProjectRepo.findById = function(id) {
    for(var i in ProjectRepo.list) {
      if(ProjectRepo.list[i].id === id) {
        return ProjectRepo.list[i];
      }
    }
  };

  ProjectRepo.ready = function () {
    var defer = $q.defer();
    defer.resolve();
    return defer.promise;
  };

  ProjectRepo.scaffold = {
    "name": ""
  };

  ProjectRepo.getScaffold = function(defaults) {
    if(!defaults) defaults = {};
    return angular.copy(angular.extend(this.scaffold, defaults));
  };

  var validations = {
      "name":{
        "required":{
          "type":"required",
          "message":"A Project requires a name",
          "property":"name",
          "value":true
        }
      }
    };

  ProjectRepo.getValidations = function() {
    return validations;
  };

  ProjectRepo.clearValidationResults = function() {

  };

  ProjectRepo.listen = function() {

  };

  return ProjectRepo;

});