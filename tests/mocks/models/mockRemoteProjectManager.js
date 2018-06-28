angular.module('mock.remoteProjectManager', []).service('RemoteProjectManager', function () {
  var RemoteProjectManager = this;

  this.save = function () {};
  this.dirty = function (bool) {};
  this.refresh = function () {};

  return RemoteProjectManager;
});