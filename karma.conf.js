module.exports = function (config) {
  config.set({

    preprocessors: {
      "app/!(node_modules)/**/*.js": "coverage",
      "app/views/**/*.html": ["ng-html2js"]
    },

    reporters: ["progress", "coverage"],

    basePath: "./",

    files: [
      "app/config/appConfig.js",
      "app/config/apiMapping.js",

      "app/node_modules/jquery/dist/jquery.js",
      "app/node_modules/bootstrap/dist/js/bootstrap.js",

      "app/node_modules/sockjs-client/dist/sockjs.js",
      "app/node_modules/stompjs/lib/stomp.js",

      "app/node_modules/angular/angular.js",

      "app/node_modules/angular-sanitize/angular-sanitize.js",
      "app/node_modules/angular-route/angular-route.js",
      "app/node_modules/angular-loader/angular-loader.js",
      "app/node_modules/angular-messages/angular-messages.js",
      "app/node_modules/angular-mocks/angular-mocks.js",

      "app/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",

      "app/node_modules/ng-table/bundles/ng-table.js",

      "app/node_modules/ng-file-upload/dist/ng-file-upload-shim.js",
      "app/node_modules/ng-file-upload/dist/ng-file-upload.js",

      "app/node_modules/jasmine-promise-matchers/dist/jasmine-promise-matchers.js",

      'node_modules/@wvr/core/app/config/coreConfig.js',

      'node_modules/@wvr/core/app/components/version/version.js',
      'node_modules/@wvr/core/app/components/version/version-directive.js',
      'node_modules/@wvr/core/app/components/version/interpolate-filter.js',

      "app/node_modules/weaver-ui-core/app/core.js",

      'node_modules/@wvr/core/app/core.js',

      'node_modules/@wvr/core/app/setup.js',
      'node_modules/@wvr/core/app/config/coreRuntime.js',
      'node_modules/@wvr/core/app/config/coreAngularConfig.js',
      'node_modules/@wvr/core/app/config/logging.js',

      'node_modules/@wvr/core/app/constants/apiResponseActions.js',
      'node_modules/@wvr/core/app/constants/httpMethodVerbs.js',

      'node_modules/@wvr/core/app/directives/headerDirective.js',
      'node_modules/@wvr/core/app/directives/footerDirective.js',
      'node_modules/@wvr/core/app/directives/userDirective.js',
      'node_modules/@wvr/core/app/directives/modalDirective.js',
      'node_modules/@wvr/core/app/directives/alertDirective.js',
      'node_modules/@wvr/core/app/directives/accordionDirective.js',
      'node_modules/@wvr/core/app/directives/tabsDirective.js',

      'node_modules/@wvr/core/app/directives/tooltipDirective.js',
      'node_modules/@wvr/core/app/directives/validationMessageDirective.js',
      'node_modules/@wvr/core/app/directives/validatedInputDirective.js',
      'node_modules/@wvr/core/app/directives/validatedSelectDirective.js',
      'node_modules/@wvr/core/app/directives/validatedTextAreaDirective.js',

      'node_modules/@wvr/core/app/services/accessControlService.js',
      'node_modules/@wvr/core/app/services/wsService.js',
      'node_modules/@wvr/core/app/services/wsApi.js',
      'node_modules/@wvr/core/app/services/restApi.js',
      'node_modules/@wvr/core/app/services/authService.js',
      'node_modules/@wvr/core/app/services/storageService.js',
      'node_modules/@wvr/core/app/services/utilityService.js',
      'node_modules/@wvr/core/app/services/alertService.js',
      'node_modules/@wvr/core/app/services/validationStore.js',
      'node_modules/@wvr/core/app/services/userService.js',
      'node_modules/@wvr/core/app/services/modalService.js',
      'node_modules/@wvr/core/app/services/modelCache.js',
      'node_modules/@wvr/core/app/services/modelUpdateService.js',

      'node_modules/@wvr/core/app/repo/abstractRepo.js',

      'node_modules/@wvr/core/app/model/abstractModel.js',
      'node_modules/@wvr/core/app/model/assumedControl.js',
      'node_modules/@wvr/core/app/model/user.js',

      'node_modules/@wvr/core/app/controllers/abstractController.js',
      'node_modules/@wvr/core/app/controllers/coreAdminController.js',
      'node_modules/@wvr/core/app/controllers/authenticationController.js',
      'node_modules/@wvr/core/app/controllers/loginController.js',
      'node_modules/@wvr/core/app/controllers/registrationController.js',
      'node_modules/@wvr/core/app/controllers/userController.js',
      'node_modules/@wvr/core/app/controllers/errorPageController.js',

      "app/repo/**/*.js",

      "app/services/**/*.js",

      "app/views/**/*.html",

      "tests/core/**/*.js",

      "tests/mock/**/*.js",

      "tests/unit/**/*.js"
    ],

    autoWatch: true,

    frameworks: ["jasmine"],

    browsers: ["Firefox", "Chrome", "ChromeHeadless", "ChromeHeadlessNoSandbox"],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      }
    },

    plugins: [
      "karma-chrome-launcher",
      "karma-coverage",
      "karma-firefox-launcher",
      "karma-jasmine",
      "karma-junit-reporter",
      "karma-ng-html2js-preprocessor"
    ],

    junitReporter: {
      outputFile: "test_out/unit.xml",
      suite: "unit"
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: "app/",
      moduleName: "templates"
    },

    coverageReporter: {
      type: "lcov",
      dir: "coverage/"
    }

  });
};
