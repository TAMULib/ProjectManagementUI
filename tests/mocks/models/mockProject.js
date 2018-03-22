angular.module('mock.project', []).service('Project', function($q) {
  var Project = this;

  this.save = function() {};
  this.dirty = function(bool) {};
  this.refresh = function() {};

  return Project;
});