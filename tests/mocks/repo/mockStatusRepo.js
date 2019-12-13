var mockStatuses = [{
    "id": 1,
    "identifier": "None",
    "mapping": [
      "None",
      "Future"
    ]
  },
  {
    "id": 2,
    "identifier": "In Progress",
    "mapping": [
      "In Progress"
    ]
  },
  {
    "id": 3,
    "identifier": "Done",
    "mapping": [
      "Done"
    ]
  },
  {
    "id": 4,
    "identifier": "Accepted",
    "mapping": [
      "Accepted"
    ]
  }
];

angular.module('mock.statusRepo', []).service('StatusRepo', function ($q) {

  this.list = mockStatuses;

  this.create = function (project) {
    var defer = $q.defer();
    project.id = this.list.length + 1;
    this.list.push(project);
    defer.resolve(project);
    return defer.promise;
  };

  this.update = function (project) {
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

  this.delete = function (project) {};

  this.getAll = function () {
    var defer = $q.defer();
    defer.resolve(this.list);
    return defer.promise;
  };

  this.findById = function (id) {
    for (var i in this.list) {
      if (this.list[i].id === id) {
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

  };

  this.getScaffold = function (defaults) {
    if (!defaults) defaults = {};
    return angular.copy(angular.extend(this.scaffold, defaults));
  };

  var validations = {

  };

  this.getValidations = function () {
    return validations;
  };

  this.clearValidationResults = function () {

  };

  this.listen = function () {

  };

  return this;
});
