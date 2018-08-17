describe('directive: remoteProjectManagerForm', function () {

    var scope, element;

    beforeEach(function () {
        module('core');
        module('app');
        module('views/directives/remoteProjectManagerForm.html');
        inject(function ($rootScope, _$compile_) {
            scope = $rootScope.$new();
            $compile = _$compile_;

            scope.model = {
                name: '',
                type: ''
            };
            scope.settings = [{
                "type": "text",
                "key": "url",
                "gloss": "URL",
                "visible": true
            }, {
                "type": "text",
                "key": "username",
                "gloss": "Username",
                "visible": false
            }, {
                "type": "password",
                "key": "password",
                "gloss": "Password",
                "visible": false
            }, {
                "type": "password",
                "key": "token",
                "gloss": "Token",
                "visible": false
            }];
            element = $compile('<remote-project-manager-form management-settings="settings" model="model"></remote-project-manager-form>')(scope);
            scope.$apply();
        });
    });

});