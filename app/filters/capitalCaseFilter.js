app.filter('capitalCase', function() {
  return function(input) {
    return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
  };
});