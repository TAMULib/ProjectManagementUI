app.service("AbstractAppRepo", function () {

	return function AbstractAppRepo() {

		this.getScaffold = function(defaults) {
			if(!defaults) defaults = {};
			return angular.copy(angular.extend(this.scaffold, defaults));
		};

		return this;
	};

});