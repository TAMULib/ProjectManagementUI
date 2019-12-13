angular.module("mock.project", []).service("Project", function ($q) {

  this.save = function () {};
  this.dirty = function (dirty) {};
  this.refresh = function () {};

  return this;
});
