module.exports = function (config) {
  config.set({

    preprocessors: {
      'app/**/*.js': 'coverage',
      'app/**/*.html': ['ng-html2js']
    },

    reporters: ['progress', 'coverage'],

    basePath: './',

    files: [

    ],

    failOnEmptyTestSuite: false,

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Firefox', 'Chrome', 'ChromeHeadless', 'ChromeHeadlessNoSandbox'],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-ng-html2js-preprocessor'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'templates'
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    }

  });
};
