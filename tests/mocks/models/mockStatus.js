angular.module('mock.status', []).service('Status', function () {

  this.mapping = [];

  this.save = function () {};
  this.dirty = function (bool) {};
  this.refresh = function () {};

  return this;
});
