app.repo("ThemeRepo", function ThemeRepo($q, Theme, WsApi) {

	var themeRepo = this;

	this.updateThemeProperty = function(themeId, propertyId, value) {
		angular.extend(themeRepo.mapping.updateThemeProperty, {'data': {
			"themeId": themeId,
			"propertyId": propertyId,
			"value": value,
		}});
		return $q(function(resolve,reject) {
			WsApi.fetch(themeRepo.mapping.updateThemeProperty).then(function() {
				resolve("Theme Property Updated");
			},function() {
				reject("Failed to update Theme Property");
			});
		});
	};

	this.activateTheme = function(theme) {
		angular.extend(themeRepo.mapping.activate, {'data': theme});
		return $q(function(resolve,reject) {
			WsApi.fetch(themeRepo.mapping.activate).then(function() {
				resolve("Theme Activated");
			},function() {
				reject("Failed to activate Theme");
			});
		});
	};

	return this;

});