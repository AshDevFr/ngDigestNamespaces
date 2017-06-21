# ngDigestNamespaces

## Install

```sh
$ npm install --save ng-digest-namespaces
```

## Add to your project

```js
angular
    .module('app', ['ng-digest-namespaces'])
    .config(function(digestNamespacesProvider) {
      digestNamespacesProvider.init({
        enabled: true, // Default: true
        debug: true, // Default: false
        additionalDependencies: ['specific-lib'] // Default: []
      });
    });


angular
    .module('app')
    .controller('sidePanelCtrl', function($scope) {
        $scope.$$namespace = 'sidePanel';
    });
```

## Exclude a namespace

```js
angular
    .module('app')
    .controller('mainCtrl', function($scope, digestNamespacesConfig) {
        let sidePanelEnabled = true;
        $scope.toggleSidePanel = function () {
          sidePanelEnabled = !sidePanelEnabled;
          if (sidePanelEnabled)
            digestNamespacesConfig.include('sidePanel');
          else
            digestNamespacesConfig.exclude('sidePanel');
        }
    });

```