app.filter('availableRemoteProduct', function() {
  return function(input, usedRPs) {
    return input.filter(function(val) {
      if (usedRPs) {
        return !usedRPs.some(function(rp) {
          return rp.scopeId === val.id;
        });
      } else {
        return true;
      }
    });
  };
});