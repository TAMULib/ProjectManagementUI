angular.module('mock.project', []).service('Project', function($q) {
  var Project = this;

  this.save = function() {};
  this.dirty = function(bool) {};

  return Project;
});