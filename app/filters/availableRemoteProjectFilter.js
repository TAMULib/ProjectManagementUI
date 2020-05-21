app.filter('availableRemoteProject', function() {
  return function(input, usedRPs) {
    if (!input) return false;
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
