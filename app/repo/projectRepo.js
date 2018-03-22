app.repo("ProjectRepo", function ProjectRepo($timeout) {

  var projectRepo = this;

  projectRepo.scaffold = {
    name: ''
  };

  return projectRepo;

});