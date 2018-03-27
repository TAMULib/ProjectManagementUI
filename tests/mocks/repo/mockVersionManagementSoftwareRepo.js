var mockVmses = [
  {
    "id":1,
    "name":"Test 1",
    "type":"VERSION_ONE",
    "settings":{
      "password":"password1",
      "url":"url1",
      "username":"username1"
    }
  },
  {
    "id":2,
    "name":"Test 2",
    "type":"VERSION_ONE",
    "settings":{
      "password":"password2",
      "url":"url2",
      "username":"username2"
    }
  },
  {
    "id":3,
    "name":"Test 3",
    "type":"VERSION_ONE",
    "settings":{
      "password":"password3",
      "url":"url3",
      "username":"username3"
    }
  }
];

angular.module('mock.versionManagementSoftwareRepo', []).service('VersionManagementSoftwareRepo', function($q) {
  var vmsr = this;

  vmsr.scaffold = {};

  vmsr.list = mockVmses;

  vmsr.getAll = function() {
    var defer = $q.defer();
    defer.resolve(vmsr.list);
    return defer.promise;
  };

  vmsr.findById = function(id) {
    for(var i in vmsr.list) {
      if(vmsr.list[i].id === id) {
        return vmsr.list[i];
      }
    }
  };

  vmsr.getScaffold = function(defaults) {
    if(!defaults) defaults = {};
    return angular.copy(angular.extend(this.scaffold, defaults));
  };

  vmsr.getTypes = function() {
    var defer = $q.defer();
    defer.resolve();
    return defer.promise;
  };

  vmsr.create = function(vms) {
    var defer = $q.defer();
    vms.id = vmsr.list.length + 1;
    vmsr.list.push(vms);
    defer.resolve(vms);
    return defer.promise;
  };

  vmsr.getValidations = function() {};

  vmsr.clearValidationResults = function() {};

  vmsr.ready = function() {
    var defer = $q.defer();
    defer.resolve();
    return defer.promise;
  };

  vmsr.getTypeScaffolding = function(type) {};

  vmsr.listen = function() {};

  vmsr.delete = function() {};

  return vmsr;

});