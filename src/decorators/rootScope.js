function $rootScope($delegate, digestNamespacesConfig) {
  const originalDigest = $delegate.$digest;

  $delegate.$digest = instrumentedDigest;


  function instrumentedDigest() {
    if (!digestNamespacesConfig.isEnabled())
      return originalDigest.call(this);

    try {
      filterWatchers(this);
      originalDigest.call(this);
    } finally {
      restoreWatchers(this);
    }
  }

  return $delegate;

  function filterWatchers (scope) {
    runWatchers(scope, current => {
      if (current.$$namespace && digestNamespacesConfig.nsExcluded(current.$$namespace)) {
        current.$$_watchers = current.$$watchers;
        current.$$watchers = [];
      }
    });
  }

  function restoreWatchers (scope) {
    runWatchers(scope, current => {
      if (current.$$_watchers) {
        current.$$watchers = current.$$_watchers;
        delete current.$$_watchers;
      }
    });
  }

  function runWatchers (scope, callback) {
    let next,
      target = scope,
      current = scope;

    let i = 0;
    do {
      current.$$namespace = current.$$namespace || (current.$parent ? current.$parent.$$namespace : null);
      callback(current);

      if (!(next = (current.$$childHead || (current !== target && current.$$nextSibling)))) {
        while (current !== target && !(next = current.$$nextSibling)) {
          current = current.$parent;
        }
      }
      i++;
    } while ((current = next));
  }
}

$rootScope.$inject = ['$delegate', 'digestNamespacesConfig'];

export default $rootScope;
