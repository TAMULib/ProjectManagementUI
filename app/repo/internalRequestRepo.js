app.repo("InternalRequestRepo", function InternalRequestRepo() {
  var internalRequestRepo = this;

  internalRequestRepo.scaffold = {
    title: '',
    description: '',
    product: null,
    createdOn: null
  };

  return internalRequestRepo;
});
