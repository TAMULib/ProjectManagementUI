app.repo("InternalRequestRepo", function InternalRequestRepo() {
  var internalRequestRepo = this;

  internalRequestRepo.scaffold = {
    title: '',
    description: '',
    timestamp: null
  };

  return internalRequestRepo;
});
