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

  this.list = mockProjects;

  this.create = function(project) {
    var defer = $q.defer();
    project.id = this.list.length + 1;
    this.list.push(project);
    defer.resolve(project);
    return defer.promise;
  };

  this.update = function(project) {
    var defer = $q.defer();
    for (var i in this.list) {
      if (this.list[i].id === project.id) {
        angular.extend(this.list[i], project);
        project = this.list[i];
        break;
      }
    }
    defer.resolve(project);
    return defer.promise;
  };

  this.delete = function(project) {};

  this.getAll = function () {
    var defer = $q.defer();
    defer.resolve(this.list);
    return defer.promise;
  };

  this.findById = function(id) {
    for(var i in this.list) {
      if(this.list[i].id === id) {
        return this.list[i];
      }
    }
  };

  this.ready = function () {
    var defer = $q.defer();
    defer.resolve();
    return defer.promise;
  };

  this.scaffold = {
    "name": ""
  };

  this.getScaffold = function(defaults) {
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

    this.getValidations = function() {
    return validations;
  };

  this.clearValidationResults = function() {

  };

  this.listen = function() {

  };

  return this;
});