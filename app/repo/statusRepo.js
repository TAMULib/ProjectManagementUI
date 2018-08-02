app.repo("StatusRepo", function StatusRepo() {

    this.scaffold = {
        identifier: '',
        mapping: ['']
    };

    console.log(this.getAll());

    return this;
});