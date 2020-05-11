app.repo("InternalRequestRepo", function InternalRequestRepo() {
  var internalRequestRepo = this;

  internalRequestRepo.scaffold = {
    title: '',
    description: '',
    createdOn: null
  };

  return internalRequestRepo;
});
