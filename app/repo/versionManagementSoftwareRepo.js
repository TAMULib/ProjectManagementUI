app.repo("VersionManagementSoftwareRepo", function VersionManagementSoftwareRepo() {

  var vmsRepo = this;

  vmsRepo.scaffold = {
    name: '',
    serviceType: 'VERSION_ONE'
  };

  return vmsRepo;

});